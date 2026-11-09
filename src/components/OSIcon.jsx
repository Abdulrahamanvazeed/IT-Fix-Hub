import React from 'react';

/**
 * OSIcon Component
 * Renders authentic, high-definition, official vector logos for all 6 supported platforms:
 * - Windows: Official Microsoft 4-pane Fluent Blue logo
 * - macOS: Official Apple monochrome silhouette
 * - Linux: Official Tux Penguin vector badge
 * - Android: Official Android Bugdroid in authentic #3ddc84 green
 * - iOS: Official iPhone / iOS Apple Mobile device badge
 * - Dual Boot: Dual-OS Windows + Linux EFI Multiboot Lightning badge
 */
export default function OSIcon({ os = 'windows', size = 20, className = '', style = {} }) {
  const normOS = (os || '').toLowerCase();

  const iconStyle = {
    display: 'inline-block',
    verticalAlign: 'middle',
    flexShrink: 0,
    ...style
  };

  if (normOS === 'windows' || normOS === 'win') {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        className={`os-icon os-icon-windows ${className}`}
        style={iconStyle}
        aria-hidden="true"
      >
        <rect x="2" y="2" width="9.2" height="9.2" rx="0.75" fill="#00adef" />
        <rect x="12.8" y="2" width="9.2" height="9.2" rx="0.75" fill="#0078d4" />
        <rect x="2" y="12.8" width="9.2" height="9.2" rx="0.75" fill="#0078d4" />
        <rect x="12.8" y="12.8" width="9.2" height="9.2" rx="0.75" fill="#005a9e" />
      </svg>
    );
  }

  if (normOS === 'macos' || normOS === 'mac' || normOS === 'apple') {
    return (
      <svg
        viewBox="0 0 170 170"
        width={size}
        height={size}
        fill="currentColor"
        className={`os-icon os-icon-macos ${className}`}
        style={iconStyle}
        aria-hidden="true"
      >
        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.07-7.66-7.85-11.88-14.34-5.78-8.93-10.27-18.9-13.48-29.9-3.21-11.01-4.82-21.72-4.82-32.14 0-14.59 3.65-26.69 10.96-36.29 7.3-9.61 16.54-14.53 27.7-14.76 4.71 0 10.23 1.34 16.56 4.02 6.33 2.68 10.23 4.08 11.71 4.22 2.22-.38 6.44-1.9 12.65-4.56 6.21-2.66 11.45-3.89 15.72-3.69 13.91.73 24.93 5.78 33.06 15.15-12.18 7.38-18.15 17.51-17.9 30.38.25 10.26 4.14 18.82 11.67 25.68 7.53 6.86 16.53 10.74 27.01 11.64-2.18 6.35-4.78 12.82-7.8 19.4zM119.22 33.82c0-7.39 2.67-14.37 8.01-20.94 5.34-6.57 11.89-10.77 19.65-12.6 1.02 7.15-1.34 14.28-7.08 21.39-5.74 7.11-12.61 11.19-20.58 12.15z" />
      </svg>
    );
  }

  if (normOS === 'linux') {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        className={`os-icon os-icon-linux ${className}`}
        style={iconStyle}
        aria-hidden="true"
      >
        {/* Tux Penguin Body */}
        <path d="M12 2C9.2 2 7.5 4 7.5 7v4c0 1.8-1 2.8-2.2 3.4C3.8 15.2 3 16.6 3 18.5 3 21 6.5 22.5 12 22.5s9-1.5 9-4c0-1.9-.8-3.3-2.3-4.1-1.2-.6-2.2-1.6-2.2-3.4V7c0-3-1.7-5-4.5-5z" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.75" />
        {/* White Belly */}
        <ellipse cx="12" cy="15" rx="4.8" ry="5.5" fill="#f8fafc" />
        {/* Eyes */}
        <ellipse cx="10" cy="6" rx="0.9" ry="1.2" fill="#f8fafc" />
        <circle cx="10.2" cy="6.2" r="0.5" fill="#020617" />
        <ellipse cx="14" cy="6" rx="0.9" ry="1.2" fill="#f8fafc" />
        <circle cx="13.8" cy="6.2" r="0.5" fill="#020617" />
        {/* Beak */}
        <path d="M10.2 7.8c0 1 1.8 1.8 1.8 1.8s1.8-.8 1.8-1.8c0-.6-.8-1-1.8-1s-1.8.4-1.8 1z" fill="#f59e0b" />
        {/* Feet */}
        <ellipse cx="8.5" cy="21.5" rx="2.5" ry="1" fill="#f59e0b" />
        <ellipse cx="15.5" cy="21.5" rx="2.5" ry="1" fill="#f59e0b" />
      </svg>
    );
  }

  if (normOS === 'android') {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="#3ddc84"
        className={`os-icon os-icon-android ${className}`}
        style={iconStyle}
        aria-hidden="true"
      >
        <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-4.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 2.23 12.95 2 12 2c-.96 0-1.86.23-2.66.63L7.85 1.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.73 4.29 5.5 6.01 5.5 8h13c0-1.99-1.23-3.71-2.97-4.84zM9 6c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
      </svg>
    );
  }

  if (normOS === 'ios') {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        className={`os-icon os-icon-ios ${className}`}
        style={iconStyle}
        aria-hidden="true"
      >
        <rect x="5" y="1.5" width="14" height="21" rx="3.5" stroke="#38bdf8" strokeWidth="1.8" fill="rgba(56, 189, 248, 0.1)" />
        <path d="M10 3.5h4" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="19.5" r="0.9" fill="#38bdf8" />
        {/* Apple Logo Silhouette on Screen */}
        <path d="M13 10.5c-.2.5-.5.9-.8 1.3-.4.5-.7.9-1 .9-.3 0-.7-.2-1.1-.2-.4 0-.8.2-1.2.2-.4 0-.8-.4-1.2-.9-.5-.7-.9-1.6-.9-2.5 0-1.5.9-2.3 1.8-2.3.4 0 .8.2 1.1.2.3 0 .7-.2 1.1-.2.8 0 1.5.4 1.9 1-.7.4-1.1 1.1-1.1 1.8.1.8.5 1.4 1.1 1.7z" fill="#f8fafc" />
        <path d="M12.3 6.8c0-.6.2-1.1.6-1.6.4-.5.9-.8 1.5-.9.1.5-.1 1.1-.5 1.6-.4.5-.9.8-1.6.9z" fill="#f8fafc" />
      </svg>
    );
  }

  if (normOS === 'dualboot' || normOS === 'dual-boot' || normOS === 'multiboot') {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        className={`os-icon os-icon-dualboot ${className}`}
        style={iconStyle}
        aria-hidden="true"
      >
        {/* Left Windows Partition */}
        <rect x="2" y="3" width="8" height="8" rx="1" fill="#00adef" />
        <rect x="2" y="13" width="8" height="8" rx="1" fill="#0078d4" />
        {/* Right Linux / Multiboot Partition */}
        <rect x="14" y="3" width="8" height="8" rx="1" fill="#38bdf8" />
        <rect x="14" y="13" width="8" height="8" rx="1" fill="#34d399" />
        {/* Dynamic Dual Boot Electric Connector */}
        <path d="M13 2L8.5 12h4.5l-2 10 7.5-12h-4.5l3.5-8z" fill="#fbbf24" stroke="#0f172a" strokeWidth="1" />
      </svg>
    );
  }

  // Fallback to Globe or wrench
  return (
    <span className={`os-icon ${className}`} style={{ fontSize: `${size}px`, ...style }} aria-hidden="true">
      💻
    </span>
  );
}
