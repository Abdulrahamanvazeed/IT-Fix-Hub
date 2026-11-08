import { useState } from 'react';
import GuideCard from '../components/GuideCard';
import { getGuidesByLevel, getOSConfig } from '../utils/contentLoader';

const LEVELS = [
  {
    id: 'beginner',
    icon: '🌱',
    title: 'Beginner',
    tagline: 'Start Here — Foundational Skills & Essentials',
    description: 'Perfect for anyone new to the operating system. Learn the interface basics, file management, and default app settings.',
    whatYouLearn: [
      'Desktop and system navigation (Finder, Start, Shell, Launcher)',
      'Find, organize, and manage files and directories',
      'Change display, privacy, and system settings',
      'Set default browser, email, and media applications',
      'Manage user accounts, permissions, and security',
      'Install and remove software safely',
      'Manage storage space and clear system caches',
      'Understand and run operating system updates',
    ],
    color: '#16a34a',
  },
  {
    id: 'intermediate',
    icon: '⚡',
    title: 'Intermediate',
    tagline: 'Level Up — Solve Common Everyday Problems',
    description: 'You know the basics — now diagnose and troubleshoot issues that arise day to day: network, printers, performance, and updates.',
    whatYouLearn: [
      'Diagnose and fix Wi-Fi and network connectivity drops',
      'Troubleshoot offline printers and reset print spooler/CUPS systems',
      'Speed up sluggish systems and manage background processes',
      'Fix operating system update errors and stuck caches',
      'Optimize browser settings, manage extensions, and clear caches',
      'Identify and terminate high CPU/memory runaway threads',
      'Manage power settings, battery health, and background daemons',
      'Use native task and activity monitors effectively',
    ],
    color: '#2563eb',
  },
  {
    id: 'advanced',
    icon: '🔧',
    title: 'Advanced',
    tagline: 'Go Pro — Deep Diagnostics, Recovery, & Boot Repair',
    description: 'Dive deep into system internals. Master recovery environments, command-line repair tools, bootloaders, and kernel crash diagnostics.',
    whatYouLearn: [
      'Manage system services and background daemons (systemd, Windows services, launchd)',
      'Configure low-level policies, registry keys, and extended attributes',
      'Troubleshoot driver crashes, kernel panics, and BSOD stop codes',
      'Diagnose hardware issues via system event and analytics crash logs',
      'Repair broken bootloaders (GRUB2, Windows Boot Manager, macOS Recovery, DFU mode)',
      'Run low-level filesystem consistency checks (fsck, chkdsk, Disk Utility First Aid)',
      'Fix dual-boot partition locks, BitLocker TPM prompts, and RTC clock desync',
      'Diagnose complex application crashes, memory leaks, and dependency conflicts',
    ],
    color: '#7c3aed',
  },
];

export default function LearningPath() {
  const [selectedOS, setSelectedOS] = useState('windows');
  const osConfig = getOSConfig();
  const currentOSData = osConfig.operatingSystems.find(o => o.id === selectedOS) || osConfig.operatingSystems[0];

  return (
    <div className="learning-path container">
      <header className="lp-header">
        <h1>🎓 Your Learning Path</h1>
        <p className="lp-subtitle">
          Progress from beginner to pro at your own pace across all operating systems. Each level builds on the previous one.
          Select your target platform below to begin.
        </p>
        <p className="lp-author">Curated by <strong>Abdul Rahaman</strong></p>

        {/* Operating System Selector */}
        <div className="os-switcher-row" style={{ marginTop: '1.5rem', justifyContent: 'center' }}>
          {osConfig.operatingSystems.map(os => (
            <button
              key={os.id}
              type="button"
              className={`os-pill-btn ${selectedOS === os.id ? 'active' : ''}`}
              onClick={() => setSelectedOS(os.id)}
            >
              <span>{os.icon}</span>
              <span>{os.name}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="lp-progress" role="img" aria-label="Learning progression: Beginner to Intermediate to Advanced">
        <div className="lp-progress-step lp-progress-beginner">
          <span className="lp-progress-icon">🌱</span>
          <span>Beginner</span>
        </div>
        <div className="lp-progress-arrow">→</div>
        <div className="lp-progress-step lp-progress-intermediate">
          <span className="lp-progress-icon">⚡</span>
          <span>Intermediate</span>
        </div>
        <div className="lp-progress-arrow">→</div>
        <div className="lp-progress-step lp-progress-advanced">
          <span className="lp-progress-icon">🔧</span>
          <span>Advanced</span>
        </div>
      </div>

      {/* Level Sections */}
      {LEVELS.map((level, index) => {
        const guides = getGuidesByLevel(level.id, selectedOS);
        return (
          <section key={level.id} id={level.id} className={`lp-level-section lp-level-${level.id}`} aria-labelledby={`level-${level.id}`}>
            <div className="lp-level-header" style={{ borderLeftColor: level.color }}>
              <div className="lp-level-number">Level {index + 1}</div>
              <div className="lp-level-icon">{level.icon}</div>
              <div>
                <h2 id={`level-${level.id}`}>{level.title} — {currentOSData.name}</h2>
                <p className="lp-level-tagline">{level.tagline}</p>
              </div>
            </div>
            <p className="lp-level-description">{level.description}</p>

            <div className="lp-what-you-learn">
              <h3>✅ Core Competencies</h3>
              <ul>
                {level.whatYouLearn.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <h3 className="lp-guides-title">
              📚 {currentOSData.icon} {currentOSData.name} Guides in This Level ({guides.length})
            </h3>
            {guides.length > 0 ? (
              <div className="guides-grid">
                {guides.map(guide => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            ) : (
              <p className="lp-no-guides">Guides for {currentOSData.name} at this level are actively being updated.</p>
            )}
          </section>
        );
      })}
    </div>
  );
}
