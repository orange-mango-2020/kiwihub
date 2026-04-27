// KiwiHub — Footer Component (uses Icon from Icons.jsx)

function KHFooter({ onNavigate }) {
  const C = '#1a4a2e', M = '#2e8b57', L = '#52b256', G = '#c8971f';
  const links = {
    Shop: [
      { label:'Laptops', page:'shop', cat:'Laptops' },
      { label:'PC Accessories', page:'shop', cat:'PC Accessories' },
      { label:'Phone Accessories', page:'shop', cat:'Phone Accessories' },
      { label:'Homewear', page:'shop', cat:'Homewear' },
      { label:'All Deals', page:'shop' },
    ],
    Help: [
      { label:'FAQs', page:'faqs' },
      { label:'Returns', page:'returns' },
      { label:'Order Tracking', page:'tracking' },
      { label:'Contact Us', page:'contact' },
    ],
    Company: [
      { label:'About Us', page:'about' },
      { label:'Privacy Policy', page:'home' },
      { label:'Terms & Conditions', page:'home' },
    ],
  };

  const payments = [
    { icon:'credit-card', label:'Card' },
    { icon:'landmark', label:'EFT' },
    { icon:'smartphone', label:'SnapScan' },
    { icon:'wallet', label:'Mobicred' },
  ];

  return (
    <footer style={{ background:'#111827', color:'#fff', padding:'48px 24px 24px', marginTop:'48px' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        {/* Top grid */}
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'32px', marginBottom:'40px' }}>
          {/* Brand col */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'14px' }}>
              <div style={{ width:'36px', height:'36px', background:`linear-gradient(135deg,${L},${C})`, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'18px' }}>🥝</div>
              <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'18px', color:'#fff' }}>KiwiHub</div>
            </div>
            <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'12px', color:'#9ca3af', lineHeight:1.7, marginBottom:'16px', maxWidth:'240px' }}>
              South Africa's fresh online store. Born in Harrismith, Free State. Quality tech, accessories and homewear delivered nationwide.
            </p>
            {/* Trust badges */}
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
              {[{icon:'lock', label:'PayFast'}, {icon:'truck', label:'Courier Guy'}].map(p => (
                <div key={p.label} style={{ display:'flex', alignItems:'center', gap:'5px', background:'rgba(255,255,255,0.07)', borderRadius:'8px', padding:'5px 10px' }}>
                  <Icon name={p.icon} size={12} color="#9ca3af" />
                  <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'11px', color:'#9ca3af' }}>{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:700, fontSize:'13px', color:'#fff', marginBottom:'12px' }}>{section}</div>
              {items.map(item => (
                <div key={item.label} onClick={() => onNavigate(item.page, item.cat ? { category: item.cat } : undefined)}
                  style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'12px', color:'#9ca3af', marginBottom:'8px', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px', transition:'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color='#c8f5d8'}
                  onMouseLeave={e => e.currentTarget.style.color='#9ca3af'}>
                  <Icon name="chevron-right" size={11} color="#4b5563" /> {item.label}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div style={{ borderTop:'1px solid #1f2937', paddingTop:'24px', marginBottom:'24px' }}>
          <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'11px', color:'#6b7280', marginBottom:'10px', textTransform:'uppercase', letterSpacing:'0.5px' }}>We Accept</div>
          <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
            {payments.map(p => (
              <div key={p.label} style={{ display:'flex', alignItems:'center', gap:'6px', background:'rgba(255,255,255,0.06)', borderRadius:'8px', padding:'7px 12px', border:'1px solid rgba(255,255,255,0.08)' }}>
                <Icon name={p.icon} size={14} color="#9ca3af" />
                <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'11px', color:'#9ca3af' }}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid #1f2937', paddingTop:'20px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px' }}>
          <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'11px', color:'#6b7280' }}>
            © 2026 KiwiHub (Pty) Ltd · Harrismith, Free State, South Africa · All rights reserved
          </div>
          <div style={{ display:'flex', gap:'16px' }}>
            {['Privacy Policy','Terms & Conditions'].map(l => (
              <span key={l} style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'11px', color:'#6b7280', cursor:'pointer', transition:'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color='#c8f5d8'}
                onMouseLeave={e => e.currentTarget.style.color='#6b7280'}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { KHFooter });
