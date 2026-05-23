import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { colors, fonts, radius, shadow } from '../theme';
import Icon from '../components/ui/Icon';
import { useWindowSize } from '../hooks/useWindowSize';

export default function CartPage() {
  const { items, subtotal, delivery, total, count, removeItem, updateQty } = useCart();
  const navigate = useNavigate();
  const { isMobile } = useWindowSize();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);

  const couponDiscount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = total - couponDiscount;

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px 48px' }}>
        <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Link to="/" style={{ color: colors.mid, textDecoration: 'none' }}>Home</Link>
          <Icon name="chevron-right" size={12} color={colors.ghost} />
          <span style={{ color: colors.deep, fontWeight: 600 }}>My Cart</span>
        </div>
        <div style={{ textAlign: 'center', padding: isMobile ? '48px 20px' : '80px 24px', background: 'white', borderRadius: '18px', boxShadow: shadow.card }}>
          <div style={{ width: '80px', height: '80px', background: colors.light, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Icon name="cart" size={36} color={colors.mint} />
          </div>
          <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '22px', color: colors.deep, marginBottom: '8px' }}>Your cart is empty</div>
          <div style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.muted, marginBottom: '24px' }}>Looks like you haven't added anything yet.</div>
          <button
            onClick={() => navigate('/shop')}
            style={{ background: colors.deep, color: 'white', border: 'none', borderRadius: radius.pill, padding: '13px 32px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: fonts.heading, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <Icon name="store" size={16} color="#fff" /> Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '16px 16px 40px' : '24px 24px 48px' }}>
      <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Link to="/" style={{ color: colors.mid, textDecoration: 'none' }}>Home</Link>
        <Icon name="chevron-right" size={12} color={colors.ghost} />
        <span style={{ color: colors.deep, fontWeight: 600 }}>My Cart</span>
      </div>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', alignItems: 'flex-start' }}>
        {/* Items */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: isMobile ? '20px' : '24px', color: colors.deep }}>
              My Cart <span style={{ fontSize: '14px', fontWeight: 500, color: colors.muted }}>({count} items)</span>
            </h1>
          </div>

          {/* Free delivery tracker */}
          {delivery > 0 ? (
            <div style={{ background: '#fff8e1', border: '1.5px solid #fde68a', borderRadius: radius.lg, padding: '12px 16px' }}>
              <div style={{ fontFamily: fonts.body, fontSize: '12px', fontWeight: 600, color: '#92400e', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Icon name="truck" size={14} color="#92400e" /> Add R{(750 - subtotal).toLocaleString()} more for FREE delivery!
              </div>
              <div style={{ background: '#fde68a', borderRadius: '6px', height: '6px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(100, (subtotal / 750) * 100)}%`, background: '#f59e0b', borderRadius: '6px', transition: 'width 0.4s ease' }} />
              </div>
            </div>
          ) : (
            <div style={{ background: colors.successBg, border: `1.5px solid ${colors.borderSuccess}`, borderRadius: radius.lg, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name="check" size={14} color={colors.successText} />
              <span style={{ fontFamily: fonts.body, fontSize: '12px', fontWeight: 600, color: colors.successText }}>You qualify for FREE delivery!</span>
            </div>
          )}

          {/* Cart items */}
          {items.map(item => (
            <div key={item.id} style={{ background: 'white', borderRadius: '16px', padding: isMobile ? '14px' : '18px', display: 'flex', gap: '12px', boxShadow: shadow.card, alignItems: 'flex-start' }}>
              <div style={{ background: `linear-gradient(135deg, ${colors.light}, ${colors.tint})`, borderRadius: radius.lg, width: isMobile ? '70px' : '90px', height: isMobile ? '70px' : '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? '30px' : '40px', flexShrink: 0 }}>
                {item.image}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '9px', color: colors.mid, fontFamily: fonts.body, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>
                  {item.brand} · {item.category}
                </div>
                <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: isMobile ? '13px' : '15px', color: colors.text, marginBottom: '8px', lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#f7f5f0', borderRadius: radius.sm, border: `1.5px solid ${colors.border}` }}>
                    <button onClick={() => updateQty(item.id, -1)} style={{ background: 'none', border: 'none', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="minus" size={13} color={colors.textSec} />
                    </button>
                    <span style={{ padding: '0 10px', fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.deep }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} style={{ background: 'none', border: 'none', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="plus" size={13} color={colors.textSec} />
                    </button>
                  </div>
                  <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: isMobile ? '14px' : '16px', color: colors.deep }}>R{(item.price * item.qty).toLocaleString()}</span>
                  <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: colors.ghost, fontSize: '12px', fontFamily: fonts.body, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Icon name="trash-2" size={13} color={colors.ghost} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={() => navigate('/shop')}
            style={{ background: 'white', color: colors.deep, border: `2px solid ${colors.border}`, borderRadius: radius.lg, padding: '11px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: fonts.heading, width: 'fit-content', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Icon name="arrow-left" size={14} color={colors.deep} /> Continue Shopping
          </button>
        </div>

        {/* Order summary */}
        <div style={{ width: isMobile ? '100%' : '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Coupon */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '18px', boxShadow: shadow.card }}>
            <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '14px', color: colors.deep, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Icon name="tag" size={14} color={colors.deep} /> Coupon Code
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                value={coupon}
                onChange={e => { setCoupon(e.target.value); setCouponError(false); }}
                placeholder="Try KIWI10"
                style={{ flex: 1, padding: '9px 12px', borderRadius: radius.sm, border: `1.5px solid ${couponApplied ? colors.borderSuccess : couponError ? colors.borderError : colors.border}`, fontSize: '12px', color: colors.textSec, background: couponApplied ? '#f0fdf4' : 'white', outline: 'none' }}
              />
              <button
                onClick={() => {
                  if (coupon.toUpperCase() === 'KIWI10') { setCouponApplied(true); setCouponError(false); }
                  else { setCouponError(true); setCouponApplied(false); }
                }}
                style={{ background: colors.deep, color: 'white', border: 'none', borderRadius: radius.sm, padding: '9px 14px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: fonts.heading }}
              >
                Apply
              </button>
            </div>
            {couponApplied && (
              <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.success, fontWeight: 600, marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon name="check" size={12} color={colors.success} /> KIWI10 applied — 10% off!
              </div>
            )}
            {couponError && (
              <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.error, fontWeight: 600, marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon name="x" size={12} color={colors.error} /> Invalid coupon code
              </div>
            )}
          </div>

          {/* Summary */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: shadow.card }}>
            <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '16px', color: colors.deep, marginBottom: '16px' }}>Order Summary</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
              {[
                { label: `Subtotal (${count} items)`, value: `R${subtotal.toLocaleString()}`, green: false },
                ...(couponApplied ? [{ label: 'Coupon (KIWI10)', value: `-R${couponDiscount.toLocaleString()}`, green: true }] : []),
                { label: 'Delivery', value: delivery === 0 ? 'FREE 🎉' : `R${delivery}`, green: delivery === 0 },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.muted }}>{row.label}</span>
                  <span style={{ fontFamily: fonts.body, fontSize: '13px', fontWeight: 600, color: row.green ? colors.success : colors.text }}>{row.value}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '2px solid #f0f0f0', paddingTop: '14px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '16px', color: colors.text }}>Total</span>
              <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '22px', color: colors.deep }}>R{finalTotal.toLocaleString()}</span>
            </div>
            <button
              onClick={() => navigate('/account')}
              style={{ width: '100%', background: colors.deep, color: 'white', border: 'none', borderRadius: radius.lg, padding: '15px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: fonts.heading, marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              Proceed to Checkout <Icon name="arrow-right" size={16} color="#fff" />
            </button>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
              {[{ icon: 'credit-card', l: 'Card' }, { icon: 'landmark', l: 'EFT' }, { icon: 'smartphone', l: 'SnapScan' }, { icon: 'wallet', l: 'Mobicred' }].map(pm => (
                <span key={pm.l} style={{ background: '#f7f5f0', borderRadius: radius.xs, padding: '4px 8px', fontSize: '10px', fontFamily: fonts.body, color: colors.muted, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Icon name={pm.icon} size={10} color={colors.ghost} /> {pm.l}
                </span>
              ))}
            </div>
            <div style={{ textAlign: 'center', fontFamily: fonts.body, fontSize: '11px', color: colors.ghost, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              <Icon name="lock" size={11} color={colors.ghost} /> Secured by PayFast
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
