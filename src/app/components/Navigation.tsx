import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../../assets/logo.webp';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // One-time indicator logic: Show after cookies accepted on mobile
  useEffect(() => {
    const hasSeenIndicator = localStorage.getItem('navLogoIndicatorShown');
    const cookiesAccepted = localStorage.getItem('cookieConsent');
    const isMobile = window.innerWidth < 768;

    // Show indicator if: mobile user, cookies accepted, haven't seen it before, and scrolled past hero
    if (isMobile && cookiesAccepted === 'true' && !hasSeenIndicator && isScrolled) {
      // Small delay to make it feel natural
      const timer = setTimeout(() => {
        setShowIndicator(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isScrolled]);

  const navItems: { label: string; href: string }[] = [
    { label: 'Home', href: '#home' },
    { label: 'Artists', href: '#artists' },
    { label: 'Our Space', href: '#ourspace' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Shop', href: '#shop' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogoClick = () => {
    // Hide indicator immediately when logo is clicked
    if (showIndicator) {
      setShowIndicator(false);
      localStorage.setItem('navLogoIndicatorShown', 'true');
    }

    // On mobile, open the menu; on desktop, scroll to home
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setIsMobileMenuOpen(true);
    } else {
      scrollToSection('#home');
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
                  className="font-inter text-white hover:text-gold transition-colors duration-300 font-[Bebas_Neue] text-[24px] text-[20px] [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Logo - Only visible when scrolled (Desktop) / Always visible with burger menu (Mobile) */}
          <div className="flex items-center gap-3 md:gap-0">
            {/* Logo with tooltip */}
            <div className="relative group">
              <button
                onClick={handleLogoClick}
                className={`transition-opacity hover:opacity-80 ${isScrolled ? '' : 'hidden'}`}
              >
                <img 
                  src={logo} 
                  alt="99 Roots Studio" 
                  className={`h-50 w-50 transition-all duration-300 ${isScrolled ? 'px-[0px] py-[-6px] pt-[-3px] pr-[0px] pb-[0px] pl-[0px] mt-[43px] mr-[0px] mb-[0px] ml-[0px]' : ''}`}
                />
              </button>

              {/* One-time indicator - shows after cookie acceptance on mobile */}
              <AnimatePresence>
                {showIndicator && isScrolled && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="md:hidden absolute inset-0 pointer-events-none"
                  >
                    {/* Pulsing glow effect behind logo */}
                    <motion.div
                      className="absolute inset-0 -m-6 bg-[#FF9D56]/40 blur-2xl rounded-full"
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{ 
                        duration: 1.2,
                        repeat: 5,
                        ease: 'easeInOut'
                      }}
                    />
                    
                    {/* Second layer for even more glow */}
                    <motion.div
                      className="absolute inset-0 -m-4 bg-[#FF9D56]/30 blur-xl rounded-full"
                      animate={{ 
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1.1, 1.4, 1.1]
                      }}
                      transition={{ 
                        duration: 1.2,
                        repeat: 5,
                        ease: 'easeInOut',
                        delay: 0.15
                      }}
                    />
                    
                    {/* Decorative diamonds and text below */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2">
                      {/* Diamond */}
                      <motion.div 
                        className="w-1.5 h-1.5 rotate-45 bg-[#FF9D56]"
                        animate={{ 
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: 5,
                          ease: 'easeInOut'
                        }}
                      />
                      
                      {/* Text */}
                      <motion.span 
                        className="text-[13px] text-[#FF9D56] uppercase tracking-wider whitespace-nowrap font-medium"
                        animate={{ 
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: 5,
                          ease: 'easeInOut'
                        }}
                      >
                        Tap for Menu
                      </motion.span>
                      
                      {/* Diamond */}
                      <motion.div 
                        className="w-1.5 h-1.5 rotate-45 bg-[#FF9D56]"
                        animate={{ 
                          opacity: [0.4, 1, 0.4]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: 5,
                          ease: 'easeInOut',
                          delay: 0.2
                        }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tooltip - only shows on mobile when not scrolled */}
              {!isScrolled && (
                <span className="md:hidden absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gold/60 whitespace-nowrap pointer-events-none">
                </span>
              )}
            </div>

            {/* Mobile Menu Button - positioned next to logo */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Navigation - Right Side (only when not scrolled) */}
          {!isScrolled && (
            <div className="hidden md:flex items-center gap-8">
              {navItems.slice(3).map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="font-inter text-white hover:text-gold transition-colors duration-300 font-[Bebas_Neue] text-[24px] [text-shadow:0_1px_3px_rgba(0,0,0,0.85)]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 bottom-0 w-[80vw] max-w-sm bg-[#151515] border-l-2 border-gold/40 md:hidden shadow-2xl flex flex-col"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-gold/20 flex-shrink-0">
                <img 
                  src={logo} 
                  alt="99 Roots Studio" 
                  className="h-16 w-auto"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gold hover:text-gold/80 transition-colors p-2"
                  aria-label="Close menu"
                >
                  <X size={28} />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex flex-col p-6 gap-2 overflow-y-auto flex-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left py-4 px-4 font-inter text-white/90 transition-all duration-300 border-b border-gold/10 touch-manipulation"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              {/* Decorative Elements */}
              <div className="flex justify-center items-center gap-4 px-6 py-8 flex-shrink-0">
                <div className="h-px flex-1 bg-gold/20"></div>
                <div className="w-2 h-2 rotate-45 border border-gold/40"></div>
                <div className="h-px flex-1 bg-gold/20"></div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}