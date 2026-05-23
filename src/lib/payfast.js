import md5 from './md5';

const SANDBOX_URL = 'https://sandbox.payfast.co.za/eng/process';
const LIVE_URL    = 'https://www.payfast.co.za/eng/process';

// PayFast-style URL encoding: spaces as +, not %20
const pfEncode = v => encodeURIComponent(String(v)).replace(/%20/g, '+');

export function submitPayFastPayment({ order, coupon }) {
  const isSandbox = import.meta.env.VITE_PAYFAST_SANDBOX !== 'false';
  const merchantId  = import.meta.env.VITE_PAYFAST_MERCHANT_ID  || '10000100';
  const merchantKey = import.meta.env.VITE_PAYFAST_MERCHANT_KEY || '46f0cd694581a';
  const passphrase  = import.meta.env.VITE_PAYFAST_PASSPHRASE   || '';
  const notifyUrl   = import.meta.env.VITE_PAYFAST_NOTIFY_URL   || '';
  const origin      = window.location.origin;

  // Defined in the order PayFast expects them — order matters for signature
  const params = {
    merchant_id:          merchantId,
    merchant_key:         merchantKey,
    return_url:           `${origin}/order-confirmed`,
    cancel_url:           `${origin}/cart`,
    ...(notifyUrl ? { notify_url: notifyUrl } : {}),
    name_first:           order.customer.firstName,
    name_last:            order.customer.lastName,
    email_address:        order.customer.email,
    cell_number:          order.customer.phone.replace(/\D/g, ''),
    m_payment_id:         order.id,
    amount:               order.total.toFixed(2),
    item_name:            `KiwiHub Order ${order.id}`,
    item_description:     `${order.items.length} item(s) — ${order.items.map(i => i.name).join(', ').substring(0, 100)}`,
    email_confirmation:   '1',
    confirmation_address: order.customer.email,
  };

  // Remove empty/undefined values
  Object.keys(params).forEach(k => { if (!params[k] && params[k] !== 0) delete params[k]; });

  // Build signature string
  const paramStr = Object.entries(params)
    .map(([k, v]) => `${k}=${pfEncode(v)}`)
    .join('&');
  const hashStr = passphrase ? `${paramStr}&passphrase=${pfEncode(passphrase)}` : paramStr;
  params.signature = md5(hashStr);

  // Submit via hidden form (required for PayFast redirect flow)
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = isSandbox ? SANDBOX_URL : LIVE_URL;
  Object.entries(params).forEach(([k, v]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = k;
    input.value = v;
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
}
