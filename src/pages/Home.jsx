import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getAllGuides, getOSConfig } from '../utils/contentLoader';
import WindowsScreenshot from '../components/WindowsScreenshot';

const POPULAR_SYMPTOMS = [
  { text: "My computer is slow", q: "computer slow" },
  { text: "Wi-Fi keeps dropping", q: "wifi dropping" },
  { text: "Can't print", q: "print" },
  { text: "Blue screen error", q: "blue screen" },
  { text: "GRUB rescue / Multiboot", q: "grub rescue" },
  { text: "Mac spinning beach ball", q: "spinning wheel" },
  { text: "Phone battery drain", q: "battery drain" },
  { text: "iPhone stuck on logo", q: "apple logo" },
];

const QUICK_DIAGNOSTICS = [
  {
    id: 'wifi',
    name: '🪟 Windows: Network Reset',
    type: 'terminal',
    title: 'Command Prompt: Network Stack Reset',
    data: {
      command: 'ipconfig /flushdns && netsh winsock reset',
      output: 'Windows IP Configuration\n\nSuccessfully flushed the DNS Resolver Cache.\nSucessfully reset the Winsock Catalog.\nYou must restart the computer in order to complete the reset.'
    }
  },
  {
    id: 'speed',
    name: '⚡ Windows: System Repair',
    type: 'terminal',
    title: 'Command Prompt: System File Checker',
    data: {
      command: 'sfc /scannow',
      output: 'Beginning system scan. This process will take some time.\nBeginning verification phase of system scan.\nVerification 100% complete.\nWindows Resource Protection repaired corrupted system files.'
    }
  },
  {
    id: 'linux-grub',
    name: '🐧 Linux: GRUB & Network',
    type: 'terminal',
    title: 'Linux Bash Terminal: GRUB Rebuild',
    data: {
      command: 'sudo update-grub && sudo systemctl restart NetworkManager',
      output: 'Sourcing file `/etc/default/grub\'\nGenerating grub configuration file ...\nFound linux image: /boot/vmlinuz-6.8.0-generic\nFound Windows Boot Manager on /dev/nvme0n1p1@/EFI/Microsoft/Boot/bootmgfw.efi\ndone'
    }
  },
  {
    id: 'mac-dns',
    name: '🍎 Mac: Cache & Quarantine',
    type: 'terminal',
    title: 'macOS Zsh Terminal: DNS & Security',
    data: {
      command: 'sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder',
      output: '[mDNSResponder] Flushed DNS cache.\nQuarantine attribute stripped successfully.'
    }
  },
  {
    id: 'dualboot-rtc',
    name: '⚡ Dual Boot: Clock Sync',
    type: 'terminal',
    title: 'Dual Boot Terminal: RTC Local Time Sync',
    data: {
      command: 'timedatectl set-local-rtc 1 --adjust-system-clock',
      output: 'RTC in local TZ: yes\nWindows and Linux system clocks are now synchronized.'
    }
  },
  {
    id: 'taskmgr',
    name: '📊 Resource Monitor',
    type: 'task-manager',
    title: 'Task Manager: Process Monitor',
    data: {
      culprit: 'High Memory & Runaway Process',
      cpu: '92.4%',
      mem: '3,840 MB'
    }
  }
];

