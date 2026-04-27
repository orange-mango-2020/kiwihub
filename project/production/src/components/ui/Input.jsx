// src/components/ui/Input.jsx
// Usage:
//   <Input label="Email" placeholder="you@email.com" value={val} onChange={setVal} />
//   <Input label="Password" type="password" error="Required" />

import { useState } from 'react';
import { colors, fonts, radius } from '../../theme';

export default function Input({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  hint,
  required = false,
  disabled = false,
  style = {},
}) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.borderError
    : focused
      ? colors.bright
      : colors.border;

  const bg = error ? colors.errorBg : '#fff';

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'4px', ...style }}>
      {label && (
        <label style={{
          fontFamily: fonts.body,
          fontSize: '12px',
          fontWeight: 600,
          color: colors.textSec,
        }}>
          {label}{required && <span style={{ color: colors.error }}> *</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: radius.md,
          border: `1.5px solid ${borderColor}`,
          fontFamily: fonts.body,
          fontSize: '13px',
          color: colors.text,
          background: bg,
          outline: 'none',
          transition: 'border-color 0.15s ease',
          opacity: disabled ? 0.6 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
          boxSizing: 'border-box',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && (
        <span style={{ fontFamily:fonts.body, fontSize:'11px', color:colors.error, fontWeight:600 }}>
          {error}
        </span>
      )}
      {hint && !error && (
        <span style={{ fontFamily:fonts.body, fontSize:'11px', color:colors.muted }}>
          {hint}
        </span>
      )}
    </div>
  );
}
