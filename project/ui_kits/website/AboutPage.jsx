// KiwiHub — About Us Page

function AboutPage({ onNavigate }) {
  const C = '#1a4a2e', M = '#2e8b57', L = '#52b256';

  const values = [
    { icon:'shield', title:'Trust First', desc:'Every product is genuine, every transaction secured, every customer respected. No shortcuts.' },
    { icon:'map-pin', title:'South African', desc:'Born in Harrismith, Free State. We understand the unique needs of South African shoppers.' },
    { icon:'truck', title:'Nationwide Reach', desc:'We ship to every corner of SA via The Courier Guy — from Cape Town to Limpopo.' },
    { icon:'heart', title:'Community Driven', desc:'We\'re not just a store — we\'re part of the communities we serve. Your support keeps us local.' },
  ];

  const stats = [
    { value:'5,000+', label:'Happy Customers' },
    { value:'9', label:'Provinces Served' },
    { value:'3–5 Days', label:'Average Delivery' },
    { value:'30 Days', label:'Return Window' },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg,${C},${M})`, color:'#fff', padding:'72px 24px', textAlign:'center' }}>
        <div style={{ width:'64px', height:'64px', background:'rgba(255,255,255,0.15)', borderRadius:'18px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', fontSize:'32px' }}>🥝</div>
        <h1 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'42px', marginBottom:'14px', lineHeight:1.1 }}>South Africa's Fresh<br/>Online Store</h1>
        <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'16px', opacity:0.85, maxWidth:'560px', margin:'0 auto', lineHeight:1.7 }}>
          KiwiHub was built with one mission — to make quality tech, accessories and homewear accessible to every South African, no matter where they live.
        </p>
      </div>

      {/* Stats strip */}
      <div style={{ background:'white', borderBottom:'1px solid #e5e7eb' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto', padding:'28px 24px', display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:'20px' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'30px', color:C }}>{s.value}</div>
              <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'12px', color:'#6b7280', marginTop:'2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:'900px', margin:'0 auto', padding:'48px 24px 64px' }}>
        {/* Story */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', marginBottom:'56px', alignItems:'center' }}>
          <div>
            <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'11px', fontWeight:600, color:M, textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:'10px' }}>Our Story</div>
            <h2 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'28px', color:C, marginBottom:'16px', lineHeight:1.2 }}>Born in Harrismith, Built for All of SA</h2>
            <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'14px', color:'#374151', lineHeight:1.8, marginBottom:'14px' }}>
              KiwiHub started from a simple observation: great tech and quality homewear was hard to find — and expensive to ship — if you didn't live in a major city. We decided to fix that.
            </p>
            <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'14px', color:'#374151', lineHeight:1.8, marginBottom:'14px' }}>
              Based in Harrismith, Free State, we know what it means to feel overlooked by the big retailers. That's why we ship nationwide, price fairly, and back every purchase with genuine support.
            </p>
            <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'14px', color:'#374151', lineHeight:1.8 }}>
              Our kiwi logo is no accident — just like the fruit, we're fresh, packed with goodness, and bring a little brightness to everyday life.
            </p>
          </div>
          <div style={{ background:`linear-gradient(135deg,#f0faf2,#e8f5e9)`, borderRadius:'20px', height:'300px', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'12px' }}>
            <div style={{ fontSize:'72px' }}>🥝</div>
            <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'20px', color:C }}>KiwiHub</div>
            <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'12px', color:M }}>Harrismith, Free State</div>
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom:'48px' }}>
          <div style={{ textAlign:'center', marginBottom:'28px' }}>
            <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'11px', fontWeight:600, color:M, textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:'8px' }}>What We Stand For</div>
            <h2 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'26px', color:C }}>Our Values</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px' }}>
            {values.map(v => (
              <div key={v.title} style={{ background:'white', borderRadius:'16px', padding:'24px 18px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', textAlign:'center' }}>
                <div style={{ width:'48px', height:'48px', background:'#f0faf2', borderRadius:'14px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 14px' }}>
                  <Icon name={v.icon} size={22} color={C} />
                </div>
                <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'14px', color:C, marginBottom:'8px' }}>{v.title}</div>
                <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'12px', color:'#6b7280', lineHeight:1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div style={{ background:'#f0faf2', borderRadius:'18px', padding:'32px', textAlign:'center', border:'1.5px solid #c8f5d8' }}>
          <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'11px', fontWeight:600, color:M, textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:'10px' }}>Our Trusted Partners</div>
          <h3 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'20px', color:C, marginBottom:'20px' }}>Powered by South Africa's Best</h3>
          <div style={{ display:'flex', justifyContent:'center', gap:'24px', flexWrap:'wrap' }}>
            {[
              { icon:'lock', label:'PayFast', desc:'Secure payments' },
              { icon:'truck', label:'The Courier Guy', desc:'Nationwide delivery' },
            ].map(p => (
              <div key={p.label} style={{ background:'white', borderRadius:'14px', padding:'20px 32px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', display:'flex', alignItems:'center', gap:'14px' }}>
                <div style={{ width:'40px', height:'40px', background:'#f0faf2', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon name={p.icon} size={20} color={C} />
                </div>
                <div style={{ textAlign:'left' }}>
                  <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'15px', color:C }}>{p.label}</div>
                  <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'11px', color:'#6b7280' }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign:'center', marginTop:'40px' }}>
          <button onClick={() => onNavigate('shop')} style={{ background:C, color:'#fff', border:'none', borderRadius:'30px', padding:'14px 36px', fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'15px', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:'10px' }}>
            <Icon name="store" size={18} color="#fff" /> Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AboutPage });
