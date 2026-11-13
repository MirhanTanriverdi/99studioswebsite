import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { HOURS } from '../data/hours';

interface BookingPolicyProps {
  onBack: () => void;
}

export function BookingPolicy({ onBack }: BookingPolicyProps) {
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
            <h1 className="text-gold mb-4">Booking Policy</h1>
            <p className="text-white/60">Last updated: December 22, 2024</p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-white/80">
            <section>
              <h2 className="text-gold mb-4">1. Booking Process</h2>
              <p className="leading-relaxed mb-4">
                To book an appointment at 99 Roots Studio, you can:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Submit a booking request through our website</li>
                <li>Contact us directly via email or phone</li>
                <li>Visit our studio during business hours for a consultation</li>
              </ul>
              <p className="leading-relaxed mt-4">
                All appointments must be confirmed by our studio before they are considered finalized. You will receive a confirmation email or message with appointment details and payment instructions.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">2. Deposit Requirements</h2>
              <p className="leading-relaxed mb-4">
                A non-refundable deposit is required to secure your appointment:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Small tattoos (under 2 hours):</strong> €50 deposit</li>
                <li><strong>Medium tattoos (2-4 hours):</strong> €100 deposit</li>
                <li><strong>Large tattoos (4+ hours):</strong> €150-300 deposit depending on complexity</li>
                <li><strong>Full day sessions:</strong> €300-500 deposit</li>
              </ul>
              <p className="leading-relaxed mt-4">
                The deposit will be deducted from your final tattoo cost. Deposits are non-refundable but may be transferred to a new appointment date if you provide at least 72 hours notice (see Cancellation Policy below).
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">3. Payment Methods</h2>
              <p className="leading-relaxed mb-4">
                We accept the following payment methods:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cash (EUR)</li>
                <li>Bank transfer (for deposits)</li>
                <li>Credit/Debit cards (Visa, Mastercard, Amex)</li>
                <li>PayPal (for deposits only)</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Full payment is due on the day of your appointment. We do not offer payment plans or financing options at this time.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">4. Pricing</h2>
              <p className="leading-relaxed mb-4">
                Our pricing is based on several factors:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Size and complexity of the design</li>
                <li>Placement on the body</li>
                <li>Artist experience and demand</li>
                <li>Time required to complete the tattoo</li>
              </ul>
              <p className="leading-relaxed mt-4">
                We provide price estimates during consultations. Our standard hourly rate ranges from €120-180 per hour depending on the artist. Small tattoos may have a minimum charge of €80-120. Final pricing will be confirmed before your appointment.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">5. Cancellation and Rescheduling Policy</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white mb-2"><strong>Cancellations with 72+ hours notice:</strong></h3>
                  <p className="leading-relaxed ml-4">
                    Your deposit will be transferred to a new appointment date within 6 months. You may reschedule once without penalty.
                  </p>
                </div>
                <div>
                  <h3 className="text-white mb-2"><strong>Cancellations with 24-72 hours notice:</strong></h3>
                  <p className="leading-relaxed ml-4">
                    Your deposit is forfeited. To rebook, a new deposit is required.
                  </p>
                </div>
                <div>
                  <h3 className="text-white mb-2"><strong>Cancellations with less than 24 hours notice or no-shows:</strong></h3>
                  <p className="leading-relaxed ml-4">
                    Your deposit is forfeited, and you may be required to pay a 50% cancellation fee of the estimated tattoo cost. A new deposit and cancellation fee must be paid before rebooking.
                  </p>
                </div>
                <div>
                  <h3 className="text-white mb-2"><strong>Repeated cancellations:</strong></h3>
                  <p className="leading-relaxed ml-4">
                    After 2 cancellations, we reserve the right to require full prepayment for future appointments or decline to rebook.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-gold mb-4">6. Late Arrivals</h2>
              <p className="leading-relaxed">
                Please arrive on time for your appointment. If you are more than 15 minutes late, we reserve the right to cancel or shorten your appointment, and your deposit will be forfeited. We understand that delays happen—please contact us as soon as possible if you're running late, and we'll do our best to accommodate you.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">7. Consultation Appointments</h2>
              <p className="leading-relaxed">
                Initial consultations are free and typically last 15-30 minutes. During the consultation, we'll discuss your design ideas, placement, sizing, and provide a price estimate. If you'd like to proceed, we'll collect your deposit and schedule your tattoo appointment.
              </p>
              <p className="leading-relaxed mt-4">
                For complex custom designs requiring significant drawing time, we may charge a design fee (€50-150) which will be credited toward your final tattoo cost if you proceed with the appointment.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">8. Design Changes and Approval</h2>
              <p className="leading-relaxed">
                We typically send design drafts 3-7 days before your appointment. You have the opportunity to request minor revisions. Major design changes requested less than 48 hours before your appointment may result in rescheduling, and standard cancellation policies apply.
              </p>
              <p className="leading-relaxed mt-4">
                Final design approval occurs at the beginning of your appointment. Once the stencil is applied and you've given approval, we cannot offer refunds if you change your mind during the tattooing process.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">9. Multi-Session Tattoos</h2>
              <p className="leading-relaxed">
                For large tattoos requiring multiple sessions:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>A deposit is required for each session</li>
                <li>Sessions should be scheduled 4-8 weeks apart for optimal healing</li>
                <li>If you fail to schedule or attend a follow-up session within 6 months, your design may be released to other clients, and previous deposits are forfeited</li>
                <li>Pricing may be adjusted if significant time passes between sessions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-gold mb-4">10. Guest Policy</h2>
              <p className="leading-relaxed">
                You may bring one (1) guest to your appointment for support. Additional guests are not permitted due to space constraints and hygiene standards. Children under 16 are not allowed in the tattoo area for safety and legal reasons.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">11. Health and Preparation Requirements</h2>
              <p className="leading-relaxed mb-4">
                To ensure a successful appointment:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Eat a full meal 2-3 hours before your appointment</li>
                <li>Stay well-hydrated</li>
                <li>Avoid alcohol and drugs for 24 hours before your appointment</li>
                <li>Avoid blood-thinning medications (aspirin, ibuprofen) for 24 hours before (consult your doctor first)</li>
                <li>Get a good night's sleep</li>
                <li>Wear comfortable clothing that provides easy access to the tattoo area</li>
                <li>Arrive with clean skin (showered that day)</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Failure to meet these requirements may result in appointment cancellation with deposit forfeiture.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">12. Refund Policy</h2>
              <p className="leading-relaxed">
                All deposits and payments are non-refundable. In the rare event that we need to cancel your appointment due to artist illness or emergency, your deposit will be fully refunded or transferred to a new date at your preference.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">13. Studio Closure and Force Majeure</h2>
              <p className="leading-relaxed">
                In the event of unforeseen circumstances beyond our control (including but not limited to natural disasters, pandemics, government orders, or emergencies), we reserve the right to cancel or reschedule appointments. In such cases, deposits will be transferred to new appointment dates or refunded at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">14. Changes to Booking Policy</h2>
              <p className="leading-relaxed">
                We reserve the right to modify this booking policy at any time. Changes will be posted on our website with an updated date. Appointments booked before policy changes will honor the terms in effect at the time of booking.
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">15. Questions and Contact</h2>
              <p className="leading-relaxed">
                If you have any questions about our booking policy, please don't hesitate to contact us:
              </p>
              <div className="mt-4 p-6 bg-[#151515] border border-gold/20 rounded-lg">
                <p className="text-white"><strong>99 Roots Studio</strong></p>
                <p className="text-white/80">Owner: Mike Luxen</p>
                <p className="text-white/80">Prenzlauer Allee 216</p>
                <p className="text-white/80">10405 Berlin, Germany</p>
                <p className="text-white/80 mt-2">Email: info99roots@gmail.com</p>
                <p className="text-white/80">Phone: +49 15560 859953</p>
                <p className="text-white/80 mt-4 text-sm">
                  <strong>Studio Hours:</strong><br />
                  {HOURS.map((h) => (
                    <span key={h.en} className="block">{h.en}: {h.time.en}</span>
                  ))}
                </p>
              </div>
            </section>

            <div className="mt-12 p-6 bg-gold/10 border border-gold/30 rounded-lg">
              <p className="text-white/90 leading-relaxed">
                <strong className="text-gold">Please Note:</strong> By booking an appointment with 99 Roots Studio, you acknowledge that you have read, understood, and agree to comply with this Booking Policy, as well as our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
