import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from 'figma:asset/8d811ca05c847b26d58e972726d1fedb6e42a47d.png';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; href: string }[] = [];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center h-20 ${isScrolled ? 'justify-center' : 'justify-between'}`}>
          {/* Desktop Navigation - Left Side (only when not scrolled) */}
          {!isScrolled && (
            <div className="hidden md:flex items-center gap-8">
              {navItems.slice(0, 3).map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="font-inter text-white hover:text-gold transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Logo - Only visible when scrolled */}
          {isScrolled && (
            <button
              onClick={() => scrollToSection('#home')}
              className="transition-opacity hover:opacity-80"
            >
              <img 
                src={logo} 
                alt="99 Roots Studio" 
                className="h-50 w-50 transition-all duration-300 px-[0px] py-[-6px] pt-[-3px] pr-[0px] pb-[0px] pl-[0px] mt-[43px] mr-[0px] mb-[0px] ml-[0px]"
              />
            </button>
          )}

          {/* Desktop Navigation - Right Side (only when not scrolled) */}
          {!isScrolled && (
            <div className="hidden md:flex items-center gap-8">
              {navItems.slice(3).map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="font-inter text-white hover:text-gold transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Mobile Menu Button */}

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#151515] border-t border-gold/20"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left py-3 font-inter text-white/80 hover:text-gold transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}