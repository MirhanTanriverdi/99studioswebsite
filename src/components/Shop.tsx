import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ShopProps {
  onShopClick: () => void;
}

export function Shop({ onShopClick }: ShopProps) {
  const sectionRef = useRef(null);
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Different parallax speeds for layered depth
  const yLayer1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yLayer2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yLayer3 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[60vh] sm:h-[70vh] min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden bg-[#151515]"
    >
      {/* Layered Background Panels - Horizontal Sliced Video Frame Effect */}
      <div className="absolute inset-0 z-0">
        {/* Layer 1 - Bottom (Slowest) */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: yLayer1 }}
        >
          <div className="absolute inset-0 flex flex-col">
            <div className="h-1/3 overflow-hidden border-b border-gold/10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1623683704451-ca4299bb3c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3QlMjBtb25vY2hyb21lfGVufDF8fHx8MTc2NDI0NjMwNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Skincare layer 1"
                className="w-full h-full object-cover grayscale"
                style={{ objectPosition: 'center 30%' }}
              />
            </div>
            <div className="h-1/3 overflow-hidden border-b border-gold/10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1623683704451-ca4299bb3c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3QlMjBtb25vY2hyb21lfGVufDF8fHx8MTc2NDI0NjMwNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Skincare layer 1"
                className="w-full h-full object-cover grayscale"
                style={{ objectPosition: 'center 50%' }}
              />
            </div>
            <div className="h-1/3 overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1623683704451-ca4299bb3c99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHByb2R1Y3QlMjBtb25vY2hyb21lfGVufDF8fHx8MTc2NDI0NjMwNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Skincare layer 1"
                className="w-full h-full object-cover grayscale"
                style={{ objectPosition: 'center 70%' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Layer 2 - Middle */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: yLayer2 }}
        >
          <div className="absolute inset-0 flex flex-col opacity-60">
            <div className="h-1/3 overflow-hidden border-b border-gold/10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1651737232278-3875f741de86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMGJvdHRsZSUyMG1hY3JvfGVufDF8fHx8MTc2NDI0NjMwNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Skincare layer 2"
                className="w-full h-full object-cover grayscale"
                style={{ objectPosition: 'center 25%' }}
              />
            </div>
            <div className="h-1/3 overflow-hidden border-b border-gold/10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1651737232278-3875f741de86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMGJvdHRsZSUyMG1hY3JvfGVufDF8fHx8MTc2NDI0NjMwNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Skincare layer 2"
                className="w-full h-full object-cover grayscale"
                style={{ objectPosition: 'center 55%' }}
              />
            </div>
            <div className="h-1/3 overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1651737232278-3875f741de86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMGJvdHRsZSUyMG1hY3JvfGVufDF8fHx8MTc2NDI0NjMwNnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Skincare layer 2"
                className="w-full h-full object-cover grayscale"
                style={{ objectPosition: 'center 75%' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Layer 3 - Top (Fastest) */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: yLayer3 }}
        >
          <div className="absolute inset-0 flex flex-col opacity-40">
            <div className="h-1/3 overflow-hidden border-b border-gold/10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1748543668676-ea8241cb3886?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbHV4dXJ5JTIwc2tpbmNhcmV8ZW58MXx8fHwxNzY0MjQ2MzA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Skincare layer 3"
                className="w-full h-full object-cover grayscale"
                style={{ objectPosition: 'center 20%' }}
              />
            </div>
            <div className="h-1/3 overflow-hidden border-b border-gold/10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1748543668676-ea8241cb3886?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbHV4dXJ5JTIwc2tpbmNhcmV8ZW58MXx8fHwxNzY0MjQ2MzA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Skincare layer 3"
                className="w-full h-full object-cover grayscale"
                style={{ objectPosition: 'center 60%' }}
              />
            </div>
            <div className="h-1/3 overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1748543668676-ea8241cb3886?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbHV4dXJ5JTIwc2tpbmNhcmV8ZW58MXx8fHwxNzY0MjQ2MzA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Skincare layer 3"
                className="w-full h-full object-cover grayscale"
                style={{ objectPosition: 'center 80%' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Dark Overlay - 60% opacity for cinematic premium look */}
        <div className="absolute inset-0 bg-[#151515]/60 z-10" />
      </div>

      {/* Content - Centered with Parallax */}
      <motion.div 
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        style={{ y: yContent }}
      >
        <div className="space-y-6 sm:space-y-8">
          {/* Small Minimal Luxury Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-4 sm:mb-6"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 border border-gold/40 flex items-center justify-center">
              <div className="w-6 h-6 sm:w-7 sm:h-7 border border-gold/60"></div>
            </div>
          </motion.div>

          {/* Main Heading - FOREVER CARE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-playfair text-[rgb(0,0,0)] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">
              FOREVER CARE
            </h2>
          </motion.div>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-inter text-white/80 uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm md:text-base mb-8 sm:mb-10 text-[rgb(0,0,0)]">
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
              className="inline-block px-10 sm:px-14 py-3 sm:py-4 bg-[rgba(0,0,0,0)] text-[rgb(0,0,0)] border-2 border-gold uppercase tracking-[0.2em] text-xs sm:text-sm hover:bg-gold hover:text-black transition-all duration-300 font-inter"
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