import { useState } from 'react';
import { colors, fonts, radius, shadow } from '../theme';
import Icon from '../components/ui/Icon';

const DEMO_ORDERS = {
  'KH-482910': {
    id: 'KH-482910', date: '18 Mar 2026', estimatedDelivery: '22 Mar 2026',
    status: 'Delivered', courier: 'The Courier Guy', trackingRef: 'TCG-8827441',
    items: [
      { name: 'Lenovo IdeaPad 3', image: '💻', qty: 1, price: 8999 },
      { name: 'Wireless Mouse',   image: '🖱️', qty: 1, price: 349 },
    ],
    address: '12 Kestrel Street, Harrismith, Free State, 9880',
    timeline: [
      { step: 'Order Placed',      date: '18 Mar, 09:14', done: true,  desc: 'Your order was received and payment confirmed via PayFast.' },
      { step: 'Processing',        date: '18 Mar, 11:32', done: true,  desc: 'Your order is being picked and packed at our warehouse.' },
      { step: 'Shipped',           date: '19 Mar, 08:05', done: true,  desc: 'Your package was collected by The Courier Guy (Ref: TCG-8827441).' },
      { step: 'Out for Delivery',  date: '22 Mar, 07:48', done: true,  desc: 'Your package is on the delivery vehicle.' },
      { step: 'Delivered',         date: '22 Mar, 12:33', done: true,  desc: 'Package delivered and signed for at your address. Enjoy!' },
    ],
  },
  'KH-371204': {
    id: 'KH-371204', date: '2 Mar 2026', estimatedDelivery: '6 Mar 2026',
    status: 'In Transit', courier: 'The Courier Guy', trackingRef: 'TCG-7714223',
    items: [{ name: 'Samsung USB-C Hub', image: '🔌', qty: 1, price: 599 }],
    address: '45 Main Road, Johannesburg, Gauteng, 2000',
    timeline: [
      { step: 'Order Placed',     date: '2 Mar, 14:22',   done: true,  desc: 'Order received and payment confirmed.' },
      { step: 'Processing',       date: '2 Mar, 16:10',   done: true,  desc: 'Packed and ready for collection.' },
      { step: 'Shipped',          date: '3 Mar, 09:00',   done: true,  desc: 'Collected by The Courier Guy (Ref: TCG-7714223).' },
      { step: 'Out for Delivery', date: 'Expected 6 Mar', done: false, desc: 'Your package is en route.' },
      { step: 'Delivered',        date: '—',              done: false, desc: 'Awaiting delivery.' },
    ],
  },
};

const STATUS_COLOR = { Delivered: '#059669', 'In Transit': '#2563eb', Processing: '#d97706' };
const STATUS_BG    = { Delivered: '#d1fae5', 'In Transit': '#dbeafe', Processing: '#fef3c7' };

