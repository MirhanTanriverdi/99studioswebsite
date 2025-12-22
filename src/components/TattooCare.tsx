import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

export function TattooCare() {
  const sectionRef = useRef(null);
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  return (
    <section ref={sectionRef} id="care" className="bg-[#151515] sm:py-20 lg:py-28 p-[0px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
          style={{ y: useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]) }}
        >
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl text-gold mb-4 font-[Bebas_Neue]">
            FAQ
          </h2>
          <p className="font-inter text-white/70 text-sm sm:text-base lg:text-lg px-4">
            Everything you need to know about preparing for your session and aftercare.
          </p>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 sm:mt-16"
          style={{ y }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              <div className="p-4 sm:p-6">
                <h3 className="font-inter text-white mb-2 sm:mb-3 text-sm sm:text-base">
                  How much does a tattoo cost?
                </h3>
                <p className="font-inter text-white/70 text-xs sm:text-sm leading-relaxed text-justify">
                  Pricing varies based on size, complexity, and artist. Our hourly rate ranges from 
                  €120-200. Small pieces start at €100. We provide detailed quotes during consultations.
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="font-inter text-white mb-2 sm:mb-3 text-sm sm:text-base">
                  How do I book an appointment?
                </h3>
                <p className="font-inter text-white/70 text-xs sm:text-sm leading-relaxed text-justify">
                  Click the "Request Appointment" button to access our external booking platform. 
                  You'll need to provide details about your desired tattoo, preferred artist, and 
                  availability. We typically respond within 24-48 hours.
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="font-inter text-white mb-2 sm:mb-3 text-sm sm:text-base">
                  Do you require a deposit?
                </h3>
                <p className="font-inter text-white/70 text-xs sm:text-sm leading-relaxed text-justify">
                  Yes, we require a €50-100 deposit to secure your appointment. This is deducted from 
                  your final payment. Deposits are non-refundable but can be transferred to a 
                  rescheduled appointment with 48 hours notice.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              <div className="p-4 sm:p-6">
                <h3 className="font-inter text-white mb-2 sm:mb-3 text-sm sm:text-base">
                  Can I bring my own design?
                </h3>
                <p className="font-inter text-white/70 text-xs sm:text-sm leading-relaxed text-justify">
                  Absolutely! We welcome reference images and custom designs. Our artists will work 
                  with you to refine your idea and ensure it translates well as a tattoo. We also 
                  offer full custom design services.
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="font-inter text-white mb-2 sm:mb-3 text-sm sm:text-base">
                  What is your cancellation policy?
                </h3>
                <p className="font-inter text-white/70 text-xs sm:text-sm leading-relaxed text-justify">
                  We require at least 48 hours notice for cancellations. Late cancellations or 
                  no-shows will forfeit the deposit. We understand emergencies happen - please 
                  contact us to discuss your situation.
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="font-inter text-white mb-2 sm:mb-3 text-sm sm:text-base">
                  Do you do cover-ups or touch-ups?
                </h3>
                <p className="font-inter text-white/70 text-xs sm:text-sm leading-relaxed text-justify">
                  Yes, we specialize in cover-ups and offer free touch-ups within the first year for 
                  tattoos done at our studio. Bring photos of your existing tattoo for consultation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}