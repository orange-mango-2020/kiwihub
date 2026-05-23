import { Link } from 'react-router-dom';
import { colors, fonts, radius } from '../../theme';
import Icon from '../ui/Icon';
import { useWindowSize } from '../../hooks/useWindowSize';

const LINKS = {
  Shop: [
    { label: 'Laptops',        to: '/shop?cat=Laptops' },
    { label: 'Desktops',       to: '/shop?cat=Desktops' },
    { label: 'Gaming PCs',     to: '/shop?cat=Gaming+PCs' },
    { label: 'PC Accessories', to: '/shop?cat=PC+Accessories' },
  ],
  Help: [
    { label: 'FAQs',           to: '/faqs' },
    { label: 'Returns',        to: '/returns' },
    { label: 'Order Tracking', to: '/tracking' },
    { label: 'Contact Us',     to: '/contact' },
  ],
  Company: [
    { label: 'About Us',           to: '/about' },
    { label: 'Privacy Policy',     to: '/privacy' },
    { label: 'Terms & Conditions', to: '/terms' },
  ],
};

const PAYMENTS = [
  { icon: 'credit-card', label: 'Card' },
  { icon: 'landmark',    label: 'EFT' },
  { icon: 'smartphone',  label: 'SnapScan' },
  { icon: 'wallet',      label: 'Mobicred' },
];

export default function Footer() {
  const { isMobile } = useWindowSize();

  return (
    <footer style={{ background: '#111827', color: '#fff', padding: isMobile ? '36px 20px 20px' : '48px 24px 24px', marginTop: '48px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Top section */}
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '32px' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '34px', height: '34px', background: `linear-gradient(135deg,${colors.bright},${colors.deep})`, borderRadius: radius.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🥝</div>
                <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '17px' }}>KiwiHub</span>
              </div>
              <p style={{ fontFamily: fonts.body, fontSize: '12px', color: '#9ca3af', lineHeight: 1.7, marginBottom: '14px', maxWidth: '300px' }}>
                South Africa's fresh online store. Born in Harrismith, Free State. Quality tech and homewear delivered nationwide.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[{ icon: 'lock', label: 'PayFast' }, { icon: 'truck', label: 'Courier Guy' }].map(p => (
                  <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.07)', borderRadius: radius.sm, padding: '5px 10px' }}>
                    <Icon name={p.icon} size={12} color="#9ca3af" />
                    <span style={{ fontFamily: fonts.body, fontSize: '11px', color: '#9ca3af' }}>{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Link columns — 3 col mini grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
              {Object.entries(LINKS).map(([section, links]) => (
                <div key={section}>
                  <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '12px', color: '#fff', marginBottom: '10px' }}>{section}</div>
                  {links.map(link => (
                    <Link key={link.label} to={link.to} style={{ display: 'block', fontFamily: fonts.body, fontSize: '11px', color: '#9ca3af', marginBottom: '7px', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.color = colors.mint; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '32px', marginBottom: '40px' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <div style={{ width: '36px', height: '36px', background: `linear-gradient(135deg,${colors.bright},${colors.deep})`, borderRadius: radius.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🥝</div>
                <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '18px' }}>KiwiHub</span>
              </div>
              <p style={{ fontFamily: fonts.body, fontSize: '12px', color: '#9ca3af', lineHeight: 1.7, marginBottom: '16px', maxWidth: '240px' }}>
                South Africa's fresh online store. Born in Harrismith, Free State. Quality tech, accessories and homewear delivered nationwide.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[{ icon: 'lock', label: 'PayFast' }, { icon: 'truck', label: 'Courier Guy' }].map(p => (
                  <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'rgba(255,255,255,0.07)', borderRadius: radius.sm, padding: '5px 10px' }}>
                    <Icon name={p.icon} size={12} color="#9ca3af" />
                    <span style={{ fontFamily: fonts.body, fontSize: '11px', color: '#9ca3af' }}>{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Link columns */}
            {Object.entries(LINKS).map(([section, links]) => (
              <div key={section}>
                <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: '#fff', marginBottom: '12px' }}>{section}</div>
                {links.map(link => (
                  <Link key={link.label} to={link.to} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: fonts.body, fontSize: '12px', color: '#9ca3af', marginBottom: '8px', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = colors.mint; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#9ca3af'; }}
                  >
                    <Icon name="chevron-right" size={11} color="#4b5563" /> {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Payment methods */}
        <div style={{ borderTop: '1px solid #1f2937', paddingTop: '20px', marginBottom: '20px' }}>
          <div style={{ fontFamily: fonts.body, fontSize: '11px', color: '#6b7280', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>We Accept</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {PAYMENTS.map(p => (
              <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: radius.sm, padding: '7px 12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Icon name={p.icon} size={14} color="#9ca3af" />
                <span style={{ fontFamily: fonts.body, fontSize: '11px', color: '#9ca3af' }}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #1f2937', paddingTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ fontFamily: fonts.body, fontSize: '11px', color: '#6b7280' }}>
            © {new Date().getFullYear()} KiwiHub (Pty) Ltd · Harrismith, Free State · All rights reserved
          </span>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[{ label: 'Privacy Policy', to: '/privacy' }, { label: 'Terms & Conditions', to: '/terms' }].map(l => (
              <Link key={l.label} to={l.to} style={{ fontFamily: fonts.body, fontSize: '11px', color: '#6b7280', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = colors.mint; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#6b7280'; }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
