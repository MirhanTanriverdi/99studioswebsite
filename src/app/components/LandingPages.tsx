// SEO landing pages: one per tattoo style, a styles overview and walk-in.
// English and German share these components; copy lives in data/styles.ts,
// data/artists.ts and the T table below.
import { ArrowLeft, Instagram, MapPin, MessageCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import logo from '../../assets/logo.webp';
import { ARTISTS, instagramUrl, type ArtistData } from '../data/artists';
import { artistWork } from '../data/artistWork';
import { STYLES, styleBySlug, type StyleSlug } from '../data/styles';
import { alternateRoute, linkHandler, pathFor, type Lang, type Route } from '../router';
import { artistsForStyle } from '../seo';

const WHATSAPP = 'https://wa.me/4915560859953';
const PHONE = '+49 15560 859953';
const ADDRESS = 'Prenzlauer Allee 216, 10405 Berlin';

const T = {
  en: {
    back: '99 Roots Studio',
    switchTo: 'Deutsch',
    tattooIn: (style: string) => `${style} Tattoo in Berlin`,
    artistsHeading: (style: string) => `Our ${style} artists`,
    workHeading: 'Work by these artists',
    viewGallery: 'View gallery',
    book: 'Book a consultation',
    walkIn: 'Walk-ins welcome',
    whatsapp: 'Ask on WhatsApp',
    otherStyles: 'More tattoo styles',
    allStyles: 'All tattoo styles',
    guest: 'Guest artist',
    studioLine: 'Tattoo & piercing studio in Berlin Prenzlauer Berg',
    stylesTitle: 'Tattoo Styles at 99 Roots Studio Berlin',
    stylesIntro:
      'Thirteen resident and guest artists work at 99 Roots Studio in Prenzlauer Berg, each with their own specialities. Pick a style to see who does it and what their work looks like.',
    artistCount: (n: number) => (n === 1 ? '1 artist' : `${n} artists`),
    walkTitle: 'Walk-in Tattoos in Berlin – No Appointment Needed',
    walkBody: [
      'Spontaneous? You can come to 99 Roots Studio at Prenzlauer Allee 216 without an appointment during our opening hours. Walk-ins are welcome.',
      'Same-day availability depends on which artists are in the studio and how busy the day is. Smaller and simpler designs, flash and fine-line pieces usually work best for a walk-in session; larger or detailed custom work is best booked in advance.',
      'To avoid waiting, send us a quick WhatsApp message before you come – we will tell you who is free and roughly when.',
    ],
    walkCheck: 'Check availability on WhatsApp',
    walkPlan: 'Planning something bigger?',
    walkPlanBody: 'Use the booking form for custom pieces, sleeves and multi-session work.',
    piercing: 'We also do piercings – ask in the studio or on WhatsApp.',
  },
  de: {
    back: '99 Roots Studio',
    switchTo: 'English',
    tattooIn: (style: string) => `${style} Tattoo in Berlin`,
    artistsHeading: (style: string) => `Unsere Artists für ${style}`,
    workHeading: 'Arbeiten dieser Artists',
    viewGallery: 'Galerie ansehen',
    book: 'Beratung anfragen',
    walkIn: 'Walk-ins willkommen',
    whatsapp: 'Per WhatsApp fragen',
    otherStyles: 'Weitere Tattoo-Stile',
    allStyles: 'Alle Tattoo-Stile',
    guest: 'Gast-Artist',
    studioLine: 'Tattoo- und Piercingstudio in Berlin Prenzlauer Berg',
    stylesTitle: 'Tattoo-Stile bei 99 Roots Studio Berlin',
    stylesIntro:
      'Bei 99 Roots Studio in Prenzlauer Berg arbeiten dreizehn feste Artists und Gast-Artists, jede und jeder mit eigenen Schwerpunkten. Wähle einen Stil und sieh, wer ihn sticht und wie die Arbeiten aussehen.',
    artistCount: (n: number) => (n === 1 ? '1 Artist' : `${n} Artists`),
    walkTitle: 'Tattoo ohne Termin in Berlin – Walk-in',
    walkBody: [
      'Spontan? Du kannst während unserer Öffnungszeiten ohne Termin bei 99 Roots Studio in der Prenzlauer Allee 216 vorbeikommen. Walk-ins sind willkommen.',
      'Ob am selben Tag ein Platz frei ist, hängt davon ab, welche Artists im Studio sind und wie voll der Tag ist. Kleinere und einfachere Motive, Flash und Fineline-Tattoos eignen sich meist am besten für ein Walk-in; größere oder sehr detaillierte Wunschmotive buchst du am besten vorab.',
      'Damit du nicht warten musst, schreib uns vorher kurz per WhatsApp – wir sagen dir, wer frei ist und ungefähr wann.',
    ],
    walkCheck: 'Freie Plätze per WhatsApp checken',
    walkPlan: 'Etwas Größeres geplant?',
    walkPlanBody: 'Für Wunschmotive, Sleeves und mehrere Sitzungen nutze das Buchungsformular.',
    piercing: 'Wir stechen auch Piercings – frag im Studio oder per WhatsApp.',
  },
} as const;

const prettyName = (n: string) => n.charAt(0) + n.slice(1).toLowerCase();

function A({ to, className, children, ...rest }: { to: string; className?: string; children: ReactNode; 'aria-label'?: string }) {
  return (
    <a href={to} onClick={linkHandler(to)} className={className} {...rest}>
      {children}
    </a>
  );
}

function Layout({ route, lang, children }: { route: Route; lang: Lang; children: ReactNode }) {
  const t = T[lang];
  const alt = alternateRoute(route);
  return (
    <div className="min-h-screen bg-[#151515] text-white/80" lang={lang}>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#151515]/95 border-b border-gold/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <A to="/" className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm uppercase tracking-wider">{t.back}</span>
          </A>
          {alt && (
            <A to={pathFor(alt)} className="text-sm uppercase tracking-wider text-white/60 hover:text-gold transition-colors">
              {t.switchTo}
            </A>
          )}
        </div>
      </header>
      <main className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
      <footer className="border-t border-gold/20 py-10 px-4 text-center">
        <img src={logo} alt="99 Roots Studio" className="h-16 w-16 mx-auto mb-3" loading="lazy" />
        <p className="text-sm text-white/60">{t.studioLine}</p>
        <p className="text-sm text-white/60 mt-1">
          {ADDRESS} · <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="hover:text-gold">{PHONE}</a>
        </p>
        <p className="text-sm mt-3">
          <A to={pathFor({ name: 'styles', lang })} className="text-gold/80 hover:text-gold">{t.allStyles}</A>
          {' · '}
          <A to={pathFor({ name: 'walk-in', lang })} className="text-gold/80 hover:text-gold">Walk-in</A>
          {' · '}
          <A to="/impressum" className="text-gold/80 hover:text-gold">Impressum</A>
        </p>
      </footer>
    </div>
  );
}

function Hero({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      <h1 className="font-[Bebas_Neue] text-gold text-5xl sm:text-6xl md:text-7xl leading-none mb-6">{title}</h1>
      <div className="flex justify-center items-center gap-3 mb-8">
        <div className="h-px w-12 bg-gold/40" />
        <div className="w-2 h-2 rotate-45 border border-gold/60" />
        <div className="h-px w-12 bg-gold/40" />
      </div>
      {children}
    </div>
  );
}

function Actions({ lang }: { lang: Lang }) {
  const t = T[lang];
  const btn = 'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm uppercase tracking-wider transition-all duration-300 touch-manipulation';
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <A to="/booking" className={`${btn} border-2 border-gold text-gold hover:bg-gold hover:text-black`}>{t.book}</A>
      <A to={pathFor({ name: 'walk-in', lang })} className={`${btn} border border-gold/30 bg-white/10 text-gold hover:bg-white/20`}>{t.walkIn}</A>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={`${btn} border border-gold/30 text-white/80 hover:text-gold`}>
        <MessageCircle size={16} /> {t.whatsapp}
      </a>
    </div>
  );
}

