import { motion, useScroll, useTransform } from 'motion/react';
import { Instagram, Image } from 'lucide-react';
import { Button } from './ui/button';
import { ArtistPortraitPlaceholder } from './ArtistPortraitPlaceholder';
import { useRef } from 'react';
import { useLiteMotion } from './useLiteMotion';

interface Artist {
  id: number;
  name: string;
  style: string;
  bio: string;
  instagram: string;
  /** Empty string = no portrait shot yet; the card falls back to a placeholder. */
  image: string;
  isGuest?: boolean;
}

const artists: Artist[] = [
  {
    id: 1,
    name: 'MIKE',
    style: 'Fineline / Ornamental / Black & Grey',
    bio: 'Flowing fine-line and ornamental pieces that follow the body, from delicate hip and spine work to detailed black & grey symbolism.',
    instagram: '@mikeluxentattoo',
    image: 'https://i.imgur.com/HPYSKTm.jpeg',
  },
  {
    id: 7,
    name: 'JELENA',
    style: 'Black & Grey Realism / Fineline / Lettering',
    bio: 'Soft black & grey realism with fine-line detail, from portraits and religious imagery to classic motifs paired with clean lettering.',
    instagram: '@vais____ink',
    image: 'https://i.imgur.com/65vqbxU.jpeg',
  },
  {
    id: 8,
    name: 'OSVI',
    style: 'Fineline / Botanical / Illustrative',
    bio: 'Airy botanical pieces with soft shading that flow along the back and arms, alongside illustrative work with a graphic edge.',
    instagram: '@osvi.ink',
    image: '/artists/osvi-card.webp',
  },
  {
    id: 20,
    name: 'ARTURO',
    style: 'Blackwork / Ornamental / Neo-Tribal',
    bio: 'Bold blackwork and ornamental patterns made for large areas, from mandala sleeves to sweeping neo-tribal body pieces.',
    instagram: '@arturoalbuerne.ttt',
    image: '/artists/arturo-card.webp',
    isGuest: true,
  },
  {
    id: 9,
    name: 'JAVIERA',
    style: 'Fineline / Micro Realism / Minimalist',
    bio: 'Small, delicate tattoos, from soft micro-realistic animals to minimalist flowers and playful single-line motifs.',
    instagram: '@nomeolvides.ttt',
    image: '/artists/javiera-card.webp',
  },
  {
    id: 22,
    name: 'RICARDO',
    style: 'Blackwork / Dark Illustrative / Etching',
    bio: 'Heavy blackwork and dark illustrative pieces built on creatures, skulls and sci-fi horror, with etching-style shading.',
    instagram: '@rick.dark.ink',
    image: '/artists/ricardo-card.webp',
    isGuest: true,
  },
  {
    id: 24,
    name: 'ARTUR',
    style: 'Traditional / Blackwork / Minimalist',
    bio: 'Black traditional flash with bold lines, alongside clean minimalist linework. Guest from Warsaw.',
    instagram: '@arturtattoo.47',
    image: '/artists/artur-card.webp',
    isGuest: true,
  },
  {
    id: 25,
    name: 'KIM',
    style: 'Neo-Traditional / Illustrative / Ornamental',
    bio: 'Bold neo-traditional colour pieces, illustrative dotwork creatures and ornamental linework, from tarot-inspired cards to sea life.',
    instagram: '@gemini.tattoo.030',
    image: '/artists/kim-card.webp',
    isGuest: true,
  },
  // New to the roster. Styles/bios are written from their portfolio photos;
  // Instagram handles are the artists' real accounts.
  {
    id: 27,
    name: 'BARBARA',
    style: 'Ornamental / Blackwork / Traditional',
    bio: 'Ornamental linework and bold blackwork, from full-back mandala pieces to graphic hand designs and traditional flash.',
    instagram: '@elefanteconmolotov',
    image: '/artists/barbara-card.webp',
  },
  {
    id: 28,
    name: 'DARYNA',
    style: 'Fineline / Botanical / Abstract',
    bio: 'Fine-line florals with soft shading, mixed with abstract and surreal designs and embroidery-inspired ornamental pieces.',
    instagram: '@silxxskin',
    image: '/artists/daryna-card.webp',
  },
  {
    id: 29,
    name: 'DUDA',
    style: 'Fineline / Micro Realism / Botanical',
    bio: 'Fine-line botanicals and micro-realistic pet portraits and animals, with delicate detail at small and medium scale.',
    instagram: '@dudaramoos',
    image: '/artists/duda-card.webp',
  },
  {
    id: 30,
    name: 'JAMES',
    style: 'Neo-Tribal / Abstract / Brushstroke',
    bio: 'Free-flowing neo-tribal and brushstroke-style shapes drawn to follow the curves of the body.',
    instagram: '@notasong.ink',
    image: '/artists/james-card.webp',
  },
  {
    id: 31,
    name: 'NINA',
    style: 'Fineline / Botanical / Illustrative',
    bio: 'Fine-line botanicals, insects and nature motifs with soft stipple shading.',
    instagram: '@nk.ninatattoo',
    image: '/artists/nina-card.webp',
  },
];


