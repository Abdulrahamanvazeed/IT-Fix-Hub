import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="about-page container">
      <header className="about-header">
        <h1>About IT Fix Hub</h1>
        <p className="about-tagline">Built by <strong>Abdul Rahaman</strong> to make IT troubleshooting accessible to everyone.</p>
      </header>

      {/* Creator Section */}
      <section className="about-section about-creator" aria-labelledby="creator-heading">
        <h2 id="creator-heading">👨‍💻 About the Creator</h2>
        <div className="creator-card card">
          <div className="creator-info">
            <h3>Abdul Rahaman</h3>
            <p className="creator-role">IT Professional & Troubleshooting Expert</p>
            <p>
              IT Fix Hub was created by <strong>Abdul Rahaman</strong> with a simple mission: 
              make IT troubleshooting accessible to everyone, regardless of their technical background.
              Whether you've never touched a computer before or you're an experienced technician, 
              these guides are designed to help you solve problems confidently and understand 
              the technology you use every day.
            </p>
            <div className="creator-social-links" style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="mailto:abdulrahaman.vazeed@gmail.com"
                className="btn btn-email"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'var(--color-primary)',
                  color: '#ffffff',
                  fontWeight: 600,
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none'
                }}
              >
                <span>✉️</span>
                <span>Email: abdulrahaman.vazeed@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/abdul-rahaman-itsupport-with-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-linkedin"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#0a66c2',
                  color: '#ffffff',
                  fontWeight: 600,
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none'
                }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.81a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
                </svg>
                <span>LinkedIn Profile ↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-section" aria-labelledby="mission-heading">
        <h2 id="mission-heading">🎯 Our Mission</h2>
        <p>
          Everyone deserves to be able to fix their own computer problems without feeling lost or overwhelmed.
          IT Fix Hub is built on three principles:
        </p>
        <div className="about-principles">
          <div className="principle-card card">
            <h3>🔍 Plain Language First</h3>
            <p>Every guide uses clear, simple language. You don't need to know technical jargon — just describe your problem and we'll guide you to the solution.</p>
          </div>
          <div className="principle-card card">
            <h3>🛡️ Safety Always</h3>
            <p>Fixes are ordered from safest to most advanced. You'll see clear warnings before any step that could affect your data, and backup reminders where needed.</p>
          </div>
          <div className="principle-card card">
            <h3>💡 Understanding Matters</h3>
            <p>Every guide includes a "Why This Works" explanation so you actually learn something. Next time a similar problem occurs, you'll know what to do.</p>
          </div>
        </div>
      </section>

      {/* How Guides Work */}
      <section className="about-section" aria-labelledby="structure-heading">
        <h2 id="structure-heading">📋 How Our Guides Are Structured</h2>
        <p>Every troubleshooting guide on IT Fix Hub follows the same clear structure:</p>
        <ol className="about-structure-list">
          <li>
            <strong>🩺 Symptom</strong> — A plain-language description of the problem, written the way you'd describe it to a friend.
          </li>
          <li>
            <strong>🔎 Possible Causes</strong> — A list of likely reasons the problem is happening, so you understand what might be going on.
          </li>
          <li>
            <strong>🔧 Step-by-Step Fix</strong> — Clear instructions ordered from easiest/safest to most advanced. Each step includes exact paths, commands, and screenshots where helpful. Warnings appear before any risky steps.
          </li>
          <li>
            <strong>💡 Why This Works</strong> — An explanation of the underlying issue and why the fix resolves it, helping you learn for the future.
          </li>
        </ol>
      </section>

      {/* Skill Levels */}
      <section className="about-section" aria-labelledby="levels-heading">
        <h2 id="levels-heading">🎓 Three Skill Levels</h2>
        <p>Content is organized into three skill levels so you can start wherever you're comfortable:</p>
        <div className="about-levels">
          <div className="about-level">
            <span className="about-level-badge badge-beginner">🌱 Beginner</span>
            <p>Windows basics — desktop navigation, file management, settings, accounts, installing apps. No prior knowledge required.</p>
          </div>
          <div className="about-level">
            <span className="about-level-badge badge-intermediate">⚡ Intermediate</span>
            <p>Common problems — Wi-Fi issues, printers, slow performance, Windows Updates, browser settings. You know the basics and want to fix things.</p>
          </div>
          <div className="about-level">
            <span className="about-level-badge badge-advanced">🔧 Advanced</span>
            <p>Pro-level troubleshooting — services, registry, drivers, event logs, boot repair, application crashes. For when you want full control.</p>
          </div>
        </div>
      </section>

      {/* OS Coverage */}
      <section className="about-section" aria-labelledby="roadmap-heading">
        <h2 id="roadmap-heading">🗺️ Operating System Coverage</h2>
        <p>IT Fix Hub provides comprehensive, structured troubleshooting coverage across all 6 major environments:</p>
        <ul className="about-roadmap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            🪟 <strong>Windows 10 & 11</strong> — ✅ Fully Built Out
          </li>
          <li style={{ padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            🍎 <strong>macOS (Apple Silicon & Intel)</strong> — ✅ Fully Built Out
          </li>
          <li style={{ padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            🐧 <strong>Linux (Ubuntu, Debian, Fedora, Arch)</strong> — ✅ Fully Built Out
          </li>
          <li style={{ padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            🤖 <strong>Android (Samsung, Pixel, Mobile OS)</strong> — ✅ Fully Built Out
          </li>
          <li style={{ padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            📱 <strong>iOS (iPhone & iPad, iOS 17/18)</strong> — ✅ Fully Built Out
          </li>
          <li style={{ padding: '0.75rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            ⚡ <strong>Dual Boot (Windows + Linux, GRUB, EFI)</strong> — ✅ Fully Built Out
          </li>
        </ul>
      </section>

      {/* Contributing */}
      <section className="about-section" aria-labelledby="contribute-heading">
        <h2 id="contribute-heading">🤝 Contributing</h2>
        <p>
          Want to help improve IT Fix Hub? Check out the <strong>README.md</strong> file in the project 
          repository for instructions on how to add new guides, categories, or even new operating systems.
          The content is stored in simple JSON files, making it easy to contribute without deep coding knowledge.
        </p>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Ready to start fixing?</h2>
        <div className="about-cta-actions">
          <Link to="/guides/windows" className="btn btn-primary btn-lg">Browse Guides</Link>
          <Link to="/symptoms" className="btn btn-secondary btn-lg">Describe Your Problem</Link>
          <Link to="/learning-path" className="btn btn-outline btn-lg">Start Learning</Link>
        </div>
      </section>

      <footer className="about-footer">
        <p>© 2026 Abdul Rahaman. All rights reserved. Built with ❤️ for the IT community.</p>
      </footer>
    </div>
  );
}
