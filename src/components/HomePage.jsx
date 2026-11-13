import { lazy, Suspense, useState } from 'react';
import { DIMS } from '../data/states/rajasthan.js';
import { REGIONS } from '../data/states/index.js';
import { REGION_GLANCE, UNION_TERRITORIES } from '../data/regionGlance.js';
import OfficeHoldersCard from './OfficeHoldersCard.jsx';

const IndiaMap = lazy(() => import('./IndiaMap.jsx'));

function toStateSlug(stateName) {
  return stateName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function HomePage({ officeHolders }) {
  const [query, setQuery] = useState('');
  const [previewState, setPreviewState] = useState(null);
  const totalStates = REGIONS.reduce(
    (total, [, stateNames]) => total + stateNames.length,
    0,
  );
  const normalizedQuery = query.trim().toLowerCase();
  const matchingState = normalizedQuery
    ? Object.keys(REGION_GLANCE).find((stateName) => {
      const region = REGION_GLANCE[stateName];
      return (
        stateName.toLowerCase().includes(normalizedQuery) ||
        region.capital.toLowerCase().includes(normalizedQuery)
      );
    })
    : null;
  const selectedState = matchingState ?? previewState;
  const selectedRegion = selectedState ? REGION_GLANCE[selectedState] : null;

  return (
    <main className="wrap home-page">
      <section className="map-explorer" aria-labelledby="map-title">
        <div className="map-heading">
          <div>
            <p className="eyebrow">State dossiers · UPSC revision</p>
          </div>
          <label className="state-search">
            <span className="sr-only">Find and highlight a state or UT</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.5 4.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPreviewState(null);
              }}
              placeholder="Find a state or UT"
            />
          </label>
        </div>

        <div className="map-layout">
          <figure className="india-map-frame">
            <Suspense fallback={<div className="map-loading">Loading map…</div>}>
              <IndiaMap query={query} onPreviewState={setPreviewState} />
            </Suspense>
          </figure>

          <aside className="map-sidebar">
            <div className="state-preview" aria-live="polite">
              {selectedState && selectedRegion ? (
                <>
                  <p className="eyebrow">At a glance</p>
                  <h2>{selectedState}</h2>
                  <span className={`region-type ${selectedRegion.type === 'Union Territory' ? 'ut' : ''}`}>
                    {selectedRegion.type}
                  </span>
                  <dl className="glance-list">
                    <div><dt>Capital</dt><dd>{selectedRegion.capital}</dd></div>
                    <div><dt>Governance</dt><dd>{selectedRegion.government}</dd></div>
                    <div><dt>Economy</dt><dd>{selectedRegion.economy}</dd></div>
                    <div><dt>UPSC focus</dt><dd>{selectedRegion.upsc}</dd></div>
                  </dl>
                  <OfficeHoldersCard
                    compact
                    officeHolders={officeHolders}
                    regionName={selectedState}
                  />
                  <a className="btn pri preview-link" href={`#${toStateSlug(selectedState)}`}>
                    Open {selectedState} dossier <span aria-hidden="true">→</span>
                  </a>
                </>
              ) : (
                <>
                  <p className="eyebrow">At a glance</p>
                  <h2>Explore the map</h2>
                  <p className="preview-description">
                    Hover, focus or select a region to see its capital,
                    governance, economy and UPSC topics.
                  </p>
                </>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
