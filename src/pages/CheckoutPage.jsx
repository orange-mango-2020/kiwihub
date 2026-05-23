import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { colors, fonts, radius, shadow, transition } from '../theme';
import Icon from '../components/ui/Icon';
import { useWindowSize } from '../hooks/useWindowSize';
import { submitPayFastPayment } from '../lib/payfast';
import { saveOrder } from '../lib/supabase';

const SA_PROVINCES = [
  'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape',
  'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape',
];

const FIELD = (value, onChange, placeholder, type = 'text', opts = {}) => ({
  value, onChange, placeholder, type, ...opts,
});

export default function CheckoutPage() {
  const { items, subtotal, delivery, total, count, clearCart } = useCart();
  const navigate = useNavigate();
  const { isMobile } = useWindowSize();

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', province: '', postalCode: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Restore coupon state from sessionStorage (set by CartPage)
  const couponApplied = sessionStorage.getItem('kiwihub_coupon') === 'KIWI10';
  const couponDiscount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = total - couponDiscount;

  useEffect(() => {
    if (items.length === 0) navigate('/cart', { replace: true });
  }, [items.length, navigate]);

  const set = k => e => { setForm(f => ({ ...f, [k]: e.target.value })); setErrors(e => ({ ...e, [k]: '' })); };

  function validate() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) e.phone = 'Valid phone required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.province) e.province = 'Select province';
    if (!form.postalCode.trim() || form.postalCode.replace(/\D/g, '').length < 4) e.postalCode = 'Valid postal code required';
    return e;
  }

  async function handlePay(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    const orderId = `KH-${Date.now()}`;

    const order = {
      id: orderId,
      items: items.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty, image: i.image })),
      subtotal,
      delivery,
      coupon: couponApplied ? 'KIWI10' : null,
      discount: couponDiscount,
      total: finalTotal,
      customer: { ...form },
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    // Persist order so confirmation page can read it after PayFast redirect
    sessionStorage.setItem('kiwihub_pending_order', JSON.stringify(order));

    // Best-effort save to Supabase (non-blocking)
    saveOrder({
      id: orderId,
      customer_name: `${form.firstName} ${form.lastName}`,
      customer_email: form.email,
      customer_phone: form.phone,
      shipping_address: `${form.address}, ${form.city}, ${form.province} ${form.postalCode}`,
      items: order.items,
      subtotal,
      delivery_fee: delivery,
      coupon_code: order.coupon,
      discount: couponDiscount,
      total: finalTotal,
      payment_status: 'pending',
      status: 'pending',
    });

    submitPayFastPayment({ order });
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '11px 14px', borderRadius: radius.md, boxSizing: 'border-box',
    border: `1.5px solid ${errors[field] ? colors.borderError : colors.border}`,
    fontSize: '13px', color: colors.text, background: '#fff', outline: 'none',
    fontFamily: fonts.body, transition: `border-color ${transition.fast}`,
  });

  const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 600, color: colors.textSec, marginBottom: '5px', fontFamily: fonts.body };
  const errorStyle = { fontSize: '11px', color: colors.error, marginTop: '3px', fontFamily: fonts.body };

  const Row = ({ children }) => (
    <div style={{ display: 'flex', gap: '12px', flexDirection: isMobile ? 'column' : 'row' }}>
      {children}
    </div>
  );

  const Field = ({ label, field, children }) => (
    <div style={{ flex: 1 }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {errors[field] && <div style={errorStyle}>{errors[field]}</div>}
    </div>
  );

  if (items.length === 0) return null;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '16px 16px 40px' : '24px 24px 48px' }}>
      {/* Breadcrumb */}
      <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.muted, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Link to="/" style={{ color: colors.mid, textDecoration: 'none' }}>Home</Link>
        <Icon name="chevron-right" size={12} color={colors.ghost} />
        <Link to="/cart" style={{ color: colors.mid, textDecoration: 'none' }}>Cart</Link>
        <Icon name="chevron-right" size={12} color={colors.ghost} />
        <span style={{ color: colors.deep, fontWeight: 600 }}>Checkout</span>
      </div>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '24px', alignItems: 'flex-start' }}>

        {/* Left: Delivery details form */}
        <div style={{ flex: 1 }}>
          <div style={{ background: 'white', borderRadius: '18px', padding: isMobile ? '20px' : '28px', boxShadow: shadow.card }}>
            <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: isMobile ? '20px' : '24px', color: colors.deep, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Icon name="truck" size={22} color={colors.deep} /> Delivery Details
            </h1>

            <form onSubmit={handlePay} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Row>
                <Field label="First Name *" field="firstName">
                  <input style={inputStyle('firstName')} value={form.firstName} onChange={set('firstName')} placeholder="Sipho"
                    onFocus={e => { e.target.style.borderColor = colors.bright; }} onBlur={e => { e.target.style.borderColor = errors.firstName ? colors.borderError : colors.border; }} />
                </Field>
                <Field label="Last Name *" field="lastName">
                  <input style={inputStyle('lastName')} value={form.lastName} onChange={set('lastName')} placeholder="Dlamini"
                    onFocus={e => { e.target.style.borderColor = colors.bright; }} onBlur={e => { e.target.style.borderColor = errors.lastName ? colors.borderError : colors.border; }} />
                </Field>
              </Row>

              <Row>
                <Field label="Email Address *" field="email">
                  <input style={inputStyle('email')} value={form.email} onChange={set('email')} placeholder="you@email.com" type="email"
                    onFocus={e => { e.target.style.borderColor = colors.bright; }} onBlur={e => { e.target.style.borderColor = errors.email ? colors.borderError : colors.border; }} />
                </Field>
                <Field label="Phone Number *" field="phone">
                  <input style={inputStyle('phone')} value={form.phone} onChange={set('phone')} placeholder="071 234 5678" type="tel"
                    onFocus={e => { e.target.style.borderColor = colors.bright; }} onBlur={e => { e.target.style.borderColor = errors.phone ? colors.borderError : colors.border; }} />
                </Field>
              </Row>

              <Field label="Street Address *" field="address">
                <input style={inputStyle('address')} value={form.address} onChange={set('address')} placeholder="12 Kestrel Street, Unit 3"
                  onFocus={e => { e.target.style.borderColor = colors.bright; }} onBlur={e => { e.target.style.borderColor = errors.address ? colors.borderError : colors.border; }} />
              </Field>

              <Row>
                <Field label="City / Town *" field="city">
                  <input style={inputStyle('city')} value={form.city} onChange={set('city')} placeholder="Harrismith"
                    onFocus={e => { e.target.style.borderColor = colors.bright; }} onBlur={e => { e.target.style.borderColor = errors.city ? colors.borderError : colors.border; }} />
                </Field>
                <Field label="Province *" field="province">
                  <select style={{ ...inputStyle('province'), cursor: 'pointer' }} value={form.province} onChange={set('province')}>
                    <option value="">Select province…</option>
                    {SA_PROVINCES.map(p => <option key={p}>{p}</option>)}
                  </select>
                </Field>
                <Field label="Postal Code *" field="postalCode">
                  <input style={{ ...inputStyle('postalCode'), maxWidth: isMobile ? '100%' : '100px' }} value={form.postalCode} onChange={set('postalCode')} placeholder="9880" maxLength={4}
                    onFocus={e => { e.target.style.borderColor = colors.bright; }} onBlur={e => { e.target.style.borderColor = errors.postalCode ? colors.borderError : colors.border; }} />
                </Field>
              </Row>

              {/* Shipping info */}
              <div style={{ background: colors.light, border: `1.5px solid ${colors.mint}`, borderRadius: radius.lg, padding: '12px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Icon name="truck" size={16} color={colors.mid} />
                <div>
                  <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.deep, marginBottom: '2px' }}>Delivered by The Courier Guy</div>
                  <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.textSec }}>
                    {delivery === 0 ? 'FREE delivery — typically 2–5 business days nationwide' : `R${delivery} delivery — typically 2–5 business days nationwide`}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%', background: submitting ? colors.mid : colors.deep, color: '#fff',
                  border: 'none', borderRadius: radius.lg, padding: '16px',
                  fontSize: isMobile ? '14px' : '16px', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer',
                  fontFamily: fonts.heading, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '10px', transition: `all ${transition.base}`, marginTop: '4px',
                }}
              >
                {submitting
                  ? <><Icon name="loader" size={18} color="#fff" /> Redirecting to PayFast…</>
                  : <><Icon name="lock" size={18} color="#fff" /> Pay R{finalTotal.toLocaleString()} with PayFast</>
                }
              </button>

              <div style={{ textAlign: 'center', fontFamily: fonts.body, fontSize: '11px', color: colors.ghost, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Icon name="lock" size={11} color={colors.ghost} />
                Secured by PayFast — South Africa's leading payment gateway
              </div>
            </form>
          </div>
        </div>

        {/* Right: Order summary */}
        <div style={{ width: isMobile ? '100%' : '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: shadow.card }}>
            <div style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '16px', color: colors.deep, marginBottom: '16px' }}>
              Order Summary
            </div>

            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '44px', height: '44px', background: '#f8f9fa', borderRadius: radius.sm, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', overflow: 'hidden' }}>
                    {item.image?.startsWith('http') ? (
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '3px' }} onError={e => { e.currentTarget.style.display = 'none'; }} />
                    ) : item.image}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: fonts.body, fontSize: '12px', color: colors.text, fontWeight: 600, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: '11px', color: colors.muted }}>Qty: {item.qty}</div>
                  </div>
                  <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.deep, flexShrink: 0 }}>
                    R{(item.price * item.qty).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: `1.5px solid ${colors.border}`, paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
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

            <div style={{ borderTop: '2px solid #f0f0f0', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '16px', color: colors.text }}>Total</span>
              <span style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '22px', color: colors.deep }}>R{finalTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment methods */}
          <div style={{ background: 'white', borderRadius: radius.lg, padding: '14px 16px', boxShadow: shadow.card }}>
            <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '12px', color: colors.deep, marginBottom: '10px' }}>Accepted Payment Methods</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[{ icon: 'credit-card', l: 'Card' }, { icon: 'landmark', l: 'EFT' }, { icon: 'smartphone', l: 'SnapScan' }, { icon: 'wallet', l: 'Mobicred' }].map(pm => (
                <span key={pm.l} style={{ background: '#f7f5f0', borderRadius: radius.xs, padding: '4px 10px', fontSize: '11px', fontFamily: fonts.body, color: colors.muted, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Icon name={pm.icon} size={10} color={colors.ghost} /> {pm.l}
                </span>
              ))}
            </div>
          </div>

          <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: fonts.body, fontSize: '13px', color: colors.mid, textDecoration: 'none', fontWeight: 600 }}>
            <Icon name="arrow-left" size={14} color={colors.mid} /> Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
