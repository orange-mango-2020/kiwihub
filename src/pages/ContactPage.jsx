import { useState } from 'react';
import { colors, fonts, radius, shadow } from '../theme';
import Icon from '../components/ui/Icon';

const INFO_CARDS = [
  { icon: 'map-pin', title: 'Our Address',    lines: ['12 Kestrel Street', 'Harrismith, Free State', '9880, South Africa'] },
  { icon: 'mail',    title: 'Email Us',        lines: ['support@kiwihub.co.za', 'We reply within 24 hours'] },
  { icon: 'phone',   title: 'Call Us',         lines: ['+27 58 000 0000', 'Mon–Fri, 8am–5pm SAST'] },
  { icon: 'clock',   title: 'Business Hours',  lines: ['Monday–Friday: 8am–5pm', 'Saturday: 9am–1pm', 'Sunday: Closed'] },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    const key = import.meta.env.VITE_WEB3FORMS_KEY;
    if (key) {
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: key,
            from_name: 'KiwiHub Contact Form',
            subject: form.subject || 'New contact message from KiwiHub',
            name: form.name,
            email: form.email,
            topic: form.subject,
            message: form.message,
          }),
        });
      } catch {}
    }
    setSending(false);
    setSent(true);
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: radius.md,
    border: `1.5px solid ${colors.border}`, fontSize: '13px', color: colors.text,
    background: '#fff', outline: 'none', fontFamily: fonts.body, transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  };

  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${colors.deep}, ${colors.mid})`, color: '#fff', padding: '52px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', background: 'rgba(255,255,255,0.15)', borderRadius: '14px', marginBottom: '16px' }}>
          <Icon name="message-circle" size={26} color="#fff" />
        </div>
        <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '36px', marginBottom: '10px' }}>Contact Us</h1>
        <p style={{ fontFamily: fonts.body, fontSize: '15px', opacity: 0.85, maxWidth: '500px', margin: '0 auto' }}>
          We're based in Harrismith, Free State. Happy to help with orders, products or anything else.
        </p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px 64px', display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        {/* Form */}
        <div style={{ flex: 1 }}>
          {sent ? (
            <div style={{ background: 'white', borderRadius: '18px', padding: '48px 32px', textAlign: 'center', boxShadow: shadow.card }}>
              <div style={{ width: '64px', height: '64px', background: colors.successBg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Icon name="check" size={30} color={colors.success} />
              </div>
              <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '22px', color: colors.deep, marginBottom: '8px' }}>Message Sent!</h2>
              <p style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.muted, marginBottom: '24px' }}>
                Thanks {form.name}! We'll get back to you within 1–2 business days.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                style={{ background: colors.deep, color: '#fff', border: 'none', borderRadius: radius.lg, padding: '12px 28px', fontFamily: fonts.heading, fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <div style={{ background: 'white', borderRadius: '18px', padding: '32px', boxShadow: shadow.card }}>
              <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '20px', color: colors.deep, marginBottom: '24px' }}>Send a Message</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: colors.textSec, marginBottom: '5px', fontFamily: fonts.body }}>Full Name *</label>
                    <input value={form.name} onChange={set('name')} placeholder="Sipho Dlamini" style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = colors.bright; }} onBlur={e => { e.target.style.borderColor = colors.border; }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: colors.textSec, marginBottom: '5px', fontFamily: fonts.body }}>Email Address *</label>
                    <input value={form.email} onChange={set('email')} type="email" placeholder="you@email.com" style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = colors.bright; }} onBlur={e => { e.target.style.borderColor = colors.border; }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: colors.textSec, marginBottom: '5px', fontFamily: fonts.body }}>Subject</label>
                  <select value={form.subject} onChange={set('subject')} style={{ ...inputStyle }}>
                    <option value="">Select a topic…</option>
                    <option>Order Enquiry</option>
                    <option>Delivery Question</option>
                    <option>Return / Refund</option>
                    <option>Product Information</option>
                    <option>Payment Issue</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: colors.textSec, marginBottom: '5px', fontFamily: fonts.body }}>Message *</label>
                  <textarea
                    value={form.message} onChange={set('message')} placeholder="How can we help you?" rows={5}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                    onFocus={e => { e.target.style.borderColor = colors.bright; }} onBlur={e => { e.target.style.borderColor = colors.border; }}
                  />
                </div>
                <button
                  onClick={submit}
                  style={{ background: sending ? colors.mid : colors.deep, color: '#fff', border: 'none', borderRadius: radius.lg, padding: '14px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: fonts.heading, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
                >
                  {sending
                    ? <><Icon name="loader" size={16} color="#fff" /> Sending…</>
                    : <><Icon name="mail" size={16} color="#fff" /> Send Message</>
                  }
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info cards */}
        <div style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {INFO_CARDS.map(card => (
            <div key={card.title} style={{ background: 'white', borderRadius: '14px', padding: '18px', boxShadow: shadow.card, display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ width: '38px', height: '38px', background: colors.light, borderRadius: radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={card.icon} size={18} color={colors.deep} />
              </div>
              <div>
                <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.deep, marginBottom: '4px' }}>{card.title}</div>
                {card.lines.map((l, i) => (
                  <div key={i} style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.textSec, lineHeight: 1.6 }}>{l}</div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ background: colors.light, borderRadius: radius.lg, padding: '14px 16px', border: `1.5px solid ${colors.mint}` }}>
            <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '12px', color: colors.deep, marginBottom: '8px' }}>Our Trusted Partners</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['🔒 PayFast', '🚚 The Courier Guy'].map(p => (
                <span key={p} style={{ background: 'white', border: `1px solid ${colors.border}`, borderRadius: radius.xs, padding: '4px 10px', fontSize: '11px', fontFamily: fonts.body, color: colors.textSec }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
