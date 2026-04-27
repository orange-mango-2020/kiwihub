// src/data/faqs.js

export const FAQ_SECTIONS = [
  {
    id: 'delivery',
    icon: 'truck',
    title: 'Delivery & Shipping',
    items: [
      { q: 'How long does delivery take?', a: 'We ship via The Courier Guy. Standard delivery takes 3–5 business days. Remote areas may take up to 7 business days.' },
      { q: 'How much does shipping cost?', a: 'Shipping is R99 for orders under R750. Orders R750 and above get FREE delivery nationwide.' },
      { q: 'Do you ship to all provinces?', a: 'Yes — all 9 provinces. Eastern Cape, Free State, Gauteng, KwaZulu-Natal, Limpopo, Mpumalanga, Northern Cape, North West and Western Cape.' },
      { q: 'Can I track my order?', a: 'Yes. Once shipped you get a tracking number by email. Track on our Order Tracking page or directly on The Courier Guy website.' },
    ],
  },
  {
    id: 'payment',
    icon: 'credit-card',
    title: 'Payments & Security',
    items: [
      { q: 'What payment methods do you accept?', a: 'Credit/Debit Cards (Visa, Mastercard, AMEX), Instant EFT, SnapScan, and Mobicred. All via PayFast.' },
      { q: 'Is my payment information secure?', a: 'Yes. All transactions are encrypted and processed by PayFast. We never store your card details.' },
      { q: 'Do you offer payment plans?', a: 'Yes — via Mobicred. Select it at checkout to apply.' },
      { q: 'What currency do you charge in?', a: 'South African Rand (ZAR). VAT is included in all prices.' },
    ],
  },
  {
    id: 'returns',
    icon: 'rotate-ccw',
    title: 'Returns & Refunds',
    items: [
      { q: 'What is your return policy?', a: '30-day hassle-free returns. Contact us within 30 days of delivery.' },
      { q: 'How do I return an item?', a: 'Email support@kiwihub.co.za with your order number. We arrange collection via The Courier Guy at no cost for defective items.' },
      { q: 'When will I receive my refund?', a: 'Within 5–7 business days of receiving the item, credited back to your original payment method.' },
    ],
  },
  {
    id: 'products',
    icon: 'package',
    title: 'Products & Stock',
    items: [
      { q: 'Are your products genuine?', a: 'Yes — 100% genuine, sourced from authorised distributors. All electronics include a 1-year manufacturer warranty.' },
      { q: 'What warranty do products come with?', a: 'Electronics: 1-year manufacturer warranty. Homewear: covered by our 30-day return policy.' },
      { q: 'Can I request a product not listed?', a: 'Yes! Contact us and we\'ll see if we can source it.' },
    ],
  },
  {
    id: 'account',
    icon: 'user',
    title: 'My Account',
    items: [
      { q: 'Do I need an account to shop?', a: 'No — you can checkout as a guest. An account lets you track orders and save addresses.' },
      { q: 'How do I reset my password?', a: 'Click "Forgot password?" on the sign in page and we\'ll email you a reset link.' },
    ],
  },
];
