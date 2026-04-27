import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, fonts, radius, shadow } from '../theme';
import Icon from '../components/ui/Icon';
import ProductCard from '../components/ui/ProductCard';
import { PRODUCTS } from '../data/products';

const ORDERS = [
  { id: 'KH-482910', date: '18 Mar 2026', status: 'Delivered',   total: 9947, items: ['💻', '🖱️'] },
  { id: 'KH-371204', date: '2 Mar 2026',  status: 'In Transit',  total: 599,  items: ['🔌'] },
  { id: 'KH-294831', date: '14 Feb 2026', status: 'Processing',  total: 898,  items: ['🧶'] },
];

const STATUS_COLOR = { Delivered: '#059669', 'In Transit': '#2563eb', Processing: '#d97706' };
const STATUS_BG    = { Delivered: '#d1fae5', 'In Transit': '#dbeafe', Processing: '#fef3c7' };

const TABS = [
  { id: 'dashboard', icon: 'home',    label: 'Dashboard' },
  { id: 'orders',    icon: 'package', label: 'My Orders' },
  { id: 'addresses', icon: 'map-pin', label: 'Addresses' },
  { id: 'profile',   icon: 'user',    label: 'Profile' },
  { id: 'wishlist',  icon: 'heart',   label: 'Wishlist' },
];

