import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { colors, fonts, radius, shadow, transition } from '../../theme';
import Icon from './Icon';
import Stars from './Stars';
import Badge from './Badge';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: colors.card,
        borderRadius: radius.xl,
        overflow: 'hidden',
        boxShadow: hovered ? shadow.cardHover : shadow.card,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: `all ${transition.base}`,
      }}
    >
      {/* Image well */}
      <div style={{
        background: '#f8f9fa',
        height: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {product.image?.startsWith('http') ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }}
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          product.image
        )}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px' }}>
          {product.badge && <Badge variant="hot">{product.badge}</Badge>}
        </div>
        {discount && (
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <Badge variant="discount">-{discount}%</Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{
          fontFamily: fonts.body,
          fontSize: '9px',
          fontWeight: 600,
          color: colors.mid,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '3px',
        }}>
          {product.brand} · {product.category}
        </div>

        <div style={{
          fontFamily: fonts.heading,
          fontWeight: 700,
          fontSize: '13px',
          color: colors.text,
          marginBottom: '6px',
          lineHeight: 1.3,
        }}>
          {product.name}
        </div>

        {product.rating && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
            <Stars rating={product.rating} size={10} />
            <span style={{ fontFamily: fonts.body, fontSize: '10px', color: colors.muted }}>
              ({product.reviews})
            </span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
          <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '16px', color: colors.deep }}>
            R{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.ghost, textDecoration: 'line-through' }}>
              R{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          style={{
            width: '100%',
            background: added ? colors.success : colors.deep,
            color: '#fff',
            border: 'none',
            borderRadius: radius.sm,
            padding: '8px',
            fontFamily: fonts.heading,
            fontWeight: 700,
            fontSize: '11px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            transition: `all ${transition.base}`,
          }}
        >
          <Icon name={added ? 'check' : 'plus'} size={12} color="#fff" />
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
}
