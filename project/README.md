# KiwiHub Design System

> **KiwiHub** — South Africa's Fresh Online Store  
> Domain: kiwihub.co.za | Platform: WordPress + WooCommerce + Elementor  
> Based in Harrismith, Free State. Ships nationwide via The Courier Guy.

## About KiwiHub

KiwiHub is a South African e-commerce store built with one mission: make quality tech, accessories and homewear accessible to every South African, no matter where they live. Secure PayFast payments. Flat-rate R100 shipping, free over R1000.

**Products:** Laptops, Desktops & PCs, Phone Accessories, PC Accessories, Homewear  
**Currency:** ZAR (South African Rand)

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React + Vite |
| Hosting | Vercel |
| Source control | GitHub (`Orange-Mango-2020/kiwi-hub.co.za`) |
| Payments | PayFast |
| Courier | The Courier Guy |
| Auth / DB | TBD (Supabase or Firebase recommended) |

> **No WordPress. No WooCommerce. No Elementor.** Pure React, deployed via Vercel on every push to `main`.

## Sources

- **GitHub Repo:** `Orange-Mango-2020/kiwi-hub.co.za` (React + Vite app, main branch)
  - Pages: Home, Shop, Product, Cart, Checkout, Account, Contact, Tracking, FAQs, About
  - No Figma link provided
- **Assets imported:** `public/favicon.svg`, `public/icons.svg`, `src/assets/hero.png`

---

## Content Fundamentals

### Tone & Voice
- **Direct and friendly** — speaks to South Africans in plain language
- **You-first** — always addresses the customer as "you" (not "I" or "we" heavy)
- **Locally grounded** — references SA-specific details (Harrismith, Free State, Courier Guy, PayFast, provinces)
- **Practical** — emphasises value: savings, free delivery thresholds, warranty, returns
- **Trust-building** — security, verification, courier tracking are called out explicitly

### Copy Examples
- Announcement bar: *"🚚 FREE delivery on orders over R750 | 🔒 Secure payments via PayFast"*
- CTA: *"Shop Now →"*, *"Proceed to Checkout →"*, *"Track My Order 📦"*
- Empty state: *"Looks like you haven't added anything yet."*
- Success: *"🎉 You qualify for FREE delivery!"*
- Product highlight: *"512GB SSD — No more waiting"*

### Casing
- **Headings:** Title Case (e.g. "Premium Tech & Home Essentials")
- **Navigation / labels:** Title Case
- **Body / descriptions:** Sentence case
- **Badges / tags:** ALL CAPS (e.g. "HOT DEAL", "VERIFIED")
- **Brand name:** KiwiHub (always one word, capital K and H)

### Emoji Usage
- Used **functionally** — to reinforce meaning: 🚚 delivery, 🔒 security, 📦 orders, ❤️ wishlist, 🥝 logo
- Light touch — 1–2 per UI element max, never decorative filler
- Used in announcement bars, trust badges, nav labels, CTAs, empty states

### Numbers & Currency
- Always ZAR, always `R` prefix with no space: `R8,999`
- Thousands separators used: `R1,000`
- Discount shown as both `%` off badge and `You save R…` message

---

## Visual Foundations

### Color System
See `colors_and_type.css` for full CSS variables.

| Role | Hex | Usage |
|------|-----|-------|
| Deep Green | `#1a4a2e` | Primary brand, navbar logo, headings, CTA buttons, prices |
| Mid Green | `#40916c` | Secondary links, breadcrumbs, brand accents |
| Light Green | `#5cb85c` | Cart badge, progress fill, logo gradient end |
| Cream BG | `#f7f5f0` | Page background |
| Light Green BG | `#f0faf2` | Product image wells, price boxes, highlight chips |
| Green Tint | `#e8f5e9` | Search input bg, subtle borders |
| Mint | `#c8f5d8` | Scrollbar, coupon success, light accents |
| Text Dark | `#1a1a1a` | Product names, main body text |
| Text Mid | `#374151` | Secondary labels, specs, descriptions |
| Text Muted | `#6b7280` | Captions, dates, helper text |
| Text Ghost | `#9ca3af` | Placeholders, read-only text |
| Border | `#e5e7eb` | Card borders, input borders, dividers |
| Error | `#dc2626` | Validation, remove buttons, out of stock |
| Warning | `#f59e0b` | Star ratings, delivery progress |
| Success | `#059669` | Verified badges, in-stock, free delivery |
| Announcement BG | `#1a4a2e` | Top bar; same as brand primary |
| Announcement Text | `#c8f5d8` | Mint on dark green |

### Typography
- **Heading font:** Syne (Google Fonts) — weights 400, 600, 700, 800
  - Used for: product names, section titles, prices, CTA buttons, logo wordmark, tab labels
  - Sizes: 56px (hero H1) → 32px → 24px → 18px → 14px → 12px
- **Body font:** Plus Jakarta Sans (Google Fonts) — weights 300, 400, 500, 600
  - Used for: body copy, labels, captions, breadcrumbs, form fields, nav links
  - Base size: 13–14px; line-height ~1.6–1.7

### Backgrounds & Surfaces
- **Page:** Cream `#f7f5f0` — all pages
- **Cards:** White `#fff`, borderRadius 14–20px, `box-shadow: 0 2px 8px rgba(0,0,0,0.06)`
- **Product image wells:** `linear-gradient(135deg, #f0faf2, #e8f5e9)` soft green gradient
- **Hero:** `linear-gradient(135deg, #1a4a2e, #40916c)` dark-to-mid green
- **Announcement bar:** Solid `#1a4a2e`, mint text
- **Navbar:** White, sticky, `box-shadow: 0 2px 12px rgba(0,0,0,0.08)`

