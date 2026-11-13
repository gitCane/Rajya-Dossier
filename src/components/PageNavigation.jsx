import { DIMS as DEFAULT_DIMS, ORDER as DEFAULT_ORDER } from '../data/states/goa.js';

function getPageName(page, stateSlug, stateName, dimensions) {
  if (page === stateSlug) return 'Overview';
  if (page === `${stateSlug}-revision`) return 'Revision deck';
  return (
    dimensions.find((dimension) => `${stateSlug}-${dimension[0]}` === page)?.[1] ??
    stateName
  );
}

export default function PageNavigation({
  activePage,
  dimensions = DEFAULT_DIMS,
  order = DEFAULT_ORDER,
  stateName = 'Goa',
  stateSlug = 'goa',
}) {
  const index = order.indexOf(activePage);
  const previous = order[index - 1];
  const next = order[index + 1];

  return (
    <div className="nav2">
      {previous && (
        <a href={`#${previous}`}>
          <small>Previous</small>
          {getPageName(previous, stateSlug, stateName, dimensions)}
        </a>
      )}
      {next && (
        <a className="nx" href={`#${next}`}>
          <small>Next</small>
          {getPageName(next, stateSlug, stateName, dimensions)}
        </a>
      )}
    </div>
  );
}
