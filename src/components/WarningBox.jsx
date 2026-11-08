const TYPE_CONFIG = {
  warning: {
    icon: '⚠️',
    className: 'alert-warning',
    role: 'note',
  },
  danger: {
    icon: '🛑',
    className: 'alert-danger',
    role: 'alert',
  },
  info: {
    icon: 'ℹ️',
    className: 'alert-info',
    role: 'note',
  },
  success: {
    icon: '✅',
    className: 'alert-success',
    role: 'note',
  },
};

export default function WarningBox({ type = 'warning', title, children }) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.warning;

  return (
    <div className={`alert ${config.className}`} role={config.role}>
      <span className="alert-icon" aria-hidden="true">{config.icon}</span>
      <div className="alert-content">
        {title && <span className="alert-title">{title}</span>}
        {children}
      </div>
    </div>
  );
}