export default function Home() {
  const osConfig = getOSConfig();
  const [activeOSId, setActiveOSId] = useState('windows');
  const categories = useMemo(() => getCategories(activeOSId), [activeOSId]);
  
  const totalGuidesAcrossAll = useMemo(() => {
    return osConfig.operatingSystems.reduce((acc, os) => {
      return acc + getAllGuides(os.id).length;
    }, 0);
  }, [osConfig]);

  const [activeDiag, setActiveDiag] = useState(QUICK_DIAGNOSTICS[0]);

  return (
    <div className="home-page">
      {/* 3D Immersive Hero Section */}
      <section className="hero hero-3d-enhanced" aria-labelledby="hero-title">
        <div className="hero-3d-backdrop">
          <div className="hero-mesh-glow"></div>
          <div className="hero-grid-lines"></div>
        </div>

        <div className="container">
          <div className="hero-grid-layout">
            <div className="hero-content">
              <div className="hero-badge-pill">
                <span className="hero-badge-pulse"></span>
                <span>Cross-Platform IT Troubleshooting • 6 Operating Systems</span>
              </div>
              <h1 id="hero-title" className="hero-title">
                🛠️ IT Fix Hub
              </h1>
              <p className="hero-byline">
                by <strong>Abdul Rahaman</strong>{' '}
                <a
                  href="https://www.linkedin.com/in/abdul-rahaman-itsupport-with-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-linkedin-pill"
                  title="Connect with Abdul Rahaman on LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true" style={{ verticalAlign: '-1px', marginRight: '4px' }}>
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.81a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
                  </svg>
                  <span>LinkedIn Profile ↗</span>
                </a>
              </p>
              <p className="hero-subtitle">
                Your complete troubleshooting authority across <strong>Windows, macOS, Linux, Android, iOS, and Dual Boot</strong>.
                Find your problem in plain language, follow safe step-by-step fixes, and understand why it worked with interactive visual screenshots.
              </p>

              <div className="hero-stats-3d">
                <div className="hero-stat-card">
                  <span className="stat-number">{totalGuidesAcrossAll}+</span>
                  <span className="stat-label">Verified Guides</span>
                </div>
                <div className="hero-stat-card">
                  <span className="stat-number">6</span>
                  <span className="stat-label">Operating Systems</span>
                </div>
                <div className="hero-stat-card">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Free &amp; Open Access</span>
                </div>
              </div>

              {/* Instant Quick OS Selector Bar — Always visible & touch friendly */}
              <div className="hero-quick-os-bar">
                <div className="hero-quick-os-title">⚡ Instant OS Guide Access:</div>
                <div className="hero-quick-os-pills">
                  {osConfig.operatingSystems.map(os => (
                    <Link
                      key={os.id}
                      to={`/guides/${os.id}`}
                      className="hero-quick-os-pill"
                    >
                      <span className="os-pill-icon">{os.icon}</span>
                      <span className="os-pill-name">{os.name}</span>
                      <span className="os-pill-count">{getAllGuides(os.id).length}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="hero-actions">
                <Link to="/guides/windows" className="btn btn-primary btn-lg btn-3d-glow">
                  📚 Browse All Guides
                </Link>
                <Link to="/symptoms" className="btn btn-secondary btn-lg btn-3d-glass">
                  🔍 Search by Symptom
                </Link>
              </div>
            </div>

            {/* 3D Interactive Troubleshooting Workbench */}
            <div className="hero-3d-showcase">
              <div className="hero-workbench-card">
                <div className="workbench-header">
                  <div className="workbench-title">
                    <span className="workbench-dot"></span>
                    <span>Cross-Platform Diagnostic Simulator</span>
                  </div>
                  <span className="workbench-status">Live Interactive</span>
                </div>

                {/* Quick Diagnostics Selector Tabs */}
                <div className="workbench-tabs">
                  {QUICK_DIAGNOSTICS.map(diag => (
                    <button
                      key={diag.id}
                      type="button"
                      className={`workbench-tab ${activeDiag.id === diag.id ? 'active' : ''}`}
                      onClick={() => setActiveDiag(diag)}
                    >
                      {diag.name}
                    </button>
                  ))}
                </div>

                {/* Interactive Simulated Window */}
                <div className="workbench-screen">
                  <WindowsScreenshot 
                    type={activeDiag.type}
                    title={activeDiag.title}
                    data={activeDiag.data}
                  />
                </div>

                <div className="workbench-footer">
                  <span className="workbench-hint">
                    💡 Realistic interactive terminal and window simulations available for every operating system
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Operating System (Fully Active 6 OSes) */}
      <section className="section os-section" aria-labelledby="os-title">
        <div className="container">
          <h2 id="os-title" className="section-title">Select Your Operating System</h2>
          <p className="section-subtitle">Comprehensive troubleshooting libraries fully built out for all major platforms</p>
          <div className="os-cards-grid">
            {osConfig.operatingSystems.map(os => (
              <div key={os.id} className="os-card card card-3d-tilt os-card-available">
                <span className="os-card-icon">{os.icon}</span>
                <h3>{os.name}</h3>
                <p>{os.description}</p>
                <div style={{ marginTop: 'auto', paddingTop: '0.75rem' }}>
                  <Link to={`/guides/${os.id}`} className="btn btn-primary btn-sm" style={{ width: '100%', textAlign: 'center' }}>
                    Browse {os.name} ({getAllGuides(os.id).length})
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works" aria-labelledby="how-it-works-title">
        <div className="container">
          <h2 id="how-it-works-title" className="section-title">How IT Fix Hub Works</h2>
          <div className="steps-grid">
            <div className="how-step card-3d-tilt">
              <div className="how-step-number">1</div>
              <div className="how-step-icon">🔍</div>
              <h3>Describe Your Problem</h3>
              <p>Search by symptom in plain language — no technical jargon needed. Tell us what is happening on your device.</p>
            </div>
            <div className="how-step card-3d-tilt">
              <div className="how-step-number">2</div>
              <div className="how-step-icon">📋</div>
              <h3>Follow Safe Steps with Screenshots</h3>
              <p>Step-by-step instructions ordered from safest to most advanced, with clear warnings and interactive window mockups.</p>
            </div>
            <div className="how-step card-3d-tilt">
              <div className="how-step-number">3</div>
              <div className="how-step-icon">💡</div>
              <h3>Understand the Why</h3>
              <p>Every fix explains the underlying mechanism, empowering you to prevent recurring issues and master your hardware.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Symptoms */}
      <section className="section symptoms-preview" aria-labelledby="symptoms-title">
        <div className="container">
          <h2 id="symptoms-title" className="section-title">Common Problem Symptoms</h2>
          <p className="section-subtitle">Click on any problem to view immediate solutions</p>
          <div className="symptom-pills">
            {POPULAR_SYMPTOMS.map((s, i) => (
              <Link key={i} to={`/symptoms?q=${encodeURIComponent(s.q)}`} className="symptom-pill pill-3d-hover">
                {s.text}
              </Link>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/symptoms" className="btn btn-outline">Explore All Problem Symptoms →</Link>
          </div>
        </div>
      </section>

      {/* Categories for Selected OS */}
      <section className="section categories-section" aria-labelledby="categories-title">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 id="categories-title" className="section-title" style={{ textAlign: 'left', marginBottom: '0.25rem' }}>
                Browse by Category
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                Showing categories for: <strong>{osConfig.operatingSystems.find(o => o.id === activeOSId)?.name}</strong>
              </p>
            </div>

            {/* Quick OS switcher for categories */}
            <div className="os-switcher-row">
              {osConfig.operatingSystems.map(os => (
                <button
                  key={os.id}
                  type="button"
                  className={`os-pill-btn ${os.id === activeOSId ? 'active' : ''}`}
                  onClick={() => setActiveOSId(os.id)}
                >
                  <span>{os.icon}</span>
                  <span>{os.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="categories-grid">
            {categories.map(cat => (
              <Link to={`/guides/${activeOSId}?category=${cat.id}`} key={cat.id} className="category-card card card-hover card-3d-tilt">
                <span className="category-card-icon">{cat.icon}</span>
                <h3 className="category-card-name">{cat.name}</h3>
                <span className="category-card-count">{cat.count} guide{cat.count !== 1 ? 's' : ''}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skill Levels */}
      <section className="section levels-section" aria-labelledby="levels-title">
        <div className="container">
          <h2 id="levels-title" className="section-title">Start at Your Level</h2>
          <p className="section-subtitle">Structured progression designed to take beginners to certified IT problem solvers</p>
          <div className="levels-grid">
            <div className="level-card level-beginner card card-hover card-3d-tilt">
              <div className="level-card-icon">🌱</div>
              <h3>Beginner</h3>
              <p>New to your device? Start here. Learn interface basics, file navigation, app defaults, and essential permissions.</p>
              <ul className="level-topics">
                <li>Interface &amp; desktop navigation</li>
                <li>Default app configurations</li>
                <li>User accounts &amp; basic security</li>
                <li>Installing &amp; removing software</li>
              </ul>
              <Link to="/learning-path#beginner" className="btn btn-outline">Start Learning →</Link>
            </div>
            <div className="level-card level-intermediate card card-hover card-3d-tilt">
              <div className="level-card-icon">⚡</div>
              <h3>Intermediate</h3>
              <p>Know the basics? Level up. Fix network drops, printer issues, performance bottlenecks, and battery drain.</p>
              <ul className="level-topics">
                <li>Network &amp; Wi-Fi troubleshooting</li>
                <li>Printer &amp; hardware recovery</li>
                <li>Performance &amp; thermal optimization</li>
                <li>System updates &amp; service maintenance</li>
              </ul>
              <Link to="/learning-path#intermediate" className="btn btn-outline">Level Up →</Link>
            </div>
            <div className="level-card level-advanced card card-hover card-3d-tilt">
              <div className="level-card-icon">🔧</div>
              <h3>Advanced</h3>
              <p>Go pro. Dive into services, kernel panics, bootloader recovery (GRUB/UEFI), DFU restore, and dual-boot repairs.</p>
              <ul className="level-topics">
                <li>Services &amp; daemon management</li>
                <li>Kernel panics &amp; BSOD stop codes</li>
                <li>Boot &amp; disk filesystem repair</li>
                <li>Dual boot &amp; multiboot configurations</li>
              </ul>
              <Link to="/learning-path#advanced" className="btn btn-outline">Go Pro →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
