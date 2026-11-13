import { useEffect, useMemo, useState } from 'react';
import { CARDS as DEFAULT_CARDS, DIMS as DEFAULT_DIMS } from '../data/states/goa.js';

function readKnownCards(storageKey) {
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return {};
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new TypeError('Saved revision progress has an invalid format.');
    }
    return parsed;
  } catch (error) {
    console.error('Unable to read revision progress from local storage.', error);
    return {};
  }
}

export default function RevisionDeck({
  cards: sourceCards = DEFAULT_CARDS,
  dimensions = DEFAULT_DIMS,
  stateName = 'Goa',
  storageKey = 'rd_known',
}) {
  const [filter, setFilter] = useState('all');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState(() => readKnownCards(storageKey));

  const cards = useMemo(
    () =>
      sourceCards.map((card, id) => ({ id, section: card[0], question: card[1], answer: card[2] }))
        .filter((card) => filter === 'all' || card.section === filter),
    [filter, sourceCards],
  );
  const activeCard = cards[cardIndex];
  const knownCount = cards.filter((card) => knownCards[card.id]).length;

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(knownCards));
    } catch (error) {
      console.error('Unable to save revision progress to local storage.', error);
    }
  }, [knownCards, storageKey]);

  function changeFilter(event) {
    setFilter(event.target.value);
    setCardIndex(0);
    setIsFlipped(false);
  }

  function moveCard(direction) {
    setCardIndex((current) => (current + direction + cards.length) % cards.length);
    setIsFlipped(false);
  }

  function toggleKnown() {
    if (!activeCard) return;
    const wasKnown = Boolean(knownCards[activeCard.id]);
    setKnownCards((current) => {
      const next = { ...current };
      if (wasKnown) delete next[activeCard.id];
      else next[activeCard.id] = true;
      return next;
    });
    if (!wasKnown) moveCard(1);
  }

  function resetProgress() {
    setKnownCards({});
    setCardIndex(0);
    setIsFlipped(false);
  }

  return (
    <>
      <header className="ph">
        <div className="eyebrow">{stateName} · revision</div>
        <h1>Revision deck</h1>
        <p className="cov">
          Flip through {sourceCards.length} high-yield cards. Progress is stored in
          this browser only.
        </p>
      </header>
      <section className="blk" aria-label="Revision flashcards">
        <div className="deckbar">
          <label className="sr-only" htmlFor="deck-filter">
            Filter cards by section
          </label>
          <select id="deck-filter" value={filter} onChange={changeFilter}>
            <option value="all">All sections</option>
            {dimensions.map((dimension) => (
              <option value={dimension[0]} key={dimension[0]}>
                {dimension[1]}
              </option>
            ))}
          </select>
          <div
            className="prog"
            role="progressbar"
            aria-label="Known cards in this section"
            aria-valuemin={0}
            aria-valuemax={cards.length}
            aria-valuenow={knownCount}
          >
            <i style={{ width: `${cards.length ? (knownCount / cards.length) * 100 : 0}%` }} />
          </div>
          <span className="eyebrow">
            {knownCount}/{cards.length} known
          </span>
        </div>
        {activeCard ? (
          <>
            <button
              className={`card${isFlipped ? ' back' : ''}`}
              type="button"
              onClick={() => setIsFlipped((current) => !current)}
              aria-live="polite"
            >
              <span className="lab">
                {isFlipped ? 'Answer' : 'Question'} · card {cardIndex + 1} of{' '}
                {cards.length}
              </span>
              <span className="tx">
                {isFlipped ? activeCard.answer : activeCard.question}
              </span>
            </button>
            <div className="row">
              <button
                className="btn"
                type="button"
                onClick={() => moveCard(-1)}
                disabled={cards.length < 2}
              >
                Previous
              </button>
              <button
                className="btn pri"
                type="button"
                onClick={() => setIsFlipped((current) => !current)}
              >
                Flip
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => moveCard(1)}
                disabled={cards.length < 2}
              >
                Next
              </button>
              <button className="btn" type="button" onClick={toggleKnown}>
                {knownCards[activeCard.id] ? 'Mark unknown' : 'Got it'}
              </button>
              <button className="btn" type="button" onClick={resetProgress}>
                Reset progress
              </button>
            </div>
          </>
        ) : (
          <p>No cards for this section yet.</p>
        )}
      </section>
      <section className="blk exam">
        <div className="ex pre">
          <h4>Prelims hooks</h4>
          <ul className="ul">
            <li>Use the filter to drill one section at a time.</li>
          </ul>
        </div>
        <div className="ex mai">
          <h4>Mains angles</h4>
          <ul className="ul">
            <li>Turn each card into a one-line opener for a Mains answer.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