export default function AccountPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const login = () => {
    if (email.includes('@') && password.length >= 4) setIsLoggedIn(true);
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: radius.md,
    border: `1.5px solid ${colors.border}`, fontSize: '13px', color: colors.text,
    outline: 'none', fontFamily: fonts.body, boxSizing: 'border-box',
  };

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: '460px', margin: '48px auto', padding: '0 16px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '56px', height: '56px', background: `linear-gradient(135deg, ${colors.bright}, ${colors.deep})`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 10px', boxShadow: shadow.logo }}>🥝</div>
          <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '22px', color: colors.deep }}>Welcome back!</div>
          <div style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.muted, marginTop: '4px' }}>Sign in to your KiwiHub account</div>
        </div>
        <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: shadow.modal }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: fonts.body, fontSize: '12px', fontWeight: 600, color: colors.textSec, marginBottom: '5px' }}>Email Address</label>
              <input
                value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="you@email.com"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = colors.bright; }}
                onBlur={e => { e.target.style.borderColor = colors.border; }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: fonts.body, fontSize: '12px', fontWeight: 600, color: colors.textSec, marginBottom: '5px' }}>Password</label>
              <input
                value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Your password"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = colors.bright; }}
                onBlur={e => { e.target.style.borderColor = colors.border; }}
                onKeyDown={e => e.key === 'Enter' && login()}
              />
            </div>
            <button
              onClick={login}
              style={{ width: '100%', background: colors.deep, color: 'white', border: 'none', borderRadius: radius.lg, padding: '13px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: fonts.heading, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              Sign In <Icon name="arrow-right" size={16} color="#fff" />
            </button>
            <div style={{ textAlign: 'center', fontFamily: fonts.body, fontSize: '12px', color: colors.ghost }}>Any email + 4+ char password to demo</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 24px 48px' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        {/* Sidebar */}
        <div style={{ width: '220px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', textAlign: 'center', boxShadow: shadow.card }}>
            <div style={{ width: '60px', height: '60px', background: `linear-gradient(135deg, ${colors.bright}, ${colors.deep})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
              <Icon name="user" size={26} color="#fff" />
            </div>
            <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '15px', color: colors.deep }}>Qaasim</div>
            <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.muted, marginTop: '2px' }}>{email}</div>
            <div style={{ background: colors.light, borderRadius: radius.sm, padding: '4px 10px', fontSize: '11px', fontFamily: fonts.body, fontWeight: 600, color: colors.deep, marginTop: '8px', display: 'inline-block' }}>🥝 KiwiHub Member</div>
          </div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '8px', boxShadow: shadow.card }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: radius.md, border: 'none', background: activeTab === tab.id ? colors.light : 'transparent', color: activeTab === tab.id ? colors.deep : colors.textSec, fontFamily: fonts.body, fontSize: '13px', fontWeight: activeTab === tab.id ? 700 : 500, cursor: 'pointer', textAlign: 'left', marginBottom: '2px' }}
              >
                <Icon name={tab.icon} size={14} color={activeTab === tab.id ? colors.deep : colors.muted} />
                {tab.label}
                {activeTab === tab.id && <span style={{ marginLeft: 'auto' }}><Icon name="chevron-right" size={14} color={colors.bright} /></span>}
              </button>
            ))}
            <button
              onClick={() => setIsLoggedIn(false)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: radius.md, border: 'none', borderTop: `1px solid #f7f5f0`, background: 'transparent', color: colors.error, fontFamily: fonts.body, fontSize: '13px', fontWeight: 500, cursor: 'pointer', textAlign: 'left', marginTop: '4px' }}
            >
              <Icon name="arrow-left" size={14} color={colors.error} /> Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '24px', color: colors.deep }}>Welcome back! 👋</h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
                {[
                  { icon: 'package', label: 'Total Orders',  value: 3 },
                  { icon: 'truck',   label: 'In Transit',    value: 1 },
                  { icon: 'check',   label: 'Delivered',     value: 1 },
                  { icon: 'heart',   label: 'Wishlist',      value: 5 },
                ].map(s => (
                  <div key={s.label} style={{ background: 'white', borderRadius: '14px', padding: '16px', textAlign: 'center', boxShadow: shadow.card }}>
                    <div style={{ width: '40px', height: '40px', background: colors.light, borderRadius: radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                      <Icon name={s.icon} size={20} color={colors.deep} />
                    </div>
                    <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '22px', color: colors.deep }}>{s.value}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.muted }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: shadow.card }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '15px', color: colors.deep }}>Recent Order</div>
                  <button onClick={() => setActiveTab('orders')} style={{ background: 'none', border: 'none', color: colors.mid, fontSize: '12px', fontFamily: fonts.body, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    View all <Icon name="arrow-right" size={12} color={colors.mid} />
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '14px', color: colors.text }}>KH-482910</div>
                    <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted }}>18 Mar 2026 · 2 items</div>
                  </div>
                  <span style={{ background: STATUS_BG.Delivered, color: STATUS_COLOR.Delivered, borderRadius: '20px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, fontFamily: fonts.body }}>Delivered</span>
                  <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '15px', color: colors.deep }}>R9,947</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '22px', color: colors.deep }}>My Orders</h2>
              {ORDERS.map(order => (
                <div key={order.id} style={{ background: 'white', borderRadius: '16px', padding: '18px', boxShadow: shadow.card }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '14px', color: colors.deep }}>{order.id}</div>
                      <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.muted, marginTop: '2px' }}>Placed on {order.date}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ background: STATUS_BG[order.status], color: STATUS_COLOR[order.status], borderRadius: '20px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, fontFamily: fonts.body }}>
                        {order.status}
                      </span>
                      <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '15px', color: colors.deep }}>R{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {order.items.map((img, i) => (
                      <div key={i} style={{ background: colors.light, borderRadius: radius.md, width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{img}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '22px', color: colors.deep, marginBottom: '14px' }}>My Wishlist</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
                {PRODUCTS.slice(1, 6).map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}

          {(activeTab === 'profile' || activeTab === 'addresses') && (
            <div style={{ background: 'white', borderRadius: '18px', padding: '40px', boxShadow: shadow.card, textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', background: colors.light, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Icon name={activeTab === 'profile' ? 'user' : 'map-pin'} size={26} color={colors.deep} />
              </div>
              <div style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.muted }}>
                {activeTab === 'profile' ? 'Profile editing' : 'Saved addresses'} — coming soon with Supabase integration.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
