import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
            <h1 className="text-gold mb-4">Privacy Policy</h1>
            <p className="text-white/60">Last updated: December 22, 2024</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-white/80">
            <section>
              <h2 className="text-gold mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                At 99 Roots Studio ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our studio or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">2. Information We Collect</h2>
              <p className="leading-relaxed mb-4">
                We collect and process the following types of personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contact information (name, email address, phone number)</li>
                <li>Appointment details and preferences</li>
                <li>Tattoo design specifications and placement information</li>
                <li>Photos of completed tattoos (with your explicit consent)</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Communication history with our studio</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gold mb-4">3. How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">
                We use your personal information for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Processing and managing your tattoo appointments</li>
                <li>Communicating with you about your bookings and services</li>
                <li>Providing aftercare instructions and support</li>
                <li>Marketing our services (with your consent)</li>
                <li>Improving our services and customer experience</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gold mb-4">4. Data Storage and Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. Your data is stored securely on encrypted servers and is only accessible to authorized personnel.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">5. Data Sharing</h2>
              <p className="leading-relaxed mb-4">
                We do not sell or rent your personal information to third parties. We may share your data with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Service providers who assist us in operating our business (e.g., payment processors, booking systems)</li>
                <li>Legal authorities when required by law or to protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gold mb-4">6. Your Rights (GDPR)</h2>
              <p className="leading-relaxed mb-4">
                Under the General Data Protection Regulation (GDPR), you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Rectify inaccurate or incomplete data</li>
                <li>Request deletion of your data ("right to be forgotten")</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with a supervisory authority</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gold mb-4">7. Cookies and Tracking</h2>
              <p className="leading-relaxed">
                Our website uses cookies to enhance your browsing experience. You can manage your cookie preferences through our cookie consent banner. For more information, please see our Cookie Policy.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">8. Photography and Social Media</h2>
              <p className="leading-relaxed">
                We may photograph completed tattoos for promotional purposes. We will always ask for your explicit written consent before taking photos or posting them on our social media channels. You have the right to withdraw consent at any time.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">9. Data Retention</h2>
              <p className="leading-relaxed">
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Appointment records are typically retained for 10 years for health and safety purposes.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">10. Changes to This Policy</h2>
              <p className="leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">11. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this privacy policy or wish to exercise your rights, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-[#151515] border border-gold/20 rounded-lg">
                <p className="text-white"><strong>99 Roots Studio</strong></p>
                <p className="text-white/80">Prenzlauer Allee 216</p>
                <p className="text-white/80">10405 Berlin, Germany</p>
                <p className="text-white/80 mt-2">Email: privacy@99rootsstudio.com</p>
                <p className="text-white/80">Phone: +49 (0) 30 1234 5678</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
