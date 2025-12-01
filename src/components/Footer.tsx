import { Instagram, Facebook, Mail } from 'lucide-react';
import logo from 'figma:asset/8d811ca05c847b26d58e972726d1fedb6e42a47d.png';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  
  // Subtle parallax effect
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);

  return (
    <footer ref={footerRef} className="bg-[#151515] border-t border-gold/20 sm:py-16 lg:py-20 pt-[0px] pr-[0px] pb-[20px] pl-[0px]">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
          {/* Logo */}
          <div className="text-center md:text-left">
            <img 
              src={logo} 
              alt="99 Roots Studio" 
              className="h-24 w-24 sm:h-30 sm:w-30 mx-auto md:mx-0 mb-2"
            />
            <p className="font-inter text-white/60 text-xs sm:text-sm">
              Berlin's Premier Tattoo Studio
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <a
              href="https://instagram.com/99rootsstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group touch-manipulation"
              aria-label="Instagram"
            >
              <Instagram className="text-gold group-hover:text-black" size={18} />
            </a>
            <a
              href="https://facebook.com/99rootsstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group touch-manipulation"
              aria-label="Facebook"
            >
              <Facebook className="text-gold group-hover:text-black" size={18} />
            </a>
            <a
              href="mailto:info@99rootsstudio.com"
              className="w-10 h-10 sm:w-12 sm:h-12 border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group touch-manipulation"
              aria-label="Email"
            >
              <Mail className="text-gold group-hover:text-black" size={18} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="font-inter text-white/60 text-xs sm:text-sm">
              © {currentYear} 99 Roots Studio Berlin.
            </p>
            <p className="font-inter text-white/60 text-xs sm:text-sm">
              All Rights Reserved.
            </p>
          </div>
        </div>

        {/* Additional Links */}
        <div className="sm:mt-8 pt-6 sm:pt-8 border-t border-gold/20 flex flex-wrap justify-center gap-4 sm:gap-6 m-[0px] p-[0px]">
          <a
            href="#"
            className="font-inter text-white/50 hover:text-gold transition-colors text-xs sm:text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="font-inter text-white/50 hover:text-gold transition-colors text-xs sm:text-sm"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="font-inter text-white/50 hover:text-gold transition-colors text-xs sm:text-sm"
          >
            Booking Policy
          </a>
        </div>
      </motion.div>
    </footer>
  );
}