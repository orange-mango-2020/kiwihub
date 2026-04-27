// src/components/ui/Badge.jsx
// Usage:
//   <Badge variant="success">Delivered</Badge>
//   <Badge variant="discount">-14%</Badge>
//   <Badge variant="hot">HOT DEAL</Badge>

import { colors, fonts, radius } from '../../theme';

const STYLES = {
  success:  { bg: colors.successBg,  text: colors.success },
  warning:  { bg: colors.warningBg,  text: colors.warningText },
  error:    { bg: colors.errorBadge, text: colors.error },
  info:     { bg: colors.infoBg,     text: colors.info },
  discount: { bg: colors.discount,   text: '#fff' },
  hot:      { bg: colors.discount,   text: '#fff' },
  brand:    { bg: colors.light,      text: colors.deep },
};

export default function Badge({ children, variant = 'brand', pill = false, style = {} }) {
  const s = STYLES[variant] || STYLES.brand;
  return (
    <span style={{
      background: s.bg,
      color: s.text,
      borderRadius: pill ? radius.full : radius.xs,
      padding: pill ? '4px 12px' : '3px 8px',
      fontFamily: fonts.body,
      fontWeight: 700,
      fontSize: '11px',
      display: 'inline-flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      ...style,
    }}>
      {children}
    </span>
  );
}