export default function TrackingPage() {
  const [orderNum, setOrderNum] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const track = () => {
    setError('');
    if (!orderNum.trim()) { setError('Please enter your order number.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const found = DEMO_ORDERS[orderNum.trim().toUpperCase()];
      if (found) { setResult(found); }
      else { setError('Order not found. Try KH-482910 or KH-371204 to demo.'); setResult(null); }
    }, 1000);
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: radius.md,
    border: `1.5px solid ${colors.border}`, fontSize: '13px', color: colors.text,
    outline: 'none', fontFamily: fonts.body, boxSizing: 'border-box',
  };

  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${colors.deep}, ${colors.mid})`, color: '#fff', padding: '52px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', background: 'rgba(255,255,255,0.15)', borderRadius: '14px', marginBottom: '16px' }}>
          <Icon name="package" size={26} color="#fff" />
        </div>
        <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '36px', marginBottom: '10px' }}>Track Your Order</h1>
        <p style={{ fontFamily: fonts.body, fontSize: '15px', opacity: 0.85, maxWidth: '450px', margin: '0 auto' }}>
          Enter your order number to see real-time delivery updates.
        </p>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 24px 64px' }}>
        {/* Search form */}
        <div style={{ background: 'white', borderRadius: '18px', padding: '28px 32px', boxShadow: shadow.card, marginBottom: '24px' }}>
          <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '17px', color: colors.deep, marginBottom: '20px' }}>Find Your Order</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: colors.textSec, marginBottom: '5px', fontFamily: fonts.body }}>Order Number *</label>
              <input
                value={orderNum} onChange={e => setOrderNum(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && track()}
                placeholder="e.g. KH-482910" style={inputStyle}
                onFocus={e => { e.target.style.borderColor = colors.bright; }}
                onBlur={e => { e.target.style.borderColor = colors.border; }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: colors.textSec, marginBottom: '5px', fontFamily: fonts.body }}>Email Address (optional)</label>
              <input
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com" type="email" style={inputStyle}
                onFocus={e => { e.target.style.borderColor = colors.bright; }}
                onBlur={e => { e.target.style.borderColor = colors.border; }}
              />
            </div>
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: colors.errorBg, borderRadius: radius.sm, padding: '10px 14px', border: `1.5px solid ${colors.borderError}` }}>
                <Icon name="alert-circle" size={14} color={colors.error} />
                <span style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.error, fontWeight: 600 }}>{error}</span>
              </div>
            )}
            <button
              onClick={track}
              style={{ background: loading ? colors.mid : colors.deep, color: '#fff', border: 'none', borderRadius: radius.lg, padding: '13px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: fonts.heading, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s' }}
            >
              {loading
                ? <><Icon name="loader" size={16} color="#fff" /> Searching…</>
                : <><Icon name="search" size={16} color="#fff" /> Track Order</>
              }
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'white', borderRadius: '18px', padding: '24px', boxShadow: shadow.card }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '18px', color: colors.deep, marginBottom: '4px' }}>{result.id}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted }}>Placed {result.date} · {result.courier}</div>
                </div>
                <span style={{ background: STATUS_BG[result.status], color: STATUS_COLOR[result.status], borderRadius: '20px', padding: '6px 16px', fontSize: '12px', fontWeight: 700, fontFamily: fonts.body }}>
                  {result.status}
                </span>
              </div>
              <div style={{ background: '#f7f5f0', borderRadius: radius.md, padding: '12px 16px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontFamily: fonts.body, fontSize: '10px', fontWeight: 600, color: colors.ghost, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Delivering To</div>
                  <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.textSec, marginTop: '2px' }}>{result.address}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: fonts.body, fontSize: '10px', fontWeight: 600, color: colors.ghost, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tracking Ref</div>
                  <div style={{ fontFamily: fonts.heading, fontSize: '12px', fontWeight: 700, color: colors.deep, marginTop: '2px' }}>{result.trackingRef}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {result.items.map(item => (
                  <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: colors.light, borderRadius: radius.md, padding: '10px 14px', flex: 1 }}>
                    <span style={{ fontSize: '24px' }}>{item.image}</span>
                    <div>
                      <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '12px', color: colors.deep }}>{item.name}</div>
                      <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.muted }}>Qty: {item.qty} · R{item.price.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div style={{ background: 'white', borderRadius: '18px', padding: '24px', boxShadow: shadow.card }}>
              <h3 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '15px', color: colors.deep, marginBottom: '20px' }}>Delivery Timeline</h3>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '15px', top: '8px', bottom: '8px', width: '2px', background: colors.border }} />
                {result.timeline.map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: i < result.timeline.length - 1 ? '20px' : '0', position: 'relative' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: t.done ? `linear-gradient(135deg, ${colors.bright}, ${colors.mid})` : colors.border, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, boxShadow: t.done ? `0 0 0 3px ${colors.successBg}` : 'none' }}>
                      {t.done
                        ? <Icon name="check" size={14} color="#fff" />
                        : <span style={{ width: '8px', height: '8px', background: colors.ghost, borderRadius: '50%', display: 'block' }} />
                      }
                    </div>
                    <div style={{ paddingTop: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '3px' }}>
                        <span style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: t.done ? colors.deep : colors.ghost }}>{t.step}</span>
                        <span style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.ghost }}>{t.date}</span>
                      </div>
                      <p style={{ fontFamily: fonts.body, fontSize: '12px', color: t.done ? colors.textSec : colors.ghost, lineHeight: 1.5 }}>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Demo hint */}
        {!result && !loading && (
          <div style={{ background: '#f7f5f0', borderRadius: radius.lg, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Icon name="alert-circle" size={16} color={colors.muted} />
            <span style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted }}>
              Demo: Try order numbers <strong>KH-482910</strong> (Delivered) or <strong>KH-371204</strong> (In Transit)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
