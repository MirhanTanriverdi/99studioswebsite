// Per-page <head> data. Used at build time by scripts/prerender.mjs (static
// HTML) and in the browser by applySeo() on in-app navigation, so both always
// agree. The studio-wide JSON-LD (TattooParlor + WebSite) lives in index.html.
import { ARTISTS, artistBySlug, instagramUrl, styleLine } from './data/artists';
import { STYLES, styleBySlug } from './data/styles';
import { alternateRoute, pathFor, type Lang, type Route } from './router';

export const SITE = 'https://99roots-studio.com';
const STUDIO_ID = `${SITE}/#studio`;
const BRAND = '99 Roots Studio';

export interface Seo {
  title: string;
  description: string;
  path: string;
  lang: Lang;
  noindex?: boolean;
  /** hreflang alternates, including this page itself. */
  alternates: Array<{ hreflang: string; href: string }>;
  jsonLd: object[];
}

const url = (path: string) => `${SITE}${path === '/' ? '/' : path}`;

const crumbs = (items: Array<[string, string]>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: url(path),
  })),
});

const listNames = (names: string[], lang: Lang) => {
  const pretty = names.map((n) => n.charAt(0) + n.slice(1).toLowerCase());
  if (pretty.length <= 1) return pretty.join('');
  const and = lang === 'de' ? ' und ' : ' and ';
  return `${pretty.slice(0, -1).join(', ')}${and}${pretty[pretty.length - 1]}`;
};

export const artistsForStyle = (slug: string) => ARTISTS.filter((a) => a.styles.some((s) => s.slug === slug));

export function getSeo(route: Route): Seo {
  const path = pathFor(route);
  const lang: Lang = 'lang' in route ? route.lang : 'en';
  const alt = alternateRoute(route);
  const alternates = alt
    ? [
        { hreflang: lang, href: url(path) },
        { hreflang: alt.lang, href: url(pathFor(alt)) },
        { hreflang: 'x-default', href: url(pathFor(lang === 'en' ? route : alt)) },
      ]
    : [];
  const base = { path, lang, alternates };
  const de = lang === 'de';
  const home = de ? 'Startseite' : 'Home';
  const stylesHub = pathFor({ name: 'styles', lang });

  switch (route.name) {
    case 'home':
      return {
        ...base,
        title: '99 Roots Studio | Tattoo Studio in Berlin Prenzlauer Berg',
        description:
          '99 Roots Studio is a tattoo and piercing studio at Prenzlauer Allee 216 in Berlin Prenzlauer Berg. Resident and guest artists for fine line, blackwork, ornamental, black & grey realism and neo-traditional tattoos. Walk-ins welcome.',
        jsonLd: [],
      };

    case 'artist': {
      const a = artistBySlug(route.slug)!;
      const name = a.name.charAt(0) + a.name.slice(1).toLowerCase();
      const styles = styleLine(a);
      return {
        ...base,
        title: de
          ? `${name} – Tattoo-Artist in Berlin (${styles}) | ${BRAND}`
          : `${name} – Tattoo Artist in Berlin (${styles}) | ${BRAND}`,
        description: de
          ? `${a.bio.de} Termine bei ${BRAND}, Prenzlauer Allee 216, Berlin Prenzlauer Berg.`
          : `${a.bio.en} Book with ${name} at ${BRAND}, Prenzlauer Allee 216, Berlin Prenzlauer Berg.`,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': `${url(pathFor({ name: 'artist', slug: a.slug, lang: 'en' }))}#person`,
            name,
            jobTitle: 'Tattoo Artist',
            description: a.bio[lang],
            image: a.photo.startsWith('http') ? a.photo : url(a.photo),
            url: url(path),
            sameAs: [instagramUrl(a.instagram)],
            knowsAbout: a.styles.map((s) => `${s.label} tattoos`),
            worksFor: { '@id': STUDIO_ID },
          },
          crumbs([[home, '/'], [name, path]]),
        ],
      };
    }

    case 'style': {
      const s = styleBySlug(route.slug)!;
      const name = s.name[lang];
      const who = listNames(artistsForStyle(s.slug).map((a) => a.name), lang);
      return {
        ...base,
        title: `${name} Tattoo Berlin | ${BRAND} Prenzlauer Berg`,
        description: de
          ? `${name} Tattoos in Berlin Prenzlauer Berg von ${who}. Arbeiten ansehen und Termin bei ${BRAND} anfragen – Walk-ins willkommen.`
          : `${name} tattoos in Berlin Prenzlauer Berg by ${who}. See their work and book a consultation at ${BRAND} – walk-ins welcome.`,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `${name} Tattoo`,
            serviceType: `${s.name.en} tattoo`,
            description: s.intro[lang][0],
            provider: { '@id': STUDIO_ID },
            areaServed: { '@type': 'City', name: 'Berlin' },
            url: url(path),
          },
          crumbs([[home, '/'], [de ? 'Tattoo-Stile' : 'Tattoo styles', stylesHub], [name, path]]),
        ],
      };
    }

    case 'styles':
      return {
        ...base,
        title: de ? `Tattoo-Stile in Berlin | ${BRAND} Prenzlauer Berg` : `Tattoo Styles in Berlin | ${BRAND} Prenzlauer Berg`,
        description: de
          ? `Alle Tattoo-Stile bei ${BRAND} in Berlin: ${STYLES.map((s) => s.name.de).join(', ')}. Finde den passenden Artist für dein Motiv.`
          : `Every tattoo style at ${BRAND} in Berlin: ${STYLES.map((s) => s.name.en).join(', ')}. Find the right artist for your idea.`,
        jsonLd: [crumbs([[home, '/'], [de ? 'Tattoo-Stile' : 'Tattoo styles', path]])],
      };

    case 'walk-in':
      return {
        ...base,
        title: de ? `Tattoo ohne Termin in Berlin – Walk-in | ${BRAND}` : `Walk-in Tattoo Berlin – No Appointment Needed | ${BRAND}`,
        description: de
          ? `Walk-in Tattoos in Berlin Prenzlauer Berg: Komm während der Öffnungszeiten ohne Termin bei ${BRAND} vorbei, Prenzlauer Allee 216. Vorher per WhatsApp freie Plätze checken.`
          : `Walk-in tattoos in Berlin Prenzlauer Berg: drop by ${BRAND} at Prenzlauer Allee 216 during opening hours, no appointment needed. Message us on WhatsApp to check availability.`,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: de ? 'Walk-in Tattoo (ohne Termin)' : 'Walk-in tattoo',
            serviceType: 'Walk-in tattoo',
            provider: { '@id': STUDIO_ID },
            areaServed: { '@type': 'City', name: 'Berlin' },
            url: url(path),
          },
          crumbs([[home, '/'], ['Walk-in', path]]),
        ],
      };

    case 'our-space':
      return { ...base, title: `Our Space – Studio Photos | ${BRAND} Berlin`, description: 'Photos of the 99 Roots tattoo studio at Prenzlauer Allee 216, Berlin Prenzlauer Berg: the tattoo floor, stations and lounge.', jsonLd: [crumbs([[home, '/'], ['Our Space', path]])] };
    case 'booking':
      return { ...base, title: `Book a Tattoo Appointment | ${BRAND} Berlin`, description: 'Request a tattoo appointment at 99 Roots Studio in Berlin Prenzlauer Berg – booking form, WhatsApp or Instagram.', jsonLd: [crumbs([[home, '/'], ['Booking', path]])] };
    case 'shop':
      return { ...base, title: `Shop – Coming Soon | ${BRAND}`, description: 'The 99 Roots Studio shop is coming soon.', noindex: true, jsonLd: [] };
    case 'privacy':
      return { ...base, title: `Privacy Policy | ${BRAND}`, description: 'Privacy policy of 99 Roots Studio, Berlin.', jsonLd: [] };
    case 'terms':
      return { ...base, title: `Terms of Service | ${BRAND}`, description: 'Terms of service of 99 Roots Studio, Berlin.', jsonLd: [] };
    case 'booking-policy':
      return { ...base, title: `Booking Policy | ${BRAND}`, description: 'Deposits, cancellations and preparation for your appointment at 99 Roots Studio, Berlin.', jsonLd: [] };
    case 'impressum':
      return { ...base, title: `Impressum | ${BRAND}`, description: 'Impressum / legal notice of 99 Roots Studio, Prenzlauer Allee 216, 10405 Berlin.', jsonLd: [] };
    case 'not-found':
      return { ...base, title: `Page not found | ${BRAND}`, description: 'This page does not exist.', noindex: true, jsonLd: [] };
  }
}

