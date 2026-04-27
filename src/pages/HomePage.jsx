import { useNavigate } from 'react-router-dom';
import { colors, fonts, radius, shadow } from '../theme';
import Icon from '../components/ui/Icon';
import ProductCard from '../components/ui/ProductCard';
import { PRODUCTS } from '../data/products';

const CATS = [
  { label: 'Laptops',           icon: '💻', cat: 'Laptops' },
  { label: 'PC Accessories',    icon: '🖥️', cat: 'PC Accessories' },
  { label: 'Phone Accessories', icon: '📱', cat: 'Phone Accessories' },
  { label: 'Homewear',          icon: '🏠', cat: 'Homewear' },
];

const TRUST = [
  { icon: 'truck',      title: 'Free Delivery',    desc: 'Orders over R750 nationwide' },
  { icon: 'lock',       title: 'Secure Payment',   desc: 'PayFast — Cards, EFT, SnapScan' },
  { icon: 'rotate-ccw', title: '30-Day Returns',   desc: 'Hassle-free policy' },
  { icon: 'shield',     title: '1-Year Warranty',  desc: 'On all electronics' },
  { icon: 'phone',      title: 'SA-Based Support', desc: 'Mon–Fri 8am–5pm' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const featured = PRODUCTS.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${colors.deep}, ${colors.mid})`,
        color: '#fff',
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -40, width: 200, height: 200, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <div style={{ position: 'relative', maxWidth: '680px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.12)', borderRadius: '20px',
            padding: '6px 16px', fontSize: '12px', fontFamily: fonts.body,
            fontWeight: 600, color: colors.mint, marginBottom: '20px', letterSpacing: '0.5px',
          }}>
            <span style={{ width: '7px', height: '7px', background: colors.bright, borderRadius: '50%', display: 'inline-block' }} />
            South Africa's Fresh Online Store
          </div>
          <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '52px', lineHeight: 1.05, marginBottom: '18px', letterSpacing: '-1px' }}>
            Premium Tech &amp;<br />Home Essentials
          </h1>
          <p style={{ fontFamily: fonts.body, fontSize: '16px', opacity: 0.85, lineHeight: 1.7, marginBottom: '32px' }}>
            Delivered to every corner of South Africa via The Courier Guy.<br />Secure checkout with PayFast.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/shop')}
              style={{ background: '#fff', color: colors.deep, border: 'none', borderRadius: '30px', padding: '14px 32px', fontFamily: fonts.heading, fontWeight: 800, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Icon name="store" size={16} color={colors.deep} /> Shop Now
            </button>
            <button
              onClick={() => navigate('/about')}
              style={{ background: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.45)', borderRadius: '30px', padding: '14px 28px', fontFamily: fonts.heading, fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}
            >
              Our Story
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '28px', flexWrap: 'wrap' }}>
            {['Free delivery over R750', 'PayFast secured', '30-day returns'].map(t => (
              <span key={t} style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.mint, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Icon name="check" size={12} color={colors.mint} /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '44px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '22px', color: colors.deep }}>Shop by Category</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
          {CATS.map(cat => (
            <button
              key={cat.label}
              onClick={() => navigate(`/shop?cat=${encodeURIComponent(cat.cat)}`)}
              style={{ background: '#fff', border: `2px solid ${colors.border}`, borderRadius: '16px', padding: '28px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: shadow.card, textAlign: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = colors.deep; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = shadow.card; }}
            >
              <span style={{ fontSize: '36px' }}>{cat.icon}</span>
              <span style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.deep }}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '22px', color: colors.deep }}>Featured Products</h2>
          <button
            onClick={() => navigate('/shop')}
            style={{ background: 'none', border: 'none', color: colors.mid, fontFamily: fonts.body, fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            View all <Icon name="arrow-right" size={14} color={colors.mid} />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>

      {/* Gold promo banner */}
      <div style={{ maxWidth: '1200px', margin: '32px auto 0', padding: '0 24px' }}>
        <div style={{ background: `linear-gradient(135deg, ${colors.gold}, #e0a820)`, borderRadius: '18px', padding: '28px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '20px', color: '#fff', marginBottom: '4px' }}>🏷️ Coupon Code: KIWI10</div>
            <div style={{ fontFamily: fonts.body, fontSize: '13px', color: 'rgba(255,255,255,0.85)' }}>Get 10% off your first order. No minimum spend.</div>
          </div>
          <button
            onClick={() => navigate('/shop')}
            style={{ background: '#fff', color: colors.gold, border: 'none', borderRadius: radius.lg, padding: '12px 24px', fontFamily: fonts.heading, fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}
          >
            Shop Now →
          </button>
        </div>
      </div>

      {/* Trust strip */}
      <div style={{ background: '#fff', borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}`, marginTop: '40px', padding: '24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
          {TRUST.map(b => (
            <div key={b.title} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', background: colors.light, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={b.icon} size={18} color={colors.deep} />
              </div>
              <div>
                <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.deep }}>{b.title}</div>
                <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.muted }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
