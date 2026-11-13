import assert from 'node:assert/strict';
import test from 'node:test';
import { REGION_GLANCE } from './regionGlance.js';
import { OFFICE_HOLDERS_SNAPSHOT } from './officeHolders.js';

test('static office-holder snapshot covers every state and Union Territory', () => {
  const regionNames = Object.keys(REGION_GLANCE).sort();
  const recordNames = Object.keys(OFFICE_HOLDERS_SNAPSHOT.records).sort();
  const records = OFFICE_HOLDERS_SNAPSHOT.records;

  assert.deepEqual(recordNames, regionNames);
  assert.ok(
    Object.values(records).every((record) => record.constitutionalHead?.name),
  );
  assert.equal(
    Object.values(records).filter((record) => record.chiefMinister).length,
    31,
  );
  assert.equal(OFFICE_HOLDERS_SNAPSHOT.snapshotDate, '13 November 2026');
});

test('only Union Territories without elected assemblies omit a Chief Minister', () => {
  const noChiefMinister = Object.entries(OFFICE_HOLDERS_SNAPSHOT.records)
    .filter(([, record]) => !record.chiefMinister)
    .map(([regionName]) => regionName)
    .sort();

  assert.deepEqual(noChiefMinister, [
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Ladakh',
    'Lakshadweep',
  ]);
});