### Corner Radii
- Cards, modals: 14–20px
- Buttons: 12px (primary/secondary), 24px (pill — cart button, "Shop Now")
- Inputs: 10px
- Thumbnails: 12px
- Small chips/badges: 6–8px, or fully rounded (20px)
- Logo mark: 10px

### Shadows
- Cards: `0 2px 8px rgba(0,0,0,0.06)` — subtle
- Hover card: `0 12px 32px rgba(0,0,0,0.1)` — lifted
- Navbar: `0 2px 12px rgba(0,0,0,0.08)`
- Auth modal: `0 4px 24px rgba(0,0,0,0.08)`
- Logo mark accent: `0 4px 16px rgba(92,184,92,0.3)` — green glow

### Borders
- Default border: `1.5–2px solid #e5e7eb`
- Active/selected: `2–2.5px solid #1a4a2e`
- Success state: `1.5px solid #6ee7b7`
- Error state: `1.5px solid #fca5a5`
- Active search/input focus: `#5cb85c`

### Buttons
- **Primary:** `#1a4a2e` bg, white text, `border-radius: 12px`, `font-weight: 700`, Syne font. Hover → `#2d6a4f`
- **Secondary/Outline:** White bg, `2–2.5px solid #1a4a2e`, `#1a4a2e` text. Hover → `#f0faf2` bg
- **Pill CTA:** Same as primary but `border-radius: 24–30px` (hero, cart)
- **Ghost/link:** No border, text only in `#40916c`

### Hover & Press States
- Cards: `translateY(-4px)` + stronger shadow
- Primary buttons: Darker green `#2d6a4f`
- Qty buttons: Fill `#1a4a2e` bg, white text
- Wishlist: `scale(1.1)`
- Tab links: Color shifts to `#1a4a2e`
- Thumbnails: Border turns `#1a4a2e`

### Animations
- **Transitions:** `0.2–0.3s ease` on most interactive elements
- **Cart pop:** `scale(1) → scale(1.3) → scale(1)` over 0.4s on add-to-cart
- **Order confirmation:** `scale(0) → scale(1)` cubic-bezier(0.34,1.56,0.64,1) — bouncy pop
- **Spinner:** Linear rotation for loading states
- **Slide-out remove:** `opacity 0, translateX(-20px)` on item removal
- **No parallax, no scroll-triggered anims** — clean and fast

### Imagery
- **hero.png** — hero banner image (44KB)
- Product images: Emoji placeholders (no real product photos yet)
- No illustrations, no abstract shapes
- Color vibe: Clean, bright greens; warm cream backgrounds

### Iconography
- **Primary:** Emoji (functional, not decorative)
  - 🥝 Logo, 🚚 Delivery, 🔒 Security, 📦 Orders, 🛒 Cart, ❤️ Wishlist, 👤 Account, 🔍 Search, 🏠 Home
- **SVG:** `assets/icons.svg` sprite (imported from repo)
- **No external icon library** used in the current codebase
- Unicode: `›` for breadcrumbs, `→` for CTAs, `★` for star ratings, `✓`/`✕` for status
- Badges use short text strings, not icons: "HOT DEAL", "Verified"

### Layout
- **Max content width:** 1200px, centered
- **Gutters:** 24px desktop, 12–14px mobile
- **Responsive breakpoint:** 768px (mobile)
- **Mobile:** Single column, bottom nav bar (fixed, 5 items)
- **Desktop:** Multi-column grids (2–4 col products, sidebar+content for checkout/account)

### Spacing Scale
- 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64px

---

## Iconography

The codebase uses **emoji as the primary icon system** — functional, widely supported, no icon font needed. Common icons:
- Navigation: 🏠 🛍️ 🛒 ❤️ 👤
- Trust: 🚚 🔒 🛡️ 🔄
- Payments: 💳 🏦 📱 💰
- States: ✓ ✕ → ‹ ›

An SVG sprite (`assets/icons.svg`) is included from the repo but its usage in the codebase is minimal — the emoji system is dominant.

---

## File Index

```
README.md                    ← This file
SKILL.md                     ← Agent skill manifest
colors_and_type.css          ← Full design token CSS variables
assets/
  favicon.svg                ← KiwiHub favicon SVG
  icons.svg                  ← SVG icon sprite
  hero.png                   ← Hero banner image
preview/
  colors-brand.html          ← Brand color palette card
  colors-semantic.html       ← Semantic / state colors
  colors-surface.html        ← Surface & background colors
  type-scale.html            ← Heading type scale (Syne)
  type-body.html             ← Body type specimen (Plus Jakarta Sans)
  type-ui.html               ← UI labels, badges, captions
  spacing-tokens.html        ← Spacing & radius tokens
  shadows-radius.html        ← Shadow system + corner radii
  components-buttons.html    ← Button variants & states
  components-inputs.html     ← Form inputs & states
  components-cards.html      ← Product card variants
  components-badges.html     ← Badges, chips, status tags
  components-navbar.html     ← Navbar component
  components-announcement.html ← Announcement bar
ui_kits/
  website/
    README.md                ← UI kit notes
    index.html               ← Full interactive prototype
    Navbar.jsx               ← Navbar component
    ProductCard.jsx          ← Product card component
    Footer.jsx               ← Footer component
```
