import md5 from '../src/lib/md5.js';
import { createClient } from '@supabase/supabase-js';

// PayFast's authorized IP ranges (from PayFast merchant portal)
const PAYFAST_RANGES = (() => {
  const n = ip => ip.split('.').reduce((a, o) => a * 256 + parseInt(o, 10), 0);
  return [
    [n('197.97.145.144'), n('197.97.145.159')],
    [n('41.74.179.192'),  n('41.74.179.223')],
    [n('102.216.36.0'),   n('102.216.36.15')],
    [n('102.216.36.128'), n('102.216.36.143')],
    [n('144.126.193.139'), n('144.126.193.139')],
  ];
})();

function isPayFastIP(rawIp) {
  const ip = rawIp.replace('::ffff:', '').trim();
  const n = ip.split('.').reduce((a, o) => a * 256 + parseInt(o, 10), 0);
  return PAYFAST_RANGES.some(([lo, hi]) => n >= lo && n <= hi);
}

function validateSignature(data, passphrase) {
  const { signature, ...params } = data;
  const pfEncode = v => encodeURIComponent(String(v)).replace(/%20/g, '+');
  const paramStr = Object.keys(params)
    .filter(k => params[k] !== undefined && params[k] !== '')
    .map(k => `${k}=${pfEncode(params[k])}`)
    .join('&');
  const toHash = passphrase ? `${paramStr}&passphrase=${pfEncode(passphrase)}` : paramStr;
  return md5(toHash) === signature;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const rawIp = (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || req.socket?.remoteAddress
    || '';

  if (!isPayFastIP(rawIp)) {
    console.warn(`[PayFast ITN] Blocked unauthorized IP: ${rawIp}`);
    return res.status(403).send('Forbidden');
  }

  // Parse form-encoded or pre-parsed body
  const data = typeof req.body === 'string'
    ? Object.fromEntries(new URLSearchParams(req.body))
    : req.body || {};

  const passphrase = process.env.PAYFAST_PASSPHRASE || '';

  if (!validateSignature(data, passphrase)) {
    console.warn('[PayFast ITN] Signature mismatch — possible spoofing attempt');
    return res.status(400).send('Invalid signature');
  }

  const { payment_status, m_payment_id, pf_payment_id, amount_gross } = data;

  console.log(`[PayFast ITN] Order ${m_payment_id}: ${payment_status} — R${amount_gross}`);

  if (payment_status === 'COMPLETE' && m_payment_id) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase
        .from('orders')
        .update({
          payment_status: 'paid',
          payfast_payment_id: pf_payment_id,
          amount_paid: parseFloat(amount_gross),
          status: 'processing',
        })
        .eq('id', m_payment_id);

      if (error) console.error('[PayFast ITN] Supabase update failed:', error.message);
    }
  }

  // PayFast expects 200 — if we return anything else it will retry
  res.status(200).send('OK');
}
