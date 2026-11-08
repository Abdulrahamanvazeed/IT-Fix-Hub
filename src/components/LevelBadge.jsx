const LEVEL_STYLES = {
  beginner: 'badge-beginner',
  intermediate: 'badge-intermediate',
  advanced: 'badge-advanced',
};

const LEVEL_ICONS = {
  beginner: '🟢',
  intermediate: '🔵',
  advanced: '🟣',
};

export default function LevelBadge({ level }) {
  const className = LEVEL_STYLES[level] || LEVEL_STYLES.beginner;
  const icon = LEVEL_ICONS[level] || '';
  const label = level ? level.charAt(0).toUpperCase() + level.slice(1) : 'Beginner';

  return (
    <span className={`badge ${className}`} aria-label={`Difficulty: ${label}`}>
      <span aria-hidden="true">{icon}</span>
      {label}
    </span>
  );
}
