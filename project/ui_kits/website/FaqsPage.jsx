// KiwiHub — FAQs Page

const FAQ_SECTIONS = [
  { id:'delivery', icon:'truck', title:'Delivery & Shipping', items:[
    { q:'How long does delivery take?', a:'We ship via The Courier Guy. Standard delivery takes 3–5 business days to most areas in South Africa. Remote areas may take up to 7 business days.' },
    { q:'How much does shipping cost?', a:'Shipping is a flat rate of R100 for orders under R750. Orders R750 and above qualify for FREE delivery nationwide.' },
    { q:'Do you ship to all provinces?', a:'Yes! We ship to all 9 provinces. Eastern Cape, Free State, Gauteng, KwaZulu-Natal, Limpopo, Mpumalanga, Northern Cape, North West, and Western Cape.' },
    { q:'Can I track my order?', a:'Absolutely. Once your order ships, you\'ll receive a tracking number via email. You can track it on our Order Tracking page or directly on The Courier Guy website.' },
  ]},
  { id:'payment', icon:'credit-card', title:'Payments & Security', items:[
    { q:'What payment methods do you accept?', a:'We accept Credit/Debit Cards (Visa, Mastercard, AMEX), Instant EFT via all major SA banks, SnapScan, and Mobicred (buy now, pay later). All payments are processed securely via PayFast.' },
    { q:'Is my payment information secure?', a:'Yes. All transactions are encrypted and processed by PayFast, one of South Africa\'s leading payment gateways. We never store your card details.' },
    { q:'Do you offer payment plans?', a:'Yes! You can pay over time with Mobicred. Select Mobicred at checkout and you\'ll be redirected to complete your Mobicred application if you\'re a new customer.' },
    { q:'What currency do you charge in?', a:'All prices are in South African Rand (ZAR). VAT is included in all displayed prices.' },
  ]},
  { id:'returns', icon:'rotate-ccw', title:'Returns & Refunds', items:[
    { q:'What is your return policy?', a:'We offer a 30-day hassle-free return policy. If you\'re not satisfied with your purchase, contact us within 30 days of delivery to initiate a return.' },
    { q:'How do I return an item?', a:'Email support@kiwihub.co.za with your order number and reason for return. We\'ll arrange a collection via The Courier Guy at no cost to you (for defective/incorrect items).' },
    { q:'When will I receive my refund?', a:'Refunds are processed within 5–7 business days of receiving the returned item. The amount will be credited back to your original payment method.' },
    { q:'Can I exchange an item?', a:'Yes! Contact us and we\'ll arrange an exchange for the same or equivalent item, subject to stock availability.' },
  ]},
  { id:'products', icon:'package', title:'Products & Stock', items:[
    { q:'Are your products genuine?', a:'100% yes. All products sold on KiwiHub are genuine, sourced directly from authorised distributors. All electronics come with a 1-year manufacturer warranty.' },
    { q:'What warranty do products come with?', a:'All electronics (laptops, accessories, etc.) come with a minimum 1-year manufacturer warranty. Homewear items are covered by our 30-day return policy.' },
    { q:'Do you price match?', a:'We do our best to offer the best prices. If you find a lower price on an identical item at a reputable SA retailer, contact us and we\'ll see what we can do.' },
    { q:'Can I request a product not listed?', a:'Yes! Contact us with details of the product you\'re looking for and we\'ll let you know if we can source it.' },
  ]},
  { id:'account', icon:'user', title:'My Account', items:[
    { q:'Do I need an account to shop?', a:'No, you can checkout as a guest. However, creating an account lets you track orders, save addresses, and manage your wishlist much more easily.' },
    { q:'How do I reset my password?', a:'On the Sign In page, click "Forgot password?" and enter your email address. We\'ll send you a reset link within a few minutes.' },
    { q:'Can I change my order after placing it?', a:'Orders can be amended within 2 hours of placement. After that, the order is sent to fulfilment. Contact us immediately if you need to make changes.' },
  ]},
];