function ArtistCard({ artist, lang }: { artist: ArtistData; lang: Lang }) {
  const t = T[lang];
  const to = pathFor({ name: 'artist', slug: artist.slug, lang });
  return (
    <article className="border border-gold/20 bg-[#1a1a1a] flex flex-col">
      <A to={to} className="block aspect-[3/4] overflow-hidden" aria-label={`${prettyName(artist.name)} – ${t.viewGallery}`}>
        <img
          src={artist.image}
          alt={`${prettyName(artist.name)} – tattoo artist at 99 Roots Studio Berlin`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-[center_10%]"
        />
      </A>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-[Bebas_Neue] text-white text-3xl mb-1">
          <A to={to} className="hover:text-gold transition-colors">{artist.name}</A>
        </h3>
        {artist.isGuest && <p className="text-xs uppercase tracking-wider text-white/40 mb-2">{t.guest}</p>}
        <p className="font-[Bebas_Neue] text-gold text-xl mb-2">
          {artist.styles.map((s, i) => (
            <span key={s.slug + i}>
              {i > 0 && ' / '}
              <A to={pathFor({ name: 'style', slug: s.slug, lang })} className="hover:underline">{s.label}</A>
            </span>
          ))}
        </p>
        <p className="text-sm text-white/60 leading-relaxed mb-4 flex-grow">{artist.bio[lang]}</p>
        <div className="flex items-center justify-between gap-3">
          <A to={to} className="text-sm uppercase tracking-wider text-gold hover:text-gold/80">{t.viewGallery} →</A>
          <a href={instagramUrl(artist.instagram)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-gold">
            <Instagram size={14} /> {artist.instagram}
          </a>
        </div>
      </div>
    </article>
  );
}

function StyleChips({ lang, exclude }: { lang: Lang; exclude?: StyleSlug }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {STYLES.filter((s) => s.slug !== exclude).map((s) => (
        <A
          key={s.slug}
          to={pathFor({ name: 'style', slug: s.slug, lang })}
          className="px-4 py-2 border border-gold/30 text-sm text-white/70 hover:text-gold hover:border-gold transition-colors"
        >
          {s.name[lang]}
        </A>
      ))}
    </div>
  );
}

export function StylePage({ slug, lang }: { slug: StyleSlug; lang: Lang }) {
  const t = T[lang];
  const style = styleBySlug(slug)!;
  const name = style.name[lang];
  const artists = artistsForStyle(slug);
  const work = artists.flatMap((a) =>
    (artistWork[a.slug] ?? []).slice(0, 3).map((w, i) => ({ ...w, artist: a, key: `${a.slug}-${i}` })),
  );
  const route: Route = { name: 'style', slug, lang };

  return (
    <Layout route={route} lang={lang}>
      <Hero title={t.tattooIn(name)}>
        <div className="max-w-3xl mx-auto space-y-4 text-base sm:text-lg leading-relaxed text-white/75">
          {style.intro[lang].map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <div className="mt-8"><Actions lang={lang} /></div>
      </Hero>

      <section className="mb-16">
        <h2 className="font-[Bebas_Neue] text-gold text-4xl sm:text-5xl text-center mb-8">{t.artistsHeading(name)}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((a) => <ArtistCard key={a.slug} artist={a} lang={lang} />)}
        </div>
      </section>

      {work.length > 0 && (
        <section className="mb-16">
          <h2 className="font-[Bebas_Neue] text-gold text-4xl sm:text-5xl text-center mb-8">{t.workHeading}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {work.map((w) => (
              <A key={w.key} to={pathFor({ name: 'artist', slug: w.artist.slug, lang })} className="block aspect-square overflow-hidden border border-gold/20">
                <img
                  src={w.thumb}
                  alt={`Tattoo by ${prettyName(w.artist.name)} at 99 Roots Studio Berlin`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </A>
            ))}
          </div>
        </section>
      )}

      <section className="text-center">
        <h2 className="font-[Bebas_Neue] text-gold text-3xl sm:text-4xl mb-6">{t.otherStyles}</h2>
        <StyleChips lang={lang} exclude={slug} />
      </section>
    </Layout>
  );
}

export function StylesHubPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <Layout route={{ name: 'styles', lang }} lang={lang}>
      <Hero title={t.stylesTitle}>
        <p className="max-w-3xl mx-auto text-base sm:text-lg leading-relaxed text-white/75">{t.stylesIntro}</p>
      </Hero>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {STYLES.map((s) => {
          const who = artistsForStyle(s.slug);
          return (
            <A
              key={s.slug}
              to={pathFor({ name: 'style', slug: s.slug, lang })}
              className="block p-6 border border-gold/20 bg-[#1a1a1a] hover:border-gold transition-colors"
            >
              <h2 className="font-[Bebas_Neue] text-gold text-3xl mb-1">{s.name[lang]} Tattoo</h2>
              <p className="text-xs uppercase tracking-wider text-white/40 mb-3">
                {t.artistCount(who.length)}: {who.map((a) => prettyName(a.name)).join(', ')}
              </p>
              <p className="text-sm text-white/60 leading-relaxed">{s.intro[lang][0]}</p>
            </A>
          );
        })}
      </div>
      <Actions lang={lang} />
    </Layout>
  );
}

