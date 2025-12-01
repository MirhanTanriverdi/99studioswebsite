import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function Location() {
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
    <section ref={sectionRef} id="location" className="relative overflow-hidden bg-[#151515]">
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
              <h2 className="font-roboto text-gold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                Location
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
                Find us in the heart of Berlin
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

        {/* Map and Address Section */}
        <div className="relative bg-[#151515] sm:py-20 lg:py-28 pt-[20px] pr-[0px] pb-[50px] pl-[0px] p-[0px]">
          <div className="container mx-auto px-4 sm:px-8 lg:px-[87px] max-w-7xl">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-gold/20 overflow-hidden h-[350px] sm:h-[450px] lg:h-[550px] mb-12 flex items-center justify-center"
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
        </div>
      </div>
    </section>
  );
}