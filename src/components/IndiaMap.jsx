import { useMemo } from 'react';
import topologyData from '../data/states/india-states.topojson?raw';
import { REGIONS } from '../data/states/index.js';
import { REGION_GLANCE } from '../data/regionGlance.js';

const completedStates = new Set(['Goa', 'Rajasthan']);
const availableStates = new Set(
  REGIONS.flatMap(([, stateNames]) => stateNames),
);
const width = 960;
const height = 900;
const padding = 22;
const topology = JSON.parse(topologyData);
const regionNames = new Set(
  topology.objects.states.geometries.map(
    (geometry) => geometry.properties.name,
  ),
);

function decodeArcs({ arcs, transform }) {
  const [scaleX, scaleY] = transform.scale;
  const [translateX, translateY] = transform.translate;

  return arcs.map((arc) => {
    let x = 0;
    let y = 0;
    return arc.map(([deltaX, deltaY]) => {
      x += deltaX;
      y += deltaY;
      return [x * scaleX + translateX, y * scaleY + translateY];
    });
  });
}

function joinArcs(arcIndexes, decodedArcs) {
  return arcIndexes.flatMap((arcIndex, index) => {
    const arc = decodedArcs[arcIndex < 0 ? ~arcIndex : arcIndex];
    const points = arcIndex < 0 ? [...arc].reverse() : arc;
    return index === 0 ? points : points.slice(1);
  });
}

function geometryRings(geometry, decodedArcs) {
  const polygons =
    geometry.type === 'Polygon' ? [geometry.arcs] : geometry.arcs;
  return polygons.flatMap((polygon) =>
    polygon.map((ring) => joinArcs(ring, decodedArcs)),
  );
}

function getProjection(features) {
  const points = features.flatMap((feature) =>
    geometryRings(feature, decodedArcs).flat(),
  );
  const longitudes = points.map(([longitude]) => longitude);
  const latitudes = points.map(([, latitude]) => latitude);
  const minLongitude = Math.min(...longitudes);
  const maxLongitude = Math.max(...longitudes);
  const minLatitude = Math.min(...latitudes);
  const maxLatitude = Math.max(...latitudes);
  const xScale = (width - padding * 2) / (maxLongitude - minLongitude);
  const yScale = (height - padding * 2) / (maxLatitude - minLatitude);
  const scale = Math.min(xScale, yScale);
  const mapWidth = (maxLongitude - minLongitude) * scale;
  const mapHeight = (maxLatitude - minLatitude) * scale;
  const offsetX = (width - mapWidth) / 2;
  const offsetY = (height - mapHeight) / 2;

  return ([longitude, latitude]) => [
    offsetX + (longitude - minLongitude) * scale,
    offsetY + (maxLatitude - latitude) * scale,
  ];
}

const decodedArcs = decodeArcs(topology);
const stateFeatures = topology.objects.states.geometries.map((geometry) => ({
  ...geometry,
  rings: geometryRings(geometry, decodedArcs),
}));
const project = getProjection(stateFeatures);
const seaLabels = [
  { name: 'ARABIAN SEA', coordinates: [69.2, 16] },
  { name: 'BAY OF BENGAL', coordinates: [93.4, 17] },
  { name: 'INDIAN OCEAN', coordinates: [82.5, 7.3] },
].map((label) => ({ ...label, position: project(label.coordinates) }));
const territoryMarkerLocations = [
  { name: 'Chandigarh', coordinates: [76.78, 30.73] },
  { name: 'Andaman and Nicobar Islands', coordinates: [92.8, 11] },
  { name: 'Dadra and Nagar Haveli and Daman and Diu', coordinates: [72.9, 20.25] },
  { name: 'Delhi', coordinates: [77.2, 28.62] },
  { name: 'Jammu and Kashmir', coordinates: [75.3, 33.6] },
  { name: 'Ladakh', coordinates: [77.8, 34.1] },
  { name: 'Lakshadweep', coordinates: [72.6, 10.5] },
  { name: 'Puducherry', coordinates: [79.82, 11.93] },
].map(({ name, coordinates }) => {
  const feature = stateFeatures.find(
    ({ properties }) => properties.name === name,
  );
  return {
    name,
    slug: feature.properties.slug,
    position: project(coordinates),
  };
});

