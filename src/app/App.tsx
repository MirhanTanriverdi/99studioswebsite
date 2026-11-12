import { useLayoutEffect, useRef, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Artists } from './components/Artists';
import { Gallery } from './components/Gallery';
import { TattooCare } from './components/TattooCare';
import { Footer } from './components/Footer';
import { Shop } from './components/Shop';
import { BookingSection } from './components/BookingSection';
import { AppointmentPage } from './components/AppointmentPage';
import { ShopPage } from './components/ShopPage';
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

type PageType = 'home' | 'appointment' | 'shop' | 'artist-gallery' | 'coming-soon' | 'privacy-policy' | 'terms-of-service' | 'booking-policy' | 'our-space' | 'impressum';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);

  // Every page switch starts at the top. Runs after the new page is in the DOM
  // and uses an instant jump: the site sets scroll-behavior: smooth, and a
  // smooth scroll started before the swap got cut off on phones, leaving the
  // new page (e.g. an artist's gallery) scrolled to the bottom.
  const firstRender = useRef(true);
  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentPage, selectedArtistId]);

  const navigateToAppointment = () => {
    setCurrentPage('appointment');
  };

  const navigateToShop = () => {
    setCurrentPage('shop');
  };

  const navigateToComingSoon = () => {
    setCurrentPage('coming-soon');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedArtistId(null);
  };

  const navigateToArtistGallery = (artistId: number) => {
    setSelectedArtistId(artistId);
    setCurrentPage('artist-gallery');
  };

  const navigateToPrivacyPolicy = () => {
    setCurrentPage('privacy-policy');
  };

  const navigateToTermsOfService = () => {
    setCurrentPage('terms-of-service');
  };

  const navigateToBookingPolicy = () => {
    setCurrentPage('booking-policy');
  };

  const navigateToOurSpace = () => {
    setCurrentPage('our-space');
  };

  const navigateToImpressum = () => {
    setCurrentPage('impressum');
  };

  if (currentPage === 'impressum') {
    return (
      <>
        <Impressum onBack={navigateToHome} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'our-space') {
    return (
      <>
        <OurSpacePage onBack={navigateToHome} onBookingClick={navigateToAppointment} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'appointment') {
    return (
      <>
        <AppointmentPage onBack={navigateToHome} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'shop') {
    return (
      <>
        <ShopPage onBack={navigateToHome} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'artist-gallery' && selectedArtistId !== null) {
    return (
      <>
        <ArtistGalleryPage 
          artistId={selectedArtistId} 
          onBack={navigateToHome}
          onArtistChange={navigateToArtistGallery}
          onBookingClick={navigateToAppointment}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'coming-soon') {
    return (
      <>
        <ComingSoon onBack={navigateToHome} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'privacy-policy') {
    return (
      <>
        <PrivacyPolicy onBack={navigateToHome} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'terms-of-service') {
    return (
      <>
        <TermsOfService onBack={navigateToHome} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'booking-policy') {
    return (
      <>
        <BookingPolicy onBack={navigateToHome} />
        <Toaster />
      </>
    );
  }
  
  return (
    <div className="relative bg-studio-black min-h-screen font-inter">
      <Navigation />
      <main className="relative">
        <Hero onAppointmentClick={navigateToAppointment} />
        <BookingSection onBookingClick={navigateToAppointment} />
        <Artists onArtistGalleryClick={navigateToArtistGallery} />
        <Shop onShopClick={navigateToComingSoon} />
        <Gallery onViewAllSpace={navigateToOurSpace} />
        <Location />
        <TattooCare />
      </main>
      <Footer 
        onPrivacyClick={navigateToPrivacyPolicy}
        onTermsClick={navigateToTermsOfService}
        onBookingPolicyClick={navigateToBookingPolicy}
        onImpressumClick={navigateToImpressum}
      />
      <CookieConsent />
      <Toaster />
    </div>
  );
}