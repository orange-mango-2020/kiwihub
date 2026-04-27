// src/components/ui/Button.jsx
// Usage:
//   <Button>Primary</Button>
//   <Button variant="secondary">Outline</Button>
//   <Button variant="pill">Shop Now</Button>
//   <Button variant="ghost">Cancel</Button>
//   <Button icon={<Icon name="cart" size={16} color="#fff" />}>Add to Cart</Button>

import { colors, fonts, radius, transition } from '../../theme';

const VARIANTS = {
  primary: {
    background: colors.deep,
    color: '#fff',
    border: 'none',
    borderRadius: radius.lg,
    padding: '13px 24px',
  },
  secondary: {
    background: '#fff',
    color: colors.deep,
    border: `2.5px solid ${colors.deep}`,
    borderRadius: radius.lg,
    padding: '11px 22px',
  },
  pill: {
    background: colors.deep,
    color: '#fff',
    border: 'none',
    borderRadius: radius.pill,
    padding: '12px 28px',
  },
  ghost: {
    background: 'transparent',
    color: colors.mid,
    border: 'none',
    borderRadius: radius.md,
    padding: '8px 12px',
  },
  danger: {
    background: '#fff',
    color: colors.error,
    border: `1.5px solid ${colors.border}`,
    borderRadius: radius.md,
    padding: '8px 14px',
  },
};

export default function Button({
  children,
  variant = 'primary',
  icon,
  size = 'md',
  disabled = false,
  onClick,
  style = {},
  type = 'button',
}) {
  const base = VARIANTS[variant] || VARIANTS.primary;
  const fontSize = size === 'sm' ? '12px' : size === 'lg' ? '16px' : '14px';

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...base,
        fontFamily: fonts.heading,
        fontWeight: 700,
        fontSize,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: `background ${transition.base}, opacity ${transition.base}`,
        ...style,
      }}
      onMouseEnter={e => {
        if (!disabled) {
          if (variant === 'primary' || variant === 'pill') e.currentTarget.style.background = colors.hover;
          if (variant === 'secondary') e.currentTarget.style.background = colors.light;
        }
      }}
      onMouseLeave={e => {
        if (!disabled) e.currentTarget.style.background = base.background;
      }}
    >
      {icon && icon}
      {children}
    </button>
  );
}
