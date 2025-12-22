import { useState } from 'react';
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

type PageType = 'home' | 'appointment' | 'shop' | 'artist-gallery' | 'coming-soon' | 'privacy-policy' | 'terms-of-service' | 'booking-policy';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);

  const navigateToAppointment = () => {
    setCurrentPage('appointment');
    window.scrollTo(0, 0);
  };

  const navigateToShop = () => {
    setCurrentPage('shop');
    window.scrollTo(0, 0);
  };

  const navigateToComingSoon = () => {
    setCurrentPage('coming-soon');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setSelectedArtistId(null);
    window.scrollTo(0, 0);
  };

  const navigateToArtistGallery = (artistId: number) => {
    setSelectedArtistId(artistId);
    setCurrentPage('artist-gallery');
    window.scrollTo(0, 0);
  };

  const navigateToPrivacyPolicy = () => {
    setCurrentPage('privacy-policy');
    window.scrollTo(0, 0);
  };

  const navigateToTermsOfService = () => {
    setCurrentPage('terms-of-service');
    window.scrollTo(0, 0);
  };

  const navigateToBookingPolicy = () => {
    setCurrentPage('booking-policy');
    window.scrollTo(0, 0);
  };

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
    <div className="bg-studio-black min-h-screen font-inter">
      <Navigation />
      <main>
        <Hero onAppointmentClick={navigateToAppointment} />
        <BookingSection onBookingClick={navigateToAppointment} />
        <Artists onArtistGalleryClick={navigateToArtistGallery} />
        <Shop onShopClick={navigateToComingSoon} />
        <Gallery />
        <Location />
        <TattooCare />
      </main>
      <Footer 
        onPrivacyClick={navigateToPrivacyPolicy}
        onTermsClick={navigateToTermsOfService}
        onBookingPolicyClick={navigateToBookingPolicy}
      />
      <CookieConsent />
      <Toaster />
    </div>
  );
}