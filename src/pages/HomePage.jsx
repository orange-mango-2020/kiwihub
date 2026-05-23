import { useNavigate } from 'react-router-dom';
import { colors, fonts, radius, shadow } from '../theme';
import Icon from '../components/ui/Icon';
import ProductCard from '../components/ui/ProductCard';
import { PRODUCTS } from '../data/products';
import { useWindowSize } from '../hooks/useWindowSize';

const CATS = [
  { label: 'Laptops',        emoji: '💻', bg: 'linear-gradient(135deg,#1a4a2e,#2e8b57)', cat: 'Laptops' },
  { label: 'Desktops',       emoji: '🖥️', bg: 'linear-gradient(135deg,#1a2a4a,#2e578b)', cat: 'Desktops' },
  { label: 'Gaming PCs',     emoji: '🎮', bg: 'linear-gradient(135deg,#3a0a3a,#8b2e8b)', cat: 'Gaming PCs' },
  { label: 'PC Accessories', emoji: '⌨️', bg: 'linear-gradient(135deg,#2a2a1a,#8b7e2e)', cat: 'PC Accessories' },
];

const TRUST = [
  { icon: 'truck',      title: 'Free Delivery over R750',  desc: 'Nationwide via The Courier Guy' },
  { icon: 'shield',     title: 'Secure PayFast Payments',  desc: 'Cards, EFT, SnapScan & more' },
  { icon: 'rotate-ccw', title: 'Easy Returns',             desc: '30-day hassle-free policy' },
  { icon: 'lock',       title: '1 Year Warranty',          desc: 'On all electronics' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { isMobile } = useWindowSize();
  const featured = PRODUCTS.slice(0, isMobile ? 4 : 6);

  return (
    <div>
      {/* Hero */}
      <div style={{ background: colors.deep, color: '#fff', overflow: 'hidden' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '48px 20px' : '0 24px',
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          alignItems: 'center', minHeight: isMobile ? 'auto' : '420px',
        }}>
          {/* Text */}
          <div style={{ padding: isMobile ? '0' : '64px 40px 64px 0' }}>
            <div style={{ fontFamily: fonts.body, fontSize: '12px', fontWeight: 600, color: colors.mint, marginBottom: '14px', letterSpacing: '0.5px' }}>
              South Africa's freshest online store
            </div>
            <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: isMobile ? '34px' : '48px', lineHeight: 1.08, marginBottom: '14px', letterSpacing: '-0.5px' }}>
              Premium Tech &amp;<br />Home Essentials
            </h1>
            <p style={{ fontFamily: fonts.body, fontSize: '14px', opacity: 0.8, lineHeight: 1.7, marginBottom: '28px', maxWidth: '420px' }}>
              Quality products, shipped nationwide via The Courier Guy.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/shop')}
                style={{ background: colors.bright, color: '#fff', border: 'none', borderRadius: radius.lg, padding: '13px 28px', fontFamily: fonts.heading, fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#45a049'; }}
                onMouseLeave={e => { e.currentTarget.style.background = colors.bright; }}
              >
                Shop Now
              </button>
              {isMobile && (
                <button
                  onClick={() => navigate('/shop?cat=Laptops')}
                  style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: radius.lg, padding: '13px 20px', fontFamily: fonts.heading, fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}
                >
                  Laptops
                </button>
              )}
            </div>
          </div>
          {/* Right image — desktop only */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0' }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '20px', width: '100%', maxWidth: '440px', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px' }}>
                💻
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Shop by Category */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '36px 16px 0' : '52px 24px 0' }}>
        <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: isMobile ? '20px' : '24px', color: colors.deep, textAlign: 'center', marginBottom: '20px' }}>
          Shop by Category
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: isMobile ? '12px' : '16px' }}>
          {CATS.map(cat => (
            <button
              key={cat.label}
              onClick={() => navigate(`/shop?cat=${encodeURIComponent(cat.cat)}`)}
              style={{ background: '#fff', border: `1.5px solid ${colors.border}`, borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s', boxShadow: shadow.card, textAlign: 'center', padding: 0 }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)'; e.currentTarget.style.borderColor = colors.deep; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = shadow.card; e.currentTarget.style.borderColor = colors.border; }}
            >
              <div style={{ background: cat.bg, height: isMobile ? '90px' : '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? '36px' : '48px' }}>
                {cat.emoji}
              </div>
              <div style={{ padding: isMobile ? '10px 8px' : '12px', fontFamily: fonts.heading, fontWeight: 700, fontSize: isMobile ? '12px' : '13px', color: colors.deep }}>
                {cat.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '36px 16px 0' : '52px 24px 0' }}>
        <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: isMobile ? '20px' : '24px', color: colors.deep, textAlign: 'center', marginBottom: '20px' }}>
          Featured Products
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: isMobile ? '12px' : '20px' }}>
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        {isMobile && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={() => navigate('/shop')} style={{ background: 'white', color: colors.deep, border: `2px solid ${colors.deep}`, borderRadius: radius.lg, padding: '11px 28px', fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
              View All Products
            </button>
          </div>
        )}
      </div>

      {/* Gold promo banner */}
      <div style={{ background: `linear-gradient(135deg, ${colors.gold}, #c8820a)`, marginTop: isMobile ? '36px' : '52px', padding: isMobile ? '36px 20px' : '48px 24px', textAlign: 'center' }}>
        <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: isMobile ? '20px' : '26px', color: '#fff', marginBottom: '8px' }}>
          Get 10% Off Your First Order!
        </div>
        <div style={{ fontFamily: fonts.body, fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginBottom: '18px' }}>
          Use code at checkout for an instant discount on everything in store.
        </div>
        <div style={{ display: 'inline-block', border: '2.5px dashed rgba(255,255,255,0.7)', borderRadius: radius.lg, padding: '10px 32px' }}>
          <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: isMobile ? '20px' : '22px', color: '#fff', letterSpacing: '3px' }}>
            KIWI10
          </span>
        </div>
      </div>

      {/* Trust strip */}
      <div style={{ background: colors.bg, borderTop: `1px solid ${colors.border}`, padding: isMobile ? '28px 16px' : '36px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: isMobile ? '20px' : '24px' }}>
          {TRUST.map(b => (
            <div key={b.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: `2px solid ${colors.mid}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={b.icon} size={20} color={colors.mid} />
              </div>
              <div>
                <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: isMobile ? '11px' : '13px', color: colors.deep }}>{b.title}</div>
                <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.muted, marginTop: '2px' }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
