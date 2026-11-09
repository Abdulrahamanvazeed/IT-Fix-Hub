import { Link } from 'react-router-dom';
import LevelBadge from './LevelBadge';
import OSIcon from './OSIcon';

export default function GuideCard({ guide }) {
  const {
    id,
    title,
    symptom,
    description,
    level,
    category,
    categoryName,
    categoryIcon,
    os = 'windows',
  } = guide;

  const displayText = symptom || description || '';

  return (
    <Link
      to={`/guides/${os}/${id}`}
      className="guide-card card-hover"
      aria-label={`Read guide: ${title}`}
    >
      <div className="guide-card-header">
        <span className="guide-card-category">
          <span className="guide-card-category-icon" aria-hidden="true">
            {categoryIcon}
          </span>
          {categoryName || category}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span className="guide-card-os-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.675rem', fontWeight: 700, padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)', letterSpacing: '0.04em' }}>
            <OSIcon os={os} size={12} />
            {os.toUpperCase()}
          </span>
          <LevelBadge level={level} />
        </div>
      </div>

      <h3 className="guide-card-title">{title}</h3>

      <p className="guide-card-symptom">{displayText}</p>

      <div className="guide-card-footer">
        <span className="guide-card-link">
          Read Guide <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
