import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import videoPoster from 'figma:asset/e8cf849b09894e66bafb0d6913381c96d0c13047.png';

interface GalleryItem {
  id: number;
  image: string;
  artist: string;
  type: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: 'https://i.imgur.com/BocAObI.jpeg',
    artist: 'Elena Martinez',
    type: 'Fine Line',
  },
  {
    id: 2,
    image: 'https://i.imgur.com/aFrHC6C.jpeg',
    artist: 'Marcus Weber',
    type: 'Realism',
  },
  {
    id: 3,
    image: 'https://i.imgur.com/twwWnq9.jpeg',
    artist: 'Yuki Tanaka',
    type: 'Traditional',
  },
  {
    id: 4,
    image: 'https://i.imgur.com/UHOKXHs.jpeg',
    artist: 'Sofia Andersson',
    type: 'Geometric',
  },
  {
    id: 5,
    image: 'https://i.imgur.com/oicdqkr.jpeg',
    artist: 'Marcus Weber',
    type: 'Portrait',
  },
  {
    id: 6,
    image: 'https://i.imgur.com/dfKcibG.jpeg',
    artist: 'Elena Martinez',
    type: 'Minimalist',
  },
  {
    id: 7,
    image: 'https://i.imgur.com/bcGRB0N.jpeg',
    artist: 'Yuki Tanaka',
    type: 'Japanese',
  },
];

export function Gallery() {
  const sectionRef = useRef(null);
  
  // Parallax effect for background
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
                className="col-span-2 md:col-span-2 overflow-hidden border border-gold/20 group"
              >
                <div className="aspect-[4/3] md:aspect-[16/9] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
                    alt="99 Roots Studio space"
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
                    src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                    alt="Studio detail"
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
                    src="https://images.unsplash.com/photo-1567721913486-6585f069b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                    alt="Studio atmosphere"
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
                    src="https://images.unsplash.com/photo-1562259952-6dba12c2a15a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                    alt="Tattoo equipment"
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
                    src="https://images.unsplash.com/photo-1621784564114-6eea05b89863?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                    alt="Studio workspace"
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
                    src="https://images.unsplash.com/photo-1616879564267-a336232e3a95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
                    alt="99 Roots Studio full view"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </motion.div>

              {/* Video Section — full width */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="col-span-2 md:col-span-3 border border-gold/20 overflow-hidden"
              >
                <div className="relative aspect-[16/9] bg-black group">
                  {/* Replace src with your video URL */}
                  <video
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    poster="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400"
                  >
                    {/* <source src="YOUR_VIDEO_URL.mp4" type="video/mp4" /> */}
                  </video>
                  {/* Play overlay — shown when no src is set */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#151515]/60 pointer-events-none">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-gold flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-gold ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="font-[Bebas_Neue] text-gold tracking-widest text-sm sm:text-base uppercase">
                      Behind the Ink
                    </p>
                    <p className="font-inter text-white/40 text-xs tracking-widest uppercase mt-1">
                      Studio sessions &amp; process videos
                    </p>
                  </div>
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
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={sectionRef} id="gallery" className="relative overflow-hidden bg-[#151515]">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="w-full h-full"
            style={{ y: backgroundY }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1758404255679-9afd847ede1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBhcnR3b3JrJTIwZGV0YWlsfGVufDF8fHx8MTc2NDc1OTQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Gallery background"
              className="w-full h-full object-cover"
              style={{ scale }}
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
              style={{ y: contentY }}
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
  
  // Auto-advance every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px]">
      {items.map((item, index) => (
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