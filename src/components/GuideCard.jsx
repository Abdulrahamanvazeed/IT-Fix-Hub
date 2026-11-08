import { Link } from 'react-router-dom';
import LevelBadge from './LevelBadge';

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
        <LevelBadge level={level} />
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
