import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Artists } from './components/Artists';
import { Gallery } from './components/Gallery';
import { TattooCare } from './components/TattooCare';
import { RequestAppointment } from './components/RequestAppointment';
import { Footer } from './components/Footer';
import { BehindTheScenes } from './components/BehindTheScenes';
import { Shop } from './components/Shop';
import { YourStoryOurCanvas } from './components/YourStoryOurCanvas';
import { BookingSection } from './components/BookingSection';
import { AppointmentPage } from './components/AppointmentPage';
import { ShopPage } from './components/ShopPage';
import { ArtistGalleryPage } from './components/ArtistGalleryPage';
import { Location } from './components/Location';
import { ComingSoon } from './components/ComingSoon';
import { Toaster } from './components/ui/sonner';

type PageType = 'home' | 'appointment' | 'shop' | 'artist-gallery' | 'coming-soon';

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
  
  return (
    <div className="bg-studio-black min-h-screen font-inter">
      <Navigation />
      <main>
        <Hero onAppointmentClick={navigateToAppointment} />
        <BookingSection onBookingClick={navigateToAppointment} />
        {/* <BehindTheScenes /> */}
        <Artists onArtistGalleryClick={navigateToArtistGallery} />
        <Shop onShopClick={navigateToComingSoon} />
        <Gallery />
        <Location />
        <TattooCare />
        {/* <YourStoryOurCanvas /> */}
        {/* <RequestAppointment onBookingClick={navigateToAppointment} /> */}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}