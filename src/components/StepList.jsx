import { useState } from 'react';
import WarningBox from './WarningBox';
import WindowsScreenshot from './WindowsScreenshot';

/**
 * Helper to analyze a step and determine if a visual screenshot mockup applies,
 * and what specific data to show in it.
 */
function analyzeStepScreenshot(step) {
  const text = `${step.instruction} ${step.detail || ''}`.toLowerCase();

  // 1. Terminal / Command Prompt
  const cmdMatches = (step.detail || '').match(/(ipconfig[^\n\r]+|netsh[^\n\r]+|sfc[^\n\r]+|DISM[^\n\r]+|chkdsk[^\n\r]+|bootrec[^\n\r]+|sc[^\n\r]+|gpupdate[^\n\r]+|wmic[^\n\r]+|verifier[^\n\r]+|msiexec[^\n\r]+|bcdboot[^\n\r]+)/i);
  if (cmdMatches || text.includes('command prompt') || text.includes('cmd') || text.includes('powershell')) {
    const rawCmd = cmdMatches ? cmdMatches[1].trim() : (step.command || 'ipconfig /flushdns');
    let outputText = 'Executing system diagnostic routine...\nOperation completed successfully.';
    if (rawCmd.includes('flushdns')) {
      outputText = 'Windows IP Configuration\n\nSuccessfully flushed the DNS Resolver Cache.';
    } else if (rawCmd.includes('sfc')) {
      outputText = 'Beginning system scan. This process will take some time.\nBeginning verification phase of system scan.\nVerification 100% complete.\nWindows Resource Protection did not find any integrity violations.';
    } else if (rawCmd.includes('DISM')) {
      outputText = '[==========================100.0%==========================]\nThe restore operation completed successfully.\nThe operation completed successfully.';
    } else if (rawCmd.includes('netsh')) {
      outputText = 'Sucessfully reset the Winsock Catalog.\nYou must restart the computer in order to complete the reset.';
    }
    return {
      type: 'terminal',
      title: 'Administrator: Windows Terminal / Command Prompt',
      data: { command: rawCmd, output: outputText }
    };
  }

  // 2. Device Manager
  if (text.includes('device manager') || text.includes('driver') || text.includes('hardware id')) {
    let devName = 'Intel(R) Wi-Fi 6 AX201 160MHz';
    if (text.includes('display') || text.includes('graphics')) devName = 'NVIDIA GeForce RTX / Intel Iris Xe';
    if (text.includes('audio') || text.includes('sound')) devName = 'Realtek High Definition Audio';
    if (text.includes('printer')) devName = 'Network / USB Printing Adapter';
    return {
      type: 'device-manager',
      title: 'Device Manager • Driver Management',
      data: { deviceName: devName }
    };
  }

  // 3. Task Manager
  if (text.includes('task manager') || text.includes('high cpu') || text.includes('high memory') || text.includes('resource hog') || text.includes('startup apps')) {
    return {
      type: 'task-manager',
      title: 'Task Manager (Ctrl + Shift + Esc)',
      data: {
        culprit: text.includes('memory') ? 'Browser / Memory Leaking Background App' : 'SearchIndexer / High Resource Process',
        cpu: text.includes('cpu') ? '94.2%' : '12.4%',
        mem: text.includes('memory') ? '3,840 MB' : '412 MB'
      }
    };
  }

  // 4. Registry Editor
  if (text.includes('regedit') || text.includes('registry') || text.includes('hkey')) {
    const pathMatch = (step.detail || '').match(/HKEY_[A-Z_\\\-]+/i);
    return {
      type: 'registry',
      title: 'Registry Editor (regedit.exe)',
      data: {
        path: pathMatch ? `Computer\\${pathMatch[0]}` : 'Computer\\HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows',
        valueName: 'ConfiguredPolicyValue',
        valueData: '0x00000001 (1)'
      }
    };
  }

  // 5. Windows Settings
  if (text.includes('settings >') || text.includes('default apps') || text.includes('display settings') || text.includes('storage sense')) {
    const path = (step.detail || '').match(/Settings\s*>[^.\n]+/i);
    return {
      type: 'settings',
      title: 'Windows Settings App',
      data: {
        breadcrumb: path ? path[0].trim() : 'Settings > System > Configuration',
        settingTitle: step.instruction,
        actionText: 'Apply Recommended Settings'
      }
    };
  }

  // 6. Services
  if (text.includes('services.msc') || text.includes('service') || text.includes('print spooler')) {
    return {
      type: 'services',
      title: 'Services Console (services.msc)',
      data: {
        serviceName: text.includes('spooler') ? 'Print Spooler' : (text.includes('update') ? 'Windows Update' : 'Target System Service')
      }
    };
  }

  // 7. BSOD / Blue Screen
  if (text.includes('blue screen') || text.includes('bsod') || text.includes('stop code') || text.includes('safe mode')) {
    return {
      type: 'bsod',
      title: 'Windows Recovery Environment & Diagnostic Stop Screen',
      data: {
        stopCode: 'CRITICAL_PROCESS_DIED',
        whatFailed: 'system_service_exception.sys'
      }
    };
  }

  // 8. Disk utilities
  if (text.includes('disk cleanup') || text.includes('chkdsk') || text.includes('defragment') || text.includes('storage space')) {
    return {
      type: 'disk-utility',
      title: 'Drive Health & Storage Optimization Utility',
      data: {}
    };
  }

  // Default fallback to terminal if command exists
  if (step.command) {
    return {
      type: 'terminal',
      title: 'Windows Command Prompt',
      data: { command: step.command }
    };
  }

  return null;
}

