import { DIMS as DEFAULT_DIMS } from '../data/states/goa.js';

export default function SectionNavigation({
  activePage,
  dimensions = DEFAULT_DIMS,
  stateName = 'Goa',
  stateSlug = 'goa',
}) {
  return (
    <nav className="rail" aria-label={`${stateName} sections`}>
      <a href={`#${stateSlug}`} className={activePage === stateSlug ? 'on' : ''}>
        <b>·</b>Overview
      </a>
      {dimensions.map((dimension, index) => {
        const page = `${stateSlug}-${dimension[0]}`;
        return (
          <a
            href={`#${page}`}
            className={activePage === page ? 'on' : ''}
            key={dimension[0]}
          >
            <b>{String(index + 1).padStart(2, '0')}</b>
            {dimension[1]}
          </a>
        );
      })}
      <a
        href={`#${stateSlug}-revision`}
        className={activePage === `${stateSlug}-revision` ? 'on' : ''}
      >
        <b>★</b>Revision deck
      </a>
    </nav>
  );
}