export function WalkInPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <Layout route={{ name: 'walk-in', lang }} lang={lang}>
      <Hero title={t.walkTitle}>
        <div className="max-w-3xl mx-auto space-y-4 text-base sm:text-lg leading-relaxed text-white/75 text-left sm:text-center">
          {t.walkBody.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold hover:bg-gold hover:text-black uppercase tracking-wider text-sm transition-all duration-300"
          >
            <MessageCircle size={18} /> {t.walkCheck}
          </a>
          <p className="inline-flex items-center gap-2 text-white/60 text-sm">
            <MapPin size={16} className="text-gold" /> {ADDRESS}
          </p>
          <p className="text-white/50 text-sm">{t.piercing}</p>
        </div>
      </Hero>

      <section className="text-center mb-16 border-t border-gold/20 pt-12">
        <h2 className="font-[Bebas_Neue] text-gold text-3xl sm:text-4xl mb-3">{t.walkPlan}</h2>
        <p className="text-white/60 mb-6">{t.walkPlanBody}</p>
        <A to="/booking" className="inline-block px-8 py-3 border border-gold/30 bg-white/10 text-gold hover:bg-white/20 uppercase tracking-wider text-sm">
          {t.book}
        </A>
      </section>

      <section className="text-center">
        <h2 className="font-[Bebas_Neue] text-gold text-3xl sm:text-4xl mb-6">{t.allStyles}</h2>
        <StyleChips lang={lang} />
      </section>
    </Layout>
  );
}

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#151515] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-[Bebas_Neue] text-gold text-6xl mb-4">Page not found</h1>
      <p className="text-white/60 mb-8">This page does not exist (anymore).</p>
      <A to="/" className="px-8 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-black uppercase tracking-wider text-sm">
        99 Roots Studio
      </A>
    </div>
  );
}

export { ARTISTS };
