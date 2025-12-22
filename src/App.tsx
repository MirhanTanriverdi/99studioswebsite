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
import { SEO, businessStructuredData, getAppointmentStructuredData } from './components/SEO';
import { PerformanceOptimizer } from './components/PerformanceOptimizer';

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
        <SEO
          title="Book Appointment - 99 Roots Studio | Premium Tattoo Studio Berlin"
          description="Schedule your tattoo consultation at 99 Roots Studio. Our professional artists are ready to bring your vision to life. Book your appointment today."
          keywords="book tattoo appointment Berlin, tattoo consultation Berlin, schedule tattoo Berlin, 99 Roots Studio booking"
          canonicalUrl="https://99rootsstudio.com/appointment"
          structuredData={getAppointmentStructuredData()}
        />
        <PerformanceOptimizer />
        <AppointmentPage onBack={navigateToHome} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'shop') {
    return (
      <>
        <SEO
          title="Shop - 99 Roots Studio | Tattoo Aftercare & Merchandise"
          description="Shop premium tattoo aftercare products and exclusive 99 Roots Studio merchandise. Professional healing balms, moisturizers, and studio apparel."
          keywords="tattoo aftercare Berlin, tattoo aftercare products, 99 Roots Studio shop, tattoo merchandise, healing balm"
          canonicalUrl="https://99rootsstudio.com/shop"
        />
        <PerformanceOptimizer />
        <ShopPage onBack={navigateToHome} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'artist-gallery' && selectedArtistId !== null) {
    // Get artist data for SEO (this matches the structure in ArtistGalleryPage)
    const artistNames: Record<number, string> = {
      1: 'MIKE', 2: 'PENELOPE', 3: 'ALF', 4: 'AMIA', 5: 'ARTUR',
      6: 'ALEXANDRA', 7: 'JELENA', 8: 'NICK', 9: 'KONSATIN', 10: 'TESSA'
    };
    const artistStyles: Record<number, string> = {
      1: 'Fineline / Geometric / Ornamental', 2: 'Black & Grey / Surrealist',
      3: 'Realism / Old School', 4: 'Neotribal / Cybersigilism / Ornamental',
      5: 'Old School / Blackwork / Japanese', 6: 'Surrealism / Black & Grey',
      7: 'Fineline / Black & Grey / Surrealism', 8: 'Black & Grey / Neo-Traditional',
      9: 'Abstract & Watercolor', 10: 'Ornamental & Floral'
    };
    const artistName = artistNames[selectedArtistId] || 'Artist';
    const artistStyle = artistStyles[selectedArtistId] || 'Tattoo Artist';
    
    return (
      <>
        <SEO
          title={`${artistName} - ${artistStyle} Artist | 99 Roots Studio Berlin`}
          description={`View ${artistName}'s portfolio at 99 Roots Studio. Specializing in ${artistStyle.toLowerCase()} tattoos. Book a consultation with ${artistName} today.`}
          keywords={`${artistName} tattoo artist Berlin, ${artistStyle.toLowerCase()} tattoos Berlin, ${artistName} portfolio, 99 Roots Studio ${artistName}`}
          canonicalUrl={`https://99rootsstudio.com/artist/${artistName.toLowerCase()}`}
        />
        <PerformanceOptimizer />
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
        <SEO
          title="Coming Soon - 99 Roots Studio"
          description="New features and updates coming soon to 99 Roots Studio."
          canonicalUrl="https://99rootsstudio.com/coming-soon"
        />
        <PerformanceOptimizer />
        <ComingSoon onBack={navigateToHome} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'privacy-policy') {
    return (
      <>
        <SEO
          title="Privacy Policy - 99 Roots Studio"
          description="Privacy policy for 99 Roots Studio. Learn how we collect, use, and protect your personal information."
          canonicalUrl="https://99rootsstudio.com/privacy-policy"
        />
        <PerformanceOptimizer />
        <PrivacyPolicy onBack={navigateToHome} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'terms-of-service') {
    return (
      <>
        <SEO
          title="Terms of Service - 99 Roots Studio"
          description="Terms of service for 99 Roots Studio. Read our terms and conditions for using our services."
          canonicalUrl="https://99rootsstudio.com/terms-of-service"
        />
        <PerformanceOptimizer />
        <TermsOfService onBack={navigateToHome} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'booking-policy') {
    return (
      <>
        <SEO
          title="Booking Policy - 99 Roots Studio"
          description="Booking policy and cancellation terms for 99 Roots Studio appointments."
          canonicalUrl="https://99rootsstudio.com/booking-policy"
        />
        <PerformanceOptimizer />
        <BookingPolicy onBack={navigateToHome} />
        <Toaster />
      </>
    );
  }
  
  return (
    <div className="bg-studio-black min-h-screen font-inter">
      <SEO
        title="99 Roots Studio - Premium Tattoo Studio in Berlin | Fine Line & Realism Tattoos"
        description="Experience premium custom tattoos in Berlin at 99 Roots Studio. Specializing in fine-line, realism, and custom tattoo art. Professional artists, sterile environment, and personalized designs. Book your consultation today."
        keywords="tattoo studio Berlin, custom tattoos, fine line tattoos, realism tattoos, Berlin tattoo artists, premium tattoo studio, 99 Roots Studio, tattoo Berlin, professional tattoo artist, custom tattoo designs, tattoo parlor Berlin, best tattoo studio Berlin"
        canonicalUrl="https://99rootsstudio.com"
        structuredData={businessStructuredData}
      />
      <PerformanceOptimizer />
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