export default function StepList({ steps }) {
  const [completedSteps, setCompletedSteps] = useState({});
  const [expandedScreenshots, setExpandedScreenshots] = useState(() => {
    // Expand the first screenshot by default for immediate visual feedback
    return { 0: true };
  });

  if (!steps || steps.length === 0) {
    return (
      <p className="text-muted" style={{ fontStyle: 'italic' }}>
        No steps available for this guide.
      </p>
    );
  }

  const toggleStepCompleted = (index) => {
    setCompletedSteps(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleScreenshot = (index) => {
    setExpandedScreenshots(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="step-list-container">
      <div className="step-list-toolbar">
        <span className="step-progress-counter">
          ✅ <strong>Progress:</strong> {Object.values(completedSteps).filter(Boolean).length} of {steps.length} steps completed
        </span>
        <button 
          type="button" 
          className="btn-toggle-all-screens"
          onClick={() => {
            const allExpanded = Object.keys(expandedScreenshots).length >= steps.length &&
              Object.values(expandedScreenshots).every(Boolean);
            if (allExpanded) {
              setExpandedScreenshots({});
            } else {
              const all = {};
              steps.forEach((_, i) => { all[i] = true; });
              setExpandedScreenshots(all);
            }
          }}
        >
          🖼️ Toggle All Visual Screenshots
        </button>
      </div>

      <ol className="step-list" aria-label="Step-by-step instructions">
        {steps.map((step, index) => {
          const isCompleted = !!completedSteps[index];
          const screenshotInfo = analyzeStepScreenshot(step);
          const showScreenshot = !!expandedScreenshots[index];

          return (
            <li key={index} className={`step-item ${isCompleted ? 'step-completed' : ''}`}>
              <div 
                className={`step-number ${isCompleted ? 'completed' : ''}`}
                aria-hidden="true"
                onClick={() => toggleStepCompleted(index)}
                title="Click to mark step as done"
              >
                {isCompleted ? '✓' : index + 1}
              </div>

              <div className="step-content">
                {/* Header row with badges and completion checkbox */}
                <div className="step-header-row">
                  <div className="step-badges">
                    {step.adminRequired && (
                      <span className="step-badge-admin" aria-label="Requires administrator privileges">
                        🔒 Administrator Required
                      </span>
                    )}
                    {step.backupAdvised && (
                      <span className="step-badge-backup" aria-label="Back up your data first">
                        💾 Backup Advised
                      </span>
                    )}
                  </div>

                  <label className="step-check-label">
                    <input 
                      type="checkbox" 
                      checked={isCompleted} 
                      onChange={() => toggleStepCompleted(index)}
                    />
                    <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                  </label>
                </div>

                {/* Warning before the step */}
                {step.warning && (
                  <WarningBox type="warning" title="Caution">
                    {step.warning}
                  </WarningBox>
                )}

                <h3 className="step-instruction">{step.instruction}</h3>

                {step.detail && (
                  <div className="step-detail">
                    {typeof step.detail === 'string' ? (
                      step.detail.includes('\n') ? (
                        step.detail.split('\n').map((line, i) => (
                          <p key={i}>{line}</p>
                        ))
                      ) : (
                        <p>{step.detail}</p>
                      )
                    ) : (
                      step.detail
                    )}
                  </div>
                )}

                {/* VISUAL SCREENSHOT WALKTHROUGH */}
                {screenshotInfo && (
                  <div className="step-screenshot-section">
                    <button 
                      type="button" 
                      className={`step-screenshot-toggle-btn ${showScreenshot ? 'open' : ''}`}
                      onClick={() => toggleScreenshot(index)}
                      aria-expanded={showScreenshot}
                    >
                      <span className="toggle-icon">{showScreenshot ? '▼' : '▶'}</span>
                      <span className="toggle-label">
                        {showScreenshot ? 'Hide Visual Window Screenshot' : '📸 View Interactive Visual Screenshot'}
                      </span>
                      <span className="toggle-pill">{screenshotInfo.title}</span>
                    </button>

                    {showScreenshot && (
                      <div className="step-screenshot-card animate-fade-in">
                        <WindowsScreenshot 
                          type={screenshotInfo.type}
                          title={screenshotInfo.title}
                          data={screenshotInfo.data}
                          stepNum={index + 1}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
