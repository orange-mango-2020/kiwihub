// KiwiHub — ProductCard Component

function KHProductCard({ product, onAddToCart, onNavigate }) {
  const [hovered, setHovered] = React.useState(false);
  const [added, setAdded] = React.useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onClick={() => onNavigate('product', product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.10)' : '0 2px 8px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
    >
      {/* Image well */}
      <div style={{ background: 'linear-gradient(135deg,#f0faf2,#e8f5e9)', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '54px', position: 'relative' }}>
        {product.image}
        {product.badge && (
          <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#ef4444', color: '#fff', borderRadius: '6px', padding: '3px 8px', fontSize: '10px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{product.badge}</div>
        )}
        {discount && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#ef4444', color: '#fff', borderRadius: '6px', padding: '3px 8px', fontSize: '10px', fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>-{discount}%</div>
        )}
      </div>
      {/* Info */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: '9px', color: '#40916c', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
          {product.brand} · {product.category}
        </div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '13px', color: '#1a1a1a', marginBottom: '6px', lineHeight: 1.3 }}>{product.name}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '3px' }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '16px', color: '#1a4a2e' }}>R{product.price.toLocaleString()}</span>
          {product.originalPrice && <span style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'line-through', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>R{product.originalPrice.toLocaleString()}</span>}
        </div>
        {product.rating && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: '10px', color: i <= Math.floor(product.rating) ? '#f59e0b' : '#d1d5db' }}>★</span>)}
            <span style={{ fontSize: '10px', color: '#6b7280', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>({product.reviews})</span>
          </div>
        )}
        <button
          onClick={handleAdd}
          style={{ width: '100%', background: added ? '#059669' : '#f0faf2', color: added ? '#fff' : '#1a4a2e', border: `2px solid ${added ? '#059669' : '#c8f5d8'}`, borderRadius: '8px', padding: '8px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Syne', sans-serif", transition: 'all 0.2s' }}>
          {added ? '✓ Added!' : '+ Add to Cart'}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { KHProductCard });
