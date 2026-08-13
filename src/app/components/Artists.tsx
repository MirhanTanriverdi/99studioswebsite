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
  isGuest?: boolean;
}

const artists: Artist[] = [
  {
    id: 1,
    name: 'MIKE',
    style: 'Fineline / Geometric / Ornamental / Black & Grey / Abstract',
    bio: 'Specializing in delicate fine-line work and minimalist designs with over 10 years of experience.',
    instagram: '@mike.tattoo',
    image: 'https://i.imgur.com/HPYSKTm.jpeg',
  },
  {
    id: 7,
    name: 'JELENA',
    style: 'Fineline / Black & Grey / Surrealism',
    bio: 'Creating intricate geometric patterns and mandala designs with precision and symmetry.',
    instagram: '@jelena.tattoo',
    image: 'https://i.imgur.com/65vqbxU.jpeg',
  },
  {
    id: 8,
    name: 'OSVI',
    style: 'Blackwork / Illustrative / Abstract',
    bio: 'Bringing bold blackwork and illustrative storytelling to every piece. A core voice at 99 Roots.',
    instagram: '@osvi.tattoo',
    image: 'https://i.imgur.com/BJAoQXB.jpeg',
  },
  {
    id: 9,
    name: 'JAVIERA',
    style: 'Fineline / Botanical / Ornamental',
    bio: 'Delicate botanical compositions and ornamental linework crafted with a distinctly feminine touch.',
    instagram: '@javiera.tattoo',
    image: 'https://i.imgur.com/9VidIS1.jpeg',
  },
];

const guestArtists: Artist[] = [
  {
    id: 20,
    name: 'ARTURO',
    style: 'Realism / Black & Grey / Portrait',
    bio: 'Master of hyper-realistic portraits and cinematic black & grey compositions.',
    instagram: '@arturo.tattoo',
    image: 'https://i.imgur.com/iRXiTpZ.jpeg',
    isGuest: true,
  },
  {
    id: 21,
    name: 'STEVEN',
    style: 'Neo-Traditional / Color / Bold',
    bio: 'Bold neo-traditional designs with vibrant color palettes. Guest from Amsterdam.',
    instagram: '@steven.tattoo',
    image: 'https://i.imgur.com/Xp1GwCW.jpeg',
    isGuest: true,
  },
  {
    id: 22,
    name: 'RICARDO',
    style: 'Japanese / Old School / Sleeve',
    bio: 'Traditional Japanese tattooing rooted in irezumi with a contemporary European edge.',
    instagram: '@ricardo.tattoo',
    image: 'https://i.imgur.com/tk2dwYn.jpeg',
    isGuest: true,
  },
  {
    id: 23,
    name: 'NICK',
    style: 'Abstract / Blackwork / Geometric',
    bio: 'Experimental blackwork and abstract geometric forms. Residency guest from Copenhagen.',
    instagram: '@nick.tattoo',
    image: 'https://i.imgur.com/BJAoQXB.jpeg',
    isGuest: true,
  },
  {
    id: 24,
    name: 'ARTUR',
    style: 'Old School / Blackwork / Illustrative',
    bio: 'Old school boldness fused with blackwork precision. Guest from Warsaw.',
    instagram: '@artur.tattoo',
    image: 'https://i.imgur.com/HPYSKTm.jpeg',
    isGuest: true,
  },
  {
    id: 25,
    name: 'KIM',
    style: 'Fineline / Minimalist / Micro',
    bio: 'Ultra-fine micro tattoos and minimalist compositions with an architectural sensibility.',
    instagram: '@kim.tattoo',
    image: 'https://i.imgur.com/65vqbxU.jpeg',
    isGuest: true,
  },
  {
    id: 26,
    name: 'MARIA',
    style: 'Surrealism / Illustrative / Black & Grey',
    bio: 'Dreamlike surrealist imagery and illustrative black & grey work. Guest from Madrid.',
    instagram: '@maria.tattoo',
    image: 'https://i.imgur.com/9VidIS1.jpeg',
    isGuest: true,
  },
];

interface ArtistsProps {
  onArtistGalleryClick?: (artistId: number) => void;
}

