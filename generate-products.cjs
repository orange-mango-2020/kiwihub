/**
 * Product generator — reads scraped JSON, applies tiered GP%, outputs src/data/products.js
 * Tiered GP:  Gaming PCs 20%  |  Laptops/Desktops 25%  |  SSDs/Storage 30%  |  Accessories 35%
 */
const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(
  '/root/.claude/uploads/2ecf47f7-009b-4c42-b0d7-034c79848ff7/9ec81ae9-products_raw.json',
  'utf8'
));

// ── Classification ────────────────────────────────────────────────────────────

function classify(name) {
  const n = name.toLowerCase();

  // Gaming PCs first
  if (n.includes('pre-built gaming pc') || n.includes('gaming pc')) return 'gaming';

  // Laptop keywords
  const laptopKw = [
    'macbook', 'thinkpad', 'elitebook', 'probook', 'ideapad',
    'latitude ', 'vostro 3', 'vostro 5', 'v14 ', 'v15 g',
  ];
  if (laptopKw.some(k => n.includes(k))) return 'laptop';

  // HP "NNN G" portable laptops (e.g. "HP 450 G3", "HP 440 G8")
  // ProDesk are desktops and are caught later, so this catches remainders
  if (/^hp \d{3} g\d/.test(n)) return 'laptop';

  // SSD / storage (not enclosures)
  if ((n.includes('ssd') || n.includes('solid state')) && n.includes('sata') && !n.includes('enclosure')) return 'ssd';

  // Desktop keywords
  const desktopKw = [
    'prodesk', 'thinkcentre', 'mac mini', 'imac', 'optiplex',
    'mecer tower', 'proline tower', 'tower pc', 'mini tower',
    'sff ', ' sff', 'combo |', '| combo', 'tiny pc', 'tiny intel',
    'aio |', '| aio', 'all in one',
  ];
  if (desktopKw.some(k => n.includes(k))) return 'desktop';

  // Also catch ThinkCentre combos and towers
  if (n.includes('thinkcentre') || n.includes('thinkcenter')) return 'desktop';

  return 'accessory';
}

function getCategory(type) {
  return { laptop: 'Laptops', desktop: 'Desktops', gaming: 'Gaming PCs', ssd: 'PC Accessories', accessory: 'PC Accessories' }[type];
}

function applyGP(cents, type) {
  const r = cents / 100;
  const gp = { gaming: 0.20, laptop: 0.25, desktop: 0.25, ssd: 0.30, accessory: 0.35 }[type] || 0.35;
  return prettyPrice(Math.ceil(r / (1 - gp)));
}

// Round up to nearest retail price (ends in 9, 99, 499, 999, etc.)
function prettyPrice(price) {
  let step;
  if      (price <   100) step =   10;
  else if (price <  1000) step =   50;
  else if (price <  5000) step =  100;
  else if (price < 10000) step =  500;
  else                    step = 1000;

  const base = Math.ceil(price / step) * step;
  const candidate = base - 1;
  // ensure we never go below the raw price
  return candidate >= price ? candidate : base - 1 + step;
}

// ── Brand extraction ──────────────────────────────────────────────────────────

function extractBrand(name) {
  const n = name.toLowerCase();
  const map = [
    ['hp ', 'HP'], ['dell ', 'Dell'], ['lenovo ', 'Lenovo'], ['apple ', 'Apple'],
    ['astrum ', 'Astrum'], ['cooler master', 'Cooler Master'], ['deepcool', 'DeepCool'],
    ['deep cool', 'DeepCool'], ['pcbuilder', 'PCBuilder'], ['pc builder', 'PCBuilder'],
    ['netac ', 'Netac'], ['mikuso ', 'Mikuso'], ['onten ', 'Onten'],
    ['andowl ', 'Andowl'], ['gs cool', 'GS Cool'], ['mecer ', 'Mecer'],
    ['proline ', 'Proline'], ['intel core', 'Intel'], ['ap-link', 'AP-Link'],
    ['hk 6800', 'HK'], ['kb450', 'Generic'], ['pre-built gaming', 'Custom Build'],
  ];
  for (const [k, v] of map) if (n.startsWith(k) || n.includes(k)) return v;
  return 'Generic';
}

// ── Description + Highlights ──────────────────────────────────────────────────

function cleanDesc(desc, name) {
  if (!desc) return name;
  const lines = desc.split('\n').map(l => l.trim()).filter(l => l.length > 15);
  const text = lines.join(' ').replace(/\s+/g, ' ').trim();
  return text.slice(0, 280);
}

function generateHighlights(name, type) {
  const n = name;
  const nl = n.toLowerCase();
  const h = [];

  const proc = n.match(/Intel[®\s]+Core[™\s]+([a-zA-Z0-9-]+)/i)
    || n.match(/(AMD\s+Ryzen\s+\d\s+\d+)/i);
  if (proc) h.push(proc[0].replace(/[®™]/g, '').replace(/\s{2,}/g, ' ').trim());

  const ram = n.match(/(\d+GB\s+DDR[34L]?\s*RAM)/i);
  if (ram) h.push(ram[0]);

  if (type === 'gaming') {
    const gpu = n.match(/(GTX\s+\d+[A-Z\s]*\d*GB|RX\s*\d+[A-Z\s]*\d*GB|Quadro\s+P\d+\s*\d*GB)/i);
    if (gpu) h.push(gpu[0].trim() + ' Graphics');
  }

  if (nl.includes('windows 11')) h.push('Windows 11 Professional');
  else if (nl.includes('windows 10')) h.push('Windows 10 Professional');
  else if (nl.includes('macos') || nl.includes('macOS')) h.push('macOS Installed');

  if ((type === 'laptop' || type === 'desktop') && !nl.includes('new')) h.push('Professionally Refurbished');
  if (type === 'gaming') h.push('Pre-Built & Ready to Use');

  return h.slice(0, 4);
}

