import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface ShopProps {
  onShopClick: () => void;
}

export function Shop({ onShopClick }: ShopProps) {
  const sectionRef = useRef(null);
  
  // Parallax effect for background image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[60vh] sm:h-[70vh] min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1707395293453-26231b245d51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBhZnRlcmNhcmUlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NjQ3NTkxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Shop background"
          className="w-full h-full object-cover"
          style={{ scale }}
        />
        <div className="absolute inset-0 bg-[#151515]/70 z-10" />
      </motion.div>

      {/* Content - Centered with Parallax */}
      <motion.div 
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        style={{ y: yContent }}
      >
        <div className="space-y-6 sm:space-y-8 backdrop-blur-sm bg-[#151515]/50 px-4 py-2">
          {/* Small Minimal Luxury Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-4 sm:mb-6"
          >
            
          </motion.div>

          {/* Main Heading - 99 SHOP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-playfair uppercase tracking-[0.3em] sm:tracking-[0.4em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 font-[Bebas_Neue] px-4 py-2">
              <span className="text-[rgb(200,157,83)]">99</span> <span className="text-[#151515]">SHOP</span>
            </h2>
          </motion.div>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-inter text-white/80 uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm md:text-base mb-8 sm:mb-10">
              Skincare gentle enough for a new tattoo.
            </p>
          </motion.div>

          {/* CTA Button - SHOP NOW */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              onClick={onShopClick}
              className="inline-block px-10 sm:px-14 py-3 sm:py-4 bg-transparent text-gold border-2 border-gold uppercase tracking-[0.2em] text-xs sm:text-sm hover:bg-gold hover:text-[#151515] transition-all duration-300 font-inter"
            >
              SHOP NOW
            </button>
          </motion.div>

          {/* Decorative Gold Line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="mt-8 sm:mt-10 flex justify-center items-center gap-3 sm:gap-4">
              <div className="h-px w-12 sm:w-16 bg-gold/40"></div>
              <div className="w-2 h-2 rotate-45 border border-gold/60"></div>
              <div className="h-px w-12 sm:w-16 bg-gold/40"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
