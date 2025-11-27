import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

interface ComingSoonProps {
  onBack: () => void;
}

export function ComingSoon({ onBack }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header with Back Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gold/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-inter text-sm sm:text-base uppercase tracking-wider">
              Back to Home
            </span>
          </button>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center items-center gap-4 mb-8 sm:mb-12"
          >
            <div className="h-px w-16 sm:w-24 bg-gold/40"></div>
            <div className="w-2 h-2 rotate-45 border border-gold/60"></div>
            <div className="h-px w-16 sm:w-24 bg-gold/40"></div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold mb-6 sm:mb-8"
          >
            Coming Soon
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-inter text-white/70 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 leading-relaxed px-4"
          >
            We're crafting something extraordinary. Our premium collection will be unveiled soon.
          </motion.p>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center items-center gap-3 sm:gap-4"
          >
            <div className="w-3 h-3 border border-gold/30 rotate-45"></div>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
            <div className="w-2 h-2 bg-gold/60 rounded-full"></div>
            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-gold/40 to-transparent"></div>
            <div className="w-3 h-3 border border-gold/30 rotate-45"></div>
          </motion.div>

          {/* Additional Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="font-inter text-white/50 text-xs sm:text-sm uppercase tracking-[0.2em] mt-12 sm:mt-16"
          >
            Stay Tuned
          </motion.p>
        </motion.div>
      </div>

      {/* Footer Decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="pb-8 sm:pb-12"
      >
        <div className="flex justify-center items-center gap-2">
          <div className="w-1 h-1 bg-gold/40 rounded-full"></div>
          <div className="w-1 h-1 bg-gold/40 rounded-full"></div>
          <div className="w-1 h-1 bg-gold/40 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
}
