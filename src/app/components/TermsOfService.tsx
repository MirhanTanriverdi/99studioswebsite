import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#151515]/95 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors duration-300 touch-manipulation cursor-pointer"
          >
            <ArrowLeft size={20} />
            <span className="text-sm uppercase tracking-wider">Back to Home</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pt-24 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-gold mb-4">Terms of Service</h1>
            <p className="text-white/60">Last updated: December 22, 2024</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-white/80">
            <section>
              <h2 className="text-gold mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By booking an appointment or receiving services from 99 Roots Studio, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">2. Services Provided</h2>
              <p className="leading-relaxed mb-4">
                99 Roots Studio provides professional tattoo and body art services, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Custom tattoo design and application</li>
                <li>Fine-line and realism tattoos</li>
                <li>Cover-up tattoos</li>
                <li>Consultations and design services</li>
                <li>Aftercare guidance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gold mb-4">3. Age Requirements</h2>
              <p className="leading-relaxed">
                All clients must be at least 18 years of age to receive tattoo services. Valid government-issued photo identification is required. We reserve the right to refuse service to anyone who cannot provide proper identification.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">4. Health and Safety</h2>
              <p className="leading-relaxed mb-4">
                For your safety and ours, clients must:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Disclose any medical conditions, allergies, or medications that may affect the tattooing process</li>
                <li>Not be under the influence of alcohol or drugs</li>
                <li>Not be pregnant or breastfeeding (certain procedures may be restricted)</li>
                <li>Inform us of any skin conditions or infections</li>
                <li>Follow all pre-appointment instructions provided by the artist</li>
              </ul>
              <p className="leading-relaxed mt-4">
                We reserve the right to refuse service if we believe it would be unsafe to proceed.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">5. Design and Artistic Expression</h2>
              <p className="leading-relaxed">
                While we strive to create tattoos that match your vision, tattoo art involves artistic interpretation. Final design approval is given before the tattoo begins, and significant changes during the session may incur additional charges. We reserve the right to refuse designs that we deem inappropriate, offensive, or beyond our artistic capabilities.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">6. Liability and Acknowledgment of Risk</h2>
              <p className="leading-relaxed mb-4">
                Tattooing involves certain risks, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Allergic reactions to ink or aftercare products</li>
                <li>Infection (if aftercare instructions are not followed)</li>
                <li>Scarring or keloid formation</li>
                <li>Color migration or fading over time</li>
              </ul>
              <p className="leading-relaxed mt-4">
                By receiving our services, you acknowledge these risks and agree that 99 Roots Studio and its artists are not liable for complications arising from failure to follow aftercare instructions or pre-existing medical conditions not disclosed to us.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">7. Aftercare Responsibility</h2>
              <p className="leading-relaxed">
                Proper aftercare is essential for optimal healing. We provide detailed aftercare instructions, and it is your responsibility to follow them. We are not responsible for infections, scarring, or other complications resulting from improper aftercare.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">8. Touch-Ups and Warranty</h2>
              <p className="leading-relaxed">
                We offer one complimentary touch-up session within 3 months of your original tattoo appointment, provided you have followed proper aftercare instructions. Touch-ups required due to client negligence, weight fluctuations, or natural aging are not covered and will incur standard rates.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">9. Photography and Marketing</h2>
              <p className="leading-relaxed">
                We may request to photograph your completed tattoo for portfolio and marketing purposes. Your explicit consent will always be obtained before taking photos or posting them publicly. You may withdraw consent at any time by contacting us in writing.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">10. Intellectual Property</h2>
              <p className="leading-relaxed">
                Custom designs created by our artists remain the intellectual property of 99 Roots Studio. Clients receive a license to wear the tattoo but do not own the rights to reproduce the design for commercial purposes without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">11. Studio Conduct</h2>
              <p className="leading-relaxed mb-4">
                We maintain a professional, respectful environment. Clients are expected to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Treat artists and staff with respect</li>
                <li>Arrive on time for appointments</li>
                <li>Limit the number of guests (typically 1 person maximum)</li>
                <li>Refrain from disruptive behavior</li>
              </ul>
              <p className="leading-relaxed mt-4">
                We reserve the right to terminate service and ban clients who violate these guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">12. Limitation of Liability</h2>
              <p className="leading-relaxed">
                To the fullest extent permitted by law, 99 Roots Studio shall not be liable for any indirect, incidental, special, or consequential damages arising from our services. Our total liability shall not exceed the amount paid for the service in question.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">13. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms of Service are governed by the laws of Germany. Any disputes shall be resolved in the courts of Berlin.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">14. Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be posted on our website with an updated "Last updated" date. Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">15. Contact Information</h2>
              <p className="leading-relaxed">
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-[#151515] border border-gold/20 rounded-lg">
                <p className="text-white"><strong>99 Roots Studio</strong></p>
                <p className="text-white/80">Owner: Mike Luxen</p>
                <p className="text-white/80">Prenzlauer Allee 216</p>
                <p className="text-white/80">10405 Berlin, Germany</p>
                <p className="text-white/80 mt-2">Email: info99roots@gmail.com</p>
                <p className="text-white/80">Phone: +49 15560 859953</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
