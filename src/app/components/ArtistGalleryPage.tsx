import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, Instagram, ChevronDown, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { ArtistPortraitPlaceholder } from './ArtistPortraitPlaceholder';
import { artistWork } from '../data/artistWork';
import logo from '../../assets/logo.webp';
import { useState, useEffect, useRef } from 'react';
import { useLiteMotion } from './useLiteMotion';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import ComingSoon from '../imports/ComingSoon-208-55';

interface ArtistGalleryPageProps {
  artistId: number;
  onBack: () => void;
  onArtistChange: (artistId: number) => void;
  onBookingClick?: () => void;
}

interface GalleryImage {
  id: number;
  url: string;
  /** Square-cropped version for the grid; falls back to url when absent. */
  thumb?: string;
  title: string;
}

// Artist gallery data
const artistGalleries: Record<number, {
  name: string;
  style: string;
  bio: string;
  instagram: string;
  photo: string;
  images: GalleryImage[];
}> = {
  1: {
    name: 'MIKE',
    style: 'Fineline / Ornamental / Black & Grey',
    bio: 'Flowing fine-line and ornamental pieces that follow the body, from delicate hip and spine work to detailed black & grey symbolism.',
    instagram: '@mikeluxentattoo',
    photo: 'https://i.imgur.com/HPYSKTm.jpeg',
    images: [
      { id: 1, url: '', title: 'Fine Line Floral' },
      { id: 2, url: '', title: 'Minimalist Design' },
      { id: 3, url: '', title: 'Delicate Line Work' },
      { id: 4, url: '', title: 'Fine Line Portrait' },
      { id: 5, url: '', title: 'Abstract Minimal' },
      { id: 6, url: '', title: 'Botanical Fine Line' },
    ]
  },
  7: {
    name: 'JELENA',
    style: 'Black & Grey Realism / Fineline / Lettering',
    bio: 'Soft black & grey realism with fine-line detail, from portraits and religious imagery to classic motifs paired with clean lettering.',
    instagram: '@vais____ink',
    photo: 'https://i.imgur.com/65vqbxU.jpeg',
    images: [
      { id: 1, url: '', title: 'Geometric Mandala' },
      { id: 2, url: '', title: 'Sacred Geometry' },
      { id: 3, url: '', title: 'Dotwork Pattern' },
      { id: 4, url: '', title: 'Symmetrical Design' },
      { id: 5, url: '', title: 'Ornamental Dotwork' },
      { id: 6, url: '', title: 'Precision Geometry' },
    ]
  },
  8: {
    name: 'OSVI',
    style: 'Fineline / Botanical / Illustrative',
    bio: 'Airy botanical pieces with soft shading that flow along the back and arms, alongside illustrative work with a graphic edge.',
    instagram: '@osvi.ink',
    photo: '/artists/osvi.webp',
    images: [
      { id: 1, url: '', title: 'Blackwork Composition' },
      { id: 2, url: '', title: 'Illustrative Sleeve' },
      { id: 3, url: '', title: 'Abstract Form' },
      { id: 4, url: '', title: 'Bold Back Piece' },
    ]
  },
  9: {
    name: 'JAVIERA',
    style: 'Fineline / Micro Realism / Minimalist',
    bio: 'Small, delicate tattoos, from soft micro-realistic animals to minimalist flowers and playful single-line motifs.',
    instagram: '@nomeolvides.ttt',
    photo: '/artists/javiera.webp',
    images: [
      { id: 1, url: '', title: 'Botanical Fineline' },
      { id: 2, url: '', title: 'Ornamental Wrist' },
      { id: 3, url: '', title: 'Floral Composition' },
      { id: 4, url: '', title: 'Delicate Linework' },
    ]
  },
  20: {
    name: 'ARTURO',
    style: 'Blackwork / Ornamental / Neo-Tribal',
    bio: 'Bold blackwork and ornamental patterns made for large areas, from mandala sleeves to sweeping neo-tribal body pieces.',
    instagram: '@arturoalbuerne.ttt',
    photo: '/artists/arturo.webp',
    images: [
      { id: 1, url: '', title: 'Hyper Realistic Portrait' },
      { id: 2, url: '', title: 'Black & Grey Study' },
      { id: 3, url: '', title: 'Cinematic Piece' },
      { id: 4, url: '', title: 'Portrait Sleeve' },
    ]
  },
  22: {
    name: 'RICARDO',
    style: 'Blackwork / Dark Illustrative / Etching',
    bio: 'Heavy blackwork and dark illustrative pieces built on creatures, skulls and sci-fi horror, with etching-style shading.',
    instagram: '@rick.dark.ink',
    photo: '/artists/ricardo.webp',
    images: [
      { id: 1, url: '', title: 'Japanese Sleeve' },
      { id: 2, url: '', title: 'Irezumi Dragon' },
      { id: 3, url: '', title: 'Old School Eagle' },
      { id: 4, url: '', title: 'Koi Back Piece' },
    ]
  },
  24: {
    name: 'ARTUR',
    style: 'Traditional / Blackwork / Minimalist',
    bio: 'Black traditional flash with bold lines, alongside clean minimalist linework. Guest from Warsaw.',
    instagram: '@arturtattoo.47',
    photo: '/artists/artur.webp',
    images: [
      { id: 1, url: '', title: 'Old School Dagger' },
      { id: 2, url: '', title: 'Blackwork Chest' },
      { id: 3, url: '', title: 'Illustrative Arm' },
      { id: 4, url: '', title: 'Bold Blackwork' },
    ]
  },
  25: {
    name: 'KIM',
    style: 'Neo-Traditional / Illustrative / Ornamental',
    bio: 'Bold neo-traditional colour pieces, illustrative dotwork creatures and ornamental linework, from tarot-inspired cards to sea life.',
    instagram: '@gemini.tattoo.030',
    photo: '/artists/kim.webp',
    images: [
      { id: 1, url: '', title: 'Micro Fineline' },
      { id: 2, url: '', title: 'Minimalist Study' },
      { id: 3, url: '', title: 'Architectural Line' },
      { id: 4, url: '', title: 'Micro Detail' },
    ]
  },
  27: {
    name: 'BARBARA',
    style: 'Ornamental / Blackwork / Traditional',
    bio: 'Ornamental linework and bold blackwork, from full-back mandala pieces to graphic hand designs and traditional flash.',
    instagram: '@elefanteconmolotov',
    photo: '/artists/barbara.webp',
    images: [
      { id: 1, url: '', title: '' },
      { id: 2, url: '', title: '' },
      { id: 3, url: '', title: '' },
      { id: 4, url: '', title: '' },
    ]
  },
  28: {
    name: 'DARYNA',
    style: 'Fineline / Botanical / Abstract',
    bio: 'Fine-line florals with soft shading, mixed with abstract and surreal designs and embroidery-inspired ornamental pieces.',
    instagram: '@silxxskin',
    photo: '/artists/daryna.webp',
    images: [
      { id: 1, url: '', title: '' },
      { id: 2, url: '', title: '' },
      { id: 3, url: '', title: '' },
      { id: 4, url: '', title: '' },
    ]
  },
  29: {
    name: 'DUDA',
    style: 'Fineline / Micro Realism / Botanical',
    bio: 'Fine-line botanicals and micro-realistic pet portraits and animals, with delicate detail at small and medium scale.',
    instagram: '@dudaramoos',
    photo: '/artists/duda.webp',
    images: [
      { id: 1, url: '', title: '' },
      { id: 2, url: '', title: '' },
      { id: 3, url: '', title: '' },
      { id: 4, url: '', title: '' },
    ]
  },
  30: {
    name: 'JAMES',
    style: 'Neo-Tribal / Abstract / Brushstroke',
    bio: 'Free-flowing neo-tribal and brushstroke-style shapes drawn to follow the curves of the body.',
    instagram: '@notasong.ink',
    photo: '/artists/james.webp',
    images: [
      { id: 1, url: '', title: '' },
      { id: 2, url: '', title: '' },
      { id: 3, url: '', title: '' },
      { id: 4, url: '', title: '' },
    ]
  },
  31: {
    name: 'NINA',
    style: 'Fineline / Botanical / Illustrative',
    bio: 'Fine-line botanicals, insects and nature motifs with soft stipple shading.',
    instagram: '@nk.ninatattoo',
    photo: '/artists/nina.webp',
    images: [
      { id: 1, url: '', title: '' },
      { id: 2, url: '', title: '' },
      { id: 3, url: '', title: '' },
      { id: 4, url: '', title: '' },
    ]
  },
};

