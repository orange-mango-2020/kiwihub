// KiwiHub — Order Tracking Page

const DEMO_ORDERS = {
  'KH-482910': {
    id: 'KH-482910', date: '18 Mar 2026', estimatedDelivery: '22 Mar 2026',
    status: 'Delivered', courier: 'The Courier Guy', trackingRef: 'TCG-8827441',
    items: [{ name:'Lenovo IdeaPad 3', image:'💻', qty:1, price:8999 }, { name:'Wireless Mouse', image:'🖱️', qty:1, price:349 }],
    address: '12 Kestrel Street, Harrismith, Free State, 9880',
    timeline: [
      { step:'Order Placed', date:'18 Mar, 09:14', done:true, desc:'Your order was received and payment confirmed via PayFast.' },
      { step:'Processing', date:'18 Mar, 11:32', done:true, desc:'Your order is being picked and packed at our warehouse.' },
      { step:'Shipped', date:'19 Mar, 08:05', done:true, desc:'Your package was collected by The Courier Guy (Ref: TCG-8827441).' },
      { step:'Out for Delivery', date:'22 Mar, 07:48', done:true, desc:'Your package is on the delivery vehicle.' },
      { step:'Delivered', date:'22 Mar, 12:33', done:true, desc:'Package delivered and signed for at your address. Enjoy!' },
    ],
  },
  'KH-371204': {
    id: 'KH-371204', date: '2 Mar 2026', estimatedDelivery: '6 Mar 2026',
    status: 'In Transit', courier: 'The Courier Guy', trackingRef: 'TCG-7714223',
    items: [{ name:'Samsung USB-C Hub', image:'🔌', qty:1, price:599 }],
    address: '45 Main Road, Johannesburg, Gauteng, 2000',
    timeline: [
      { step:'Order Placed', date:'2 Mar, 14:22', done:true, desc:'Order received and payment confirmed.' },
      { step:'Processing', date:'2 Mar, 16:10', done:true, desc:'Packed and ready for collection.' },
      { step:'Shipped', date:'3 Mar, 09:00', done:true, desc:'Collected by The Courier Guy (Ref: TCG-7714223).' },
      { step:'Out for Delivery', date:'Expected 6 Mar', done:false, desc:'Your package is en route.' },
      { step:'Delivered', date:'—', done:false, desc:'Awaiting delivery.' },
    ],
  },
};

