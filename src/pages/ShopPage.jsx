import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { colors, fonts, radius, shadow } from '../theme';
import Icon from '../components/ui/Icon';
import ProductCard from '../components/ui/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useWindowSize } from '../hooks/useWindowSize';

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeCat, setActiveCat] = useState('All');
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');
  const [priceMax, setPriceMax] = useState(14000);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { isMobile } = useWindowSize();

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

  const Sidebar = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '18px', boxShadow: shadow.card }}>
        <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.deep, marginBottom: '12px' }}>Categories</div>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCat(cat); if (isMobile) setFiltersOpen(false); }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: radius.sm, border: 'none', background: activeCat === cat ? colors.light : 'transparent', color: activeCat === cat ? colors.deep : colors.textSec, fontFamily: fonts.body, fontSize: '13px', fontWeight: activeCat === cat ? 700 : 500, cursor: 'pointer', marginBottom: '2px', textAlign: 'left' }}
          >
            {cat}
            <span style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.ghost }}>
              {cat === 'All' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length}
            </span>
          </button>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '18px', boxShadow: shadow.card }}>
        <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.deep, marginBottom: '12px' }}>Max Price</div>
        <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '16px', color: colors.deep, marginBottom: '8px' }}>R{priceMax.toLocaleString()}</div>
        <input
          type="range" min={100} max={14000} step={200} value={priceMax}
          onChange={e => setPriceMax(Number(e.target.value))}
          style={{ width: '100%', accentColor: colors.deep }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
          <span style={{ fontFamily: fonts.body, fontSize: '10px', color: colors.ghost }}>R100</span>
          <span style={{ fontFamily: fonts.body, fontSize: '10px', color: colors.ghost }}>R14,000</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '16px 16px' : '24px' }}>
      {/* Breadcrumb */}
      <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Link to="/" style={{ color: colors.mid, textDecoration: 'none' }}>Home</Link>
        <Icon name="chevron-right" size={12} color={colors.ghost} />
        <span style={{ color: colors.deep, fontWeight: 600 }}>Shop</span>
      </div>

      {/* Mobile: filter toggle + sort bar */}
      {isMobile && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <button
            onClick={() => setFiltersOpen(o => !o)}
            style={{ display: 'flex', alignItems: 'center', gap: '7px', background: filtersOpen ? colors.deep : 'white', color: filtersOpen ? '#fff' : colors.deep, border: `2px solid ${filtersOpen ? colors.deep : colors.border}`, borderRadius: radius.lg, padding: '10px 16px', fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', cursor: 'pointer', flex: 1 }}
          >
            <Icon name="sliders" size={15} color={filtersOpen ? '#fff' : colors.deep} />
            {filtersOpen ? 'Hide Filters' : 'Filters'}
            {activeCat !== 'All' && <span style={{ background: colors.bright, color: '#fff', borderRadius: '10px', padding: '1px 6px', fontSize: '10px' }}>1</span>}
          </button>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{ flex: 1, padding: '10px 12px', borderRadius: radius.sm, border: `2px solid ${colors.border}`, fontSize: '12px', background: 'white', color: colors.textSec, outline: 'none' }}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="rating">Best Rated</option>
          </select>
        </div>
      )}

      {/* Mobile: inline filter panel */}
      {isMobile && filtersOpen && (
        <div style={{ marginBottom: '16px' }}>
          <Sidebar />
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* Desktop sidebar */}
        {!isMobile && (
          <div style={{ width: '200px', flexShrink: 0 }}>
            <Sidebar />
          </div>
        )}

        {/* Main */}
        <div style={{ flex: 1 }}>
          {!isMobile && (
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
          )}

          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '18px', color: colors.deep, flex: 1 }}>
                {activeCat === 'All' ? 'All Products' : activeCat}
              </h1>
              <div style={{ position: 'relative' }}>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search…"
                  style={{ padding: '8px 32px 8px 12px', borderRadius: '20px', border: `2px solid ${colors.tint}`, background: '#f7fdf8', fontSize: '12px', color: colors.deep, outline: 'none', width: '130px' }}
                />
                <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                  <Icon name="search" size={13} color={colors.mid} />
                </span>
              </div>
            </div>
          )}

          <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted, marginBottom: '14px' }}>
            {sorted.length} product{sorted.length !== 1 ? 's' : ''} found
          </div>

          {sorted.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: isMobile ? '12px' : '14px' }}>
              {sorted.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 24px', background: 'white', borderRadius: '16px', boxShadow: shadow.card }}>
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