export function ArtistGalleryPage({ artistId, onBack, onArtistChange, onBookingClick }: ArtistGalleryPageProps) {
  const base = artistGalleries[artistId];
  // Real work imported from the studio's Drive wins over the placeholder
  // entries baked into artistGalleries above.
  const imported = base ? artistWork[base.name.toLowerCase()] : undefined;
  const artist = base && imported?.length
    ? { ...base, images: imported.map((w, i) => ({ id: i + 1, url: w.url, thumb: w.thumb, title: '' })) }
    : base;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Refs for parallax
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for header parallax
  const lite = useLiteMotion();
  const { scrollYProgress: headerScrollProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"]
  });
  
  // Scroll progress for gallery parallax
  const { scrollYProgress: galleryScrollProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });
  
  // Scroll progress for CTA parallax
  const { scrollYProgress: ctaScrollProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax effects
  const headerY = useTransform(headerScrollProgress, [0, 1], [0, -100]);
  const headerOpacity = useTransform(headerScrollProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const photoScale = useTransform(headerScrollProgress, [0, 1], [1, 0.8]);
  
  const galleryY = useTransform(galleryScrollProgress, [0, 1], [50, -50]);
  const galleryOpacity = useTransform(galleryScrollProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  
  const ctaY = useTransform(ctaScrollProgress, [0, 1], [100, -50]);
  const ctaOpacity = useTransform(ctaScrollProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  
  // Get all artists for dropdown
  const allArtists = Object.entries(artistGalleries).map(([id, data]) => ({
    id: Number(id),
    name: data.name
  }));

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Phone back button / back swipe closes the lightbox. The site has no
  // routes, so without this "back" left the site instead of closing the photo.
  const lightboxOpen = selectedImageIndex !== null;
  useEffect(() => {
    if (!lightboxOpen) return;
    window.history.pushState({ lightbox: true }, '');
    const onPop = () => setSelectedImageIndex(null);
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      // Closed with the X / Escape: drop the history entry we added.
      if (window.history.state?.lightbox) window.history.back();
    };
  }, [lightboxOpen]);

  // Navigation functions
  const handlePrevious = () => {
    if (selectedImageIndex !== null && artist) {
      const newIndex = selectedImageIndex === 0 ? artist.images.length - 1 : selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && artist) {
      const newIndex = selectedImageIndex === artist.images.length - 1 ? 0 : selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, artist]);

  // Guard on url: placeholder entries have none, and the lightbox must never
  // open on one (it would render a broken <img> over the whole screen).
  const candidate = selectedImageIndex !== null && artist ? artist.images[selectedImageIndex] : null;
  const selectedImage = candidate?.url ? candidate : null;

  if (!artist) {
    return (
      <div className="min-h-screen bg-[#151515] flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-playfair text-gold text-4xl mb-4">Artist Not Found</h2>
          <Button onClick={onBack} variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black">
            <ArrowLeft className="mr-2" size={18} />
            Back to Artists
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#151515]">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#151515] z-[100]">
        <motion.div
          className="h-full bg-gold shadow-[0_0_10px_rgba(200,157,83,0.5)]"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#151515]/95 backdrop-blur-sm border-b border-gold/20 mt-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Back Button */}
            <Button 
              onClick={onBack} 
              variant="ghost" 
              className="text-gold hover:text-gold/80 hover:bg-gold/10"
            >
              <ArrowLeft className="mr-2" size={18} />
              <span className="hidden sm:inline">Back to Artists</span>
            </Button>

            {/* Center: Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <img 
                src={logo} 
                alt="99 Roots Studio" 
                className="hidden sm:block h-12 sm:h-16 md:h-20 w-auto"
              />
            </div>

            {/* Right: Artist Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gold/40 text-gold hover:bg-gold/10 transition-all duration-300 text-sm sm:text-base"
              >
                <span className="hidden sm:inline">{artist.name}</span>
                <span className="sm:hidden">Artists</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute right-0 top-full mt-2 w-48 sm:w-56 bg-[#151515] border border-gold/40 transition-all duration-300 z-50 shadow-2xl ${
                isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}>
                {allArtists.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      onArtistChange(a.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm sm:text-base transition-all duration-300 transform md:hover:scale-[1.02] md:hover:pl-6 ${
                      a.id === artistId
                        ? 'bg-gold/20 text-gold border-l-2 border-gold'
                        : 'text-white/80 md:hover:bg-gold/10 md:hover:text-gold md:hover:border-l-2 md:hover:border-gold/50'
                    }`}
                  >
                    {a.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Artist Header */}
      <section ref={headerRef} className="relative py-12 sm:py-16 lg:py-24 border-b border-gold/20 overflow-hidden pt-[96px] pr-[0px] pb-[0px] pl-[0px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <motion.div
            style={lite ? undefined : { y: headerY, opacity: headerOpacity }}
          >
            {/* Artist Photo */}
            <motion.div
              style={lite ? undefined : { scale: photoScale }}
              className="mb-8 sm:mb-10 flex justify-center"
            >
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
                <div className="absolute inset-0 border-2 border-gold/40 rounded-full"></div>
                {artist.photo ? (
                  <img
                    src={artist.photo}
                    alt={artist.name}
                    className="w-full h-full object-cover object-center rounded-full border-4 border-black shadow-2xl"
                  />
                ) : (
                  <div className="w-full h-full rounded-full border-4 border-black shadow-2xl overflow-hidden">
                    <ArtistPortraitPlaceholder name={artist.name} variant="circle" />
                  </div>
                )}

              </div>
            </motion.div>

            <h1 className="font-playfair text-gold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 font-[Bebas_Neue]">
              {artist.name}
            </h1>
            <p className="text-white/80 text-xl sm:text-2xl md:text-3xl mb-6">
              {artist.style}
            </p>
            <p className="font-inter text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-8">
              {artist.bio}
            </p>
            
            {/* Instagram Link */}
            <a
              href={`https://www.instagram.com/${artist.instagram.replace(/^@/, '')}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors"
            >
              <Instagram size={20} />
              <span className="font-inter font-[Bebas_Neue] text-[20px]">{artist.instagram}</span>
            </a>

            {/* Decorative Elements */}
            <div className="mt-12 flex justify-center items-center gap-4">
              <div className="h-px w-16 bg-gold/40"></div>
              <div className="w-2 h-2 rotate-45 border border-gold/60"></div>
              <div className="h-px w-16 bg-gold/40"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section ref={galleryRef} className="relative py-12 sm:py-16 lg:py-24 overflow-hidden pt-[20px] pr-[0px] pb-[96px] pl-[0px]">
        <motion.div 
          style={lite ? undefined : { y: galleryY, opacity: galleryOpacity }}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {artist.images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={`group relative aspect-square overflow-hidden bg-[#151515] border border-gold/20 flex items-center justify-center ${
                  image.url ? 'cursor-zoom-in' : ''
                }`}
                onClick={image.url ? () => setSelectedImageIndex(index) : undefined}
              >
                {image.url ? (
                  <>
                    <img
                      src={image.thumb || image.url}
                      alt={image.title || `${artist.name} tattoo work`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    {/* Zoom Icon Overlay */}
                    <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn className="text-gold opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" size={32} />
                    </div>
                  </>
                ) : (
                  <ArtistPortraitPlaceholder name={artist.name} variant="tile" label="Coming Soon" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative py-12 sm:py-16 lg:py-24 border-t border-gold/20 overflow-hidden pt-[20px] pr-[0px] pb-[96px] pl-[0px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            style={lite ? undefined : { y: ctaY, opacity: ctaOpacity }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="font-playfair text-gold text-3xl sm:text-4xl md:text-5xl mb-6">
              Book with {artist.name}
            </h2>
            <p className="font-inter text-white/70 text-base sm:text-lg mb-8">
              Ready to get your own custom piece? Schedule a consultation to discuss your vision.
            </p>
            <button
              onClick={onBookingClick}
              className="inline-block px-8 sm:px-12 py-3 sm:py-4 border-2 border-gold text-gold font-inter uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 hover:bg-gold hover:text-black touch-manipulation cursor-pointer"
            >
              Book Consultation
            </button>
          </motion.div>
        </div>
      </section>

      {/* Image Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        {/* 100dvh, not 100vh: on iPhone 100vh is taller than the visible area
            while the address bar shows, which pushed the close button off
            the top of the screen. The built-in dialog close button is hidden;
            ours below is the one to tap. */}
        <DialogContent className="w-screen h-[100dvh] max-w-none max-h-none sm:max-w-[95vw] sm:max-h-[95vh] sm:w-auto sm:h-auto p-0 bg-black border-0 sm:border-2 border-gold/40 [&>button:last-child]:hidden">
          <DialogTitle className="sr-only">
            {selectedImage?.title || 'Tattoo Image'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Full size view of {selectedImage?.title || 'tattoo artwork'}
          </DialogDescription>
          {selectedImage && (
            /* w/h-full on mobile: the dialog is full-screen there, and without
               it this wrapper collapses to the image height and the photo sits
               pinned to the top. */
            <div className="relative w-full h-full sm:w-auto sm:h-auto flex items-center justify-center">
              {/* Close Button */}
              <button
                onClick={() => setSelectedImageIndex(null)}
                aria-label="Close"
                className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 text-gold hover:text-gold/80 transition-colors z-50 bg-black/80 p-3 border border-gold/40 touch-manipulation"
              >
                <X size={24} />
              </button>

              {/* Invisible Navigation Zones — kept clear of the top bar so they
                  never sit over the close button. */}
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-20 bottom-20 w-1/3 z-40 cursor-w-resize"
                aria-label="Previous image"
              />
              <button
                onClick={handleNext}
                className="absolute right-0 top-20 bottom-20 w-1/3 z-40 cursor-e-resize"
                aria-label="Next image"
              />

              {/* Full Size Image. The image sizes itself and the dialog wraps
                  it — w-full/h-full here would stretch it against an auto-sized
                  parent and overflow the frame. */}
              <div className="relative w-full h-full sm:w-auto sm:h-auto flex items-center justify-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title || `${artist.name} tattoo work`}
                  className="block w-auto h-auto max-w-[100vw] max-h-[100dvh] sm:max-w-[88vw] sm:max-h-[86vh] object-contain"
                />
              </div>

              {/* Image Title & Counter */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 sm:p-6 text-center">
                <p className="font-inter text-gold text-sm sm:text-lg md:text-xl mb-1 sm:mb-2">
                  {selectedImage.title || `${artist.name} — tattoo work`}
                </p>
                <p className="font-inter text-white/60 text-xs sm:text-sm">
                  {(selectedImageIndex ?? 0) + 1} / {artist.images.length}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}