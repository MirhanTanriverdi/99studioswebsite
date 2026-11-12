import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useLiteMotion } from './useLiteMotion';

export function Location() {
  const sectionRef = useRef(null);
  
  // Parallax effect for background
  const lite = useLiteMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  return (
    <section ref={sectionRef} id="location" className="relative overflow-hidden bg-[#151515]">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="w-full h-full"
          style={lite ? undefined : { y: backgroundY }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1635068247786-5de1ce4c0ff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBzdHVkaW8lMjBpbnRlcmlvciUyMGRhcmt8ZW58MXx8fHwxNzY1MTk0OTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Tattoo studio interior"
            className="w-full h-full object-cover"
            style={lite ? undefined : { scale }}
          />
          <div className="absolute inset-0 bg-[#151515]/70 z-10" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-20">
        {/* Title Section */}
        <div className="relative h-[30vh] md:h-[60vh] flex items-center justify-center px-4">
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
              <h2 className="font-[Bebas_Neue] text-gold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
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
              className="overflow-hidden h-[350px] sm:h-[450px] lg:h-[550px] mb-12 flex items-center justify-center"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.3461234567!2d13.4215789!3d52.5362234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851e1c8d09a47%3A0x3e1c1b2d3e4f5a6b!2sPrenzlauer%20Allee%20216%2C%2010405%20Berlin!5e0!3m2!1sen!2sde!4v1234567890123!5m2!1sen!2sde"
                className="w-full h-[200px] sm:h-[450px] lg:h-[550px]"
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
                  Prenzlauer Allee 216
                </p>
                <p className="font-inter text-white/90 text-sm sm:text-base">
                  10405 Berlin, Germany
                </p>
              </div>
              <p className="font-inter text-white/70 text-xs sm:text-sm">
                Located in the vibrant Prenzlauer Berg district. Easily accessible by U-Bahn and tram.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}