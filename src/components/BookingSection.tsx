import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface BookingSectionProps {
  onBookingClick?: () => void;
}

export function BookingSection({ onBookingClick }: BookingSectionProps) {
  const sectionRef = useRef(null);
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["80px", "-80px"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={sectionRef} id="appointment" className="bg-black py-12 sm:py-16 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
          style={{ y, scale, opacity }}
        >
          {/* Heading */}
          <h2 className="font-playfair text-gold mb-6 sm:mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl px-4">
            Book Your Appointment
          </h2>

          {/* Description */}
          <p className="font-inter text-white/80 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Ready to bring your vision to life? Our artists specialize in custom designs, fine-line work, and realism. 
            Schedule a consultation to discuss your next tattoo.
          </p>

          {/* CTA Button */}
          <button
            onClick={onBookingClick}
            className="inline-block px-8 sm:px-12 py-3 sm:py-4 border-2 border-gold text-gold font-inter uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 hover:bg-gold hover:text-black touch-manipulation cursor-pointer"
          >
            Book Now
          </button>

          {/* Decorative Elements */}
          <div className="mt-12 sm:mt-16 flex justify-center items-center gap-3 sm:gap-4">
            <div className="h-px w-12 sm:w-20 bg-gold/30"></div>
            <div className="w-2 h-2 rotate-45 border border-gold/50"></div>
            <div className="h-px w-12 sm:w-20 bg-gold/30"></div>
          </div>

          {/* Studio Information Grid */}
          <div className="mt-12 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-0 sm:gap-12 m-[0px]">
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 mx-auto border border-gold/40 flex items-center justify-center">
                  <svg className="w-5 sm:w-6 h-5 sm:h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-playfair text-gold text-lg sm:text-xl mb-3">Location</h3>
              <p className="font-inter text-white/70 text-xs sm:text-sm leading-relaxed">
                Kreuzberg District<br />
                Berlin, Germany<br />
                10997
              </p>
            </motion.div>

            {/* Open Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 mx-auto border border-gold/40 flex items-center justify-center">
                  <svg className="w-5 sm:w-6 h-5 sm:h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-playfair text-gold text-lg sm:text-xl mb-3">Open Hours</h3>
              <p className="font-inter text-white/70 text-xs sm:text-sm leading-relaxed">
                Mon - Fri: 11:00 - 20:00<br />
                Saturday: 12:00 - 18:00<br />
                Sunday: Closed
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 mx-auto border border-gold/40 flex items-center justify-center">
                  <svg className="w-5 sm:w-6 h-5 sm:h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-playfair text-gold text-lg sm:text-xl mb-3">Contact Us</h3>
              <p className="font-inter text-white/70 text-xs sm:text-sm leading-relaxed">
                <a href="mailto:info@99rootsstudio.com" className="hover:text-gold transition-colors">
                  info@99rootsstudio.com
                </a><br />
                <a href="tel:+493012345678" className="hover:text-gold transition-colors">
                  +49 30 1234 5678
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}