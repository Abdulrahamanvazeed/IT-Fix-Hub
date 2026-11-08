import { useState, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import GuideCard from '../components/GuideCard';
import { getAllGuides, getCategories, getOSConfig } from '../utils/contentLoader';
import { searchGuides } from '../utils/search';

export default function GuidesLibrary() {
  const { osId = 'windows' } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeLevel, setActiveLevel] = useState('');

  const osConfig = getOSConfig();
  const currentOSData = useMemo(() => {
    return osConfig.operatingSystems.find(o => o.id === osId) || osConfig.operatingSystems[0];
  }, [osConfig, osId]);

  const allGuides = useMemo(() => getAllGuides(osId), [osId]);
  const categories = useMemo(() => getCategories(osId), [osId]);

  const filteredGuides = useMemo(() => {
    let results = searchGuides(allGuides, query);
    if (activeCategory) {
      results = results.filter(g => g.category === activeCategory);
    }
    if (activeLevel) {
      results = results.filter(g => g.level === activeLevel);
    }
    return results;
  }, [allGuides, query, activeCategory, activeLevel]);

  const levels = [
    { id: '', label: 'All Levels' },
    { id: 'beginner', label: '🌱 Beginner' },
    { id: 'intermediate', label: '⚡ Intermediate' },
    { id: 'advanced', label: '🔧 Advanced' },
  ];

  return (
    <div className="guides-library container">
      <header className="guides-header">
        <div className="guides-header-os-badge">
          <span>{currentOSData.icon} {currentOSData.name} Edition</span>
        </div>
        <h1>{currentOSData.icon} {currentOSData.name} Troubleshooting Guides</h1>
        <p className="guides-subtitle">
          {allGuides.length} curated guides to help you resolve {currentOSData.name} problems — search, filter, and master your system.
        </p>

        {/* Quick OS Switcher Pills */}
        <div className="os-switcher-row" role="tablist" aria-label="Select Operating System">
          {osConfig.operatingSystems.map(os => (
            <button
              key={os.id}
              type="button"
              className={`os-pill-btn ${os.id === osId ? 'active' : ''}`}
              onClick={() => {
                navigate(`/guides/${os.id}`);
                setActiveCategory('');
                setSearchParams({});
              }}
            >
              <span>{os.icon}</span>
              <span>{os.name}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="guides-controls">
        <SearchBar
          placeholder={`Search ${currentOSData.name} guides... e.g. 'wifi', 'slow', or 'crash'`}
          onChange={setQuery}
          value={query}
        />

        <div className="level-tabs" role="tablist" aria-label="Filter by skill level">
          {levels.map(level => (
            <button
              key={level.id}
              role="tab"
              aria-selected={activeLevel === level.id}
              className={`level-tab ${activeLevel === level.id ? 'level-tab-active' : ''}`}
              onClick={() => setActiveLevel(level.id)}
            >
              {level.label}
            </button>
          ))}
        </div>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={(catId) => {
            setActiveCategory(catId);
            if (catId) {
              setSearchParams({ category: catId });
            } else {
              setSearchParams({});
            }
          }}
        />
      </div>

      <div className="guides-results-info" aria-live="polite">
        Showing {filteredGuides.length} of {allGuides.length} {currentOSData.name} guides
        {activeCategory && ` in "${categories.find(c => c.id === activeCategory)?.name || activeCategory}"`}
        {activeLevel && ` (${activeLevel} level)`}
        {query && ` matching "${query}"`}
      </div>

      {filteredGuides.length > 0 ? (
        <div className="guides-grid">
          {filteredGuides.map(guide => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      ) : (
        <div className="guides-empty">
          <div className="guides-empty-icon">🔍</div>
          <h2>No guides found for {currentOSData.name}</h2>
          <p>Try a different search term, or clear your filters to view all guides.</p>
          <button className="btn btn-outline" onClick={() => { setQuery(''); setActiveCategory(''); setActiveLevel(''); setSearchParams({}); }}>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
