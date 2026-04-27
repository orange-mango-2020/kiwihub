# KiwiHub — Production Source Files

Copy the contents of `src/` into your repo's `src/` folder, replacing what's there.

## What's included

```
src/
  theme.js                    ← Color + font tokens (import everywhere)
  App.jsx                     ← Router + layout shell
  main.jsx                    ← Vite entry point
  context/
    CartContext.jsx            ← Global cart state (useCart hook)
  data/
    products.js               ← Product catalogue (swap for Supabase later)
    faqs.js                   ← FAQ content
  components/
    layout/
      AnnouncementBar.jsx
      Navbar.jsx
      Footer.jsx
    ui/
      Icon.jsx                ← 40+ Lucide-style inline SVG icons
      Stars.jsx               ← Star rating display
      ProductCard.jsx         ← Reusable product card
      Button.jsx              ← Primary / secondary / pill variants
      Input.jsx               ← Text input with label + error state
      Badge.jsx               ← Status / discount / trust badges
  pages/
    Home.jsx
    Shop.jsx
    Product.jsx
    Cart.jsx
    Checkout.jsx
    Account.jsx
    Contact.jsx
    Faqs.jsx
    Returns.jsx
    About.jsx
    Tracking.jsx
```

## Setup

1. **Copy files** — paste the `src/` folder into your repo root (replace existing)
2. **Install deps** — your existing `package.json` already has everything needed:
   ```bash
   npm install
   ```
3. **Run locally**
   ```bash
   npm run dev
   ```
4. **Deploy** — push to `main` and Vercel picks it up automatically

## Adding real data (next step)

Products are currently in `src/data/products.js`. To connect Supabase:
1. `npm install @supabase/supabase-js`
2. Create a `src/lib/supabase.js` client
3. Replace the static imports in pages with `useEffect` + Supabase queries
4. Add a `products` table matching the shape in `products.js`

## Environment variables (for Vercel)

```
VITE_PAYFAST_MERCHANT_ID=your_id
VITE_PAYFAST_MERCHANT_KEY=your_key
VITE_SUPABASE_URL=your_url          # when ready
VITE_SUPABASE_ANON_KEY=your_key     # when ready
```

Add these in Vercel → Project → Settings → Environment Variables.
