# Rajya Dossier

A React + Vite application for a reusable, exam-focused state dossier. Goa is
the first complete dossier; the home page lays out the shared 12-section
template for additional states.

## Requirements

- Node.js 20+ or 22+
- npm

## Getting started

```powershell
npm install
npm run dev
```

The development server prints a local URL. Production and quality checks:

```powershell
npm run lint
npm run build
npm run preview
```

## Project structure

```text
src/
  components/        Shared navigation, page layout, footer, and revision deck
  data/              Goa dossier copy and reusable section metadata
  App.jsx            Hash-based page routing and theme state
  main.jsx           React application entry point
  styles.css         Responsive design system and page styles
```

The original `Rajya Dossier.html` remains unchanged. Its authored dossier
content is kept in `src/data/dossierContent.js`; reusable interface behavior
and layout are implemented as React components. `LegacyMarkup` is a migration
adapter for those checked-in static templates. Do not pass user-supplied HTML
to it; move new content into React components or structured data instead.

## Adding another state

Use the Goa section metadata as the template for a new state: add its
dimensions and content in the data layer, then register its routes and
navigation. Shared header, section navigation, pagination, footer, and deck
components can be reused without duplicating their layout.
