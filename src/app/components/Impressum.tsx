import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

// Legal details for the Impressum (§ 5 DDG).
const OWNER_NAME = 'Mike Luxen';
const STUDIO_NAME = '99 Roots Studio';
const STREET = 'Prenzlauer Allee 216';
const CITY = '10405 Berlin';
const COUNTRY = 'Deutschland';
const PHONE_DISPLAY = '+49 15560 859953';
const PHONE_LINK = 'tel:+4915560859953';
const EMAIL = 'info99roots@gmail.com';

interface ImpressumProps {
  onBack: () => void;
}

export function Impressum({ onBack }: ImpressumProps) {
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
          lang="de"
        >
          {/* Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-gold mb-4">Impressum</h1>
            <p className="text-white/60">Legal Notice</p>
          </div>

          <div className="space-y-8 text-white/80">
            <section>
              <h2 className="text-gold mb-4">Angaben gemäß § 5 DDG</h2>
              <div className="p-6 bg-[#151515] border border-gold/20 rounded-lg">
                <p className="text-white"><strong>{STUDIO_NAME}</strong></p>
                <p className="text-white/80">Inhaber: {OWNER_NAME}</p>
                <p className="text-white/80">{STREET}</p>
                <p className="text-white/80">{CITY}</p>
                <p className="text-white/80">{COUNTRY}</p>
              </div>
            </section>

            <section>
              <h2 className="text-gold mb-4">Kontakt</h2>
              <p className="leading-relaxed">
                Telefon:{' '}
                <a href={PHONE_LINK} className="hover:text-gold transition-colors">{PHONE_DISPLAY}</a>
                <br />
                E-Mail:{' '}
                <a href={`mailto:${EMAIL}`} className="hover:text-gold transition-colors">{EMAIL}</a>
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
              <p className="leading-relaxed">
                {OWNER_NAME}
                <br />
                {STREET}, {CITY}
              </p>
            </section>

            <section>
              <h2 className="text-gold mb-4">Verbraucherstreitbeilegung</h2>
              <p className="leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
