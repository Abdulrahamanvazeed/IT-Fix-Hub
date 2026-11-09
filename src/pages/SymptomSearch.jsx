import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import GuideCard from '../components/GuideCard';
import OSIcon from '../components/OSIcon';
import { getSymptoms, getAllSymptomsAcrossOS, getGuideById, getOSConfig } from '../utils/contentLoader';
import { searchSymptoms } from '../utils/search';

export default function SymptomSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialOS = searchParams.get('os') || 'all';
  const [query, setQuery] = useState(initialQ);
  const [selectedOS, setSelectedOS] = useState(initialOS);
  const [expandedSymptom, setExpandedSymptom] = useState(null);

  const osConfig = getOSConfig();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const allSymptoms = useMemo(() => {
    if (selectedOS === 'all') {
      return getAllSymptomsAcrossOS();
    }
    return getSymptoms(selectedOS).map(s => ({ ...s, os: selectedOS }));
  }, [selectedOS]);

  const results = useMemo(() => {
    return searchSymptoms(allSymptoms, query);
  }, [allSymptoms, query]);

  // Group results by category
  const grouped = useMemo(() => {
    const groups = {};
    results.forEach(s => {
      const cat = s.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(s);
    });
    return groups;
  }, [results]);

  const toggleSymptom = (id) => {
    setExpandedSymptom(expandedSymptom === id ? null : id);
  };

  return (
    <div className="symptom-search container">
      <header className="symptom-header">
        <h1>🔍 What's the Problem?</h1>
        <p className="symptom-subtitle">
          Describe what's happening in your own words — no technical jargon needed.
          We'll match your symptom directly to the exact step-by-step fix across all operating systems.
        </p>

        {/* Operating System Filter */}
        <div className="os-switcher-row" style={{ marginTop: '1.25rem', justifyContent: 'center' }}>
          <button
            type="button"
            className={`os-pill-btn ${selectedOS === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedOS('all')}
          >
            <span>🌐</span>
            <span>All Platforms ({getAllSymptomsAcrossOS().length})</span>
          </button>
          {osConfig.operatingSystems.map(os => (
            <button
              key={os.id}
              type="button"
              className={`os-pill-btn ${selectedOS === os.id ? 'active' : ''}`}
              onClick={() => setSelectedOS(os.id)}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center' }}><OSIcon os={os.id} size={16} /></span>
              <span>{os.name}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="symptom-search-area">
        <SearchBar
          placeholder="e.g. 'wifi dropping', 'battery drain', 'black screen', 'grub rescue', or 'slow'"
          onChange={setQuery}
          value={query}
        />
      </div>

      {/* Popular Symptoms Quick Pills */}
      {!query && (
        <section className="popular-symptoms" aria-labelledby="popular-heading">
          <h2 id="popular-heading">Popular Problem Symptoms</h2>
          <div className="symptom-pills">
            {allSymptoms.slice(0, 14).map((s, idx) => (
              <button
                key={`${s.id}-${idx}`}
                className="symptom-pill pill-3d-hover"
                onClick={() => setQuery(s.text)}
              >
                {s.icon} {s.text} {s.os && <small style={{ opacity: 0.7 }}>({s.os})</small>}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Results */}
      <section className="symptom-results" aria-live="polite">
        {query && (
          <p className="results-count">
            Found {results.length} matching problem{results.length !== 1 ? 's' : ''} {selectedOS !== 'all' ? `in ${selectedOS}` : 'across all platforms'}
          </p>
        )}

        {Object.entries(grouped).map(([category, symptoms]) => (
          <div key={category} className="symptom-category-group">
            <h3 className="symptom-category-title">{category}</h3>
            <div className="symptom-results-list">
              {symptoms.map((symptom, idx) => {
                const uniqueKey = `${symptom.os || 'os'}-${symptom.id}-${idx}`;
                const isExpanded = expandedSymptom === uniqueKey;

                return (
                  <div key={uniqueKey} className="symptom-result-item">
                    <button
                      className={`symptom-result-header ${isExpanded ? 'expanded' : ''}`}
                      onClick={() => setExpandedSymptom(isExpanded ? null : uniqueKey)}
                      aria-expanded={isExpanded}
                      aria-controls={`symptom-${uniqueKey}-guides`}
                    >
                      <span className="symptom-result-icon">{symptom.icon}</span>
                      <span className="symptom-result-text">
                        {symptom.text}
                        {symptom.os && (
                          <span className="symptom-os-badge" style={{ marginLeft: '8px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <OSIcon os={symptom.os} size={13} />
                            {symptom.os.toUpperCase()}
                          </span>
                        )}
                      </span>
                      <span className="symptom-result-count">{symptom.guideIds.length} fix{symptom.guideIds.length !== 1 ? 'es' : ''}</span>
                      <span className="symptom-result-arrow">{isExpanded ? '▼' : '▶'}</span>
                    </button>
                    {isExpanded && (
                      <div id={`symptom-${uniqueKey}-guides`} className="symptom-guides-list">
                        {symptom.guideIds.map(gId => {
                          const guide = getGuideById(gId, symptom.os || 'windows');
                          return guide ? <GuideCard key={gId} guide={guide} /> : null;
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {query && results.length === 0 && (
          <div className="symptom-empty">
            <div className="symptom-empty-icon">🤔</div>
            <h2>No matching problems found</h2>
            <p>Try describing your problem with simpler keywords, or browse all guides for your operating system.</p>
            <div className="symptom-empty-actions">
              <button className="btn btn-outline" onClick={() => setQuery('')}>Clear Search</button>
              <Link to="/guides/windows" className="btn btn-primary">Browse Windows Guides</Link>
              <Link to="/guides/macos" className="btn btn-secondary">Browse macOS</Link>
              <Link to="/guides/linux" className="btn btn-outline">Browse Linux</Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
