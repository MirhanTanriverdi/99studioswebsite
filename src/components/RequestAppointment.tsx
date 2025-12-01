import { motion, useScroll, useTransform } from 'motion/react';
import { Button } from './ui/button';
import { MapPin, Clock, Phone, Mail, Instagram } from 'lucide-react';
import { useRef } from 'react';

interface RequestAppointmentProps {
  onBookingClick: () => void;
}

export function RequestAppointment({ onBookingClick }: RequestAppointmentProps) {
  const sectionRef = useRef(null);
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["60px", "-60px"]);

  return (
    <section ref={sectionRef} id="contact" className="bg-[#151515] py-12 sm:py-16 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]) }}
        >
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-gold mb-4 px-4">
            Request an Appointment
          </h2>
          <p className="font-inter text-white/70 text-base sm:text-lg px-4">
            Start your tattoo journey with us
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12"
          style={{ y }}
        >
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Location */}
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <MapPin className="text-gold" size={20} />
                <h3 className="font-playfair text-xl sm:text-2xl text-gold">Location</h3>
              </div>
              <p className="font-inter text-white/70 pl-8 sm:pl-9 text-sm sm:text-base">
                Kreuzberg District<br />
                Berlin, Germany<br />
                10997
              </p>
            </div>

            {/* Opening Hours */}
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Clock className="text-gold" size={20} />
                <h3 className="font-playfair text-xl sm:text-2xl text-gold">Opening Hours</h3>
              </div>
              <div className="font-inter text-white/70 pl-8 sm:pl-9 space-y-2 text-sm sm:text-base">
                <p>Monday - Friday: 11:00 AM - 8:00 PM</p>
                <p>Saturday: 12:00 PM - 6:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            {/* Contact Us */}
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Phone className="text-gold" size={20} />
                <h3 className="font-playfair text-xl sm:text-2xl text-gold">Contact Us</h3>
              </div>
              <div className="font-inter text-white/70 pl-8 sm:pl-9 space-y-2 text-sm sm:text-base">
                <p className="flex items-center gap-2">
                  <Phone size={14} className="text-gold" />
                  +49 30 1234 5678
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-gold" />
                  info@99rootsstudio.com
                </p>
              </div>
            </div>

            {/* Additional Contact Info */}
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Instagram className="text-gold" size={20} />
                <h3 className="font-playfair text-xl sm:text-2xl text-gold">Follow Us</h3>
              </div>
              <div className="font-inter text-white/70 pl-8 sm:pl-9 text-sm sm:text-base">
                <a 
                  href="https://instagram.com/99rootsstudio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors inline-flex items-center gap-2"
                >
                  <Instagram size={14} className="text-gold" />
                  @99rootsstudio
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Make Appointment Button & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center items-center md:items-start space-y-6"
          >
            <div className="text-center md:text-left">
              <p className="font-inter text-white/90 mb-4 sm:mb-6 text-base sm:text-lg">
                Ready to bring your vision to life? Book a consultation with one of our talented artists.
              </p>
              <p className="font-inter text-white/70 mb-6 sm:mb-8 text-sm sm:text-base">
                We'll discuss your design ideas, placement, sizing, and provide a detailed quote. 
                Our team is dedicated to creating custom pieces that reflect your unique style.
              </p>
            </div>

            <Button
              onClick={onBookingClick}
              className="bg-gold text-[rgb(200,157,83)] hover:bg-gold/90 px-8 sm:px-12 py-5 sm:py-6 transition-all duration-300 w-full md:w-auto bg-[rgba(255,255,255,0)] text-sm sm:text-base rounded-[0px] font-bold touch-manipulation"
            >
              Make an Appointment
            </Button>

            <div className="border border-gold/20 rounded-lg w-full p-4 sm:p-6">
              <p className="font-inter text-white/60 text-sm sm:text-base mb-2">Important Information:</p>
              <ul className="font-inter text-white/70 text-xs sm:text-sm space-y-2">
                <li className="pl-4">• Consultations are free and take approximately 30 minutes</li>
                <li className="pl-4">• A deposit is required to secure your appointment</li>
                <li className="pl-4">• Please bring reference images or inspiration</li>
                <li className="pl-4">• Valid ID required (18+ only)</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}