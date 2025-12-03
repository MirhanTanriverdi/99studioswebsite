import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import logo from "figma:asset/8d811ca05c847b26d58e972726d1fedb6e42a47d.png";
import { useRef } from "react";

interface HeroProps {
  onAppointmentClick?: () => void;
}

export function Hero({ onAppointmentClick }: HeroProps) {
  const sectionRef = useRef(null);
  
  // Parallax effect for background image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1482328177731-274399da39f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXR0b28lMjBhcnRpc3QlMjB3b3JraW5nfGVufDF8fHx8MTc2NDYyODg5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Tattoo studio background"
          className="w-full h-full object-cover"
          style={{ scale }}
        />
        <div className="absolute inset-0 bg-[#151515]/50 z-10" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 w-full"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Studio Logo */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <img
              src={logo}
              alt="99 Roots Studio"
              className="w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[500px] max-w-full h-auto"
            />
          </div>

          {/* Subheading */}
          <p className="font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 tracking-wide px-4">
            Rooted in Art. Inked in Precision.
          </p>

          {/* Location */}
          <p className="font-inter text-white/60 mb-8 sm:mb-12 text-sm sm:text-base px-4">
            Prenzlauer Allee 216, 10405 Berlin
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection("#appointment")}
              className="relative z-30 group flex items-center justify-center text-gold transition-all duration-300 p-4 min-h-[48px] touch-manipulation"
            >
              <ArrowDown
                size={24}
                className="absolute group-hover:opacity-0 transition-opacity duration-300"
              />
              <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-inter text-xs sm:text-sm uppercase tracking-wider text-gold whitespace-nowrap">
                Scroll Down
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}