interface ArtistsProps {
  onArtistGalleryClick?: (artistId: number) => void;
}

export function Artists({ onArtistGalleryClick }: ArtistsProps) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  
  // Parallax effect for background
  const lite = useLiteMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect for artist grid
  const { scrollYProgress: gridScrollProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"]
  });
  
  const contentY = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  
  // Grid parallax transforms
  const gridY = useTransform(gridScrollProgress, [0, 1], [100, -100]);
  const gridOpacity = useTransform(gridScrollProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 1]);

  return (
    <section ref={sectionRef} id="artists" className="relative overflow-hidden bg-[#151515]">
      {/* (A full-section parallax photo used to sit here. The title block and
          the grid both paint their own opaque backgrounds, so it was never
          visible — but on phones it was an ~11,000px-tall layer moved and
          scaled on every scroll frame. Removed.) */}

      {/* Content Container */}
      <div className="relative z-20">
        {/* Title Section — studio floor, darkened hard. The source has blown
            highlights (lamps, white walls) and the heading is gold, so a light
            wash drops it below AA. */}
        <div
          className="relative h-[50vh] md:h-[60vh] flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'linear-gradient(rgba(21, 21, 21, 0.72), rgba(21, 21, 21, 0.72)), url(/our-space/tattoo-floor-stations.webp)',
          }}
        >
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
            style={lite ? undefined : { y: gridY, opacity: gridOpacity }}
            className="container mx-auto px-4 py-8 sm:px-8 sm:py-16 lg:px-[87px] lg:py-[100px]"
          >
            {/* All artists in one grid. Order follows the `artists` array —
                move someone up that list to move them up the page. */}
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
          {artist.image ? (
            <img
              src={artist.image}
              alt={`${artist.name} – tattoo artist at 99 Roots Studio`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-[center_10%] transition-transform duration-700 md:group-hover:scale-110"
            />
          ) : (
            <ArtistPortraitPlaceholder name={artist.name} />
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
          {/* Hidden when empty — a new artist with no copy yet should show a
              clean card, not blank rows. flex-grow moves to the spacer so the
              cards in a row still line up. */}
          {artist.style && (
            <p className="text-gold text-sm sm:text-base mb-2 font-[Bebas_Neue] text-[20px]">
              {artist.style}
            </p>
          )}
          {artist.bio ? (
            <p className="font-inter text-white/60 text-xs sm:text-sm leading-relaxed text-justify mb-2 flex-grow">
              {artist.bio}
            </p>
          ) : (
            <div className="flex-grow" />
          )}
          {artist.instagram && (
            <p className="font-inter text-[#FF9D56] text-xs sm:text-sm font-[Bebas_Neue]">
              <a
                href={`https://www.instagram.com/${artist.instagram.replace(/^@/, '')}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors"
              >
                {artist.instagram}
              </a>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}