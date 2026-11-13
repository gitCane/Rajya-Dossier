export function createDemoDossier(stateName, stateSlug, dimensions) {
  const pages = Object.fromEntries(
    dimensions.map(([key, title, summary]) => [
      key,
      () =>
        `<section class="blk"><h2>Sample ${title} content</h2><p>This is demo material for ${stateName}, not verified state-specific information.</p><div class="ex"><div class="ex pre"><h4>To be added</h4><ul class="ul"><li>${summary}</li><li>Replace this sample with verified ${title.toLowerCase()} facts and sources.</li></ul></div></div></section>`,
    ]),
  );
  const cards = dimensions.map(([key, title]) => [
    key,
    `${stateName}: sample question for ${title}`,
    `Demo answer: add verified ${title.toLowerCase()} information for ${stateName}.`,
  ]);
  const order = [
    stateSlug,
    ...dimensions.map(([key]) => `${stateSlug}-${key}`),
    `${stateSlug}-revision`,
  ];

  return {
    DIMS: dimensions,
    ORDER: order,
    CARDS: cards,
    P: {
      ...pages,
      overview: () =>
        `<header class="ph"><div class="eyebrow">Demo dossier · sample content</div><h1>${stateName}</h1><p class="cov">This is placeholder content to demonstrate the state dossier layout. State facts and figures have not been verified yet.</p></header><div class="facts"><div class="fact"><span class="k">Dossier status</span><span class="v">Demo content</span></div><div class="fact"><span class="k">Sections</span><span class="v">${dimensions.length} template sections</span></div></div><section class="blk"><h2>About this sample</h2><p>Use the section navigation to explore the template. Replace these notes with sourced, state-specific material before relying on them for exam preparation.</p><div class="tpl">${dimensions
          .map(
            ([key, title], index) =>
              `<a class="tp" href="#${stateSlug}-${key}"><b>${String(index + 1).padStart(2, '0')}</b><h3>${title}</h3><p>Sample content to be completed.</p></a>`,
          )
          .join('')}</div></section>`,
    },
    foot: `<footer class="foot"><p><b>Demo content.</b> This ${stateName} dossier is placeholder material, not verified state information.</p></footer>`,
  };
}
