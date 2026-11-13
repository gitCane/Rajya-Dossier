import { REGION_GLANCE } from '../regionGlance.js';

const DIMS = [
  ['physical', 'Physical Geography', 'Location, landscape, climate and resources', 'Map the territory, its terrain, climate, water systems, ecosystems and natural resources.'],
  ['history', 'History & Culture', 'Historical context and cultural heritage', 'Trace major historical periods, cultural traditions, languages, heritage sites and notable communities.'],
  ['geopolitics', 'Geopolitics & Strategic Importance', 'Borders, location and strategic context', 'Study neighbouring regions, borders, maritime or high-altitude context, connectivity and security concerns where relevant.'],
  ['governance', 'Governance & Administration', 'Constitutional status and public institutions', 'Understand the territory’s constitutional status, executive, legislature if applicable, administration and local government.'],
  ['economy', 'Economy', 'Economic structure and development', 'Examine livelihoods, major sectors, public finance, employment, infrastructure and development challenges.'],
  ['environment', 'Environment & Ecology', 'Ecosystems, biodiversity and climate risk', 'Identify protected areas, important species, ecological pressures, conservation efforts and climate vulnerabilities.'],
  ['society', 'Society & Human Development', 'Population and human development', 'Review population patterns, communities, health, education, migration, urbanisation and social indicators.'],
  ['infrastructure', 'Infrastructure & Connectivity', 'Transport, energy and public services', 'Map transport links, ports or airports where relevant, energy, communications and essential public services.'],
  ['schemes', 'Government Schemes & Policies', 'Public policy and welfare delivery', 'Track central and territory-level schemes, policy priorities, delivery mechanisms and implementation gaps.'],
  ['scitech', 'Science, Technology & Research', 'Institutions and innovation', 'Locate relevant research institutions, technology initiatives, scientific projects and innovation clusters.'],
  ['current', 'Current Affairs & Emerging Issues', 'Developments to verify before the exam', 'Add dated developments, official reports, legislation, court decisions and major public projects.'],
  ['upsc', 'UPSC Examination Integration', 'Prelims facts, Mains themes and revision', 'Connect territory-specific facts to constitutional provisions, geography, environment, economy and governance.'],
];

const SECTION_GUIDANCE = {
  physical: ['Add the official area, coordinates and boundaries.', 'Map major landforms, water bodies, climate patterns and natural resources.', 'Use current official environment and disaster-management sources.'],
  history: ['Build a timeline from authoritative history and archival sources.', 'Record important heritage sites, languages, festivals and cultural institutions.', 'Distinguish documented history from popular accounts.'],
  geopolitics: ['Mark boundaries, neighbouring regions and important transport or maritime routes.', 'Use official sources for strategic and security-related developments.', 'Connect location with trade, connectivity and regional cooperation.'],
  governance: ['Verify the constitutional and statutory framework from official texts.', 'Record the current administrative structure and elected institutions, if any.', 'Check the latest official directory for office-holders and local bodies.'],
  economy: ['Use the latest UT budget and economic survey for comparable indicators.', 'Identify employment and livelihood patterns, key sectors and infrastructure needs.', 'Separate dated estimates from long-term structural facts.'],
  environment: ['Check the latest protected-area, Ramsar and biodiversity records.', 'Identify major ecological pressures and climate or disaster risks.', 'Connect conservation with local livelihoods and development choices.'],
  society: ['Use Census tables and the latest official health and education data.', 'Note demographic and community context without treating groups as uniform.', 'Compare indicators by year and source before drawing conclusions.'],
  infrastructure: ['Map major transport, energy, water and digital-connectivity projects.', 'Verify project status, funding and timelines from official releases.', 'Assess access, resilience and environmental impacts.'],
  schemes: ['List relevant central and UT schemes with their implementing departments.', 'Record target groups, benefits and delivery channels from official guidelines.', 'Track outcomes and implementation challenges using reliable evaluations.'],
  scitech: ['Identify local research and higher-education institutions from official directories.', 'Add current science, technology and innovation initiatives with dates.', 'Explain their relevance to local development or national priorities.'],
  current: ['Add only dated, verifiable developments from official releases and reliable reporting.', 'Track legislation, court decisions, budgets, reports and major projects.', 'Re-check changing figures and office-holder names before the examination.'],
  upsc: ['Connect facts to the Constitution, federalism and public administration.', 'Prepare map-based Prelims prompts and concise Mains examples.', 'Compare the territory with states and other UTs where the comparison is useful.'],
};

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function facts(items) {
  return `<div class="facts">${items.map(([label, value]) => (
    `<div class="fact"><span class="k">${escapeHTML(label)}</span><span class="v">${escapeHTML(value)}</span></div>`
  )).join('')}</div>`;
}

