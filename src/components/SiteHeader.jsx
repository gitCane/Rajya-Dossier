export default function SiteHeader({ breadcrumb, theme, onThemeToggle }) {
  return (
    <div className="top">
      <div className="in">
        <a className="brand" href="#home">
          <i aria-hidden="true" />
          Rajya Dossier
        </a>
        <span className="crumb">{breadcrumb}</span>
        <button
          className="btn sm"
          type="button"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          onClick={onThemeToggle}
        >
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </div>
  );
}
