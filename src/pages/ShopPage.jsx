import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { colors, fonts, radius, shadow } from '../theme';
import Icon from '../components/ui/Icon';
import ProductCard from '../components/ui/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState('All');
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');
  const [priceMax, setPriceMax] = useState(15000);

  useEffect(() => {
    const cat = searchParams.get('cat');
    const q = searchParams.get('q');
    if (cat) setActiveCat(cat);
    if (q) setSearch(q);
  }, [searchParams]);

  const filtered = PRODUCTS
    .filter(p => activeCat === 'All' || p.category === activeCat)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    .filter(p => p.price <= priceMax);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Breadcrumb */}
      <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Link to="/" style={{ color: colors.mid, textDecoration: 'none' }}>Home</Link>
        <Icon name="chevron-right" size={12} color={colors.ghost} />
        <span style={{ color: colors.deep, fontWeight: 600 }}>Shop</span>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* Sidebar */}
        <div style={{ width: '200px', flexShrink: 0 }}>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '18px', boxShadow: shadow.card, marginBottom: '12px' }}>
            <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.deep, marginBottom: '12px' }}>Categories</div>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: radius.sm, border: 'none', background: activeCat === cat ? colors.light : 'transparent', color: activeCat === cat ? colors.deep : colors.textSec, fontFamily: fonts.body, fontSize: '12px', fontWeight: activeCat === cat ? 700 : 500, cursor: 'pointer', marginBottom: '2px', textAlign: 'left' }}
              >
                {cat}
                <span style={{ fontFamily: fonts.body, fontSize: '10px', color: colors.ghost }}>
                  {cat === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '18px', boxShadow: shadow.card }}>
            <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.deep, marginBottom: '12px' }}>Max Price</div>
            <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '16px', color: colors.deep, marginBottom: '8px' }}>R{priceMax.toLocaleString()}</div>
            <input
              type="range" min={200} max={15000} step={500} value={priceMax}
              onChange={e => setPriceMax(Number(e.target.value))}
              style={{ width: '100%', accentColor: colors.deep }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontFamily: fonts.body, fontSize: '10px', color: colors.ghost }}>R200</span>
              <span style={{ fontFamily: fonts.body, fontSize: '10px', color: colors.ghost }}>R15,000</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '24px', color: colors.deep }}>
              {activeCat === 'All' ? 'All Products' : activeCat}
            </h1>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search…"
                  style={{ padding: '8px 36px 8px 12px', borderRadius: '20px', border: `2px solid ${colors.tint}`, background: '#f7fdf8', fontSize: '12px', color: colors.deep, outline: 'none', width: '160px' }}
                />
                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                  <Icon name="search" size={14} color={colors.mid} />
                </span>
              </div>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: radius.sm, border: `2px solid ${colors.border}`, fontSize: '12px', background: 'white', color: colors.textSec, outline: 'none' }}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>
          </div>
          <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted, marginBottom: '14px' }}>
            {sorted.length} product{sorted.length !== 1 ? 's' : ''} found
          </div>
          {sorted.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px' }}>
              {sorted.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '64px 24px', background: 'white', borderRadius: '16px', boxShadow: shadow.card }}>
              <Icon name="search" size={40} color={colors.border} />
              <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '18px', color: colors.deep, marginTop: '12px', marginBottom: '6px' }}>No products found</div>
              <div style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.muted }}>Try adjusting filters or search terms</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
