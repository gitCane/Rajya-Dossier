import { useEffect, useState } from 'react';
import DossierPage from './components/DossierPage.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './components/HomePage.jsx';
import PageNavigation from './components/PageNavigation.jsx';
import RevisionDeck from './components/RevisionDeck.jsx';
import SectionNavigation from './components/SectionNavigation.jsx';
import SiteHeader from './components/SiteHeader.jsx';
import { OFFICE_HOLDERS_SNAPSHOT } from './data/officeHolders.js';
import { getStateDossier, REGIONS } from './data/states/index.js';

const THEME_KEY = 'rd_theme';

function toStateSlug(stateName) {
  return stateName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const states = REGIONS.flatMap(([, stateNames]) =>
  stateNames.map((name) => {
    const slug = toStateSlug(name);
    return { name, slug, dossier: getStateDossier(name, slug) };
  }),
);
const validPages = new Set([
  'home',
  ...states.flatMap((state) => state.dossier.ORDER),
]);

function getPageFromHash() {
  const page = window.location.hash.slice(1);
  return validPages.has(page) ? page : 'home';
}

function getStoredTheme() {
  try {
    const theme = window.localStorage.getItem(THEME_KEY);
    return theme === 'light' || theme === 'dark' ? theme : null;
  } catch (error) {
    console.error('Unable to read the saved theme from local storage.', error);
    return null;
  }
}

export default function App() {
  const [activePage, setActivePage] = useState(getPageFromHash);
  const [theme, setTheme] = useState(getStoredTheme);
  const activeState = states.find((state) =>
    state.dossier.ORDER.includes(activePage),
  );
  const isRevisionPage =
    activeState && activePage === `${activeState.slug}-revision`;
  const activeDimension = activeState?.dossier.DIMS.find(
    (dimension) => `${activeState.slug}-${dimension[0]}` === activePage,
  );

  useEffect(() => {
    function updatePage() {
      setActivePage(getPageFromHash());
    }
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme) root.setAttribute('data-theme', theme);
    else root.removeAttribute('data-theme');

    if (theme) {
      try {
        window.localStorage.setItem(THEME_KEY, theme);
      } catch (error) {
        console.error('Unable to save the theme to local storage.', error);
      }
    }
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const breadcrumb = activeState
    ? `${activeState.name} · ${
        activePage === activeState.slug
          ? 'Overview'
          : isRevisionPage
            ? 'Revision deck'
            : activeDimension?.[1] ?? ''
      }`
    : 'Home';

  function toggleTheme() {
    setTheme((current) => {
      if (current) return current === 'dark' ? 'light' : 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'light'
        : 'dark';
    });
  }

  return (
    <>
      <SiteHeader
        breadcrumb={breadcrumb}
        theme={theme ?? 'system'}
        onThemeToggle={toggleTheme}
      />
      {activePage === 'home' && (
        <HomePage officeHolders={OFFICE_HOLDERS_SNAPSHOT} />
      )}
      {activeState && !isRevisionPage && (
        <DossierPage
          key={activeState.slug}
          activePage={activePage}
          stateName={activeState.name}
          stateSlug={activeState.slug}
          dossier={activeState.dossier}
          officeHolders={OFFICE_HOLDERS_SNAPSHOT}
        />
      )}
      {activeState && isRevisionPage && (
        <>
          <div className="wrap lay">
            <SectionNavigation
              activePage={activePage}
              dimensions={activeState.dossier.DIMS}
              stateName={activeState.name}
              stateSlug={activeState.slug}
            />
            <main className="main">
              <RevisionDeck
                key={activeState.slug}
                cards={activeState.dossier.CARDS}
                dimensions={activeState.dossier.DIMS}
                stateName={activeState.name}
                storageKey={
                  activeState.slug === 'goa'
                    ? 'rd_known'
                    : `rd_known_${activeState.slug}`
                }
              />
              <PageNavigation
                activePage={activePage}
                dimensions={activeState.dossier.DIMS}
                order={activeState.dossier.ORDER}
                stateName={activeState.name}
                stateSlug={activeState.slug}
              />
            </main>
          </div>
          <div className="wrap">
            <Footer
              html={
                typeof activeState.dossier.foot === 'function'
                  ? activeState.dossier.foot()
                  : activeState.dossier.foot
              }
            />
          </div>
        </>
      )}
    </>
  );
}