function FaqsPage({ onNavigate }) {
  const [openSection, setOpenSection] = React.useState('delivery');
  const [openItem, setOpenItem] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const C = '#1a4a2e', M = '#2e8b57', L = '#52b256';

  const filtered = search.trim()
    ? FAQ_SECTIONS.map(s => ({ ...s, items: s.items.filter(i => i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase())) })).filter(s => s.items.length > 0)
    : FAQ_SECTIONS;

  return (
    <div>
      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg,${C},${M})`, color:'#fff', padding:'52px 24px', textAlign:'center' }}>
        <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'52px', height:'52px', background:'rgba(255,255,255,0.15)', borderRadius:'14px', marginBottom:'16px' }}>
          <Icon name="help-circle" size={26} color="#fff" />
        </div>
        <h1 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'36px', marginBottom:'10px' }}>Frequently Asked Questions</h1>
        <p style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'15px', opacity:0.85, maxWidth:'500px', margin:'0 auto 24px' }}>Can't find your answer? <span style={{ textDecoration:'underline', cursor:'pointer' }} onClick={() => onNavigate('contact')}>Contact our team</span></p>
        {/* Search */}
        <div style={{ position:'relative', maxWidth:'480px', margin:'0 auto' }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions…"
            style={{ width:'100%', padding:'12px 44px 12px 18px', borderRadius:'30px', border:'none', fontSize:'14px', fontFamily:"'Plus Jakarta Sans', sans-serif", color:'#1a4a2e', outline:'none' }} />
          <span style={{ position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)', color:'#40916c', display:'flex' }}>
            <Icon name="search" size={18} color={M} />
          </span>
        </div>
      </div>

      <div style={{ maxWidth:'900px', margin:'0 auto', padding:'40px 24px 64px', display:'flex', gap:'28px', alignItems:'flex-start' }}>
        {/* Sidebar nav */}
        {!search && (
          <div style={{ width:'200px', flexShrink:0 }}>
            <div style={{ background:'white', borderRadius:'14px', padding:'8px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', position:'sticky', top:'80px' }}>
              {FAQ_SECTIONS.map(s => (
                <button key={s.id} onClick={() => setOpenSection(s.id)}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px', borderRadius:'10px', border:'none', background: openSection===s.id ? '#f0faf2' : 'transparent', color: openSection===s.id ? C : '#374151', fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'12px', fontWeight: openSection===s.id ? 700 : 500, cursor:'pointer', textAlign:'left', marginBottom:'2px' }}>
                  <Icon name={s.icon} size={14} color={openSection===s.id ? C : '#6b7280'} />
                  {s.title.split(' ')[0]}
                  {openSection===s.id && <span style={{ marginLeft:'auto', color:L }}>›</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Accordion */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:'20px' }}>
          {filtered.map(section => (
            <div key={section.id}>
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
                <div style={{ width:'32px', height:'32px', background:'#f0faf2', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon name={section.icon} size={16} color={C} />
                </div>
                <h2 style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'17px', color:C }}>{section.title}</h2>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                {section.items.map((item, i) => {
                  const key = `${section.id}-${i}`;
                  const open = openItem === key;
                  return (
                    <div key={i} style={{ background:'white', borderRadius:'12px', boxShadow:'0 2px 6px rgba(0,0,0,0.05)', border: open ? `1.5px solid ${L}` : '1.5px solid transparent', overflow:'hidden', transition:'border-color 0.15s' }}>
                      <button onClick={() => setOpenItem(open ? null : key)}
                        style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'15px 18px', background:'none', border:'none', cursor:'pointer', gap:'12px' }}>
                        <span style={{ fontFamily:"'Syne', sans-serif", fontWeight:700, fontSize:'13px', color:'#1a1a1a', textAlign:'left', lineHeight:1.4 }}>{item.q}</span>
                        <span style={{ flexShrink:0, transition:'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          <Icon name="chevron-down" size={16} color={C} />
                        </span>
                      </button>
                      {open && (
                        <div style={{ padding:'0 18px 16px', fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'13px', color:'#374151', lineHeight:1.7, borderTop:'1px solid #f0f0f0', paddingTop:'12px' }}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign:'center', padding:'48px 24px', background:'white', borderRadius:'16px' }}>
              <Icon name="help-circle" size={40} color="#d1d5db" />
              <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:700, fontSize:'16px', color:C, marginTop:'12px', marginBottom:'6px' }}>No results for "{search}"</div>
              <div style={{ fontFamily:"'Plus Jakarta Sans', sans-serif", fontSize:'13px', color:'#6b7280' }}>Try different keywords or <span style={{ color:M, cursor:'pointer', fontWeight:600 }} onClick={() => onNavigate('contact')}>contact us directly</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { FaqsPage });
