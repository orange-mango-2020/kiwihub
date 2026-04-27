import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { colors, fonts, radius, shadow } from '../theme';
import Icon from '../components/ui/Icon';
import Stars from '../components/ui/Stars';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/ui/ProductCard';
import { getProductById, getRelated } from '../data/products';

const REVIEWS = [
  { name: 'Sipho M.',   rating: 5, date: '12 Mar 2026', verified: true,  comment: 'Excellent! Arrived in 2 days via Courier Guy. Very fast, great screen. Highly recommend KiwiHub.' },
  { name: 'Fatima A.',  rating: 4, date: '28 Feb 2026', verified: true,  comment: 'Really happy with this purchase. Battery lasts all day. Only wish it had a backlit keyboard.' },
  { name: 'Lungelo D.', rating: 5, date: '15 Feb 2026', verified: true,  comment: 'Best price in South Africa. Packaging was perfect. Will definitely order again.' },
  { name: 'Priya N.',   rating: 4, date: '3 Feb 2026',  verified: false, comment: 'Good performance for the price. Delivery took 3 days to KZN.' },
];

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = getProductById(id);

  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '24px', color: colors.deep, marginBottom: '12px' }}>Product not found</div>
        <button onClick={() => navigate('/shop')} style={{ background: colors.deep, color: '#fff', border: 'none', borderRadius: radius.pill, padding: '12px 28px', fontFamily: fonts.heading, fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
          Back to Shop
        </button>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const related = getRelated(product);
  const colors_ = product.colors || [];

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 24px 48px' }}>
      {/* Breadcrumb */}
      <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: colors.mid, textDecoration: 'none' }}>Home</Link>
        <Icon name="chevron-right" size={12} color={colors.ghost} />
        <Link to="/shop" style={{ color: colors.mid, textDecoration: 'none' }}>Shop</Link>
        <Icon name="chevron-right" size={12} color={colors.ghost} />
        <Link to={`/shop?cat=${encodeURIComponent(product.category)}`} style={{ color: colors.mid, textDecoration: 'none' }}>{product.category}</Link>
        <Icon name="chevron-right" size={12} color={colors.ghost} />
        <span style={{ color: colors.deep, fontWeight: 600 }}>{product.name}</span>
      </div>

      <div style={{ display: 'flex', gap: '32px', marginBottom: '36px' }}>
        {/* Image */}
        <div style={{ flex: 1 }}>
          <div style={{ background: `linear-gradient(135deg, ${colors.light}, ${colors.tint})`, borderRadius: '20px', height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '140px', position: 'relative' }}>
            {product.badge && (
              <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                <Badge variant="hot">{product.badge}</Badge>
              </div>
            )}
            <button
              onClick={() => setWishlisted(w => !w)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'white', border: 'none', borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
            >
              <Icon name={wishlisted ? 'heart-filled' : 'heart'} size={20} color={wishlisted ? '#ef4444' : colors.ghost} />
            </button>
            <button style={{ position: 'absolute', top: '66px', right: '16px', background: 'white', border: 'none', borderRadius: '50%', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <Icon name="share" size={18} color={colors.ghost} />
            </button>
            {product.image}
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: colors.mid, fontFamily: fonts.body, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
              {product.brand} · {product.category}
            </div>
            <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '28px', color: colors.text, lineHeight: 1.2 }}>{product.name}</h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <Stars rating={product.rating} size={14} />
            <span style={{ fontFamily: fonts.body, fontSize: '12px', fontWeight: 600, color: colors.deep }}>{product.rating}</span>
            <span style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted }}>({product.reviews} reviews)</span>
            <span style={{ fontFamily: fonts.body, fontSize: '12px', fontWeight: 600, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Icon name="check" size={12} color="#16a34a" /> In Stock
            </span>
          </div>

          {/* Price */}
          <div style={{ background: colors.light, borderRadius: radius.xl, padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '34px', color: colors.deep }}>R{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span style={{ fontFamily: fonts.body, fontSize: '16px', color: colors.ghost, textDecoration: 'line-through' }}>R{product.originalPrice.toLocaleString()}</span>
              )}
              {discount && <Badge variant="discount">-{discount}%</Badge>}
            </div>
            {savings > 0 && (
              <div style={{ fontFamily: fonts.body, fontSize: '13px', color: '#16a34a', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon name="tag" size={13} color="#16a34a" /> You save R{savings.toLocaleString()}!
              </div>
            )}
          </div>

          {/* Colours */}
          {colors_.length > 0 && (
            <div>
              <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.deep, marginBottom: '8px' }}>
                Colour: <span style={{ fontWeight: 400, color: colors.textSec }}>{colors_[selectedColor]}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {colors_.map((col, i) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(i)}
                    style={{ background: 'white', border: selectedColor === i ? `2.5px solid ${colors.deep}` : `2px solid ${colors.border}`, borderRadius: '20px', padding: '6px 14px', fontSize: '12px', fontFamily: fonts.body, fontWeight: 600, cursor: 'pointer', color: selectedColor === i ? colors.deep : colors.textSec, transition: 'all 0.15s' }}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty */}
          <div>
            <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.deep, marginBottom: '8px' }}>Quantity</div>
            <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: radius.md, border: `2px solid ${colors.border}`, width: 'fit-content' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="minus" size={16} color={colors.textSec} />
              </button>
              <span style={{ padding: '0 16px', fontFamily: fonts.heading, fontWeight: 700, fontSize: '15px', color: colors.deep, minWidth: '40px', textAlign: 'center' }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)} style={{ background: 'none', border: 'none', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="plus" size={16} color={colors.textSec} />
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleAdd}
              style={{ flex: 1, background: added ? '#16a34a' : colors.deep, color: 'white', border: 'none', borderRadius: radius.lg, padding: '14px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: fonts.heading, transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Icon name="cart" size={16} color="#fff" /> {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button
              onClick={() => { addItem(product, qty); navigate('/cart'); }}
              style={{ flex: 1, background: 'white', color: colors.deep, border: `2.5px solid ${colors.deep}`, borderRadius: radius.lg, padding: '14px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: fonts.heading }}
            >
              ⚡ Buy Now
            </button>
          </div>

          {/* Delivery info */}
          <div style={{ background: 'white', borderRadius: radius.xl, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: shadow.card }}>
            {[
              { icon: 'truck',      t: 'Free Delivery',  d: 'Orders over R750 via The Courier Guy' },
              { icon: 'lock',       t: 'Secure Payment', d: 'PayFast — Cards, EFT, SnapScan & more' },
              { icon: 'rotate-ccw', t: '30-Day Returns', d: 'Hassle-free return policy' },
              { icon: 'shield',     t: 'Warranty',       d: '1 Year manufacturer warranty' },
            ].map(item => (
              <div key={item.t} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', background: colors.light, borderRadius: radius.sm, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={item.icon} size={16} color={colors.deep} />
                </div>
                <div>
                  <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '12px', color: colors.deep }}>{item.t}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.muted }}>{item.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: 'white', borderRadius: '18px', padding: '28px 32px', marginBottom: '28px', boxShadow: shadow.card }}>
        <div style={{ display: 'flex', borderBottom: '2px solid #f0f0f0', marginBottom: '24px' }}>
          {['description', 'specs', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ background: 'none', border: 'none', padding: '12px 24px', fontSize: '13px', fontWeight: 700, fontFamily: fonts.heading, cursor: 'pointer', color: activeTab === tab ? colors.deep : colors.muted, borderBottom: activeTab === tab ? `2.5px solid ${colors.deep}` : '2.5px solid transparent', marginBottom: '-2px', transition: 'color 0.15s', textTransform: 'capitalize' }}
            >
              {tab === 'reviews' ? `Reviews (${product.reviews})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div>
            <p style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.textSec, lineHeight: 1.7, marginBottom: '20px' }}>
              {product.description} Built for South Africans who need reliable performance at a great price — delivered fast via The Courier Guy with a full 1-year warranty.
            </p>
            {product.highlights && (
              <>
                <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '14px', color: colors.deep, marginBottom: '12px' }}>Key Highlights</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {product.highlights.map(h => (
                    <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: colors.light, borderRadius: radius.md }}>
                      <Icon name="check" size={14} color="#16a34a" />
                      <span style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.deep, fontWeight: 500 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'specs' && product.specs && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
            {product.specs.map((s, i) => (
              <div key={s.label} style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid #f7f5f0', gap: '16px' }}>
                <div style={{ fontFamily: fonts.body, fontSize: '13px', fontWeight: 600, color: colors.muted, minWidth: '110px' }}>{s.label}</div>
                <div style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.text, fontWeight: 500 }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ padding: '16px', background: '#fafafa', borderRadius: '14px', border: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <span style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.text }}>{r.name}</span>
                      {r.verified && (
                        <span style={{ background: colors.successBg, color: colors.success, borderRadius: radius.xs, padding: '1px 7px', fontSize: '9px', fontWeight: 700, fontFamily: fonts.body }}>✓ Verified</span>
                      )}
                    </div>
                    <Stars rating={r.rating} size={11} />
                  </div>
                  <span style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.ghost }}>{r.date}</span>
                </div>
                <p style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.textSec, lineHeight: 1.6 }}>{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '20px', color: colors.deep, marginBottom: '14px' }}>You Might Also Like</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' }}>
            {related.map(rp => <ProductCard key={rp.id} product={rp} />)}
          </div>
        </div>
      )}
    </div>
  );
}
