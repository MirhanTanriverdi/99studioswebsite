// Build-time only: scripts/prerender.mjs imports this (via `vite build --ssr`)
// to render every route to static HTML for search engines and AI crawlers.
import { renderToString } from 'react-dom/server';
import App from './app/App';
import { allRoutes, pathFor } from './app/router';
import { getSeo, headExtras, SITE } from './app/seo';

export function render(url: string) {
  return renderToString(<App url={url} />);
}

export { allRoutes, pathFor, getSeo, headExtras, SITE };
