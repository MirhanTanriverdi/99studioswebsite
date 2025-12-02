import { motion, useScroll, useTransform } from 'motion/react';
import { Instagram, Image } from 'lucide-react';
import { Button } from './ui/button';
import { useRef } from 'react';

interface Artist {
  id: number;
  name: string;
  style: string;
  bio: string;
  instagram: string;
  image: string;
}

const artists: Artist[] = [
  {
    id: 1,
    name: 'Elena Martinez',
    style: 'Fine Line & Minimalist',
    bio: 'Specializing in delicate fine-line work and minimalist designs with over 10 years of experience.',
    instagram: '@elena.ink',
    image: 'https://images.unsplash.com/photo-1613627219991-c56672575129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBhcnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE4MzU1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    name: 'Marcus Weber',
    style: 'Realism & Portraits',
    bio: 'Master of hyper-realistic portraits and detailed black & grey work. Award-winning artist.',
    instagram: '@marcus.realism',
    image: 'https://images.unsplash.com/photo-1613627219991-c56672575129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBhcnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE4MzU1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    name: 'Yuki Tanaka',
    style: 'Japanese Traditional',
    bio: 'Traditional Japanese tattooing with contemporary flair. Trained in Tokyo and Berlin.',
    instagram: '@yuki.irezumi',
    image: 'https://images.unsplash.com/photo-1613627219991-c56672575129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBhcnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE4MzU1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    name: 'Sofia Andersson',
    style: 'Geometric & Dotwork',
    bio: 'Creating intricate geometric patterns and mandala designs with precision and symmetry.',
    instagram: '@sofia.geometric',
    image: 'https://images.unsplash.com/photo-1613627219991-c56672575129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBhcnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE4MzU1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
    {
    id: 5,
    name: 'Marcus Weber',
    style: 'Realism & Portraits',
    bio: 'Master of hyper-realistic portraits and detailed black & grey work. Award-winning artist.',
    instagram: '@marcus.realism',
    image: 'https://images.unsplash.com/photo-1613627219991-c56672575129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBhcnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE4MzU1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 6,
    name: 'Yuki Tanaka',
    style: 'Japanese Traditional',
    bio: 'Traditional Japanese tattooing with contemporary flair. Trained in Tokyo and Berlin.',
    instagram: '@yuki.irezumi',
    image: 'https://images.unsplash.com/photo-1613627219991-c56672575129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBhcnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE4MzU1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 7,
    name: 'Sofia Andersson',
    style: 'Geometric & Dotwork',
    bio: 'Creating intricate geometric patterns and mandala designs with precision and symmetry.',
    instagram: '@sofia.geometric',
    image: 'https://images.unsplash.com/photo-1613627219991-c56672575129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBhcnRpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE4MzU1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

interface ArtistsProps {
  onArtistGalleryClick?: (artistId: number) => void;
}

export function Artists({ onArtistGalleryClick }: ArtistsProps) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  
  // Parallax effect for video background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for artist grid
  const { scrollYProgress: gridScrollProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0px", "-100px"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  
  // Grid parallax transforms
  const gridY = useTransform(gridScrollProgress, [0, 1], [100, -100]);
  const gridOpacity = useTransform(gridScrollProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  return (
    <section ref={sectionRef} id="artists" className="relative overflow-hidden bg-[#151515]">
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
            <source src="https://videos.pexels.com/video-files/4615158/4615158-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#151515]/70 z-10" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-20">
        {/* Title Section */}
        <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center px-4">
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
              <h2 className="font-playfair text-gold text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[Bebas_Neue]">
                Artists
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
                Meet the masters behind the ink
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

        {/* Artists Grid Section */}
        <div ref={gridRef} className="relative bg-[#151515] sm:py-20 lg:py-28 pt-[0px] pr-[0px] pb-[20px] pl-[0px] overflow-hidden p-[0px]">
          <motion.div 
            style={{ y: gridY, opacity: gridOpacity }}
            className="container mx-auto px-4 py-8 sm:px-8 sm:py-16 lg:px-[87px] lg:py-[100px]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {artists.map((artist, index) => (
                <ArtistCard 
                  key={artist.id} 
                  artist={artist} 
                  index={index}
                  onGalleryClick={onArtistGalleryClick}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ArtistCard({ 
  artist, 
  index,
  onGalleryClick 
}: { 
  artist: Artist; 
  index: number;
  onGalleryClick?: (artistId: number) => void;
}) {
  return (
    <motion.div
      key={artist.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden border border-gold/20 bg-[#151515] transition-all duration-300 hover:border-gold">
        {/* Artist Image */}
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Artist Info */}
        <div className="p-4 sm:p-6 flex flex-col h-full">
          <h3 className="font-playfair text-lg sm:text-xl text-white text-[24px] mb-2 min-h-[3rem] flex items-center font-[Bebas_Neue]">
            {artist.name}
          </h3>
          <Button
            onClick={() => onGalleryClick?.(artist.id)}
            variant="outline"
            className="w-full mb-2 transition-all duration-300 justify-center px-4 py-2 border-gold/30 text-gold hover:bg-gold hover:text-black hover:border-gold rounded-none font-[Bebas_Neue] text-[16px]"
          >
            View Gallery
          </Button>
          <p className="text-gold text-sm sm:text-base mb-2 font-[Bebas_Neue] text-[20px]">
            {artist.style}
          </p>
          <p className="font-inter text-white/60 text-xs sm:text-sm leading-relaxed text-justify mb-2 flex-grow">
            {artist.bio}
          </p>
          <p className="font-inter text-[#C89D53] text-xs sm:text-sm font-[Bebas_Neue]">
            {artist.instagram}
          </p>
        </div>
      </div>
    </motion.div>
  );
}