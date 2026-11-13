import { Instagram, Facebook, Mail } from 'lucide-react';
import logo from '../../assets/logo.webp';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useLiteMotion } from './useLiteMotion';
import { linkHandler, pathFor } from '../router';

const FOOTER_LINKS: Array<[string, string]> = [
  ['Tattoo Styles', pathFor({ name: 'styles', lang: 'en' })],
  ['Walk-in', pathFor({ name: 'walk-in', lang: 'en' })],
  ['Tattoo-Stile (DE)', pathFor({ name: 'styles', lang: 'de' })],
  ['Privacy Policy', pathFor({ name: 'privacy' })],
  ['Terms of Service', pathFor({ name: 'terms' })],
  ['Booking Policy', pathFor({ name: 'booking-policy' })],
  ['Impressum', pathFor({ name: 'impressum' })],
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  
  // Subtle parallax effect
  const lite = useLiteMotion();
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);

  return (
    <footer id="contact" ref={footerRef} className="relative bg-[#151515] border-t border-[#151515] sm:py-16 lg:py-20 pt-[0px] pr-[0px] pb-[20px] pl-[0px]">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        style={lite ? undefined : { y }}
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
              Tattoo & Piercing Studio · Berlin Prenzlauer Berg
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <a
              href="https://www.instagram.com/99.roots/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-gold transition-all duration-300 group touch-manipulation"
              aria-label="Instagram"
            >
              <Instagram className="text-gold group-hover:text-black" size={18} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61565613471293"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-gold transition-all duration-300 group touch-manipulation"
              aria-label="Facebook"
            >
              <Facebook className="text-gold group-hover:text-black" size={18} />
            </a>
            <a
              href="mailto:info99roots@gmail.com"
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-gold transition-all duration-300 group touch-manipulation"
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

        {/* Additional Links — real URLs so crawlers can follow them. */}
        <nav aria-label="Footer" className="sm:mt-8 pt-6 sm:pt-8 border-t border-gold/20 flex flex-wrap justify-center gap-4 sm:gap-6 m-[0px] p-[0px]">
          {FOOTER_LINKS.map(([label, to]) => (
            <a
              key={to}
              href={to}
              onClick={linkHandler(to)}
              className="font-inter text-white/50 hover:text-gold transition-colors text-xs sm:text-sm"
            >
              {label}
            </a>
          ))}
        </nav>
      </motion.div>
    </footer>
  );
}