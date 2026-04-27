import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, fonts, radius, shadow } from '../theme';
import Icon from '../components/ui/Icon';
import { FAQ_SECTIONS } from '../data/faqs';

export default function FaqsPage() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState('delivery');
  const [openItem, setOpenItem] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? FAQ_SECTIONS
        .map(s => ({ ...s, items: s.items.filter(i => i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase())) }))
        .filter(s => s.items.length > 0)
    : FAQ_SECTIONS;

  return (
    <div>
      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${colors.deep}, ${colors.mid})`, color: '#fff', padding: '52px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '52px', height: '52px', background: 'rgba(255,255,255,0.15)', borderRadius: '14px', marginBottom: '16px' }}>
          <Icon name="help-circle" size={26} color="#fff" />
        </div>
        <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '36px', marginBottom: '10px' }}>Frequently Asked Questions</h1>
        <p style={{ fontFamily: fonts.body, fontSize: '15px', opacity: 0.85, maxWidth: '500px', margin: '0 auto 24px' }}>
          Can't find your answer?{' '}
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/contact')}>Contact our team</span>
        </p>
        <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search questions…"
            style={{ width: '100%', padding: '12px 44px 12px 18px', borderRadius: '30px', border: 'none', fontSize: '14px', fontFamily: fonts.body, color: colors.deep, outline: 'none', boxSizing: 'border-box' }}
          />
          <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
            <Icon name="search" size={18} color={colors.mid} />
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px 64px', display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
        {/* Sidebar nav */}
        {!search && (
          <div style={{ width: '200px', flexShrink: 0 }}>
            <div style={{ background: 'white', borderRadius: '14px', padding: '8px', boxShadow: shadow.card, position: 'sticky', top: '80px' }}>
              {FAQ_SECTIONS.map(s => (
                <button
                  key={s.id}
                  onClick={() => setOpenSection(s.id)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: radius.md, border: 'none', background: openSection === s.id ? colors.light : 'transparent', color: openSection === s.id ? colors.deep : colors.textSec, fontFamily: fonts.body, fontSize: '12px', fontWeight: openSection === s.id ? 700 : 500, cursor: 'pointer', textAlign: 'left', marginBottom: '2px' }}
                >
                  <Icon name={s.icon} size={14} color={openSection === s.id ? colors.deep : colors.muted} />
                  {s.title.split(' ')[0]}
                  {openSection === s.id && <span style={{ marginLeft: 'auto', color: colors.bright }}>›</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Accordion */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filtered.map(section => (
            <div key={section.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{ width: '32px', height: '32px', background: colors.light, borderRadius: radius.sm, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={section.icon} size={16} color={colors.deep} />
                </div>
                <h2 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: '17px', color: colors.deep }}>{section.title}</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {section.items.map((item, i) => {
                  const key = `${section.id}-${i}`;
                  const open = openItem === key;
                  return (
                    <div
                      key={i}
                      style={{ background: 'white', borderRadius: radius.lg, boxShadow: '0 2px 6px rgba(0,0,0,0.05)', border: open ? `1.5px solid ${colors.bright}` : '1.5px solid transparent', overflow: 'hidden', transition: 'border-color 0.15s' }}
                    >
                      <button
                        onClick={() => setOpenItem(open ? null : key)}
                        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 18px', background: 'none', border: 'none', cursor: 'pointer', gap: '12px' }}
                      >
                        <span style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '13px', color: colors.text, textAlign: 'left', lineHeight: 1.4 }}>{item.q}</span>
                        <span style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          <Icon name="chevron-down" size={16} color={colors.deep} />
                        </span>
                      </button>
                      {open && (
                        <div style={{ padding: '0 18px 16px', fontFamily: fonts.body, fontSize: '13px', color: colors.textSec, lineHeight: 1.7, borderTop: `1px solid #f0f0f0`, paddingTop: '12px' }}>
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
            <div style={{ textAlign: 'center', padding: '48px 24px', background: 'white', borderRadius: '16px' }}>
              <Icon name="help-circle" size={40} color={colors.border} />
              <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: '16px', color: colors.deep, marginTop: '12px', marginBottom: '6px' }}>No results for "{search}"</div>
              <div style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.muted }}>
                Try different keywords or{' '}
                <span style={{ color: colors.mid, cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate('/contact')}>contact us directly</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
