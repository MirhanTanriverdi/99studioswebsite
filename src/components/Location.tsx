import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function Location() {
  const sectionRef = useRef(null);
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={sectionRef} id="location" className="bg-black py-12 sm:py-20 lg:py-28 pt-[20px] pr-[0px] pb-[50px] pl-[0px]">
      <div className="container mx-auto px-4 sm:px-8 lg:px-[87px] max-w-7xl">
        {/* Location Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]) }}
        >
          <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl text-gold mb-6">
            Location
          </h2>
          <div className="flex justify-center items-center gap-3 sm:gap-4">
            <div className="h-px w-12 sm:w-16 bg-gold/40"></div>
            <div className="w-2 h-2 rotate-45 border border-gold/60"></div>
            <div className="h-px w-12 sm:w-16 bg-gold/40"></div>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border border-gold/20 overflow-hidden h-[350px] sm:h-[450px] lg:h-[550px] mb-12 flex items-center justify-center"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]) }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.8937168474744!2d13.388996!3d52.494968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fb3c8d12345%3A0x1234567890abcdef!2sKreuzberg%2C%20Berlin!5e0!3m2!1sen!2sde!4v1234567890123!5m2!1sen!2sde"
            width="90%"
            height="90%"
            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(90%)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="99 Roots Studio Location"
          ></iframe>
        </motion.div>

        {/* Address Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center max-w-2xl mx-auto"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["15px", "-15px"]) }}
        >
          <div className="space-y-3 mb-6">
            <p className="font-inter text-white/90 text-sm sm:text-base">
              99 Roots Studio
            </p>
            <p className="font-inter text-white/90 text-sm sm:text-base">
              Landsberger Allee 108
            </p>
            <p className="font-inter text-white/90 text-sm sm:text-base">
              10965 Berlin, Germany
            </p>
          </div>
          <p className="font-inter text-white/70 text-xs sm:text-sm">
            Located in the heart of Kreuzberg, Berlin's creative district. Easily accessible by U-Bahn and bus.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
