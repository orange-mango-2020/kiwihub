import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { colors, fonts, radius, shadow } from '../theme';
import Icon from '../components/ui/Icon';
import { useWindowSize } from '../hooks/useWindowSize';

export default function OrderConfirmedPage() {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const { isMobile } = useWindowSize();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('kiwihub_pending_order');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setOrder(parsed);
        // Fire-and-forget — don't block the confirmation page on email success
        fetch('/api/send-order-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed),
        }).catch(() => {});
      } catch {}
      sessionStorage.removeItem('kiwihub_pending_order');
      sessionStorage.removeItem('kiwihub_coupon');
    }
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const estimatedDelivery = () => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  if (!order) {
    return (
      <div style={{ maxWidth: '600px', margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ background: 'white', borderRadius: '18px', padding: '48px 32px', boxShadow: shadow.card }}>
          <div style={{ width: '72px', height: '72px', background: colors.successBg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Icon name="check" size={36} color={colors.success} />
          </div>
          <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '26px', color: colors.deep, marginBottom: '10px' }}>Payment Received!</h1>
          <p style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.muted, marginBottom: '28px' }}>
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: colors.deep, color: '#fff', textDecoration: 'none', borderRadius: radius.pill, padding: '13px 28px', fontFamily: fonts.heading, fontWeight: 700, fontSize: '14px' }}>
            <Icon name="store" size={16} color="#fff" /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '20px 16px 48px' : '32px 24px 64px' }}>
      {/* Success header */}
      <div style={{ background: `linear-gradient(135deg, ${colors.deep}, ${colors.mid})`, borderRadius: '20px', padding: isMobile ? '28px 20px' : '36px 40px', color: '#fff', textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ width: '72px', height: '72px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Icon name="check" size={36} color="#fff" />
        </div>
        <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: isMobile ? '24px' : '30px', marginBottom: '8px' }}>Order Confirmed!</h1>
        <p style={{ fontFamily: fonts.body, fontSize: '15px', opacity: 0.9, marginBottom: '16px' }}>
          Thank you, {order.customer.firstName}! Your order is being processed.
        </p>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', borderRadius: radius.lg, padding: '8px 20px' }}>
          <span style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '18px' }}>{order.id}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Delivery estimate */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: shadow.card, display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
          <div style={{ width: '44px', height: '44px', background: colors.light, borderRadius: radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="truck" size={22} color={colors.mid} />
          </div>
          <div>
            <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '15px', color: colors.deep, marginBottom: '4px' }}>Estimated Delivery</div>
            <div style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.textSec, marginBottom: '4px' }}>
              <strong>{estimatedDelivery()}</strong> — delivered by The Courier Guy
            </div>
            <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted }}>
              Delivering to: {order.customer.address}, {order.customer.city}, {order.customer.province}
            </div>
          </div>
        </div>

        {/* Email confirmation note */}
        <div style={{ background: colors.infoBg, border: `1.5px solid #93c5fd`, borderRadius: radius.lg, padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <Icon name="mail" size={16} color={colors.info} />
          <div style={{ fontFamily: fonts.body, fontSize: '13px', color: '#1e40af' }}>
            A confirmation email will be sent to <strong>{order.customer.email}</strong>
          </div>
        </div>

        {/* Order items */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: shadow.card }}>
          <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '16px', color: colors.deep, marginBottom: '16px' }}>Items Ordered</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {order.items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '54px', height: '54px', background: '#f8f9fa', borderRadius: radius.sm, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {item.image?.startsWith('http') ? (
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} onError={e => { e.currentTarget.style.display = 'none'; }} />
                  ) : item.image}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.text, lineHeight: 1.3 }}>{item.name}</div>
                  <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted }}>Qty: {item.qty}</div>
                </div>
                <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '14px', color: colors.deep, flexShrink: 0 }}>
                  R{(item.price * item.qty).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ borderTop: `1.5px solid ${colors.border}`, marginTop: '16px', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Subtotal', value: `R${order.subtotal.toLocaleString()}` },
              ...(order.coupon ? [{ label: 'Coupon (KIWI10)', value: `-R${order.discount.toLocaleString()}`, green: true }] : []),
              { label: 'Delivery', value: order.delivery === 0 ? 'FREE' : `R${order.delivery}`, green: order.delivery === 0 },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.muted }}>{row.label}</span>
                <span style={{ fontFamily: fonts.body, fontSize: '13px', fontWeight: 600, color: row.green ? colors.success : colors.text }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: `2px solid #f0f0f0` }}>
              <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '15px', color: colors.text }}>Total Paid</span>
              <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '20px', color: colors.deep }}>R{order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* What's next */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: shadow.card }}>
          <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '16px', color: colors.deep, marginBottom: '14px' }}>What Happens Next</div>
          {[
            { icon: 'check-circle', label: 'Order confirmed', desc: 'Your payment has been received', done: true },
            { icon: 'package', label: 'Being prepared', desc: 'We\'ll pack your order within 1 business day', done: false },
            { icon: 'truck', label: 'Shipped with Courier Guy', desc: 'You\'ll receive a tracking number via email', done: false },
            { icon: 'home', label: 'Delivered to your door', desc: `Estimated by ${estimatedDelivery()}`, done: false },
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: i < 3 ? '14px' : 0 }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step.done ? colors.successBg : colors.light, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={step.icon} size={16} color={step.done ? colors.success : colors.ghost} />
              </div>
              <div>
                <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: step.done ? colors.success : colors.text }}>{step.label}</div>
                <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', flexDirection: isMobile ? 'column' : 'row' }}>
          <Link
            to="/shop"
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: colors.deep, color: '#fff', textDecoration: 'none', borderRadius: radius.lg, padding: '14px', fontFamily: fonts.heading, fontWeight: 700, fontSize: '14px' }}
          >
            <Icon name="store" size={16} color="#fff" /> Continue Shopping
          </Link>
          <Link
            to="/tracking"
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'white', color: colors.deep, textDecoration: 'none', borderRadius: radius.lg, padding: '14px', fontFamily: fonts.heading, fontWeight: 700, fontSize: '14px', border: `2px solid ${colors.border}` }}
          >
            <Icon name="map-pin" size={16} color={colors.deep} /> Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}