function generateSpecs(name, type) {
  const specs = [];
  const n = name;

  const proc = n.match(/Intel[®\s]+Core[™\s]+([a-zA-Z0-9-]+)/i)
    || n.match(/(AMD\s+Ryzen\s+\d\s+\d+)/i);
  if (proc) specs.push({ label: 'Processor', value: proc[0].replace(/[®™]/g, '').replace(/\s{2,}/g, ' ').trim() });

  const ram = n.match(/(\d+GB\s+DDR[34L]?)/i);
  if (ram) specs.push({ label: 'RAM', value: ram[0] });

  const os = n.match(/(Windows\s+\d+[A-Za-z\s]+|macOS\s+[A-Za-z]+)/i);
  if (os) specs.push({ label: 'OS', value: os[0].trim() });

  if (type === 'gaming') {
    const gpu = n.match(/(GTX\s+\d+[A-Z\s]*\d*GB|RX[\s\d]+[A-Z\s]*\d*GB|Quadro\s+P\d+\s*\d*GB)/i);
    if (gpu) specs.push({ label: 'Graphics', value: gpu[0].trim() });
  }

  if (type === 'laptop' || type === 'desktop') specs.push({ label: 'Condition', value: 'Professionally Refurbished' });

  return specs;
}

// ── Deterministic rating / review / stock ─────────────────────────────────────

function seed(id, min, max) {
  // Simple deterministic spread based on id
  const v = ((id * 6301 + 13) % 97) / 97;
  return min + v * (max - min);
}

function getRating(type, id) {
  const ranges = { laptop: [4.2, 4.8], desktop: [4.0, 4.7], gaming: [4.4, 4.9], ssd: [4.3, 4.8], accessory: [3.9, 4.7] };
  const [lo, hi] = ranges[type] || [4.0, 4.6];
  return Math.round(seed(id, lo, hi) * 10) / 10;
}

function getReviews(type, id) {
  const ranges = { laptop: [8, 82], desktop: [4, 38], gaming: [9, 52], ssd: [18, 95], accessory: [14, 130] };
  const [lo, hi] = ranges[type] || [5, 50];
  return Math.floor(seed(id + 1, lo, hi));
}

function getStock(type, id) {
  const ranges = { laptop: [3, 9], desktop: [2, 7], gaming: [2, 5], ssd: [5, 22], accessory: [8, 45] };
  const [lo, hi] = ranges[type] || [3, 12];
  return Math.floor(seed(id + 2, lo, hi));
}

function getBadge(name, price, type) {
  const n = name.toLowerCase();
  if (n.includes('new sealed') || n.includes('brand new')) return 'NEW';
  if (type === 'gaming') return null;
  if (price >= 10000) return null;
  if (n.includes('apple macbook') && price < 5000) return 'GREAT VALUE';
  return null;
}

// ── Main ──────────────────────────────────────────────────────────────────────

const products = [];
let id = 1;

for (const p of raw) {
  if (!p.price || p.price === 0) continue; // skip zero-priced

  const type = classify(p.name);
  const price = applyGP(p.price, type);
  const category = getCategory(type);
  const brand = extractBrand(p.name);
  const rating = getRating(type, id);
  const reviews = getReviews(type, id);
  const stockCount = getStock(type, id);
  const badge = getBadge(p.name, price, type);
  const highlights = generateHighlights(p.name, type);
  const specs = generateSpecs(p.name, type);
  const description = cleanDesc(p.description, p.name);

  products.push({
    id,
    name: p.name,
    brand,
    category,
    price,
    originalPrice: null,
    image: p.image || '',
    images: p.images || (p.image ? [p.image] : []),
    badge,
    inStock: true,
    stockCount,
    rating,
    reviews,
    description,
    highlights: highlights.length ? highlights : [p.name.split('|')[0].trim()],
    specs,
    sourceUrl: p.sourceUrl || '',
  });

  id++;
}

// ── Output ────────────────────────────────────────────────────────────────────

const lines = [
  '// Auto-generated — do not edit manually. Run generate-products.js to regenerate.',
  '// Prices include tiered GP markup: Gaming 20% | Laptops/Desktops 25% | SSDs 30% | Accessories 35%',
  '',
  'export const PRODUCTS = [',
  ...products.map(p => '  ' + JSON.stringify(p) + ','),
  '];',
  '',
  "export const CATEGORIES = ['All', 'Laptops', 'Desktops', 'Gaming PCs', 'PC Accessories', 'Phone Accessories', 'Homewear'];",
  '',
  'export function getProductById(id) {',
  '  return PRODUCTS.find(p => p.id === Number(id));',
  '}',
  '',
  'export function getRelated(product, limit = 4) {',
  '  return PRODUCTS',
  '    .filter(p => p.id !== product.id && p.category === product.category)',
  '    .slice(0, limit);',
  '}',
  '',
];

const outPath = path.join(__dirname, 'src/data/products.js');
fs.writeFileSync(outPath, lines.join('\n'), 'utf8');

// Summary
const byCategory = {};
for (const p of products) byCategory[p.category] = (byCategory[p.category] || 0) + 1;
console.log(`✅ Generated ${products.length} products → ${outPath}`);
for (const [cat, count] of Object.entries(byCategory).sort()) {
  console.log(`   ${cat}: ${count}`);
}