export function Artists({ onArtistGalleryClick }: ArtistsProps) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  
  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for artist grid
  const { scrollYProgress: gridScrollProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  
  // Grid parallax transforms
  const gridY = useTransform(gridScrollProgress, [0, 1], [100, -100]);
  const gridOpacity = useTransform(gridScrollProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 1]);

  return (
    <section ref={sectionRef} id="artists" className="relative overflow-hidden bg-[#151515]">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="w-full h-full"
          style={{ y: backgroundY }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1753259789341-808371092e19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBhcnRpc3QlMjBzdHVkaW98ZW58MXx8fHwxNzY0NzU5MjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Tattoo studio background"
            className="w-full h-full object-cover"
            style={{ scale }}
          />
          <div className="absolute inset-0 bg-[#151515]/70 z-10" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-20">
        {/* Title Section */}
        <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'linear-gradient(rgba(21, 21, 21, 0.4), rgba(21, 21, 21, 0.4)), url(https://images.unsplash.com/photo-1616879564267-a336232e3a95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBtYWNoaW5lJTIwZGFya3xlbnwxfHx8fDE3NjQ3Njc0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)' }}>
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
            {/* Resident Artists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 sm:px-8 md:px-12 lg:px-[110px] p-[0px]">
              {artists.map((artist, index) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  index={index}
                  onGalleryClick={onArtistGalleryClick}
                />
              ))}
            </div>

            {/* Guest Artists Sub-section */}
            <div className="sm:px-8 md:px-12 lg:px-[110px] mt-16 sm:mt-20 lg:mt-24">
              {/* Sub-header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-10 sm:mb-14"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-px flex-1 bg-gold/20" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-gold/50" />
                  <div className="h-px flex-1 bg-gold/20" />
                </div>
                <h3 className="font-[Bebas_Neue] text-white/90 text-3xl sm:text-4xl md:text-5xl tracking-widest text-center">
                  Guest Artists
                </h3>
                <p className="text-center text-white/40 text-xs sm:text-sm tracking-widest uppercase font-[Space_Mono] mt-2">
                  Rotating residencies — follow us for announcements
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="h-px flex-1 bg-gold/20" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-gold/50" />
                  <div className="h-px flex-1 bg-gold/20" />
                </div>
              </motion.div>

              {/* Guest Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                {guestArtists.map((artist, index) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    index={index}
                    onGalleryClick={onArtistGalleryClick}
                  />
                ))}
              </div>
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
      <div className="relative overflow-hidden border border-[#151515] bg-[#151515] transition-all duration-300">
        {/* Artist Image */}
        <div className="aspect-[3/4] overflow-hidden relative">
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-full object-cover object-[center_10%] transition-transform duration-700 md:group-hover:scale-110"
          />
          {artist.isGuest && (
            <div className="absolute top-3 left-3 px-3 py-1 border border-gold/70 text-gold font-[Bebas_Neue] text-[13px] tracking-widest uppercase bg-[#151515]/80 backdrop-blur-sm">
              Guest Artist
            </div>
          )}
        </div>

        {/* Artist Info */}
        <div className="p-4 sm:p-6 flex flex-col h-full">
          <h3 className="font-playfair text-lg sm:text-xl text-white text-[30px] mb-2 min-h-[3rem] flex items-center font-[Bebas_Neue]">
            {artist.name}
          </h3>
          <Button
            onClick={() => onGalleryClick?.(artist.id)}
            variant="outline"
            className="w-full mb-2 transition-all duration-300 justify-center px-4 py-2 border-gold/30 text-gold md:hover:bg-gold md:hover:text-black md:hover:border-gold rounded-none font-[Bebas_Neue] text-[16px]"
          >
            View Gallery
          </Button>
          <p className="text-gold text-sm sm:text-base mb-2 font-[Bebas_Neue] text-[20px]">
            {artist.style}
          </p>
          <p className="font-inter text-white/60 text-xs sm:text-sm leading-relaxed text-justify mb-2 flex-grow">
            {artist.bio}
          </p>
          <p className="font-inter text-[#FF9D56] text-xs sm:text-sm font-[Bebas_Neue]">
            {artist.instagram}
          </p>
        </div>
      </div>
    </motion.div>
  );
}