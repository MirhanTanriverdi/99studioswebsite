import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookieConsent");
    if (!hasAccepted) {
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-[#151515] border border-[#C89D53]/20 rounded-lg shadow-2xl p-4 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
                {/* Content */}
                <div className="flex-1 md:pr-4">
                  <h3 className="text-[#C89D53] mb-1.5 md:mb-2 text-sm md:text-base">Cookie Notice</h3>
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed text-justify">
                    We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                    By clicking "Accept", you consent to our use of cookies in accordance with our privacy policy.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
                  <button
                    onClick={handleDecline}
                    className="px-4 md:px-6 py-2 md:py-3 text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded transition-all duration-300 text-xs md:text-sm whitespace-nowrap"
                  >
                    Decline
                  </button>
                  <button
                    onClick={handleAccept}
                    className="px-4 md:px-6 py-2 md:py-3 bg-[#C89D53] text-[#151515] hover:bg-[#C89D53]/90 rounded transition-all duration-300 text-xs md:text-sm whitespace-nowrap"
                  >
                    Accept Cookies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
