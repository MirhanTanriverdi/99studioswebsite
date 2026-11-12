import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { spacePhotos } from '../data/ourSpace';

interface OurSpacePageProps {
  onBack: () => void;
  onBookingClick?: () => void;
}

export function OurSpacePage({ onBack, onBookingClick }: OurSpacePageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    () => setLightboxIndex(i => (i === null ? i : (i + 1) % spacePhotos.length)),
    []
  );
  const prev = useCallback(
    () => setLightboxIndex(i => (i === null ? i : (i - 1 + spacePhotos.length) % spacePhotos.length)),
    []
  );

  // Keyboard control for the lightbox, and lock body scroll while it is open.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [lightboxIndex, close, next, prev]);

  const active = lightboxIndex === null ? null : spacePhotos[lightboxIndex];

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#151515]/95 backdrop-blur-sm border-b border-gold/10">
        <div className="container mx-auto px-4 sm:px-8 lg:px-[87px]">
          <div className="flex items-center justify-between h-20 gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 font-inter text-white hover:text-gold transition-colors duration-300 min-h-[44px] touch-manipulation"
            >
              <ArrowLeft size={20} />
              <span className="font-[Bebas_Neue] text-[20px] tracking-wide">Back</span>
            </button>

            {onBookingClick ? (
              <button
                onClick={onBookingClick}
                className="font-[Bebas_Neue] text-[20px] text-gold hover:text-gold/80 transition-colors min-h-[44px] touch-manipulation"
              >
                Book
              </button>
            ) : (
              <span className="w-12" />
            )}
          </div>
        </div>
      </header>

      {/* Title */}
      <section className="container mx-auto px-4 sm:px-8 lg:px-[87px] pt-12 sm:pt-16 pb-8 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="font-[Bebas_Neue] text-gold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Our Space
          </h1>
          <p className="font-inter text-white/80 text-base sm:text-lg md:text-xl tracking-wide mt-4">
            Every corner of 99 Roots Studio, Prenzlauer Allee 216
          </p>
          <div className="mt-6 flex justify-center items-center gap-3 sm:gap-4">
            <div className="h-px w-8 sm:w-12 bg-gold/40" />
            <div className="w-2 h-2 rotate-45 border border-gold/60" />
            <div className="h-px w-8 sm:w-12 bg-gold/40" />
          </div>
        </motion.div>
      </section>

      {/* Masonry-style grid: columns keep the mixed portrait/landscape set tidy
          without cropping anything. */}
      <section className="container mx-auto px-4 sm:px-8 lg:px-[87px] pb-16 sm:pb-24">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 [column-fill:_balance]">
          {spacePhotos.map((photo, i) => (
            <motion.button
              key={photo.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3) }}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Open photo: ${photo.alt}`}
              className="mb-3 sm:mb-4 block w-full break-inside-avoid overflow-hidden border border-gold/20 group cursor-zoom-in"
            >
              <img
                src={`/our-space/${photo.slug}-grid.webp`}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-50 bg-[#151515]/97 flex items-center justify-center p-4 sm:p-8"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gold transition-colors p-3 touch-manipulation"
          >
            <X size={28} />
          </button>

          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 text-white hover:text-gold transition-colors p-3 touch-manipulation"
          >
            <ChevronLeft size={32} />
          </button>

          <figure onClick={e => e.stopPropagation()} className="max-w-6xl w-full">
            <img
              src={`/our-space/${active.slug}.webp`}
              alt={active.alt}
              className="w-full max-h-[80vh] object-contain mx-auto"
            />
            <figcaption className="font-inter text-white/70 text-sm sm:text-base text-center mt-4 px-8">
              {active.alt}
              <span className="block text-white/40 mt-1">
                {(lightboxIndex ?? 0) + 1} / {spacePhotos.length}
              </span>
            </figcaption>
          </figure>

          <button
            onClick={e => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 text-white hover:text-gold transition-colors p-3 touch-manipulation"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
}
