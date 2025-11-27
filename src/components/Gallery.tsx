import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface GalleryItem {
  id: number;
  image: string;
  artist: string;
  type: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    artist: 'Elena Martinez',
    type: 'Fine Line',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    artist: 'Marcus Weber',
    type: 'Realism',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    artist: 'Yuki Tanaka',
    type: 'Traditional',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    artist: 'Sofia Andersson',
    type: 'Geometric',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    artist: 'Marcus Weber',
    type: 'Portrait',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    artist: 'Elena Martinez',
    type: 'Minimalist',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1651650564658-560547484ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwbGluZSUyMHRhdHRvbyUyMGFydHxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    artist: 'Yuki Tanaka',
    type: 'Japanese',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1614199621267-5812fe71d122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsaXNtJTIwdGF0dG9vJTIwZGV0YWlsfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    artist: 'Sofia Andersson',
    type: 'Dotwork',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1700855788555-637481643fe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwdGF0dG9vfGVufDF8fHx8MTc2MTgzNTUzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    artist: 'Marcus Weber',
    type: 'Realism',
  },
];

export function Gallery() {
  const sectionRef = useRef(null);
  
  // Parallax effect for entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0px", "-100px"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  return (
    <section ref={sectionRef} id="gallery" className="relative overflow-hidden bg-black">
      {/* Video Background with Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="w-full h-full"
          style={{ scale, y: videoY }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="https://videos.pexels.com/video-files/6985001/6985001-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70 z-10" />
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
              <h2 className="font-playfair text-gold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
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
        <div className="relative bg-black py-12 sm:py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-8 lg:px-[87px] py-8 sm:py-16 lg:py-[100px]">
            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {galleryItems.map((item, index) => {
                // Calculate row number (0-indexed) for lg screens (3 columns)
                const rowNumber = Math.floor(index / 3);
                // Determine direction: even rows right, odd rows left
                const direction = rowNumber % 2 === 0 ? 1 : -1;
                
                // Smooth parallax - consistent gentle movement
                const movementIntensity = 35; // Gentle horizontal movement
                const verticalMovement = 20; // Subtle vertical parallax
                
                return (
                  <GalleryItem
                    key={item.id}
                    item={item}
                    index={index}
                    scrollYProgress={scrollYProgress}
                    rowDirection={direction}
                    movementIntensity={movementIntensity}
                    verticalMovement={verticalMovement}
                  />
                );
              })}
            </div>

            {/* Instagram CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-8 sm:mt-12"
            >
              <p className="font-inter text-white/70 mb-4 text-sm sm:text-base">
                See more of our work on Instagram
              </p>
              <a
                href="https://instagram.com/99rootsstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 sm:px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 font-inter text-sm sm:text-base"
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

function GalleryItem({ 
  item, 
  index, 
  scrollYProgress,
  rowDirection,
  movementIntensity,
  verticalMovement
}: { 
  item: GalleryItem; 
  index: number; 
  scrollYProgress: any;
  rowDirection: number;
  movementIntensity: number;
  verticalMovement: number;
}) {
  const itemRef = useRef(null);
  
  // Smooth horizontal parallax - alternating direction per row
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    [rowDirection * -movementIntensity + "px", rowDirection * movementIntensity + "px"]
  );
  
  // Smooth vertical parallax - gentle up and down motion
  const y = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [verticalMovement + "px", "0px", -verticalMovement + "px"]
  );

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="relative aspect-square overflow-hidden border border-gold/20"
      style={{ x, y }}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={`${item.type} tattoo by ${item.artist}`}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}