// KiwiHub — Navbar Component (uses Icon from Icons.jsx)

function KHNavbar({ cartCount = 0, onCartClick, currentPage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const C = '#1a4a2e', M = '#2e8b57', L = '#52b256';

  const links = [
    { label:'Home', page:'home' },
    { label:'Shop', page:'shop' },
    { label:'About', page:'about' },
    { label:'Contact', page:'contact' },
  ];

  return (
    <div>
      {/* Announcement bar */}
      <div style={{ background:C, color:'#c8f5d8', textAlign:'center', padding:'7px 12px', fontSize:'12px', fontFamily:"'Plus Jakarta Sans', sans-serif", display:'flex', alignItems:'center', justifyContent:'center', gap:'20px' }}>
        <span style={{ display:'flex', alignItems:'center', gap:'6px' }}><Icon name="truck" size={13} color="#c8f5d8" /> FREE delivery on orders over R750</span>
        <span style={{ opacity:0.4 }}>|</span>
        <span style={{ display:'flex', alignItems:'center', gap:'6px' }}><Icon name="lock" size={13} color="#c8f5d8" /> Secure payments via PayFast</span>
      </div>
      {/* Navbar */}
      <nav style={{ background:'#fff', boxShadow:'0 2px 12px rgba(0,0,0,0.08)', position:'sticky', top:0, zIndex:200 }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'center', gap:'14px', height:'68px' }}>
          {/* Logo */}
          <button onClick={() => onNavigate('home')} style={{ display:'flex', alignItems:'center', gap:'8px', background:'none', border:'none', cursor:'pointer', flexShrink:0, padding:0 }}>
            <div style={{ width:'38px', height:'38px', background:`linear-gradient(135deg,${L},${C})`, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', boxShadow:'0 4px 16px rgba(82,178,86,0.3)' }}>🥝</div>
            <div style={{ fontFamily:"'Syne', sans-serif", fontWeight:800, fontSize:'18px', color:C }}>KiwiHub</div>
          </button>
          {/* Search */}
          <div style={{ flex:1, position:'relative', maxWidth:'480px' }}>
            <input placeholder="Search laptops, accessories, homewear…"
              style={{ width:'100%', padding:'9px 40px 9px 16px', borderRadius:'24px', border:'2px solid #e8f5e9', background:'#f7fdf8', fontSize:'13px', fontFamily:"'Plus Jakarta Sans', sans-serif", color:C, outline:'none' }} />
            <span style={{ position:'absolute', right:'13px', top:'50%', transform:'translateY(-50%)', display:'flex', alignItems:'center' }}>
              <Icon name="search" size={16} color={M} />
            </span>
          </div>
          {/* Links */}
          <div style={{ display:'flex', alignItems:'center', gap:'4px' }}>
            {links.map(l => (
              <button key={l.page} onClick={() => onNavigate(l.page)}
                style={{ background: currentPage===l.page ? '#f0faf2' : 'none', border:'none', color: currentPage===l.page ? C : '#374151', fontSize:'13px', fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight: currentPage===l.page ? 700 : 500, cursor:'pointer', padding:'7px 12px', borderRadius:'8px', transition:'all 0.15s' }}>
                {l.label}
              </button>
            ))}
            {/* Account */}
            <button onClick={() => onNavigate('account')} style={{ display:'flex', alignItems:'center', gap:'6px', background: currentPage==='account' ? '#f0faf2' : 'none', border:'none', color: currentPage==='account' ? C : '#374151', fontSize:'13px', fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:500, cursor:'pointer', padding:'7px 12px', borderRadius:'8px', transition:'all 0.15s' }}>
              <Icon name="user" size={15} color={currentPage==='account' ? C : '#374151'} /> Account
            </button>
            {/* Cart */}
            <button onClick={onCartClick}
              style={{ display:'flex', alignItems:'center', gap:'6px', background:C, color:'white', border:'none', borderRadius:'24px', padding:'9px 16px', fontSize:'13px', fontFamily:"'Plus Jakarta Sans', sans-serif", fontWeight:600, cursor:'pointer', marginLeft:'4px' }}>
              <Icon name="cart" size={15} color="#fff" />
              Cart {cartCount > 0 && <span style={{ background:L, borderRadius:'10px', padding:'1px 7px', fontSize:'11px' }}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

Object.assign(window, { KHNavbar });
