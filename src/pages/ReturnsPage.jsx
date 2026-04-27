import { useNavigate } from 'react-router-dom';
import { colors, fonts, radius, shadow } from '../theme';
import Icon from '../components/ui/Icon';

const STEPS = [
  { n: 1, icon: 'mail',    title: 'Contact Us',    desc: "Email support@kiwihub.co.za with your order number and the reason for return. We'll respond within 1 business day." },
  { n: 2, icon: 'package', title: 'Pack Your Item', desc: "Pack the item securely in its original packaging where possible. Include a note with your order number inside the box." },
  { n: 3, icon: 'truck',   title: 'We Collect',    desc: "For defective or incorrect items, we'll arrange a FREE collection via The Courier Guy at a time that suits you." },
  { n: 4, icon: 'check',   title: 'Refund Issued', desc: "Once we receive and inspect the item, your refund will be processed within 5–7 business days to your original payment method." },
];

const ELIGIBLE     = ['Defective or damaged products', 'Incorrect item received', 'Item not as described on the website', 'Unopened products within 30 days'];
const NOT_ELIGIBLE = ['Products damaged by misuse or accident', 'Items returned after 30 days', 'Opened software or digital products', 'Items missing original packaging (for change-of-mind returns)'];

const TIMELINE = [
  { label: 'Return request approved',  time: 'Within 1 business day' },
  { label: 'Collection arranged',      time: 'Within 2 business days' },
  { label: 'Item received & inspected', time: '3–5 business days' },
  { label: 'Refund processed',         time: '5–7 business days after inspection' },
];

export default function ReturnsPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${colors.deep}, ${colors.mid})`, color: '#fff', padding: '52px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', background: 'rgba(255,255,255,0.15)', borderRadius: '14px', marginBottom: '16px' }}>
          <Icon name="rotate-ccw" size={26} color="#fff" />
        </div>
        <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '36px', marginBottom: '10px' }}>Returns &amp; Refunds</h1>
        <p style={{ fontFamily: fonts.body, fontSize: '15px', opacity: 0.85, maxWidth: '500px', margin: '0 auto' }}>
          We want you to be 100% happy with your purchase. Our 30-day return policy makes it easy.
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 64px' }}>
        {/* Steps */}
        <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '22px', color: colors.deep, marginBottom: '24px' }}>How to Return an Item</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '40px' }}>
          {STEPS.map(s => (
            <div key={s.n} style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: shadow.card, position: 'relative' }}>
              <div style={{ width: '36px', height: '36px', background: `linear-gradient(135deg, ${colors.bright}, ${colors.mid})`, borderRadius: radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <Icon name={s.icon} size={18} color="#fff" />
              </div>
              <div style={{ position: 'absolute', top: '16px', right: '16px', fontFamily: fonts.heading, fontWeight: 800, fontSize: '28px', color: colors.light, lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '14px', color: colors.deep, marginBottom: '6px' }}>{s.title}</div>
              <p style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Eligibility */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: shadow.card }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', background: colors.successBg, borderRadius: radius.sm, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="check" size={16} color={colors.success} />
              </div>
              <h3 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '15px', color: colors.success }}>Eligible for Return</h3>
            </div>
            {ELIGIBLE.map(e => (
              <div key={e} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
                <Icon name="check" size={14} color={colors.success} style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.textSec, lineHeight: 1.5 }}>{e}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: shadow.card }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '32px', height: '32px', background: colors.errorBadge, borderRadius: radius.sm, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="x" size={16} color={colors.error} />
              </div>
              <h3 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '15px', color: colors.error }}>Not Eligible</h3>
            </div>
            {NOT_ELIGIBLE.map(e => (
              <div key={e} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
                <Icon name="x" size={14} color={colors.error} style={{ marginTop: '2px', flexShrink: 0 }} />
                <span style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.textSec, lineHeight: 1.5 }}>{e}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ background: colors.light, borderRadius: '16px', padding: '24px', border: `1.5px solid ${colors.mint}`, marginBottom: '24px' }}>
          <h3 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '15px', color: colors.deep, marginBottom: '14px' }}>Refund Timeline</h3>
          {TIMELINE.map((t, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < TIMELINE.length - 1 ? `1px solid ${colors.successBg}` : 'none' }}>
              <span style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.textSec, fontWeight: 500 }}>{t.label}</span>
              <span style={{ fontFamily: fonts.heading, fontSize: '12px', fontWeight: 700, color: colors.deep }}>{t.time}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: `linear-gradient(135deg, ${colors.deep}, ${colors.mid})`, borderRadius: '16px', padding: '28px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '18px', color: '#fff', marginBottom: '4px' }}>Ready to start a return?</div>
            <div style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.mint }}>Our team will guide you through the process.</div>
          </div>
          <button
            onClick={() => navigate('/contact')}
            style={{ background: '#fff', color: colors.deep, border: 'none', borderRadius: radius.lg, padding: '12px 24px', fontFamily: fonts.heading, fontWeight: 800, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Icon name="mail" size={16} color={colors.deep} /> Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
