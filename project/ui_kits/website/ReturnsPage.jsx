// KiwiHub — Returns Page

function ReturnsPage({ onNavigate }) {
  const C = '#1a4a2e', M = '#2e8b57', L = '#52b256';
  const steps = [
    { n:1, icon:'mail', title:'Contact Us', desc:'Email support@kiwihub.co.za with your order number and the reason for return. We\'ll respond within 1 business day.' },
    { n:2, icon:'package', title:'Pack Your Item', desc:'Pack the item securely in its original packaging where possible. Include a note with your order number inside the box.' },
    { n:3, icon:'truck', title:'We Collect', desc:'For defective or incorrect items, we\'ll arrange a FREE collection via The Courier Guy at a time that suits you.' },
    { n:4, icon:'check', title:'Refund Issued', desc:'Once we receive and inspect the item, your refund will be processed within 5–7 business days to your original payment method.' },
  ];

  const eligible = ['Defective or damaged products', 'Incorrect item received', 'Item not as described on the website', 'Unopened products within 30 days'];
  const notEligible = ['Products damaged by misuse or accident', 'Items returned after 30 days', 'Opened software or digital products', 'Items missing original packaging (for change-of-mind returns)'];

  return (
    <div>
      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg,${C},${M})`, color:'#fff', padding:'52px 24px', textAlign:'center' }}>
        <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'52px', height:'52px', background:'rgba(255,255,255,0.15)', borderRadius:'14px', marginBottom:'16px' }}>
          <Icon name="rotate-ccw" size={26} color="#fff" />
        </div>
        <h1 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'36px', marginBottom:'10px' }}>Returns & Refunds</h1>
        <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'15px', opacity:0.85, maxWidth:'500px', margin:'0 auto' }}>We want you to be 100% happy with your purchase. Our 30-day return policy makes it easy.</p>
      </div>

      <div style={{ maxWidth:'900px', margin:'0 auto', padding:'40px 24px 64px' }}>
        {/* Steps */}
        <h2 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'22px', color:C, marginBottom:'24px' }}>How to Return an Item</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px', marginBottom:'40px' }}>
          {steps.map(s => (
            <div key={s.n} style={{ background:'white', borderRadius:'16px', padding:'20px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', position:'relative' }}>
              <div style={{ width:'36px', height:'36px', background:`linear-gradient(135deg,${L},${M})`, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'12px' }}>
                <Icon name={s.icon} size={18} color="#fff" />
              </div>
              <div style={{ position:'absolute', top:'16px', right:'16px', fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'28px', color:'#f0faf2', lineHeight:1 }}>{s.n}</div>
              <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:700, fontSize:'14px', color:C, marginBottom:'6px' }}>{s.title}</div>
              <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'12px', color:'#6b7280', lineHeight:1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Eligibility */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', marginBottom:'32px' }}>
          <div style={{ background:'white', borderRadius:'16px', padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
              <div style={{ width:'32px', height:'32px', background:'#d1fae5', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name="check" size={16} color="#059669" />
              </div>
              <h3 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'15px', color:'#059669' }}>Eligible for Return</h3>
            </div>
            {eligible.map(e => (
              <div key={e} style={{ display:'flex', gap:'10px', marginBottom:'8px', alignItems:'flex-start' }}>
                <Icon name="check" size={14} color="#059669" style={{ marginTop:'2px', flexShrink:0 }} />
                <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'13px', color:'#374151', lineHeight:1.5 }}>{e}</span>
              </div>
            ))}
          </div>
          <div style={{ background:'white', borderRadius:'16px', padding:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
              <div style={{ width:'32px', height:'32px', background:'#fee2e2', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name="x" size={16} color="#dc2626" />
              </div>
              <h3 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'15px', color:'#dc2626' }}>Not Eligible</h3>
            </div>
            {notEligible.map(e => (
              <div key={e} style={{ display:'flex', gap:'10px', marginBottom:'8px', alignItems:'flex-start' }}>
                <Icon name="x" size={14} color="#dc2626" style={{ marginTop:'2px', flexShrink:0 }} />
                <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'13px', color:'#374151', lineHeight:1.5 }}>{e}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ background:'#f0faf2', borderRadius:'16px', padding:'24px', border:'1.5px solid #c8f5d8', marginBottom:'24px' }}>
          <h3 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'15px', color:C, marginBottom:'14px' }}>Refund Timeline</h3>
          {[
            { label:'Return request approved', time:'Within 1 business day' },
            { label:'Collection arranged', time:'Within 2 business days' },
            { label:'Item received & inspected', time:'3–5 business days' },
            { label:'Refund processed', time:'5–7 business days after inspection' },
          ].map((t, i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom: i < 3 ? '1px solid #d1fae5' : 'none' }}>
              <span style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'13px', color:'#374151', fontWeight:500 }}>{t.label}</span>
              <span style={{ fontFamily:"'Syne', sans-serif", fontSize:'12px', fontWeight:700, color:C }}>{t.time}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background:`linear-gradient(135deg,${C},${M})`, borderRadius:'16px', padding:'28px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px' }}>
          <div>
            <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'18px', color:'#fff', marginBottom:'4px' }}>Ready to start a return?</div>
            <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'13px', color:'#c8f5d8' }}>Our team will guide you through the process.</div>
          </div>
          <button onClick={() => onNavigate('contact')} style={{ background:'#fff', color:C, border:'none', borderRadius:'12px', padding:'12px 24px', fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'14px', cursor:'pointer', display:'flex', alignItems:'center', gap:'8px' }}>
            <Icon name="mail" size={16} color={C} /> Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ReturnsPage });