// ── browser: keep <head> in sync on in-app navigation ──────────────────────
function upsert(selector: string, create: () => HTMLElement, set: (el: HTMLElement) => void) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  set(el);
}
const meta = (attr: 'name' | 'property', key: string, value: string) =>
  upsert(`meta[${attr}="${key}"]`, () => document.createElement('meta'), (el) => {
    el.setAttribute(attr, key);
    el.setAttribute('content', value);
  });

export function applySeo(seo: Seo) {
  if (typeof document === 'undefined') return;
  document.title = seo.title;
  document.documentElement.lang = seo.lang;
  meta('name', 'description', seo.description);
  meta('name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  meta('property', 'og:title', seo.title);
  meta('property', 'og:description', seo.description);
  meta('property', 'og:url', url(seo.path));
  meta('name', 'twitter:title', seo.title);
  meta('name', 'twitter:description', seo.description);
  upsert('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), (el) =>
    el.setAttribute('href', url(seo.path)),
  );
  document.head.querySelectorAll('link[rel="alternate"][hreflang], script[data-page-ld]').forEach((el) => el.remove());
  for (const a of seo.alternates) {
    const link = Object.assign(document.createElement('link'), { rel: 'alternate', href: a.href });
    link.setAttribute('hreflang', a.hreflang);
    document.head.appendChild(link);
  }
  for (const ld of seo.jsonLd) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-page-ld', '');
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }
}

/** Static <head> fragment for the prerenderer (alternates + page JSON-LD). */
export function headExtras(seo: Seo): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const links = seo.alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`);
  const lds = seo.jsonLd.map((ld) => `<script type="application/ld+json" data-page-ld>${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`);
  return [...links, ...lds].join('\n    ');
}
