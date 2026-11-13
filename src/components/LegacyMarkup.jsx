import { useEffect, useRef } from 'react';
import { mapSVG as defaultMapSVG } from '../data/states/goa.js';

export default function LegacyMarkup({
  html,
  className = '',
  mapRenderer = defaultMapSVG,
}) {
  const contentRef = useRef(null);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const mapControls = [
      {
        id: 'maptog2',
        layers: ['relief', 'rivers', 'pa'],
        options: [['rivers', 'Rivers'], ['relief', 'Relief'], ['cities', 'Towns']],
      },
      {
        id: 'maptog3',
        layers: ['relief', 'rivers', 'infra'],
        options: [['rivers', 'Rivers'], ['cities', 'Towns'], ['relief', 'Relief']],
      },
    ];

    mapControls.forEach(({ id, layers, options }) => {
      const controls = root.querySelector(`#${id}`);
      if (!controls) return;
      controls.innerHTML = options
        .map(
          ([key, label]) =>
            `<button class="btn sm" data-x="${key}" aria-pressed="${layers.includes(key)}">${label}</button>`,
        )
        .join('');
    });
  }, [html]);

  function handleClick(event) {
    const root = event.currentTarget;
    const mapLayer = event.target.closest?.('[data-lay]');
    if (mapLayer) {
      const isPressed = mapLayer.getAttribute('aria-pressed') === 'true';
      mapLayer.setAttribute('aria-pressed', String(!isPressed));
      const selectedLayers = [...root.querySelectorAll('#maptog [aria-pressed="true"]')]
        .map((button) => button.getAttribute('data-lay'));
      const mapBox = root.querySelector('#mapbox');
      if (mapBox) mapBox.innerHTML = mapRenderer(selectedLayers);
      return;
    }

    const mapOption = event.target.closest?.('#maptog2 button[data-x], #maptog3 button[data-x]');
    if (mapOption) {
      const controls = mapOption.parentElement;
      const isPressed = mapOption.getAttribute('aria-pressed') === 'true';
      mapOption.setAttribute('aria-pressed', String(!isPressed));
      const selectedLayers = [...controls.querySelectorAll('[aria-pressed="true"]')]
        .map((button) => button.getAttribute('data-x'));
      const map = controls.parentElement.querySelector('svg');
      if (map) map.outerHTML = mapRenderer(selectedLayers);
      return;
    }

    const option = event.target.closest?.('.q .o');
    if (!option) return;

    const question = option.closest('.q');
    if (question.classList.contains('done')) return;

    const answerIndex = Number(question.getAttribute('data-a'));
    const selectedIndex = Number(option.getAttribute('data-o'));
    question.querySelectorAll('.o').forEach((button, index) => {
      if (index === answerIndex) button.classList.add('ok');
      else if (index === selectedIndex) button.classList.add('no');
    });
    question.classList.add('done');
  }

  // Only checked-in, locally generated dossier templates are rendered here.
  return (
    <div
      ref={contentRef}
      className={className}
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
