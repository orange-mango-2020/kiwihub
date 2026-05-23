import { useNavigate } from 'react-router-dom';
import { colors, fonts, radius, shadow } from '../theme';
import Icon from '../components/ui/Icon';
import ProductCard from '../components/ui/ProductCard';
import { PRODUCTS } from '../data/products';

const CATS = [
  { label: 'Laptops',           emoji: '💻', bg: 'linear-gradient(135deg,#1a4a2e,#2e8b57)', cat: 'Laptops' },
  { label: 'PC Accessories',    emoji: '⌨️', bg: 'linear-gradient(135deg,#1a2a4a,#2e578b)', cat: 'PC Accessories' },
  { label: 'Phone Accessories', emoji: '📱', bg: 'linear-gradient(135deg,#2a1a4a,#6b2e8b)', cat: 'Phone Accessories' },
  { label: 'Homewear',          emoji: '🛋️', bg: 'linear-gradient(135deg,#4a3a1a,#8b6e2e)', cat: 'Homewear' },
];

const TRUST = [
  { icon: 'truck',      title: 'Free Delivery over R750',  desc: 'Nationwide via The Courier Guy' },
  { icon: 'shield',     title: 'Secure PayFast Payments',  desc: 'Cards, EFT, SnapScan & more' },
  { icon: 'rotate-ccw', title: 'Easy Returns',             desc: '30-day hassle-free policy' },
  { icon: 'lock',       title: '1 Year Warranty',          desc: 'On all electronics' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const featured = PRODUCTS.slice(0, 6);

  return (
    <div>
      {/* Hero — split layout */}
      <div style={{ background: colors.deep, color: '#fff', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', minHeight: '420px' }}>
          {/* Left: text */}
          <div style={{ padding: '64px 40px 64px 0' }}>
            <div style={{ fontFamily: fonts.body, fontSize: '13px', fontWeight: 600, color: colors.mint, marginBottom: '16px', letterSpacing: '0.5px' }}>
              South Africa's freshest online store
            </div>
            <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '48px', lineHeight: 1.08, marginBottom: '16px', letterSpacing: '-1px' }}>
              Premium Tech &amp;<br />Home Essentials
            </h1>
            <p style={{ fontFamily: fonts.body, fontSize: '15px', opacity: 0.8, lineHeight: 1.7, marginBottom: '32px', maxWidth: '420px' }}>
              Quality products, shipped nationwide via The Courier Guy.
            </p>
            <button
              onClick={() => navigate('/shop')}
              style={{ background: colors.bright, color: '#fff', border: 'none', borderRadius: radius.lg, padding: '13px 32px', fontFamily: fonts.heading, fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#45a049'; }}
              onMouseLeave={e => { e.currentTarget.style.background = colors.bright; }}
            >
              Shop Now
            </button>
          </div>
          {/* Right: image placeholder */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '20px', width: '100%', maxWidth: '440px', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px' }}>
              💻
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '52px 24px 0' }}>
        <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '24px', color: colors.deep, textAlign: 'center', marginBottom: '28px' }}>
          Shop by Category
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
          {CATS.map(cat => (
            <button
              key={cat.label}
              onClick={() => navigate(`/shop?cat=${encodeURIComponent(cat.cat)}`)}
              style={{ background: '#fff', border: `1.5px solid ${colors.border}`, borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s', boxShadow: shadow.card, textAlign: 'center', padding: 0 }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)'; e.currentTarget.style.borderColor = colors.deep; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = shadow.card; e.currentTarget.style.borderColor = colors.border; }}
            >
              <div style={{ background: cat.bg, height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                {cat.emoji}
              </div>
              <div style={{ padding: '12px', fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.deep }}>
                {cat.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products — 3 columns, 6 items */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '52px 24px 0' }}>
        <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '24px', color: colors.deep, textAlign: 'center', marginBottom: '28px' }}>
          Featured Products
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>

      {/* Gold promo banner — centered with dashed code box */}
      <div style={{ background: `linear-gradient(135deg, ${colors.gold}, #c8820a)`, marginTop: '52px', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '26px', color: '#fff', marginBottom: '8px' }}>
          Get 10% Off Your First Order!
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: '14px', color: 'rgba(255,255,255,0.85)', marginBottom: '20px' }}>
          Use code at checkout for an instant discount on everything in store.
        </div>
        <div style={{ display: 'inline-block', border: '2.5px dashed rgba(255,255,255,0.7)', borderRadius: radius.lg, padding: '10px 32px' }}>
          <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '22px', color: '#fff', letterSpacing: '3px' }}>
            KIWI10
          </span>
        </div>
      </div>

      {/* Trust strip — cream bg, centered icons */}
      <div style={{ background: colors.bg, borderTop: `1px solid ${colors.border}`, padding: '36px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '24px' }}>
          {TRUST.map(b => (
            <div key={b.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center', flex: '1 1 140px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: `2px solid ${colors.mid}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={b.icon} size={22} color={colors.mid} />
              </div>
              <div>
                <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.deep }}>{b.title}</div>
                <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.muted, marginTop: '2px' }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
