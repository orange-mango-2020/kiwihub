import { Resend } from 'resend';

const FROM = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  if (!process.env.RESEND_API_KEY) {
    return res.status(200).json({ sent: false, reason: 'RESEND_API_KEY not set' });
  }

  const order = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  if (!order?.customer?.email) return res.status(400).json({ error: 'Missing order data' });

  const { id, customer, items, subtotal, delivery, discount, total, coupon } = order;
  const resend = new Resend(process.env.RESEND_API_KEY);

  const itemRows = items.map(item => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-family:sans-serif;font-size:14px;color:#1a1a1a;">
        ${item.name}<br><span style="color:#6b7280;font-size:12px;">Qty: ${item.qty}</span>
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;text-align:right;font-family:sans-serif;font-size:14px;font-weight:700;color:#1a4a2e;">
        R${(item.price * item.qty).toLocaleString()}
      </td>
    </tr>`).join('');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#1a4a2e;border-radius:16px 16px 0 0;padding:32px;text-align:center;">
          <div style="font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">🥝 KiwiHub</div>
          <div style="color:#c8f5d8;font-size:14px;margin-top:6px;">South Africa's Fresh Online Store</div>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:32px;">
          <h1 style="font-size:22px;font-weight:800;color:#1a4a2e;margin:0 0 8px;">Order Confirmed! 🎉</h1>
          <p style="color:#374151;font-size:15px;margin:0 0 24px;">
            Hi ${customer.firstName}, thank you for your order. We're getting it ready for you.
          </p>

          <!-- Order ID badge -->
          <div style="background:#f0faf2;border:1.5px solid #c8f5d8;border-radius:10px;padding:14px 20px;margin-bottom:28px;display:inline-block;">
            <span style="color:#6b7280;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Order Number</span><br>
            <span style="color:#1a4a2e;font-size:20px;font-weight:800;">${id}</span>
          </div>

          <!-- Items -->
          <h2 style="font-size:15px;font-weight:700;color:#1a1a1a;margin:0 0 12px;border-bottom:2px solid #f0f0f0;padding-bottom:10px;">Items Ordered</h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${itemRows}
            ${coupon ? `<tr><td style="padding:10px 0;font-size:13px;color:#059669;">Coupon (${coupon})</td><td style="padding:10px 0;text-align:right;font-size:13px;font-weight:600;color:#059669;">-R${discount.toLocaleString()}</td></tr>` : ''}
            <tr>
              <td style="padding:10px 0;font-size:13px;color:#6b7280;">Delivery</td>
              <td style="padding:10px 0;text-align:right;font-size:13px;font-weight:600;color:${delivery === 0 ? '#059669' : '#1a1a1a'};">${delivery === 0 ? 'FREE' : `R${delivery}`}</td>
            </tr>
            <tr style="border-top:2px solid #f0f0f0;">
              <td style="padding:14px 0 0;font-size:16px;font-weight:800;color:#1a1a1a;">Total Paid</td>
              <td style="padding:14px 0 0;text-align:right;font-size:20px;font-weight:800;color:#1a4a2e;">R${total.toLocaleString()}</td>
            </tr>
          </table>

          <!-- Delivery address -->
          <div style="background:#f9fafb;border-radius:10px;padding:16px 20px;margin:24px 0;">
            <div style="font-size:13px;font-weight:700;color:#1a4a2e;margin-bottom:6px;">📦 Delivering to</div>
            <div style="font-size:13px;color:#374151;line-height:1.6;">
              ${customer.firstName} ${customer.lastName}<br>
              ${customer.address}<br>
              ${customer.city}, ${customer.province} ${customer.postalCode}
            </div>
          </div>

          <!-- Estimated delivery -->
          <div style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:10px;padding:14px 20px;margin-bottom:28px;">
            <div style="font-size:13px;font-weight:700;color:#92400e;">🚚 Estimated Delivery: 2–5 business days</div>
            <div style="font-size:12px;color:#92400e;margin-top:3px;">Delivered nationwide by The Courier Guy. You'll receive a tracking number soon.</div>
          </div>

          <p style="font-size:14px;color:#374151;margin:0;">
            Questions? Reply to this email or contact us at
            <a href="mailto:support@kiwihub.co.za" style="color:#2e8b57;font-weight:600;">support@kiwihub.co.za</a>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9fafb;border-radius:0 0 16px 16px;padding:20px;text-align:center;">
          <p style="font-size:12px;color:#9ca3af;margin:0;">
            © ${new Date().getFullYear()} KiwiHub · 12 Kestrel Street, Harrismith, Free State, 9880<br>
            <a href="https://kiwihub.co.za" style="color:#2e8b57;text-decoration:none;">kiwihub.co.za</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await resend.emails.send({
      from: FROM,
      to: customer.email,
      subject: `Your KiwiHub order ${id} is confirmed ✅`,
      html,
    });
    res.status(200).json({ sent: true });
  } catch (err) {
    console.error('[Resend] Order email failed:', err.message);
    res.status(500).json({ error: err.message });
  }
}
