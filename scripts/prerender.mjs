// Pre-renders every route into dist/<path>/index.html and writes sitemap.xml.
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.tsx`.
// The browser still boots the normal SPA on top; this static HTML is what
// Googlebot, Bingbot and AI crawlers (which mostly don't run JS) read.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');
const entry = fs.readdirSync(ssrDir).find((f) => /^entry-server\.(m?js)$/.test(f));
if (!entry) throw new Error('dist-ssr/entry-server.js not found – run the SSR build first');

const { render, allRoutes, pathFor, getSeo, headExtras, SITE } = await import(pathToFileURL(path.join(ssrDir, entry)).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function page(route) {
  const seo = getSeo(route);
  const url = SITE + (seo.path === '/' ? '/' : seo.path);
  let html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${seo.lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(seo.description)}$2`)
    .replace(/(<meta name="robots" content=")[^"]*(")/, `$1${seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(seo.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(seo.description)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(seo.title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(seo.description)}$2`)
    .replace('</head>', `    ${headExtras(seo)}\n  </head>`)
    .replace(/<div id="root"><\/div>/, `<div id="root">${render(seo.path)}</div>`);
  // The <noscript> studio summary (with its own <h1>) belongs to the home page only.
  if (route.name !== 'home') html = html.replace(/\s*<!-- Plain-HTML summary[\s\S]*?<\/noscript>/, '');
  return { seo, html };
}

const routes = allRoutes();
const entries = [];
for (const route of routes) {
  const { seo, html } = page(route);
  const file = seo.path === '/' ? path.join(dist, 'index.html') : path.join(dist, seo.path.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  if (!seo.noindex) entries.push(seo);
}

// 404 page (served by Vercel for unknown paths).
fs.writeFileSync(path.join(dist, '404.html'), page({ name: 'not-found' }).html);

// sitemap.xml with hreflang alternates.
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map((seo) => {
    const loc = SITE + (seo.path === '/' ? '/' : seo.path);
    const alts = seo.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('\n');
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>${alts ? '\n' + alts : ''}\n  </url>`;
  })
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.rmSync(ssrDir, { recursive: true, force: true });

console.log(`prerendered ${routes.length} pages + 404, sitemap with ${entries.length} URLs`);
