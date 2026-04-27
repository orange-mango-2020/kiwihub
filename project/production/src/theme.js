// src/theme.js
// Single source of truth for all design tokens.
// Import this wherever you need colors or fonts.

export const colors = {
  // Brand greens
  deep:    '#1a4a2e',   // Primary — buttons, headings, logo
  mid:     '#2e8b57',   // Secondary — links, accents
  bright:  '#52b256',   // Accent — badges, progress, cart badge
  hover:   '#1f5c38',   // Primary button hover

  // Gold accent (kiwi centre)
  gold:    '#c8971f',
  goldBg:  '#fdf6e3',

  // Surfaces
  bg:      '#f4f1e8',   // Page background (warm cream)
  card:    '#ffffff',   // Cards and panels
  light:   '#f0faf2',   // Light green surface
  tint:    '#e8f5e9',   // Search bg, chip fills
  mint:    '#c8f5d8',   // Light accents

  // Text
  text:    '#1a1a1a',   // Primary body text
  textSec: '#374151',   // Secondary / descriptions
  muted:   '#6b7280',   // Captions, dates
  ghost:   '#9ca3af',   // Placeholders

  // Borders
  border:  '#e5e7eb',   // Default
  borderBrand: '#1a4a2e',
  borderSuccess: '#6ee7b7',
  borderError: '#fca5a5',

  // Semantic states
  success: '#059669', successBg: '#d1fae5', successText: '#065f46',
  warning: '#f59e0b', warningBg: '#fef3c7', warningText: '#92400e',
  error:   '#dc2626', errorBg:   '#fef2f2', errorBadge: '#fee2e2',
  info:    '#2563eb', infoBg:    '#dbeafe',
  discount: '#ef4444',

  // Announcement bar
  announceBg:   '#1a4a2e',
  announceText: '#c8f5d8',
};

export const fonts = {
  heading: "'Syne', system-ui, sans-serif",
  body:    "'Plus Jakarta Sans', system-ui, sans-serif",
};

export const radius = {
  xs:   '6px',
  sm:   '8px',
  md:   '10px',
  lg:   '12px',
  xl:   '14px',
  '2xl':'16px',
  '3xl':'18px',
  '4xl':'20px',
  pill: '24px',
  full: '9999px',
};

export const shadow = {
  card:      '0 2px 8px rgba(0,0,0,0.06)',
  cardHover: '0 12px 32px rgba(0,0,0,0.10)',
  navbar:    '0 2px 12px rgba(0,0,0,0.08)',
  modal:     '0 4px 24px rgba(0,0,0,0.08)',
  logo:      '0 4px 16px rgba(82,178,86,0.30)',
};

export const transition = {
  fast: '0.15s ease',
  base: '0.20s ease',
  slow: '0.30s ease',
};
