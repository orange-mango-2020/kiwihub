// src/components/layout/Navbar.jsx

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { colors, fonts, radius, shadow } from '../../theme';
import Icon from '../ui/Icon';

const NAV_LINKS = [
  { label: 'Home',    to: '/' },
  { label: 'Shop',    to: '/shop' },
  { label: 'About',   to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const { count } = useCart();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search.trim()) {
      navigate(`/shop?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <nav style={{
      background: '#fff',
      boxShadow: shadow.navbar,
      position: 'sticky',
      top: 0,
      zIndex: 200,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        height: '68px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:'8px', textDecoration:'none', flexShrink:0 }}>
          <div style={{
            width: '38px',
            height: '38px',
            background: `linear-gradient(135deg, ${colors.bright}, ${colors.deep})`,
            borderRadius: radius.lg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            boxShadow: '0 4px 16px rgba(82,178,86,0.30)',
          }}>
            🥝
          </div>
          <span style={{ fontFamily:fonts.heading, fontWeight:800, fontSize:'18px', color:colors.deep }}>
            KiwiHub
          </span>
        </Link>

        {/* Search */}
        <div style={{ flex:1, position:'relative', maxWidth:'480px' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search laptops, accessories, homewear…"
            style={{
              width: '100%',
              padding: '9px 40px 9px 16px',
              borderRadius: '24px',
              border: `2px solid ${colors.tint}`,
              background: '#f7fdf8',
              fontSize: '13px',
              fontFamily: fonts.body,
              color: colors.deep,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <span style={{ position:'absolute', right:'13px', top:'50%', transform:'translateY(-50%)', display:'flex' }}>
            <Icon name="search" size={16} color={colors.mid} />
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display:'flex', alignItems:'center', gap:'2px' }}>
          {NAV_LINKS.map(link => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontFamily: fonts.body,
                  fontSize: '13px',
                  fontWeight: active ? 700 : 500,
                  color: active ? colors.deep : colors.textSec,
                  textDecoration: 'none',
                  padding: '7px 12px',
                  borderRadius: radius.md,
                  background: active ? colors.light : 'transparent',
                  transition: 'all 0.15s',
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Account */}
          <Link to="/account" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: fonts.body,
            fontSize: '13px',
            fontWeight: pathname === '/account' ? 700 : 500,
            color: pathname === '/account' ? colors.deep : colors.textSec,
            textDecoration: 'none',
            padding: '7px 12px',
            borderRadius: radius.md,
            background: pathname === '/account' ? colors.light : 'transparent',
          }}>
            <Icon name="user" size={15} color={pathname === '/account' ? colors.deep : colors.textSec} />
            Account
          </Link>

          {/* Cart */}
          <Link to="/cart" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: fonts.body,
            fontSize: '13px',
            fontWeight: 600,
            color: '#fff',
            textDecoration: 'none',
            background: colors.deep,
            borderRadius: '24px',
            padding: '9px 16px',
            marginLeft: '4px',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = colors.hover}
          onMouseLeave={e => e.currentTarget.style.background = colors.deep}
          >
            <Icon name="cart" size={15} color="#fff" />
            Cart
            {count > 0 && (
              <span style={{
                background: colors.bright,
                borderRadius: '10px',
                padding: '1px 7px',
                fontSize: '11px',
                fontWeight: 700,
              }}>
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
