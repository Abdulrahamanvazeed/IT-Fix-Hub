import { useState } from 'react';
import OSIcon from './OSIcon';

/**
 * WindowsScreenshot component
 * Renders an authentic, interactive Windows 11/10 UI window mockup/screenshot
 * with 3D depth, interactive copy buttons, and visual callouts.
 */
export default function WindowsScreenshot({ type = 'terminal', title, subtitle, data = {}, stepNum }) {
  const [copied, setCopied] = useState(false);
  const [is3DActive, setIs3DActive] = useState(false);
  const [activeTab, setActiveTab] = useState(data.defaultTab || 'main');

  const cmdString = data.command || '';
  const titleLower = (title || '').toLowerCase();
  const isMac = titleLower.includes('mac') || cmdString.includes('tmutil') || cmdString.includes('xattr') || cmdString.includes('mDNSResponder') || cmdString.includes('dscacheutil');
  const isLinux = titleLower.includes('linux') || titleLower.includes('grub') || cmdString.includes('systemctl') || cmdString.includes('apt') || cmdString.includes('timedatectl') || cmdString.includes('htop') || cmdString.includes('journalctl');

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="win-screenshot-wrapper">
      <div className="win-screenshot-bar">
        <span className="win-screenshot-tag">
          <span className="win-screenshot-pulse"></span>
          <OSIcon os={isMac ? 'macos' : (isLinux ? 'linux' : 'windows')} size={14} />
          Visual Walkthrough {stepNum ? `• Step ${stepNum}` : ''} {isMac ? '• macOS' : (isLinux ? '• Linux' : '• Windows')}
        </span>
        <button 
          type="button" 
          className={`win-3d-toggle ${is3DActive ? 'active' : ''}`}
          onClick={() => setIs3DActive(!is3DActive)}
          title="Toggle 3D View Perspective"
        >
          {is3DActive ? '🧊 3D View: ON' : '🧊 Toggle 3D View'}
        </button>
      </div>

      <div className={`win-window-frame ${is3DActive ? 'win-3d-tilt' : ''} ${isMac ? 'win-theme-mac' : (isLinux ? 'win-theme-linux' : `win-theme-${type}`)}`}>
        {/* Title Bar */}
        <div className="win-titlebar">
          <div className="win-titlebar-left">
            {isMac ? (
              <div className="mac-window-controls" aria-hidden="true" style={{ display: 'flex', gap: '6px', marginRight: '8px' }}>
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }}></span>
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}></span>
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }}></span>
              </div>
            ) : (
              <span className="win-app-icon">
                {type === 'terminal' && '⬛'}
                {type === 'device-manager' && '🔌'}
                {type === 'task-manager' && '📊'}
                {type === 'registry' && '🗝️'}
                {type === 'settings' && '⚙️'}
                {type === 'services' && '⚙️'}
                {type === 'bsod' && ':( '}
                {type === 'disk-utility' && '💽'}
              </span>
            )}
            <span className="win-titlebar-text">
              {title || (
                isMac ? 'Terminal — zsh — 80×24' :
                isLinux ? 'bash — terminal@linux-box:~' :
                type === 'terminal' ? 'Administrator: Windows Terminal / Command Prompt' :
                type === 'device-manager' ? 'Device Manager' :
                type === 'task-manager' ? 'Task Manager' :
                type === 'registry' ? 'Registry Editor' :
                type === 'settings' ? 'Settings' :
                type === 'services' ? 'Services (Local)' :
                type === 'bsod' ? 'Windows Stop Code Recovery' : 'Disk Utility'
              )}
            </span>
          </div>
          {!isMac && (
            <div className="win-window-controls" aria-hidden="true">
              <span className="win-btn-minimize">─</span>
              <span className="win-btn-maximize">□</span>
              <span className="win-btn-close">✕</span>
            </div>
          )}
        </div>

        {/* Window Content by Type */}
        <div className="win-window-body">
          {/* 1. TERMINAL / COMMAND PROMPT */}
          {type === 'terminal' && (
            <div className="win-terminal-content">
              <div className="win-terminal-meta">
                <span>{isMac ? 'Last login: Today on ttys000 — macOS Sonoma/Sequoia' : (isLinux ? 'Linux 6.8.0-generic x86_64 — GNU Bash' : 'Microsoft Windows [Version 10.0.22631.3007]')}</span>
                <span>{isMac ? 'Apple Inc. All rights reserved. Administrator mode.' : (isLinux ? 'System load: 0.12, 0.08, 0.05 — All rights reserved.' : '(c) Microsoft Corporation. Run as Administrator.')}</span>
              </div>
              <div className="win-terminal-cmd-block">
                <span className="win-prompt">
                  {isMac ? 'rahaman@macbook-pro ~ % ' : (isLinux ? 'rahaman@linux-pc:~$ ' : 'C:\\Windows\\System32>')}
                </span>
                <span className="win-command-text">{data.command || 'ipconfig /flushdns'}</span>
                <span className="win-cursor">█</span>
              </div>

              {data.output && (
                <div className="win-terminal-output">
                  <pre>{data.output}</pre>
                </div>
              )}

              {data.command && (
                <div className="win-terminal-actions">
                  <button 
                    type="button" 
                    className="win-copy-btn"
                    onClick={() => handleCopy(data.command)}
                  >
                    {copied ? '✅ Copied to Clipboard!' : '📋 Copy This Command'}
                  </button>
                  <span className="win-action-tip">👉 Paste with <strong>Ctrl + V</strong> in your terminal</span>
                </div>
              )}
            </div>
          )}

          {/* 2. DEVICE MANAGER */}
          {type === 'device-manager' && (
            <div className="win-devmgr-content">
              <div className="win-devmgr-toolbar">
                <span>File</span><span>Action</span><span>View</span><span>Help</span>
              </div>
              <div className="win-devmgr-tree">
                <div className="win-tree-root">💻 DESKTOP-RAHAMAN-PC</div>
                <div className="win-tree-item">📁 Audio inputs and outputs</div>
                <div className="win-tree-item">📁 Batteries</div>
                <div className="win-tree-item win-tree-expanded">
                  <span className="win-tree-arrow">▼</span> 📁 Network adapters
                  <div className="win-tree-sublist">
                    <div className="win-tree-subitem">Realtek Gaming 2.5GbE Family Controller</div>
                    <div className="win-tree-subitem win-tree-highlighted">
                      <span className="win-warning-icon">⚠️</span> 
                      <strong>{data.deviceName || 'Intel(R) Wi-Fi 6 AX201 160MHz'}</strong>
                      <span className="win-callout-pill">👉 Target Device</span>
                    </div>
                    <div className="win-tree-subitem">WAN Miniport (IP)</div>
                  </div>
                </div>
                <div className="win-tree-item">📁 Display adapters</div>
                <div className="win-tree-item">📁 Processors</div>
              </div>
              <div className="win-callout-dialog">
                <div className="win-dialog-header">
                  <strong>Properties • Driver Tab</strong>
                </div>
                <div className="win-dialog-actions">
                  <div className="win-mock-btn">Driver Details</div>
                  <div className="win-mock-btn win-mock-btn-primary">Update Driver...</div>
                  <div className="win-mock-btn win-mock-btn-accent">
                    👉 Roll Back Driver
                  </div>
                  <div className="win-mock-btn win-mock-btn-danger">Uninstall Device</div>
                </div>
              </div>
            </div>
          )}

          {/* 3. TASK MANAGER */}
          {type === 'task-manager' && (
            <div className="win-taskmgr-content">
              <div className="win-taskmgr-tabs">
                <span className={`win-tab ${activeTab === 'main' ? 'active' : ''}`} onClick={() => setActiveTab('main')}>Processes</span>
                <span className={`win-tab ${activeTab === 'perf' ? 'active' : ''}`} onClick={() => setActiveTab('perf')}>Performance</span>
                <span className={`win-tab ${activeTab === 'startup' ? 'active' : ''}`} onClick={() => setActiveTab('startup')}>Startup Apps</span>
              </div>
              <div className="win-taskmgr-table">
                <div className="win-table-header">
                  <span>Name</span>
                  <span className="win-col-right">CPU</span>
                  <span className="win-col-right">Memory</span>
                  <span className="win-col-right">Status</span>
                </div>
                <div className="win-table-row win-row-danger">
                  <span className="win-proc-name">🔥 {data.culprit || 'System Resource Hog / Runaway App'}</span>
                  <span className="win-col-right win-meter-high">{data.cpu || '89.4%'}</span>
                  <span className="win-col-right win-meter-medium">{data.mem || '1,420 MB'}</span>
                  <span className="win-col-right"><span className="win-badge-danger">Very High</span></span>
                </div>
                <div className="win-table-row">
                  <span className="win-proc-name">🌐 Google Chrome (18 tabs)</span>
                  <span className="win-col-right">4.1%</span>
                  <span className="win-col-right">820 MB</span>
                  <span className="win-col-right">Normal</span>
                </div>
                <div className="win-table-row">
                  <span className="win-proc-name">🪟 Windows Explorer</span>
                  <span className="win-col-right">0.8%</span>
                  <span className="win-col-right">94 MB</span>
                  <span className="win-col-right">Normal</span>
                </div>
              </div>
              <div className="win-taskmgr-footer">
                <span className="win-footer-note">Select process and click End Task to immediately stop high CPU/RAM usage</span>
                <button type="button" className="win-endtask-btn">End Task (Ctrl + Del)</button>
              </div>
            </div>
          )}

          {/* 4. REGISTRY EDITOR */}
          {type === 'registry' && (
            <div className="win-regedit-content">
              <div className="win-regedit-addressbar">
                <span className="win-reg-addr-label">Address:</span>
                <span className="win-reg-addr-path">{data.path || 'Computer\\HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion'}</span>
              </div>
              <div className="win-regedit-split">
                <div className="win-regedit-tree">
                  <div>📁 Computer</div>
                  <div style={{ paddingLeft: '12px' }}>📁 HKEY_CLASSES_ROOT</div>
                  <div style={{ paddingLeft: '12px' }}>📁 HKEY_CURRENT_USER</div>
                  <div style={{ paddingLeft: '12px' }} className="win-reg-active-key">
                    ▼ 📂 HKEY_LOCAL_MACHINE
                    <div style={{ paddingLeft: '16px' }}>📁 SYSTEM</div>
                    <div style={{ paddingLeft: '16px' }} className="win-reg-highlight">📁 CurrentControlSet</div>
                  </div>
                </div>
                <div className="win-regedit-values">
                  <div className="win-reg-val-header">
                    <span>Name</span><span>Type</span><span>Data</span>
                  </div>
                  <div className="win-reg-val-row win-reg-val-active">
                    <span>{data.valueName || 'DisableSearchBoxSuggestions'}</span>
                    <span>REG_DWORD</span>
                    <span>{data.valueData || '0x00000001 (1)'}</span>
                  </div>
                  <div className="win-reg-val-row">
                    <span>(Default)</span>
                    <span>REG_SZ</span>
                    <span>(value not set)</span>
                  </div>
                </div>
              </div>
              <div className="win-reg-safety-banner">
                🛡️ <strong>Safety Protected:</strong> Always use <em>File &gt; Export</em> to create a backup before modifying keys.
              </div>
            </div>
          )}

          {/* 5. SETTINGS */}
          {type === 'settings' && (
            <div className="win-settings-content">
              <div className="win-settings-split">
                <div className="win-settings-sidebar">
                  <div className="win-settings-user">
                    <span className="win-avatar">AR</span>
                    <div>
                      <strong>Abdul Rahaman</strong>
                      <small>Local Administrator</small>
                    </div>
                  </div>
                  <div className="win-nav-item active">💻 System</div>
                  <div className="win-nav-item">🌐 Network &amp; Internet</div>
                  <div className="win-nav-item">📦 Apps &amp; Default Programs</div>
                  <div className="win-nav-item">🔄 Windows Update</div>
                </div>
                <div className="win-settings-main">
                  <div className="win-settings-breadcrumb">
                    {data.breadcrumb || 'Settings > System > Display'}
                  </div>
                  <div className="win-settings-card">
                    <div className="win-settings-card-header">
                      <strong>{data.settingTitle || 'Default Application Configuration'}</strong>
                      <p>{data.settingDesc || 'Choose how Windows handles file types and standard protocols'}</p>
                    </div>
                    <div className="win-toggle-row">
                      <span>Enable recommended configuration</span>
                      <span className="win-mock-toggle active"></span>
                    </div>
                    <div className="win-setting-action-row">
                      <div className="win-mock-btn win-mock-btn-primary">
                        👉 {data.actionText || 'Set as Default Browser / App'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. SERVICES */}
          {type === 'services' && (
            <div className="win-services-content">
              <div className="win-services-table">
                <div className="win-svc-row win-svc-header">
                  <span>Service Name</span>
                  <span>Description</span>
                  <span>Status</span>
                  <span>Startup</span>
                </div>
                <div className="win-svc-row win-svc-highlight">
                  <span><strong>{data.serviceName || 'Print Spooler'}</strong></span>
                  <span>Spools print jobs and handles interaction with the printer</span>
                  <span className="win-status-running">● Running</span>
                  <span>Automatic</span>
                </div>
                <div className="win-svc-row">
                  <span>Windows Update</span>
                  <span>Enables detection and installation of updates</span>
                  <span className="win-status-running">● Running</span>
                  <span>Manual</span>
                </div>
              </div>
              <div className="win-svc-controls">
                <span>Action:</span>
                <span className="win-mock-btn win-mock-btn-primary">▶ Start</span>
                <span className="win-mock-btn win-mock-btn-danger">■ Stop</span>
                <span className="win-mock-btn win-mock-btn-accent">🔄 Restart Service</span>
              </div>
            </div>
          )}

          {/* 7. BSOD (Blue Screen of Death) */}
          {type === 'bsod' && (
            <div className="win-bsod-content">
              <div className="win-bsod-emoticon">:(</div>
              <h2>Your PC ran into a problem and needs to restart.</h2>
              <p>We're just collecting some error info, and then we'll restart for you. (100% complete)</p>
              <div className="win-bsod-details">
                <div className="win-bsod-qr" aria-hidden="true">
                  <div className="win-qr-box">QR CODE</div>
                </div>
                <div className="win-bsod-text">
                  <p>For more information about this issue and possible fixes, visit:</p>
                  <code>https://www.windows.com/stopcode</code>
                  <div className="win-stopcode-badge">
                    <strong>Stop Code:</strong> {data.stopCode || 'CRITICAL_PROCESS_DIED'}
                  </div>
                  {data.whatFailed && (
                    <div className="win-failed-badge">
                      <strong>What failed:</strong> {data.whatFailed}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 8. DISK UTILITY / CHKDSK */}
          {type === 'disk-utility' && (
            <div className="win-disk-content">
              <div className="win-disk-header">
                <span>Local Disk (C:) Properties &amp; File System Check</span>
              </div>
              <div className="win-disk-bar-wrapper">
                <div className="win-disk-bar" style={{ width: '68%' }}></div>
              </div>
              <div className="win-disk-stats">
                <span>Used Space: 312 GB</span>
                <span>Free Space: 164 GB (Capacity: 476 GB)</span>
              </div>
              <div className="win-disk-actions">
                <div className="win-mock-btn win-mock-btn-primary">🧹 Disk Cleanup</div>
                <div className="win-mock-btn win-mock-btn-accent">🔍 Scan Drive for Errors (chkdsk)</div>
                <div className="win-mock-btn">⚡ Optimize &amp; Defragment</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
