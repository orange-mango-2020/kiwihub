import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { colors, fonts, radius, shadow } from '../../theme';
import Icon from '../ui/Icon';
import { useWindowSize } from '../../hooks/useWindowSize';

const NAV_LINKS = [
  { label: 'Home',    to: '/' },
  { label: 'Shop',    to: '/shop' },
  { label: 'About',   to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const MOBILE_LINKS = [
  { label: 'Home',        to: '/' },
  { label: 'Shop',        to: '/shop' },
  { label: 'About',       to: '/about' },
  { label: 'Contact',     to: '/contact' },
  { label: 'My Account',  to: '/account' },
  { label: 'FAQs',        to: '/faqs' },
  { label: 'Track Order', to: '/tracking' },
  { label: 'Returns',     to: '/returns' },
];

export default function Navbar() {
  const { count } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile } = useWindowSize();

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/shop?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setMenuOpen(false);
    }
  };

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav style={{ background: '#fff', boxShadow: shadow.navbar, position: 'sticky', top: 0, zIndex: 200 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '12px', height: '64px' }}>

          {/* Logo */}
          <Link to="/" onClick={close} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ width: '36px', height: '36px', background: `linear-gradient(135deg, ${colors.bright}, ${colors.deep})`, borderRadius: radius.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
              🥝
            </div>
            <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '18px', color: colors.deep }}>KiwiHub</span>
          </Link>

          {/* Desktop search */}
          {!isMobile && (
            <div style={{ flex: 1, position: 'relative', maxWidth: '480px' }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search laptops, accessories, homewear…"
                style={{ width: '100%', padding: '9px 40px 9px 16px', borderRadius: '24px', border: `2px solid ${colors.tint}`, background: '#f7fdf8', fontSize: '13px', fontFamily: fonts.body, color: colors.deep, outline: 'none', boxSizing: 'border-box' }}
              />
              <span style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                <Icon name="search" size={16} color={colors.mid} />
              </span>
            </div>
          )}

          {/* Flex spacer on mobile */}
          {isMobile && <div style={{ flex: 1 }} />}

          {/* Desktop nav */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              {NAV_LINKS.map(link => {
                const active = pathname === link.to;
                return (
                  <Link key={link.to} to={link.to} style={{ fontFamily: fonts.body, fontSize: '13px', fontWeight: active ? 700 : 500, color: active ? colors.deep : colors.textSec, textDecoration: 'none', padding: '7px 12px', borderRadius: radius.md, background: active ? colors.light : 'transparent', transition: 'all 0.15s' }}>
                    {link.label}
                  </Link>
                );
              })}
              <Link to="/account" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: fonts.body, fontSize: '13px', fontWeight: pathname === '/account' ? 700 : 500, color: pathname === '/account' ? colors.deep : colors.textSec, textDecoration: 'none', padding: '7px 12px', borderRadius: radius.md, background: pathname === '/account' ? colors.light : 'transparent' }}>
                <Icon name="user" size={15} color={pathname === '/account' ? colors.deep : colors.textSec} />
                Account
              </Link>
              <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: fonts.body, fontSize: '13px', fontWeight: 600, color: '#fff', textDecoration: 'none', background: colors.deep, borderRadius: '24px', padding: '9px 16px', marginLeft: '4px', transition: 'background 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = colors.hover; }}
                onMouseLeave={e => { e.currentTarget.style.background = colors.deep; }}
              >
                <Icon name="cart" size={15} color="#fff" />
                Cart
                {count > 0 && <span style={{ background: colors.bright, borderRadius: '10px', padding: '1px 7px', fontSize: '11px', fontWeight: 700 }}>{count}</span>}
              </Link>
            </div>
          )}

          {/* Mobile: cart + hamburger */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff', textDecoration: 'none', background: colors.deep, borderRadius: '20px', padding: '8px 13px' }}>
                <Icon name="cart" size={16} color="#fff" />
                {count > 0 && <span style={{ background: colors.bright, borderRadius: '10px', padding: '1px 6px', fontSize: '11px', fontWeight: 700, fontFamily: fonts.body }}>{count}</span>}
              </Link>
              <button onClick={() => setMenuOpen(o => !o)} style={{ background: menuOpen ? colors.light : 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: radius.md, transition: 'background 0.15s' }}>
                <Icon name={menuOpen ? 'x' : 'menu'} size={22} color={colors.deep} />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile drawer */}
      {isMobile && menuOpen && (
        <>
          <div onClick={close} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 198 }} />
          <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, background: '#fff', zIndex: 199, padding: '16px 16px 24px', boxShadow: '0 12px 40px rgba(0,0,0,0.18)', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
            {/* Search */}
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search products…"
                style={{ width: '100%', padding: '12px 44px 12px 16px', borderRadius: '24px', border: `2px solid ${colors.tint}`, background: '#f7fdf8', fontSize: '14px', fontFamily: fonts.body, color: colors.deep, outline: 'none', boxSizing: 'border-box' }}
              />
              <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                <Icon name="search" size={17} color={colors.mid} />
              </span>
            </div>
            {/* Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {MOBILE_LINKS.map(link => {
                const active = pathname === link.to;
                return (
                  <Link key={link.to} to={link.to} onClick={close} style={{ display: 'flex', alignItems: 'center', fontFamily: fonts.body, fontSize: '15px', fontWeight: active ? 700 : 500, color: active ? colors.deep : colors.textSec, textDecoration: 'none', padding: '13px 14px', borderRadius: radius.md, background: active ? colors.light : 'transparent', borderLeft: active ? `3px solid ${colors.bright}` : '3px solid transparent' }}>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
