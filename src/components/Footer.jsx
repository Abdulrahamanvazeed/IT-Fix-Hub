import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/guides', label: 'Guides' },
  { to: '/symptoms', label: 'Symptoms' },
  { to: '/learning-path', label: 'Learning Path' },
  { to: '/about', label: 'About' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-brand-name">
              <span aria-hidden="true">🔧</span>
              IT Fix Hub
            </div>
            <p className="footer-brand-tagline">
              IT Fix Hub — Built by Abdul Rahaman to help everyone solve IT problems. 
              Your go-to resource for step-by-step Windows troubleshooting guides, 
              from beginner to advanced.
            </p>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-primary)',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}>
              Created by Abdul Rahaman
            </p>
            <div className="footer-contact-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.75rem' }}>
              <a
                href="mailto:abdulrahaman.vazeed@gmail.com"
                className="footer-email-link"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.825rem',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  fontWeight: 500
                }}
              >
                <span>✉️</span>
                <span>abdulrahaman.vazeed@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/abdul-rahaman-itsupport-with-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-linkedin-btn"
                title="Connect with Abdul Rahaman on LinkedIn"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.81a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
                </svg>
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <div className="footer-links">
              {QUICK_LINKS.map(({ to, label }) => (
                <Link key={to} to={to} className="footer-link">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contribute */}
          <div>
            <h3 className="footer-heading">Contribute</h3>
            <div className="footer-links">
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                marginBottom: '0.5rem',
              }}>
                Want to contribute a guide or suggest improvements? Check out our 
                README for contribution guidelines.
              </p>
              <span className="footer-link" style={{ cursor: 'default' }}>
                📖 See README for details
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} Abdul Rahaman. All rights reserved.
          </p>
          <p className="footer-motto">
            Built for IT beginners and pros alike
          </p>
        </div>
      </div>
    </footer>
  );
}
