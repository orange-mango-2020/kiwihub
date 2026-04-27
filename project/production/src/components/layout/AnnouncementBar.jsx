// src/components/layout/AnnouncementBar.jsx

import Icon from '../ui/Icon';
import { colors, fonts } from '../../theme';

export default function AnnouncementBar() {
  return (
    <div style={{
      background: colors.announceBg,
      color: colors.announceText,
      textAlign: 'center',
      padding: '7px 16px',
      fontSize: '12px',
      fontFamily: fonts.body,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap',
    }}>
      <span style={{ display:'flex', alignItems:'center', gap:'6px' }}>
        <Icon name="truck" size={13} color={colors.announceText} />
        FREE delivery on orders over R750
      </span>
      <span style={{ opacity: 0.35 }}>|</span>
      <span style={{ display:'flex', alignItems:'center', gap:'6px' }}>
        <Icon name="lock" size={13} color={colors.announceText} />
        Secure payments via PayFast
      </span>
    </div>
  );
}
