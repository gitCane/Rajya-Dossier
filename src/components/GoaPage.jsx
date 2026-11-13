import { DIMS, P } from '../data/states/goa.js';
import Footer from './Footer.jsx';
import LegacyMarkup from './LegacyMarkup.jsx';
import PageNavigation from './PageNavigation.jsx';
import SectionNavigation from './SectionNavigation.jsx';

export default function GoaPage({ activePage }) {
  const sectionIndex = DIMS.findIndex(
    (dimension) => `goa-${dimension[0]}` === activePage,
  );
  const content = activePage === 'goa' ? P.overview() : P[DIMS[sectionIndex]?.[0]]();
  const dimension = DIMS[sectionIndex];
  const sectionHeader = dimension ? (
    <header className="ph">
      <div className="eyebrow">
        Goa · {String(sectionIndex + 1).padStart(2, '0')} of 12
      </div>
      <h1>{dimension[1]}</h1>
      <p className="cov">
        <b>Covers:</b> {dimension[3]}
      </p>
    </header>
  ) : null;

  return (
    <>
      <div className="wrap lay">
        <SectionNavigation activePage={activePage} />
        <main className="main">
          {sectionHeader}
          <LegacyMarkup html={content} />
          <PageNavigation activePage={activePage} />
        </main>
      </div>
      <div className="wrap">
        <Footer />
      </div>
    </>
  );
}
