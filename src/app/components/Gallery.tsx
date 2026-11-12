import { useLiteMotion } from './useLiteMotion';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface GalleryItem {
  id: number;
  image: string;
  artist: string;
  type: string;
}

// One piece per resident/guest artist, taken from their portfolio in /public/work.
const galleryItems: GalleryItem[] = [
  { id: 1, image: '/work/mike/02-md.webp', artist: 'Mike', type: 'Fineline' },
  { id: 2, image: '/work/jelena/05-md.webp', artist: 'Jelena', type: 'Black & Grey Realism' },
  { id: 3, image: '/work/arturo/05-md.webp', artist: 'Arturo', type: 'Ornamental' },
  { id: 4, image: '/work/osvi/02-md.webp', artist: 'Osvi', type: 'Botanical' },
  { id: 5, image: '/work/ricardo/03-md.webp', artist: 'Ricardo', type: 'Dark Illustrative' },
  { id: 6, image: '/work/kim/04-md.webp', artist: 'Kim', type: 'Neo-Traditional' },
  { id: 7, image: '/work/duda/05-md.webp', artist: 'Duda', type: 'Micro Realism' },
  { id: 8, image: '/work/barbara/01-md.webp', artist: 'Barbara', type: 'Ornamental' },
  { id: 9, image: '/work/james/01-md.webp', artist: 'James', type: 'Neo-Tribal' },
  { id: 10, image: '/work/javiera/02-md.webp', artist: 'Javiera', type: 'Micro Realism' },
  { id: 11, image: '/work/artur/02-md.webp', artist: 'Artur', type: 'Traditional' },
  { id: 12, image: '/work/daryna/06-md.webp', artist: 'Daryna', type: 'Abstract' },
  { id: 13, image: '/work/nina/02-md.webp', artist: 'Nina', type: 'Fineline' },
];

interface GalleryProps {
  onViewAllSpace?: () => void;
}

