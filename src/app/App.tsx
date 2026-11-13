import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Artists } from './components/Artists';
import { Gallery } from './components/Gallery';
import { TattooCare } from './components/TattooCare';
import { Footer } from './components/Footer';
import { Shop } from './components/Shop';
import { BookingSection } from './components/BookingSection';
import { AppointmentPage } from './components/AppointmentPage';
import { ArtistGalleryPage } from './components/ArtistGalleryPage';
import { Location } from './components/Location';
import { ComingSoon } from './components/ComingSoon';
import { CookieConsent } from './components/CookieConsent';
import { Toaster } from './components/ui/sonner';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { BookingPolicy } from './components/BookingPolicy';
import { OurSpacePage } from './components/OurSpacePage';
import { Impressum } from './components/Impressum';
import { NotFoundPage, StylePage, StylesHubPage, WalkInPage } from './components/LandingPages';
import { artistById, artistBySlug } from './data/artists';
import { NAVIGATE_EVENT, navigate, parsePath, pathFor, type Lang } from './router';
import { applySeo, getSeo } from './seo';

const currentPath = () => (typeof window === 'undefined' ? '/' : window.location.pathname);
// useLayoutEffect only means something in the browser; avoids a warning per page in the pre-render.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** `url` is passed when rendering on the server (pre-render); the browser reads the address bar. */
export default function App({ url }: { url?: string }) {
  const [path, setPath] = useState(() => url ?? currentPath());
  const route = parsePath(path);

  // Back/forward buttons and in-app links.
  useEffect(() => {
    const sync = () => setPath(currentPath());
    window.addEventListener('popstate', sync);
    window.addEventListener(NAVIGATE_EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(NAVIGATE_EVENT, sync);
    };
  }, []);

  // Keep <head> (title, description, canonical, hreflang, JSON-LD) in sync.
  useEffect(() => {
    applySeo(getSeo(route));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  // Every page switch starts at the top, or at #section when the link has one.
  // Instant on purpose: the site sets scroll-behavior: smooth, and a smooth
  // scroll started during the swap got cut off on phones.
  const firstRender = useRef(true);
  useIsoLayoutEffect(() => {
    const hash = window.location.hash;
    if (firstRender.current) {
      firstRender.current = false;
      if (!hash) return;
    }
    const target = hash ? document.querySelector(hash) : null;
    if (target) target.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [path]);

  const go = (to: string) => () => navigate(to);
  const toHome = go('/');
  const toBooking = go(pathFor({ name: 'booking' }));

  const withToaster = (page: JSX.Element) => (
    <>
      {page}
      <Toaster />
    </>
  );

  switch (route.name) {
    case 'impressum':
      return withToaster(<Impressum onBack={toHome} />);
    case 'our-space':
      return withToaster(<OurSpacePage onBack={toHome} onBookingClick={toBooking} />);
    case 'booking':
      return withToaster(<AppointmentPage onBack={toHome} />);
    case 'shop':
      return withToaster(<ComingSoon onBack={toHome} />);
    case 'privacy':
      return withToaster(<PrivacyPolicy onBack={toHome} />);
    case 'terms':
      return withToaster(<TermsOfService onBack={toHome} />);
    case 'booking-policy':
      return withToaster(<BookingPolicy onBack={toHome} />);
    case 'style':
      return withToaster(<StylePage slug={route.slug} lang={route.lang} />);
    case 'styles':
      return withToaster(<StylesHubPage lang={route.lang} />);
    case 'walk-in':
      return withToaster(<WalkInPage lang={route.lang} />);
    case 'not-found':
      return <NotFoundPage />;
    case 'artist': {
      const artist = artistBySlug(route.slug)!;
      const lang: Lang = route.lang;
      return withToaster(
        <ArtistGalleryPage
          artistId={artist.id}
          lang={lang}
          onBack={go('/#artists')}
          onArtistChange={(id) => {
            const next = artistById(id);
            if (next) navigate(pathFor({ name: 'artist', slug: next.slug, lang }));
          }}
          onBookingClick={toBooking}
        />,
      );
    }
    case 'home':
      return (
        <div className="relative bg-studio-black min-h-screen font-inter">
          <Navigation />
          <main className="relative">
            <Hero onAppointmentClick={toBooking} />
            <BookingSection onBookingClick={toBooking} />
            <Artists />
            <Shop onShopClick={go(pathFor({ name: 'shop' }))} />
            <Gallery onViewAllSpace={go(pathFor({ name: 'our-space' }))} />
            <Location />
            <TattooCare />
          </main>
          <Footer />
          <CookieConsent />
          <Toaster />
        </div>
      );
  }
}
