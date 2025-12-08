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
        {/* Our Space Section */}
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

            {/* Video Container */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-5xl mx-auto"
            >
              <div className="relative aspect-video rounded-sm overflow-hidden border border-gold/30">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  poster={videoPoster}
                >
                  <source src="https://i.imgur.com/ckvicKx.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              {/* Video Description */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-inter text-white/60 text-sm sm:text-base text-center mt-6"
              >
                Experience the creative atmosphere and premium environment where art comes to life
              </motion.p>
            </motion.div>
          </div>
        </div>

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