import { useLiteMotion } from './useLiteMotion';
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import logo from "../../assets/logo.webp";
import heroBackground from "../../assets/hero-studio.webp";
import HalftoneReveal from "./HalftoneReveal";
import { useRef } from "react";

interface HeroProps {
  onAppointmentClick?: () => void;
}

export function Hero({ onAppointmentClick }: HeroProps) {
  const sectionRef = useRef(null);
  
  // Parallax effect for background image
  const lite = useLiteMotion();
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
        style={lite ? undefined : { y: backgroundY }}
      >
        <motion.div
          className="w-full h-full"
          style={lite ? undefined : { scale }}
          role="img"
          aria-label="99 Roots Studio tattoo stations in Berlin Prenzlauer Berg"
        >
          <HalftoneReveal
            src={heroBackground}
            inkColor="#CFC8BE"
            /* logo orange, ramped in above the wordmark only — the blend must
               stay clear of the logo or gold-on-gold erases it */
            inkColorTop="#FF9D56"
            topStart={0.70}
            topLift={0.55}
            paperColor="#151515"
            mode="mono"
            /* "shade" = continuous duotone, no dot screen. dotDensity/angle/
               dotSize are inert here but kept so switching back is one word. */
            shape="shade"
            dotDensity={190}
            angle={45}
            dotSize={0.9}
            contrast={1.2}
            revealRadius={0.55}
            /* wide ellipse instead of a circle, with a very soft boundary so
               the reveal reads as a drifting glow rather than a cut-out */
            revealAspect={2.4}
            edge={0.05}
            follow={0.5}
            /* the duotone already reads as a full photo, so this only controls
               how much true colour bleeds in before the cursor arrives */
            idleReveal={0.2}
            trigger="hover"
            borderRadius="0"
            /* full-bleed hero: allow vertical scrolling over the canvas,
               which the component's default `touch-action: none` would block */
            style={{ touchAction: "pan-y" }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#151515]/32 z-10 pointer-events-none" />
        {/* light scrim only: nav legibility comes from the links' own
            text-shadow, so this stays weak enough to keep the orange band */}
        <div className="absolute inset-x-0 top-0 h-20 z-10 pointer-events-none bg-gradient-to-b from-[#151515]/60 to-transparent" />
        {/* keeps the headline block legible without dimming the whole photo */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_85%_55%_at_50%_66%,rgba(21,21,21,0.93),transparent_70%)]" />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 w-full pointer-events-none"
        style={lite ? undefined : { opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Studio Logo — doubles as the page's only <h1> (its alt text is the heading) */}
          <h1 className="mb-6 sm:mb-8 flex justify-center">
            <img
              src={logo}
              alt="99 Roots Studio – Tattoo Studio in Berlin"
              className="w-[300px] sm:w-64 md:w-80 lg:w-96 xl:w-[500px] max-w-full h-auto"
            />
          </h1>

          {/* Subheading */}
          <p className="font-inter text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 tracking-wide px-4">
            Your body, our canvas.
          </p>

          {/* Location */}
          <p className="font-inter text-white/90 mb-8 sm:mb-12 text-sm sm:text-base px-4">
            Prenzlauer Allee 216, 10405 Berlin
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection("#appointment")}
              className="relative z-30 group flex items-center justify-center text-gold transition-all duration-300 p-4 min-h-[48px] touch-manipulation pointer-events-auto"
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