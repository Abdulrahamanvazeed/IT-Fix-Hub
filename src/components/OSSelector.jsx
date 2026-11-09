import { useState, useRef, useEffect } from 'react';
import { getOSConfig } from '../utils/contentLoader';
import OSIcon from './OSIcon';

export default function OSSelector({ currentOS, onSelect, variant = 'dropdown' }) {
  const osConfig = getOSConfig();
  const osList = osConfig.operatingSystems || [];
  const currentOSData = osList.find((os) => os.id === currentOS) || osList[0];

  if (variant === 'cards') {
    return <OSSelectorCards osList={osList} currentOS={currentOS} onSelect={onSelect} />;
  }

  return <OSSelectorDropdown osList={osList} currentOS={currentOS} currentOSData={currentOSData} onSelect={onSelect} />;
}

function OSSelectorDropdown({ osList, currentOS, currentOSData, onSelect }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  function handleSelect(os) {
    if (!os.available) return;
    onSelect(os.id);
    setOpen(false);
  }

  return (
    <div className="os-selector-dropdown" ref={containerRef}>
      <button
        className="os-selector-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Operating System: ${currentOSData?.name || 'Select'}`}
      >
        <span className="os-selector-trigger-icon" aria-hidden="true">
          <OSIcon os={currentOSData?.id} size={16} />
        </span>
        {currentOSData?.name}
        <span
          className={`os-selector-trigger-arrow${open ? ' open' : ''}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="os-selector-menu" role="listbox" aria-label="Select operating system">
          {osList.map((os) => (
            <button
              key={os.id}
              className={`os-selector-option${os.id === currentOS ? ' os-selector-option-active' : ''}${!os.available ? ' os-selector-option-disabled' : ''}`}
              onClick={() => handleSelect(os)}
              role="option"
              aria-selected={os.id === currentOS}
              disabled={!os.available}
            >
              <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center' }}>
                <OSIcon os={os.id} size={18} />
              </span>
              <span className="os-selector-option-info">
                <span className="os-selector-option-name">
                  {os.name}
                  {!os.available && (
                    <span className="badge badge-coming-soon" style={{ marginLeft: '0.5rem' }}>
                      Coming Soon
                    </span>
                  )}
                </span>
                <span className="os-selector-option-desc">{os.description}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function OSSelectorCards({ osList, currentOS, onSelect }) {
  function handleSelect(os) {
    if (!os.available) return;
    onSelect(os.id);
  }

  return (
    <div className="os-selector-cards" role="radiogroup" aria-label="Select operating system">
      {osList.map((os) => (
        <button
          key={os.id}
          className={`os-card${os.id === currentOS ? ' os-card-active' : ''}${!os.available ? ' os-card-disabled' : ''}`}
          onClick={() => handleSelect(os)}
          role="radio"
          aria-checked={os.id === currentOS}
          disabled={!os.available}
          aria-label={`${os.name}${!os.available ? ' — Coming Soon' : ''}`}
        >
          <span className="os-card-icon" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <OSIcon os={os.id} size={42} />
          </span>
          <span className="os-card-name">{os.name}</span>
          {os.available ? (
            <span className="os-card-desc">{os.description}</span>
          ) : (
            <span className="badge badge-coming-soon">Coming Soon</span>
          )}
        </button>
      ))}
    </div>
  );
}
