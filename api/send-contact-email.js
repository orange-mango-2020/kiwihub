import { Resend } from 'resend';

const FROM    = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const SUPPORT = process.env.SUPPORT_EMAIL     || 'rawatcassim@gmail.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  if (!process.env.RESEND_API_KEY) {
    return res.status(200).json({ sent: false, reason: 'RESEND_API_KEY not set' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { name, email, subject, message } = body || {};
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#f4f4f4;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;">
    <tr><td style="background:#1a4a2e;border-radius:12px 12px 0 0;padding:24px 28px;">
      <div style="font-size:20px;font-weight:900;color:#fff;">🥝 KiwiHub — New Contact Message</div>
    </td></tr>
    <tr><td style="background:#fff;border-radius:0 0 12px 12px;padding:28px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:8px 0;font-size:13px;color:#6b7280;font-weight:600;width:100px;">From</td>
          <td style="padding:8px 0;font-size:14px;color:#1a1a1a;">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-size:13px;color:#6b7280;font-weight:600;">Email</td>
          <td style="padding:8px 0;font-size:14px;"><a href="mailto:${email}" style="color:#2e8b57;">${email}</a></td>
        </tr>
        ${subject ? `<tr>
          <td style="padding:8px 0;font-size:13px;color:#6b7280;font-weight:600;">Topic</td>
          <td style="padding:8px 0;font-size:14px;color:#1a1a1a;">${subject}</td>
        </tr>` : ''}
      </table>
      <div style="margin-top:20px;padding-top:20px;border-top:1.5px solid #f0f0f0;">
        <div style="font-size:13px;font-weight:600;color:#6b7280;margin-bottom:8px;">Message</div>
        <div style="font-size:14px;color:#1a1a1a;line-height:1.7;white-space:pre-wrap;">${message}</div>
      </div>
      <div style="margin-top:24px;padding:12px 16px;background:#f0faf2;border-radius:8px;font-size:12px;color:#374151;">
        Reply directly to this email to respond to ${name}.
      </div>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: FROM,
      to: SUPPORT,
      reply_to: email,
      subject: `[KiwiHub Contact] ${subject || 'New message'} — from ${name}`,
      html,
    });
    res.status(200).json({ sent: true });
  } catch (err) {
    console.error('[Resend] Contact email failed:', err.message);
    res.status(500).json({ error: err.message });
  }
}
