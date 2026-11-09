import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getOSConfig } from '../utils/contentLoader';
import OSSelector from './OSSelector';
import OSIcon from './OSIcon';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/guides', label: 'Guides' },
  { to: '/symptoms', label: 'Symptoms' },
  { to: '/learning-path', label: 'Learning Path' },
  { to: '/about', label: 'About' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentOS, setCurrentOS] = useState('windows');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('it-fix-theme') || 'neon';
  });
  const location = useLocation();
  const navigate = useNavigate();
  const mobileNavRef = useRef(null);

  // Sync currentOS from URL if on a /guides/:osId path
  useEffect(() => {
    const parts = location.pathname.split('/');
    if (parts[1] === 'guides' && parts[2]) {
      setCurrentOS(parts[2]);
    }
  }, [location.pathname]);

  const handleOSSelect = (newOS) => {
    setCurrentOS(newOS);
    navigate(`/guides/${newOS}`);
  };

  // Sync theme to root html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('it-fix-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'neon' ? 'light' : 'neon'));
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  function isActive(path) {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  }

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <header className="site-header" role="banner">
        <div className="header-inner">
          <Link to="/" className="header-logo" aria-label="IT Fix Hub — Home">
            <span className="header-logo-icon" aria-hidden="true">🔧</span>
            <div>
              <span className="header-logo-text">IT Fix Hub</span>
              <span style={{
                display: 'block',
                fontSize: '0.625rem',
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                lineHeight: 1,
                marginTop: '-2px',
                WebkitTextFillColor: 'var(--color-text-muted)',
              }}>
                by Abdul Rahaman
              </span>
            </div>
          </Link>

          <nav className="header-nav" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`header-nav-link${isActive(to) ? ' active' : ''}`}
                aria-current={isActive(to) ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={theme === 'neon' ? 'Switch to Clean Light Mode' : 'Switch to Cyber Neon 3D Mode'}
              aria-label="Toggle Theme"
            >
              <span className="theme-toggle-icon">{theme === 'neon' ? '🌌' : '☀️'}</span>
              <span className="theme-toggle-btn-text">{theme === 'neon' ? 'Neon 3D' : 'Light'}</span>
            </button>

            <a
              href="mailto:abdulrahaman.vazeed@gmail.com"
              className="header-email-btn"
              title="Email Abdul Rahaman: abdulrahaman.vazeed@gmail.com"
              aria-label="Email Abdul Rahaman"
            >
              ✉️
            </a>

            <a
              href="https://www.linkedin.com/in/abdul-rahaman-itsupport-with-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="header-linkedin-btn"
              title="Connect with Abdul Rahaman on LinkedIn"
              aria-label="Abdul Rahaman on LinkedIn"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.81a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
              </svg>
              <span>LinkedIn</span>
            </a>

            <OSSelector
              currentOS={currentOS}
              onSelect={handleOSSelect}
              variant="dropdown"
            />

            <button
              className={`hamburger${mobileMenuOpen ? ' open' : ''}`}
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="hamburger-line" aria-hidden="true"></span>
              <span className="hamburger-line" aria-hidden="true"></span>
              <span className="hamburger-line" aria-hidden="true"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`mobile-nav-overlay${mobileMenuOpen ? ' visible' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation */}
      <nav
        id="mobile-nav"
        className={`mobile-nav${mobileMenuOpen ? ' visible' : ''}`}
        aria-label="Mobile navigation"
        ref={mobileNavRef}
      >
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`mobile-nav-link${isActive(to) ? ' active' : ''}`}
            aria-current={isActive(to) ? 'page' : undefined}
            onClick={() => setMobileMenuOpen(false)}
          >
            {label}
          </Link>
        ))}

        <div className="mobile-nav-divider" />

        {/* Operating Systems Selection Grid for Mobile */}
        <div style={{ padding: '0.6rem 0.5rem' }}>
          <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ⚡ Select Operating System (6 Available)
          </p>
          <div className="mobile-os-grid">
            {getOSConfig().operatingSystems.map(os => (
              <button
                key={os.id}
                type="button"
                className={`mobile-os-btn ${os.id === currentOS ? 'active' : ''}`}
                onClick={() => {
                  handleOSSelect(os.id);
                  setMobileMenuOpen(false);
                }}
              >
                <span className="mobile-os-icon"><OSIcon os={os.id} size={18} /></span>
                <span className="mobile-os-name">{os.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mobile-nav-divider" />

        <div style={{ padding: '0.5rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            type="button"
            className="mobile-linkedin-link"
            onClick={toggleTheme}
            style={{ background: theme === 'neon' ? 'rgba(6, 182, 212, 0.15)' : '#f8fafc', borderColor: 'var(--color-primary-light)', cursor: 'pointer' }}
          >
            {theme === 'neon' ? '🌌 Theme: Cyber Neon 3D (Active)' : '☀️ Theme: Clean Light (Active)'}
          </button>
          <a
            href="mailto:abdulrahaman.vazeed@gmail.com"
            className="mobile-linkedin-link"
            style={{ background: '#f0fdfa', borderColor: '#ccfbf1', color: '#0f766e' }}
          >
            ✉️ Email: abdulrahaman.vazeed@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/abdul-rahaman-itsupport-with-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-linkedin-link"
          >
            💼 Connect on LinkedIn ↗
          </a>
        </div>
      </nav>
    </>
  );
}