function toPath(rings) {
  return rings
    .map((ring) =>
      ring
        .map((point, index) => {
          const [x, y] = project(point);
          return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
        })
        .join(' ') + ' Z',
    )
    .join(' ');
}

function handlePreviewKeyDown(event, name, onPreviewState) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    onPreviewState(name);
  }
}

export default function IndiaMap({ query = '', onPreviewState }) {
  const matchingStates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return null;
    return new Set(
      [...regionNames].filter((name) => {
        const region = REGION_GLANCE[name];
        return (
          name.toLowerCase().includes(normalizedQuery) ||
          region.capital.toLowerCase().includes(normalizedQuery)
        );
      }),
    );
  }, [query]);

  return (
    <div className="india-map-wrap">
      <svg
        className="india-map"
        viewBox={`0 0 ${width} ${height}`}
        role="group"
        aria-label="Map of India with state and Union Territory boundaries. Hover, focus or select a region for an at-a-glance preview."
      >
        {stateFeatures.map(({ properties, rings }) => {
          const { name, slug, type } = properties;
          const isUnionTerritory = type === 'ut';
          const hasDossier = availableStates.has(name);
          const isComplete = completedStates.has(name);
          const matchesQuery =
            !matchingStates || matchingStates.has(name);
          const classes = [
            'map-boundary',
            isUnionTerritory ? 'map-ut' : 'map-state',
            hasDossier && isComplete ? 'is-complete' : '',
            !matchesQuery ? 'is-dimmed' : '',
          ]
            .filter(Boolean)
            .join(' ');
          const path = <path className={classes} d={toPath(rings)} />;

          if (!hasDossier) {
            return (
              <g
                aria-label={`Preview ${name}${isUnionTerritory ? ', Union Territory' : ''}`}
                className="map-region-preview"
                key={slug}
                onClick={() => onPreviewState(name)}
                onFocus={() => onPreviewState(name)}
                onKeyDown={(event) =>
                  handlePreviewKeyDown(event, name, onPreviewState)
                }
                onPointerEnter={() => onPreviewState(name)}
                role="button"
                tabIndex={0}
              >
                <title>{`Preview ${name}${isUnionTerritory ? ' (Union Territory)' : ''}`}</title>
                {path}
              </g>
            );
          }

          const status = isComplete
            ? 'Complete dossier'
            : isUnionTerritory
              ? 'Starter dossier'
              : 'Sample content';
          return (
            <a
              aria-label={`${name}${isUnionTerritory ? ' (Union Territory)' : ''} — ${status}. Open dossier.`}
              className="map-state-link"
              href={`#${slug}`}
              key={slug}
              onFocus={() => onPreviewState(name)}
              onPointerEnter={() => onPreviewState(name)}
            >
              <title>{`${name} · ${status}`}</title>
              {path}
            </a>
          );
        })}
        {seaLabels.map(({ name, position }) => (
          <text
            className="map-sea-label"
            key={name}
            x={position[0]}
            y={position[1]}
            textAnchor="middle"
          >
            {name}
          </text>
        ))}
      </svg>
      <div className="map-small-ut-markers">
        {territoryMarkerLocations.map(({ name, slug, position }) => {
          const matchesQuery =
            !matchingStates || matchingStates.has(name);
          return (
            <a
              aria-label={`Open ${name} Union Territory dossier`}
              className={`map-small-ut-marker${matchesQuery ? '' : ' is-dimmed'}`}
              href={`#${slug}`}
              key={name}
              onFocus={() => onPreviewState(name)}
              onPointerEnter={() => onPreviewState(name)}
              style={{
                left: `${(position[0] / width) * 100}%`,
                top: `${(position[1] / height) * 100}%`,
              }}
              title={`${name} — open dossier`}
            >
              <span aria-hidden="true">★</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