function section(title, content) {
  return `<section class="blk"><h2>${escapeHTML(title)}</h2>${content}</section>`;
}

function list(items) {
  return `<ul class="ul">${items.map((item) => `<li>${escapeHTML(item)}</li>`).join('')}</ul>`;
}

function getSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function createStarterDossier(name) {
  const region = REGION_GLANCE[name];
  if (!region || region.type !== 'Union Territory') {
    throw new Error(`No Union Territory overview found for ${name}.`);
  }

  const slug = getSlug(name);
  const ORDER = [
    slug,
    ...DIMS.map(([key]) => `${slug}-${key}`),
    `${slug}-revision`,
  ];
  const P = {
    overview: () => (
      `<header class="ph"><div class="eyebrow">Starter dossier · Union Territory</div><h1>${escapeHTML(name)}</h1><p class="cov">A complete 12-section starter dossier for UPSC revision. The overview below contains a concise territory snapshot; expand each section with dated facts from official sources.</p></header>`
      + facts([
        ['Capital', region.capital],
        ['Administration', region.government],
        ['Economic profile', region.economy],
        ['UPSC focus', region.upsc],
      ])
      + section('12-section dossier', `<div class="hubm tpl">${DIMS.map(([key, title, scope], index) => (
        `<a class="tp" href="#${slug}-${key}"><b>${String(index + 1).padStart(2, '0')}</b><h3>${escapeHTML(title)}</h3><p>${escapeHTML(scope)}</p></a>`
      )).join('')}</div>`)
      + section('Starter research checklist', list([
        'Use the latest UT budget, economic survey and department reports for current figures.',
        'Verify the constitutional framework and administrative arrangements from official sources.',
        'Date all changing data, schemes and office-holder names; re-check them before the examination.',
      ]))
    ),
  };

  DIMS.forEach(([key, title, scope, coverage]) => {
    P[key] = () => (
      facts([
        ['Territory', name],
        ['Capital', region.capital],
        ['Administration', region.government],
        ['Economic profile', region.economy],
      ])
      + section(`${title}: starter notes`, `<p>${escapeHTML(coverage)}</p><p>This section is a structured starter, not a verified fact sheet. Add territory-specific details from the sources listed below and distinguish current figures from static background.</p>`)
      + section('Build the fact file', list(SECTION_GUIDANCE[key]))
      + section('UPSC connection', `<p>${escapeHTML(region.upsc)}</p><p>Use this theme to connect ${escapeHTML(name)} with the wider syllabus areas of ${escapeHTML(scope.toLowerCase())}.</p>`)
      + section('Revision prompts', list([
        `What are the three most important verified facts about ${name} in ${title.toLowerCase()}?`,
        `Which constitutional, economic, social or environmental issue links this topic to the national syllabus?`,
        'Can the key facts be located on a map and supported by a current official source?',
      ]))
    );
  });

  const CARDS = DIMS.map(([key, title]) => [
    key,
    `What is the key UPSC focus for ${name}?`,
    `${region.upsc} For ${title.toLowerCase()}, add a dated, territory-specific fact from an official source.`,
  ]);

  return {
    DIMS,
    ORDER,
    P,
    CARDS,
    foot: () => (
      `<p>This is a starter dossier template. Verify and expand factual details using current official sources before exam use.</p>${list([
        'Official Union Territory administration and department websites.',
        'Constitution of India, relevant Acts and official Gazette notifications.',
        'Latest Census, budget, economic survey and government reports.',
      ])}`
    ),
  };
}
