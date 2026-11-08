export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="category-filter" role="tablist" aria-label="Filter by category">
      {/* All option */}
      <button
        className={`category-pill${!activeCategory ? ' active' : ''}`}
        onClick={() => onSelect(null)}
        role="tab"
        aria-selected={!activeCategory}
        aria-controls="guides-list"
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`category-pill${activeCategory === cat.id ? ' active' : ''}`}
          onClick={() => onSelect(cat.id)}
          role="tab"
          aria-selected={activeCategory === cat.id}
          aria-controls="guides-list"
        >
          <span className="category-pill-icon" aria-hidden="true">{cat.icon}</span>
          {cat.name}
          {cat.count != null && (
            <span className="category-pill-count" aria-label={`${cat.count} guides`}>
              {cat.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
