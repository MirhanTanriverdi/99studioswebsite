// Minimal path router. Every page has a real URL so search engines and AI
// crawlers can reach it, and scripts/prerender.mjs renders each one to static
// HTML at build time. Kept dependency-free on purpose.
import { ARTISTS, artistBySlug } from './data/artists';
import { STYLES, styleBySlug, type StyleSlug } from './data/styles';

export type Lang = 'en' | 'de';

export type Route =
  | { name: 'home' }
  | { name: 'artist'; slug: string; lang: Lang }
  | { name: 'style'; slug: StyleSlug; lang: Lang }
  | { name: 'styles'; lang: Lang }
  | { name: 'walk-in'; lang: Lang }
  | { name: 'our-space' }
  | { name: 'booking' }
  | { name: 'shop' }
  | { name: 'privacy' }
  | { name: 'terms' }
  | { name: 'booking-policy' }
  | { name: 'impressum' }
  | { name: 'not-found' };

const STYLE_SUFFIX = '-tattoo-berlin';

export function pathFor(route: Route): string {
  const de = 'lang' in route && route.lang === 'de' ? '/de' : '';
  switch (route.name) {
    case 'home':
      return '/';
    case 'artist':
      return `${de}/artists/${route.slug}`;
    case 'style':
      return `${de}/${route.slug}${STYLE_SUFFIX}`;
    case 'styles':
      return route.lang === 'de' ? '/de/tattoo-stile-berlin' : '/tattoo-styles-berlin';
    case 'walk-in':
      return `${de}/walk-in-tattoo-berlin`;
    case 'our-space':
      return '/our-space';
    case 'booking':
      return '/booking';
    case 'shop':
      return '/shop';
    case 'privacy':
      return '/privacy-policy';
    case 'terms':
      return '/terms-of-service';
    case 'booking-policy':
      return '/booking-policy';
    case 'impressum':
      return '/impressum';
    case 'not-found':
      return '/404';
  }
}

export function parsePath(rawPath: string): Route {
  let path = rawPath.split(/[?#]/)[0] || '/';
  if (path.length > 1) path = path.replace(/\/+$/, '');
  let lang: Lang = 'en';
  if (path === '/de') return { name: 'not-found' };
  if (path.startsWith('/de/')) {
    lang = 'de';
    path = path.slice(3);
  }

  if (path === '/' && lang === 'en') return { name: 'home' };

  const artist = path.match(/^\/artists\/([a-z0-9-]+)$/);
  if (artist) return artistBySlug(artist[1]) ? { name: 'artist', slug: artist[1], lang } : { name: 'not-found' };

  if (path.endsWith(STYLE_SUFFIX)) {
    const slug = path.slice(1, -STYLE_SUFFIX.length);
    if (slug === 'walk-in') return { name: 'walk-in', lang };
    const style = styleBySlug(slug);
    return style ? { name: 'style', slug: style.slug, lang } : { name: 'not-found' };
  }

  if ((lang === 'en' && path === '/tattoo-styles-berlin') || (lang === 'de' && path === '/tattoo-stile-berlin')) {
    return { name: 'styles', lang };
  }

  if (lang === 'en') {
    const simple: Record<string, Route> = {
      '/our-space': { name: 'our-space' },
      '/booking': { name: 'booking' },
      '/shop': { name: 'shop' },
      '/privacy-policy': { name: 'privacy' },
      '/terms-of-service': { name: 'terms' },
      '/booking-policy': { name: 'booking-policy' },
      '/impressum': { name: 'impressum' },
    };
    if (simple[path]) return simple[path];
  }
  return { name: 'not-found' };
}

/** Every URL that should be pre-rendered (and, except 404, listed in the sitemap). */
export function allRoutes(): Route[] {
  const langs: Lang[] = ['en', 'de'];
  return [
    { name: 'home' },
    ...langs.map((lang) => ({ name: 'styles', lang }) as Route),
    ...langs.flatMap((lang) => STYLES.map((s) => ({ name: 'style', slug: s.slug, lang }) as Route)),
    ...langs.flatMap((lang) => ARTISTS.map((a) => ({ name: 'artist', slug: a.slug, lang }) as Route)),
    ...langs.map((lang) => ({ name: 'walk-in', lang }) as Route),
    { name: 'our-space' },
    { name: 'booking' },
    { name: 'shop' },
    { name: 'privacy' },
    { name: 'terms' },
    { name: 'booking-policy' },
    { name: 'impressum' },
  ];
}

/** Same page in the other language, when one exists. */
export function alternateRoute(route: Route): Route | null {
  if (!('lang' in route)) return null;
  return { ...route, lang: route.lang === 'en' ? 'de' : 'en' } as Route;
}

// ── client navigation ──────────────────────────────────────────────────────
export const NAVIGATE_EVENT = 'app:navigate';

export function navigate(to: string) {
  if (typeof window === 'undefined') return;
  const current = window.location.pathname + window.location.hash;
  if (to !== current) window.history.pushState({}, '', to);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

/** onClick for <a href>: keeps real links for crawlers, navigates in-app for people. */
export function linkHandler(to: string) {
  return (e: { metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean; button: number; preventDefault: () => void }) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(to);
  };
}