function TrackingPage({ onNavigate }) {
  const C = '#1a4a2e', M = '#2e8b57', L = '#52b256';
  const [orderNum, setOrderNum] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

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

  const statusColor = { Delivered:'#059669', 'In Transit':'#2563eb', Processing:'#d97706' };
  const statusBg = { Delivered:'#d1fae5', 'In Transit':'#dbeafe', Processing:'#fef3c7' };

  return (
    <div>
      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg,${C},${M})`, color:'#fff', padding:'52px 24px', textAlign:'center' }}>
        <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'52px', height:'52px', background:'rgba(255,255,255,0.15)', borderRadius:'14px', marginBottom:'16px' }}>
          <Icon name="package" size={26} color="#fff" />
        </div>
        <h1 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'36px', marginBottom:'10px' }}>Track Your Order</h1>
        <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'15px', opacity:0.85, maxWidth:'450px', margin:'0 auto' }}>Enter your order number to see real-time delivery updates.</p>
      </div>

      <div style={{ maxWidth:'700px', margin:'0 auto', padding:'40px 24px 64px' }}>
        {/* Search form */}
        <div style={{ background:'white', borderRadius:'18px', padding:'28px 32px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', marginBottom:'24px' }}>
          <h2 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'17px', color:C, marginBottom:'20px' }}>Find Your Order</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            <div>
              <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#374151', marginBottom:'5px', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>Order Number *</label>
              <input value={orderNum} onChange={e => setOrderNum(e.target.value)} onKeyDown={e => e.key==='Enter' && track()}
                placeholder="e.g. KH-482910"
                style={{ width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid #e5e7eb', fontSize:'13px', color:'#1a1a1a', outline:'none', fontFamily:"'Plus Jakarta Sans', sans-serif" }}
                onFocus={e => e.target.style.borderColor=L} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
            </div>
            <div>
              <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#374151', marginBottom:'5px', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>Email Address (optional)</label>
              <input value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com" type="email"
                style={{ width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid #e5e7eb', fontSize:'13px', color:'#1a1a1a', outline:'none', fontFamily:"'Plus Jakarta Sans', sans-serif" }}
                onFocus={e => e.target.style.borderColor=L} onBlur={e => e.target.style.borderColor='#e5e7eb'} />
            </div>
            {error && (
              <div style={{ display:'flex', alignItems:'center', gap:'8px', background:'#fef2f2', borderRadius:'8px', padding:'10px 14px', border:'1.5px solid #fca5a5' }}>
                <Icon name="alert-circle" size={14} color="#dc2626" />
                <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'12px', color:'#dc2626', fontWeight:600 }}>{error}</span>
              </div>
            )}
            <button onClick={track} style={{ background: loading ? M : C, color:'#fff', border:'none', borderRadius:'12px', padding:'13px', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:"'Syne', sans-serif", display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', transition:'background 0.2s' }}>
              {loading ? <><Icon name="loader" size={16} color="#fff" /> Searching…</> : <><Icon name="search" size={16} color="#fff" /> Track Order</>}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            {/* Status card */}
            <div style={{ background:'white', borderRadius:'18px', padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'12px', marginBottom:'16px' }}>
                <div>
                  <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'18px', color:C, marginBottom:'4px' }}>{result.id}</div>
                  <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'12px', color:'#6b7280' }}>Placed {result.date} · {result.courier}</div>
                </div>
                <span style={{ background:statusBg[result.status], color:statusColor[result.status], borderRadius:'20px', padding:'6px 16px', fontSize:'12px', fontWeight:700, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>{result.status}</span>
              </div>
              <div style={{ background:'#f7f5f0', borderRadius:'10px', padding:'12px 16px', marginBottom:'12px', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:'8px' }}>
                <div>
                  <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'10px', fontWeight:600, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px' }}>Delivering To</div>
                  <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'12px', color:'#374151', marginTop:'2px' }}>{result.address}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'10px', fontWeight:600, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.5px' }}>Tracking Ref</div>
                  <div style={{ fontFamily:"'Syne', sans-serif", fontSize:'12px', fontWeight:700, color:C, marginTop:'2px' }}>{result.trackingRef}</div>
                </div>
              </div>
              {/* Items */}
              <div style={{ display:'flex', gap:'8px' }}>
                {result.items.map(item => (
                  <div key={item.name} style={{ display:'flex', alignItems:'center', gap:'10px', background:'#f0faf2', borderRadius:'10px', padding:'10px 14px', flex:1 }}>
                    <span style={{ fontSize:'24px' }}>{item.image}</span>
                    <div>
                      <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:700, fontSize:'12px', color:C }}>{item.name}</div>
                      <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'11px', color:'#6b7280' }}>Qty: {item.qty} · R{item.price.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div style={{ background:'white', borderRadius:'18px', padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'15px', color:C, marginBottom:'20px' }}>Delivery Timeline</h3>
              <div style={{ position:'relative' }}>
                {/* Vertical line */}
                <div style={{ position:'absolute', left:'15px', top:'8px', bottom:'8px', width:'2px', background:'#e5e7eb' }} />
                {result.timeline.map((t, i) => (
                  <div key={i} style={{ display:'flex', gap:'16px', marginBottom: i < result.timeline.length-1 ? '20px' : '0', position:'relative' }}>
                    <div style={{ width:'32px', height:'32px', borderRadius:'50%', background: t.done ? `linear-gradient(135deg,${L},${M})` : '#e5e7eb', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, zIndex:1, boxShadow: t.done ? `0 0 0 3px #d1fae5` : 'none' }}>
                      {t.done ? <Icon name="check" size={14} color="#fff" /> : <span style={{ width:'8px', height:'8px', background:'#9ca3af', borderRadius:'50%', display:'block' }} />}
                    </div>
                    <div style={{ paddingTop:'4px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'3px' }}>
                        <span style={{ fontFamily:"'Syne', sans-serif", fontWeight:700, fontSize:'13px', color: t.done ? C : '#9ca3af' }}>{t.step}</span>
                        <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'11px', color:'#9ca3af' }}>{t.date}</span>
                      </div>
                      <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'12px', color: t.done ? '#374151' : '#9ca3af', lineHeight:1.5 }}>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Demo hint */}
        {!result && !loading && (
          <div style={{ background:'#f7f5f0', borderRadius:'12px', padding:'14px 18px', display:'flex', alignItems:'center', gap:'10px' }}>
            <Icon name="alert-circle" size={16} color="#6b7280" />
            <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'12px', color:'#6b7280' }}>Demo: Try order numbers <strong>KH-482910</strong> (Delivered) or <strong>KH-371204</strong> (In Transit)</span>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { TrackingPage });
