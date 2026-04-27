// KiwiHub — Contact Us Page

function ContactPage({ onNavigate }) {
  const [form, setForm] = React.useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const C = '#1a4a2e', M = '#2e8b57', L = '#52b256';

  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1400);
  };

  const inputStyle = { width:'100%', padding:'11px 14px', borderRadius:'10px', border:'1.5px solid #e5e7eb', fontSize:'13px', color:'#1a1a1a', background:'#fff', outline:'none', fontFamily:"'Plus Jakarta Sans', sans-serif", transition:'border-color 0.15s' };

  return (
    <div>
      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg,${C},${M})`, color:'#fff', padding:'52px 24px', textAlign:'center' }}>
        <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'52px', height:'52px', background:'rgba(255,255,255,0.15)', borderRadius:'14px', marginBottom:'16px' }}>
          <Icon name="message-circle" size={26} color="#fff" />
        </div>
        <h1 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'36px', marginBottom:'10px' }}>Contact Us</h1>
        <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'15px', opacity:0.85, maxWidth:'500px', margin:'0 auto' }}>We're based in Harrismith, Free State. Happy to help with orders, products or anything else.</p>
      </div>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'40px 24px 64px', display:'flex', gap:'32px', alignItems:'flex-start' }}>
        {/* Form */}
        <div style={{ flex:1 }}>
          {sent ? (
            <div style={{ background:'white', borderRadius:'18px', padding:'48px 32px', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ width:'64px', height:'64px', background:'#d1fae5', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
                <Icon name="check" size={30} color="#059669" />
              </div>
              <h2 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'22px', color:C, marginBottom:'8px' }}>Message Sent!</h2>
              <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'14px', color:'#6b7280', marginBottom:'24px' }}>Thanks {form.name}! We'll get back to you within 1–2 business days.</p>
              <button onClick={() => { setSent(false); setForm({ name:'', email:'', subject:'', message:'' }); }} style={{ background:C, color:'#fff', border:'none', borderRadius:'12px', padding:'12px 28px', fontFamily:"'Syne', sans-serif", fontWeight:700, fontSize:'14px', cursor:'pointer' }}>Send Another</button>
            </div>
          ) : (
            <div style={{ background:'white', borderRadius:'18px', padding:'32px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'20px', color:C, marginBottom:'24px' }}>Send a Message</h2>
              <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                <div style={{ display:'flex', gap:'12px' }}>
                  <div style={{ flex:1 }}>
                    <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#374151', marginBottom:'5px', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>Full Name *</label>
                    <input value={form.name} onChange={set('name')} placeholder="Sipho Dlamini" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = L} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                  </div>
                  <div style={{ flex:1 }}>
                    <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#374151', marginBottom:'5px', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>Email Address *</label>
                    <input value={form.email} onChange={set('email')} type="email" placeholder="you@email.com" style={inputStyle}
                      onFocus={e => e.target.style.borderColor = L} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                  </div>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#374151', marginBottom:'5px', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>Subject</label>
                  <select value={form.subject} onChange={set('subject')} style={{ ...inputStyle }}>
                    <option value="">Select a topic…</option>
                    <option>Order Enquiry</option>
                    <option>Delivery Question</option>
                    <option>Return / Refund</option>
                    <option>Product Information</option>
                    <option>Payment Issue</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'12px', fontWeight:600, color:'#374151', marginBottom:'5px', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>Message *</label>
                  <textarea value={form.message} onChange={set('message')} placeholder="How can we help you?" rows={5}
                    style={{ ...inputStyle, resize:'vertical', minHeight:'120px' }}
                    onFocus={e => e.target.style.borderColor = L} onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
                </div>
                <button onClick={submit} style={{ background: sending ? M : C, color:'#fff', border:'none', borderRadius:'12px', padding:'14px', fontSize:'14px', fontWeight:700, cursor:'pointer', fontFamily:"'Syne', sans-serif", display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', transition:'background 0.2s' }}>
                  {sending ? <><Icon name="loader" size={16} color="#fff" /> Sending…</> : <><Icon name="mail" size={16} color="#fff" /> Send Message</>}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info cards */}
        <div style={{ width:'300px', flexShrink:0, display:'flex', flexDirection:'column', gap:'14px' }}>
          {[
            { icon:'map-pin', title:'Our Address', lines:['12 Kestrel Street', 'Harrismith, Free State', '9880, South Africa'] },
            { icon:'mail', title:'Email Us', lines:['support@kiwihub.co.za', 'We reply within 24 hours'] },
            { icon:'phone', title:'Call Us', lines:['+27 58 000 0000', 'Mon–Fri, 8am–5pm SAST'] },
            { icon:'clock', title:'Business Hours', lines:['Monday–Friday: 8am–5pm', 'Saturday: 9am–1pm', 'Sunday: Closed'] },
          ].map(card => (
            <div key={card.title} style={{ background:'white', borderRadius:'14px', padding:'18px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', display:'flex', gap:'14px', alignItems:'flex-start' }}>
              <div style={{ width:'38px', height:'38px', background:'#f0faf2', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon name={card.icon} size={18} color={C} />
              </div>
              <div>
                <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:700, fontSize:'13px', color:C, marginBottom:'4px' }}>{card.title}</div>
                {card.lines.map((l, i) => <div key={i} style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'12px', color:'#374151', lineHeight:1.6 }}>{l}</div>)}
              </div>
            </div>
          ))}
          {/* PayFast + Courier strip */}
          <div style={{ background:'#f0faf2', borderRadius:'12px', padding:'14px 16px', border:'1.5px solid #c8f5d8' }}>
            <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:700, fontSize:'12px', color:C, marginBottom:'8px' }}>Our Trusted Partners</div>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
              {['🔒 PayFast','🚚 The Courier Guy'].map(p => <span key={p} style={{ background:'white', border:'1px solid #e5e7eb', borderRadius:'6px', padding:'4px 10px', fontSize:'11px', fontFamily:"'Plus Jakarta Sans', sans-serif", color:'#374151' }}>{p}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ContactPage });