export function Gallery({ onViewAllSpace }: GalleryProps = {}) {
  const sectionRef = useRef(null);
  
  // Parallax effect for background
  const lite = useLiteMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  return (
    <>
      {/* Our Space Section */}
      <section id="ourspace" className="relative overflow-hidden bg-[#151515]">
        <div className="relative bg-[#151515] py-12 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-8 lg:px-[87px]">
            {/* Section Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="font-[Bebas_Neue] text-gold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Our Space
              </h2>
              <p className="font-inter text-white/80 text-base sm:text-lg md:text-xl tracking-wide mt-4">
                Step inside 99 Roots Studio
              </p>
              
              {/* Decorative Elements */}
              <div className="mt-6 flex justify-center items-center gap-3 sm:gap-4">
                <div className="h-px w-8 sm:w-12 bg-gold/40"></div>
                <div className="w-2 h-2 rotate-45 border border-gold/60"></div>
                <div className="h-px w-8 sm:w-12 bg-gold/40"></div>
              </div>
            </motion.div>

            {/* Space Photo Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">

              {/* Photo 1 — full width horizontal on both mobile & desktop */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="col-span-2 md:col-span-2 self-start overflow-hidden border border-gold/20 group"
              >
                <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden">
                  <img
                    src="/our-space/tattoo-floor-wide-grid.webp"
                    alt="The main tattoo floor at 99 Roots Studio, stations lined up under hexagon lighting"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Photo 2 — vertical, pairs with photo 3 on mobile / right column on desktop */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="col-span-1 overflow-hidden border border-gold/20 group"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/our-space/lounge-neon-sign-grid.webp"
                    alt="The 99 Roots neon sign above the lounge sofa"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Photo 3 — vertical, beside photo 2 on mobile; new row col 1 on desktop */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="col-span-1 overflow-hidden border border-gold/20 group"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/our-space/lounge-seating-grid.webp"
                    alt="Lounge seating with bouclé armchairs and patterned artwork"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Photo 4 — vertical */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="col-span-1 overflow-hidden border border-gold/20 group"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/our-space/tattoo-floor-tall-grid.webp"
                    alt="The tattoo floor looking toward the hexagon light array"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Photo 5 — vertical */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="col-span-1 overflow-hidden border border-gold/20 group"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/our-space/lounge-corridor-grid.webp"
                    alt="The lounge looking down toward the neon sign"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Photo 6 — full-width horizontal banner, sensible aspect on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="col-span-2 md:col-span-3 overflow-hidden border border-gold/20 group"
              >
                <div className="aspect-[4/3] sm:aspect-[16/7] md:aspect-[21/9] overflow-hidden">
                  <img
                    src="/our-space/tattoo-floor-stations-grid.webp"
                    alt="Tattoo stations with adjustable beds, mirrors, lamps and equipment carts"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>

            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-inter text-white/40 text-xs sm:text-sm text-center mt-6 tracking-widest uppercase"
            >
              Experience the creative atmosphere and premium environment where art comes to life
            </motion.p>

            {onViewAllSpace && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex justify-center mt-8 sm:mt-10"
              >
                <button
                  onClick={onViewAllSpace}
                  className="font-[Bebas_Neue] text-[20px] sm:text-[22px] tracking-wider text-gold border border-gold/40 hover:border-gold hover:bg-gold/10 transition-all duration-300 px-8 py-3 min-h-[48px] touch-manipulation"
                >
                  See the whole studio
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={sectionRef} id="gallery" className="relative overflow-hidden bg-[#151515]">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="w-full h-full"
            style={lite ? undefined : { y: backgroundY }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1758404255679-9afd847ede1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBhcnR3b3JrJTIwZGV0YWlsfGVufDF8fHx8MTc2NDc1OTQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Gallery background"
              className="w-full h-full object-cover"
              style={lite ? undefined : { scale }}
            />
            <div className="absolute inset-0 bg-[#151515]/70 z-10" />
          </motion.div>
        </div>

        {/* Content Container */}
        <div className="relative z-20">
          {/* Title Section */}
          <div className="relative h-[30vh] md:h-[60vh] flex items-center justify-center px-4">
            <motion.div 
              className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
              style={lite ? undefined : { y: contentY }}
            >
              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-[Bebas_Neue] text-gold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                  Gallery
                </h2>
              </motion.div>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="font-inter text-white/80 text-base sm:text-lg md:text-xl tracking-wide mt-4 sm:mt-6">
                  A showcase of our finest work
                </p>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="mt-6 sm:mt-8 flex justify-center items-center gap-3 sm:gap-4">
                  <div className="h-px w-8 sm:w-12 bg-gold/40"></div>
                  <div className="w-2 h-2 rotate-45 border border-gold/60"></div>
                  <div className="h-px w-8 sm:w-12 bg-gold/40"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Gallery Grid Section */}
          <div className="relative bg-[#151515]">
            <div className="py-8 sm:py-16 lg:py-[100px]">
              {/* Gallery Carousel */}
              <InfiniteCarousel items={galleryItems} />

            </div>
            
            {/* Instagram CTA */}
            <div className="container mx-auto px-4 sm:px-8 lg:px-[87px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center mt-8 sm:mt-12 pb-8 sm:pb-16 lg:pb-[100px]"
              >
                <p className="font-inter text-white/70 mb-4 text-sm sm:text-base">
                  See more of our work on Instagram
                </p>
                <a
                  href="https://www.instagram.com/99.roots?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 sm:px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 font-inter text-sm sm:text-base font-[Bebas_Neue] text-[20px]"
                >
                  Follow @99rootsstudio
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InfiniteCarousel({ items }: { items: GalleryItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Only advance while the carousel is on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length, inView]);

  // Keep only the current slide and its neighbours in the DOM: every mounted
  // slide is a decoded full-size photo, which is what made phones stutter.
  const n = items.length;
  const isNear = (index: number) => {
    const d = Math.abs(index - currentIndex);
    return d <= 1 || d === n - 1;
  };

  return (
    <div ref={rootRef} className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
      {items.map((item, index) => isNear(index) && (
        <motion.div
          key={item.id}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentIndex === index ? 1 : 0,
            scale: currentIndex === index ? 1 : 0.95
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeInOut"
          }}
        >
          <div className="relative w-full h-full max-w-4xl mx-auto px-4">
            <img
              src={item.image}
              alt={`${item.type} tattoo by ${item.artist}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-gold mb-1 font-[Bebas_Neue]">{item.type}</p>
              <p className="text-white/60 text-sm">by {item.artist}</p>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Slideshow Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-gold w-8' : 'bg-white/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}