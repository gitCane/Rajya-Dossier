import { REGIONS } from './goa.js';
import andhraPradesh from './andhra-pradesh.js';
import arunachalPradesh from './arunachal-pradesh.js';
import assam from './assam.js';
import bihar from './bihar.js';
import chhattisgarh from './chhattisgarh.js';
import goa from './goa.js';
import gujarat from './gujarat.js';
import haryana from './haryana.js';
import himachalPradesh from './himachal-pradesh.js';
import jammuKashmir from './jammu-kashmir.js';
import jharkhand from './jharkhand.js';
import karnataka from './karnataka.js';
import kerala from './kerala.js';
import madhyaPradesh from './madhya-pradesh.js';
import maharashtra from './maharashtra.js';
import manipur from './manipur.js';
import meghalaya from './meghalaya.js';
import mizoram from './mizoram.js';
import nagaland from './nagaland.js';
import odisha from './odisha.js';
import punjab from './punjab.js';
import rajasthan from './rajasthan.js';
import sikkim from './sikkim.js';
import tamilNadu from './tamil-nadu.js';
import telangana from './telangana.js';
import tripura from './tripura.js';
import uttarPradesh from './uttar-pradesh.js';
import uttarakhand from './uttarakhand.js';
import westBengal from './west-bengal.js';
import { createStarterDossier } from './ut-starter.js';

const dossiers = {
  'andhra-pradesh': andhraPradesh,
  'arunachal-pradesh': arunachalPradesh,
  assam,
  bihar,
  chandigarh: createStarterDossier('Chandigarh'),
  chhattisgarh,
  'dadra-and-nagar-haveli-and-daman-and-diu': createStarterDossier(
    'Dadra and Nagar Haveli and Daman and Diu',
  ),
  delhi: createStarterDossier('Delhi'),
  goa,
  gujarat,
  haryana,
  'himachal-pradesh': himachalPradesh,
  'jammu-and-kashmir': jammuKashmir,
  jharkhand,
  karnataka,
  kerala,
  'andaman-and-nicobar-islands': createStarterDossier('Andaman and Nicobar Islands'),
  ladakh: createStarterDossier('Ladakh'),
  lakshadweep: createStarterDossier('Lakshadweep'),
  'madhya-pradesh': madhyaPradesh,
  maharashtra,
  manipur,
  meghalaya,
  mizoram,
  nagaland,
  odisha,
  puducherry: createStarterDossier('Puducherry'),
  punjab,
  rajasthan,
  sikkim,
  'tamil-nadu': tamilNadu,
  telangana,
  tripura,
  'uttar-pradesh': uttarPradesh,
  uttarakhand,
  'west-bengal': westBengal,
};

export { REGIONS };

export function getStateDossier(stateName, stateSlug) {
  const dossier = dossiers[stateSlug];
  if (!dossier) {
    throw new Error(`No dossier content module found for ${stateName} (${stateSlug}).`);
  }
  return dossier;
}
