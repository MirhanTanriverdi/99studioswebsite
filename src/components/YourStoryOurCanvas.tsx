import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function YourStoryOurCanvas() {
  const sectionRef = useRef(null);
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://videos.pexels.com/video-files/8088028/8088028-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#151515]/40 z-10" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Title */}
          <h2 className="font-playfair text-gold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6">
            Your Story, Our Canvas
          </h2>

          {/* Subtitle */}
          <p className="font-inter text-white/90 text-lg sm:text-xl md:text-2xl tracking-wide">
            Where vision becomes reality
          </p>

          {/* Decorative Elements */}
          <div className="mt-8 sm:mt-12 flex justify-center items-center gap-3 sm:gap-4">
            <div className="h-px w-12 sm:w-16 bg-gold/40"></div>
            <div className="w-2 h-2 rotate-45 border border-gold/60"></div>
            <div className="h-px w-12 sm:w-16 bg-gold/40"></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Corners - Hidden on mobile */}
      <div className="hidden sm:block absolute top-4 sm:top-8 left-4 sm:left-8 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-l-2 border-gold/40 z-30"></div>
      <div className="hidden sm:block absolute top-4 sm:top-8 right-4 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-r-2 border-gold/40 z-30"></div>
      <div className="hidden sm:block absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-l-2 border-gold/40 z-30"></div>
      <div className="hidden sm:block absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-r-2 border-gold/40 z-30"></div>
    </section>
  );
}