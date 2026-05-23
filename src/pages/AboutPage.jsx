import { useNavigate } from 'react-router-dom';
import { colors, fonts, radius, shadow } from '../theme';
import Icon from '../components/ui/Icon';
import { useWindowSize } from '../hooks/useWindowSize';

const VALUES = [
  { icon: 'shield',   title: 'Trust First',       desc: "Every product is genuine, every transaction secured, every customer respected. No shortcuts." },
  { icon: 'map-pin',  title: 'South African',      desc: "Born in Harrismith, Free State. We understand the unique needs of South African shoppers." },
  { icon: 'truck',    title: 'Nationwide Reach',   desc: "We ship to every corner of SA via The Courier Guy — from Cape Town to Limpopo." },
  { icon: 'heart',    title: 'Community Driven',   desc: "We're not just a store — we're part of the communities we serve. Your support keeps us local." },
];

const STATS = [
  { value: '5,000+', label: 'Happy Customers' },
  { value: '9',      label: 'Provinces Served' },
  { value: '3–5 Days', label: 'Average Delivery' },
  { value: '30 Days', label: 'Return Window' },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const { isMobile } = useWindowSize();

  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${colors.deep}, ${colors.mid})`, color: '#fff', padding: isMobile ? '52px 20px' : '72px 24px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.15)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '32px' }}>🥝</div>
        <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: isMobile ? '30px' : '42px', marginBottom: '14px', lineHeight: 1.1 }}>
          South Africa's Fresh<br />Online Store
        </h1>
        <p style={{ fontFamily: fonts.body, fontSize: '15px', opacity: 0.85, maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
          KiwiHub was built with one mission — to make quality tech, accessories and homewear accessible to every South African, no matter where they live.
        </p>
      </div>

      {/* Stats */}
      <div style={{ background: 'white', borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 20px', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: isMobile ? '24px' : '30px', color: colors.deep }}>{s.value}</div>
              <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted, marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: isMobile ? '32px 16px 48px' : '48px 24px 64px' }}>
        {/* Story */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '24px' : '40px', marginBottom: '48px', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: fonts.body, fontSize: '11px', fontWeight: 600, color: colors.mid, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>Our Story</div>
            <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: isMobile ? '22px' : '28px', color: colors.deep, marginBottom: '14px', lineHeight: 1.2 }}>
              Born in Harrismith, Built for All of SA
            </h2>
            <p style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.textSec, lineHeight: 1.8, marginBottom: '12px' }}>
              KiwiHub started from a simple observation: great tech and quality homewear was hard to find — and expensive to ship — if you didn't live in a major city. We decided to fix that.
            </p>
            <p style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.textSec, lineHeight: 1.8, marginBottom: '12px' }}>
              Based in Harrismith, Free State, we know what it means to feel overlooked by the big retailers. That's why we ship nationwide, price fairly, and back every purchase with genuine support.
            </p>
            <p style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.textSec, lineHeight: 1.8 }}>
              Our kiwi logo is no accident — just like the fruit, we're fresh, packed with goodness, and bring a little brightness to everyday life.
            </p>
          </div>
          <div style={{ background: `linear-gradient(135deg, ${colors.light}, ${colors.tint})`, borderRadius: '20px', height: isMobile ? '200px' : '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: isMobile ? '52px' : '72px' }}>🥝</div>
            <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '20px', color: colors.deep }}>KiwiHub</div>
            <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.mid }}>Harrismith, Free State</div>
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontFamily: fonts.body, fontSize: '11px', fontWeight: 600, color: colors.mid, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>What We Stand For</div>
            <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '26px', color: colors.deep }}>Our Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: '12px' }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ background: 'white', borderRadius: '16px', padding: isMobile ? '18px 14px' : '24px 18px', boxShadow: shadow.card, textAlign: 'center' }}>
                <div style={{ width: '44px', height: '44px', background: colors.light, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <Icon name={v.icon} size={20} color={colors.deep} />
                </div>
                <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '13px', color: colors.deep, marginBottom: '7px' }}>{v.title}</div>
                <p style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.muted, lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div style={{ background: colors.light, borderRadius: '18px', padding: isMobile ? '24px 16px' : '32px', textAlign: 'center', border: `1.5px solid ${colors.mint}` }}>
          <div style={{ fontFamily: fonts.body, fontSize: '11px', fontWeight: 600, color: colors.mid, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '10px' }}>Our Trusted Partners</div>
          <h3 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '20px', color: colors.deep, marginBottom: '20px' }}>Powered by South Africa's Best</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {[
              { icon: 'lock',  label: 'PayFast',        desc: 'Secure payments' },
              { icon: 'truck', label: 'The Courier Guy', desc: 'Nationwide delivery' },
            ].map(p => (
              <div key={p.label} style={{ background: 'white', borderRadius: '14px', padding: isMobile ? '16px 20px' : '20px 32px', boxShadow: shadow.card, display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', background: colors.light, borderRadius: radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={p.icon} size={20} color={colors.deep} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '15px', color: colors.deep }}>{p.label}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.muted }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <button
            onClick={() => navigate('/shop')}
            style={{ background: colors.deep, color: '#fff', border: 'none', borderRadius: '30px', padding: '14px 36px', fontFamily: fonts.heading, fontWeight: 800, fontSize: '15px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            <Icon name="store" size={18} color="#fff" /> Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
