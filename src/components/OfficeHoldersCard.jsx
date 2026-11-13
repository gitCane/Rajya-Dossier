import { REGION_GLANCE } from '../data/regionGlance.js';

export default function OfficeHoldersCard({
  compact = false,
  officeHolders,
  regionName,
}) {
  const className = compact
    ? 'officeholders officeholders-compact'
    : 'officeholders';

  return (
    <section className={className} aria-label={`Current office holders for ${regionName}`}>
      <p className="eyebrow">Current office holders</p>
      <OfficeHolderData data={officeHolders} regionName={regionName} />
    </section>
  );
}

function OfficeHolderData({ data, regionName }) {
  const region = data.records[regionName];
  if (!region) {
    return (
      <p className="officeholders-message" role="status">
        This region is not present in the official listing.
      </p>
    );
  }

  const regionInfo = REGION_GLANCE[regionName];
  const hasElectedChiefMinister =
    regionInfo?.type === 'State' ||
    regionInfo?.government.includes('Elected Chief Minister') === true;

  return (
    <>
      <dl className="officeholder-list">
        <div>
          <dt>Chief Minister</dt>
          <dd>
            {region.chiefMinister?.name ??
              (hasElectedChiefMinister
                ? 'Not available in this snapshot'
                : 'Not applicable for this UT')}
          </dd>
        </div>
        <div>
          <dt>{region.constitutionalHead?.role ?? 'Governor / Administrator'}</dt>
          <dd>
            {region.constitutionalHead?.name ?? 'Not listed by the source'}
          </dd>
        </div>
      </dl>
    </>
  );
}
