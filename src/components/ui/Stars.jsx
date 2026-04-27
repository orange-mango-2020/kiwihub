import Icon from './Icon';

export default function Stars({ rating, size = 12 }) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Icon
          key={i}
          name={i <= Math.floor(rating) ? 'star-filled' : 'star'}
          size={size}
          color={i <= Math.floor(rating) ? '#f59e0b' : '#d1d5db'}
        />
      ))}
    </span>
  );
}
