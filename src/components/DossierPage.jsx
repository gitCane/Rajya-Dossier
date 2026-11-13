import Footer from './Footer.jsx';
import LegacyMarkup from './LegacyMarkup.jsx';
import PageNavigation from './PageNavigation.jsx';
import SectionNavigation from './SectionNavigation.jsx';

export default function DossierPage({
  activePage,
  stateName,
  stateSlug,
  dossier,
}) {
  const sectionIndex = dossier.DIMS.findIndex(
    (dimension) => `${stateSlug}-${dimension[0]}` === activePage,
  );
  const dimension = dossier.DIMS[sectionIndex];
  const content =
    activePage === stateSlug
      ? dossier.P.overview()
      : dossier.P[dimension[0]]();
  const footerHtml =
    typeof dossier.foot === 'function' ? dossier.foot() : dossier.foot;

  return (
    <>
      <div className="wrap lay">
        <SectionNavigation
          activePage={activePage}
          dimensions={dossier.DIMS}
          stateName={stateName}
          stateSlug={stateSlug}
        />
        <main className="main">
          {dimension && (
            <header className="ph">
              <div className="eyebrow">
                {stateName} · {String(sectionIndex + 1).padStart(2, '0')} of 12
              </div>
              <h1>{dimension[1]}</h1>
              <p className="cov">
                <b>Covers:</b> {dimension[3]}
              </p>
            </header>
          )}
          <LegacyMarkup html={content} mapRenderer={dossier.mapSVG} />
          <PageNavigation
            activePage={activePage}
            dimensions={dossier.DIMS}
            order={dossier.ORDER}
            stateName={stateName}
            stateSlug={stateSlug}
          />
        </main>
      </div>
      <div className="wrap">
        <Footer html={footerHtml} />
      </div>
    </>
  );
}
