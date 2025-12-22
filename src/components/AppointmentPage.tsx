import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, ArrowRight, Instagram, Mail, MessageCircle, FileText, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AppointmentPageProps {
  onBack: () => void;
}

export function AppointmentPage({ onBack }: AppointmentPageProps) {
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState<'en' | 'de'>('en');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isActuallySubmitting, setIsActuallySubmitting] = useState(false);
  const [shouldValidate, setShouldValidate] = useState(false);
  const [formData, setFormData] = useState({
    placement: '',
    size: '',
    description: '',
    timeframe: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: '',
    district: '',
  });

  const totalSteps = 5;

  // Translations
  const translations = {
    en: {
      // Language selection
      selectLanguage: 'Select Language',
      selectLanguageDesc: 'Choose your preferred language for the form',
      // Step titles
      placement: 'Placement',
      size: 'Size',
      describe: 'Describe Your Tattoo',
      urgency: 'When Do You Need It?',
      contact: 'Your Contact Information',
      // Placement
      placementQuestion: 'Where do you want your tattoo? *',
      placementPlaceholder: 'e.g., forearm, shoulder, back, neck',
      // Size
      approximateSize: 'Approximate Size *',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      extraLarge: 'Extra Large',
      notSure: 'Not Sure',
      notSureDesc: "We'll help you decide",
      // Description
      designDescription: 'Design Description (Optional)',
      descriptionPlaceholder: 'Describe your tattoo idea, including any specific details, themes...',
      descriptionHelp: 'Tell us about your vision, style preferences, color choices.',
      // Urgency
      timeframe: 'Timeframe *',
      asap: 'ASAP',
      asapDesc: 'within 1-2 weeks',
      flexible: 'Flexible',
      flexibleDesc: 'within a month',
      veryFlexible: 'Very Flexible',
      veryFlexibleDesc: '1-3 months',
      justPlanning: 'Just Planning',
      justPlanningDesc: '3+ months',
      // Contact
      firstName: 'First Name *',
      lastName: 'Last Name *',
      phoneNumber: 'Phone Number *',
      phonePlaceholder: '+49 123 456 7890',
      emailAddress: 'Email Address *',
      emailPlaceholder: 'your@email.com',
      city: 'City *',
      cityPlaceholder: 'e.g., Berlin',
      district: 'District *',
      districtPlaceholder: 'e.g., Prenzlauer Berg',
      // Buttons
      back: 'Back',
      next: 'Next',
      submitRequest: 'Submit Request',
      submitting: 'Submitting...',
      backToHome: 'Back to Home',
      backToOptions: 'Back to Contact Options',
      // Messages
      formDisclaimer: "By submitting this form, you agree to our terms and conditions. We'll contact you within 24-48 hours to confirm your appointment.",
      stepOf: 'of',
      step: 'Step',
      // Toast messages
      fillRequired: 'Please fill in all required fields',
      fillPlacement: 'Please fill in the placement field',
      selectSize: 'Please select a size',
      selectUrgency: 'Please select when you need the tattoo',
      successMessage: "Appointment request submitted! We'll contact you within 24-48 hours.",
      errorMessage: 'Failed to submit appointment request. Please try again or contact us directly.',
      // Success/Error screens
      successTitle: 'Request Submitted Successfully!',
      successSubtitle: 'Thank you for your appointment request',
      successBody: "We've received your tattoo appointment request and will review the details carefully. Our team will contact you within 24-48 hours to discuss your design and schedule your session.",
      successCheckEmail: 'Please check your email for confirmation.',
      errorTitle: 'Submission Failed',
      errorSubtitle: 'We couldn\'t process your request',
      errorBody: 'Unfortunately, we encountered an error while submitting your appointment request. Please try again or contact us directly through Instagram, WhatsApp, or Email.',
      tryAgain: 'Try Again',
      contactUs: 'Contact Us Directly',
    },
    de: {
      // Language selection
      selectLanguage: 'Sprache wählen',
      selectLanguageDesc: 'Wählen Sie Ihre bevorzugte Sprache für das Formular',
      // Step titles
      placement: 'Platzierung',
      size: 'Größe',
      describe: 'Beschreiben Sie Ihr Tattoo',
      urgency: 'Wann benötigen Sie es?',
      contact: 'Ihre Kontaktinformationen',
      // Placement
      placementQuestion: 'Wo möchten Sie Ihr Tattoo? *',
      placementPlaceholder: 'z.B. Unterarm, Schulter, Rücken, Nacken',
      // Size
      approximateSize: 'Ungefähre Größe *',
      small: 'Klein',
      medium: 'Mittel',
      large: 'Groß',
      extraLarge: 'Extra Groß',
      notSure: 'Nicht sicher',
      notSureDesc: 'Wir helfen Ihnen bei der Entscheidung',
      // Description
      designDescription: 'Design-Beschreibung (Optional)',
      descriptionPlaceholder: 'Beschreiben Sie Ihre Tattoo-Idee, einschließlich spezifischer Details, Themen oder Referenzbilder...',
      descriptionHelp: 'Erzählen Sie uns von Ihrer Vision, Stilpräferenzen, Farbauswahl oder Referenzbildern.',
      // Urgency
      timeframe: 'Zeitrahmen *',
      asap: 'So bald wie möglich',
      asapDesc: 'innerhalb 1-2 Wochen',
      flexible: 'Flexibel',
      flexibleDesc: 'innerhalb eines Monats',
      veryFlexible: 'Sehr flexibel',
      veryFlexibleDesc: '1-3 Monate',
      justPlanning: 'Nur Planung',
      justPlanningDesc: '3+ Monate',
      // Contact
      firstName: 'Vorname *',
      lastName: 'Nachname *',
      phoneNumber: 'Telefonnummer *',
      phonePlaceholder: '+49 123 456 7890',
      emailAddress: 'E-Mail-Adresse *',
      emailPlaceholder: 'ihre@email.de',
      city: 'Stadt *',
      cityPlaceholder: 'z.B. Berlin',
      district: 'Bezirk *',
      districtPlaceholder: 'z.B. Prenzlauer Berg',
      // Buttons
      back: 'Zurück',
      next: 'Weiter',
      submitRequest: 'Anfrage absenden',
      submitting: 'Wird gesendet...',
      backToHome: 'Zurück zur Startseite',
      backToOptions: 'Zurück zu Kontaktoptionen',
      // Messages
      formDisclaimer: 'Mit dem Absenden dieses Formulars stimmen Sie unseren Geschäftsbedingungen zu. Wir werden Sie innerhalb von 24-48 Stunden kontaktieren, um Ihren Termin zu bestätigen.',
      stepOf: 'von',
      step: 'Schritt',
      // Toast messages
      fillRequired: 'Bitte füllen Sie alle Pflichtfelder aus',
      fillPlacement: 'Bitte füllen Sie das Platzierungsfeld aus',
      selectSize: 'Bitte wählen Sie eine Größe',
      selectUrgency: 'Bitte wählen Sie aus, wann Sie das Tattoo benötigen',
      successMessage: 'Terminanfrage gesendet! Wir werden Sie innerhalb von 24-48 Stunden kontaktieren.',
      errorMessage: 'Terminanfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.',
      // Success/Error screens
      successTitle: 'Anfrage erfolgreich gesendet!',
      successSubtitle: 'Vielen Dank für Ihre Terminanfrage',
      successBody: 'Wir haben Ihre Tattoo-Terminanfrage erhalten und werden die Details sorgfältig prüfen. Unser Team wird Sie innerhalb von 24-48 Stunden kontaktieren, um Ihr Design zu besprechen und Ihre Sitzung zu planen.',
      successCheckEmail: 'Bitte überprüfen Sie Ihre E-Mail zur Bestätigung.',
      errorTitle: 'Übermittlung fehlgeschlagen',
      errorSubtitle: 'Wir konnten Ihre Anfrage nicht verarbeiten',
      errorBody: 'Leider ist ein Fehler beim Absenden Ihrer Terminanfrage aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt über Instagram, WhatsApp oder E-Mail.',
      tryAgain: 'Erneut versuchen',
      contactUs: 'Direkt kontaktieren',
    },
  };

  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Don't process form submission if not on the last step
    if (currentStep !== totalSteps - 1) {
      // Just move to next step, don't validate yet
      return;
    }
    
    // Only validate if we explicitly clicked the submit button
    if (!shouldValidate) {
      return;
    }
    
    // Reset the flag
    setShouldValidate(false);
    
    // Only validate when actually submitting from step 5
    // Validate required fields only on final submission
    const isBerlin = formData.city.toLowerCase().includes('berlin');
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.placement || !formData.size || !formData.timeframe || !formData.city || (isBerlin && !formData.district)) {
      toast.error(t.fillRequired);
      return;
    }

    setIsSubmitting(true);
    setIsActuallySubmitting(true);

    try {
      // Call the backend API
      const apiUrl = `https://${projectId}.supabase.co/functions/v1/make-server-3a4192f3/appointments`;
      
      console.log('Submitting appointment request to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          district: formData.district || null,
          placement: formData.placement,
          size: formData.size,
          description: formData.description || null,
          timeframe: formData.timeframe,
          language: language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Server error:', data);
        throw new Error(data.details || 'Failed to submit appointment request');
      }

      console.log('Appointment submitted successfully:', data);
      
      // Show success message
      toast.success(t.successMessage);
      setSubmissionStatus('success');
      
      // Reset form
      setFormData({
        placement: '',
        size: '',
        description: '',
        timeframe: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        district: '',
      });
      setCurrentStep(0);
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(t.errorMessage);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
      setIsActuallySubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    // Validate current step before moving forward
    if (currentStep === 0) {
      if (!formData.placement) {
        toast.error(t.fillPlacement);
        return;
      }
    }
    if (currentStep === 1) {
      if (!formData.size) {
        toast.error(t.selectSize);
        return;
      }
    }
    // Step 2 (description) is optional - no validation needed
    if (currentStep === 3) {
      // Step 3 (timeframe) is now MANDATORY
      if (!formData.timeframe) {
        toast.error(t.selectUrgency);
        return;
      }
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Header */}
      <header className="border-b border-gold/20 bg-[#151515] sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-gold hover:text-gold/80 hover:bg-gold/10"
            >
              <ArrowLeft className="sm:mr-2" size={20} />
              <span className="hidden sm:inline">{t.backToHome}</span>
            </Button>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm transition-all duration-300 ${
                  language === 'en'
                    ? 'text-black bg-gold'
                    : 'text-gold border border-gold/30 hover:border-gold/50 hover:bg-gold/10'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('de')}
                className={`px-3 py-1.5 text-sm transition-all duration-300 ${
                  language === 'de'
                    ? 'text-black bg-gold'
                    : 'text-gold border border-gold/30 hover:border-gold/50 hover:bg-gold/10'
                }`}
              >
                DE
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Form Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {(!showForm || currentStep === 0) && (
              <>
                <h1 className="font-[Bebas_Neue] text-4xl lg:text-5xl text-gold mb-4 text-center">
                  Request an Appointment
                </h1>
                <p className="font-inter text-white/70 text-center mb-12">
                  Choose how you'd like to get in touch with us
                </p>
              </>
            )}

            {submissionStatus === 'success' ? (
              /* Success Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="bg-gradient-to-br from-[#1a1a1a] to-[#151515] border-2 border-gold/40 p-8 sm:p-12 relative overflow-hidden">
                  {/* Decorative corners */}
                  <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-gold/30"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-gold/30"></div>

                  {/* Success Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="mx-auto w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mb-6"
                  >
                    <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>

                  <h2 className="font-[Bebas_Neue] text-3xl sm:text-4xl text-gold mb-2">{t.successTitle}</h2>
                  <p className="text-gold/70 mb-6">{t.successSubtitle}</p>
                  
                  <p className="text-white/80 mb-4 leading-relaxed">
                    {t.successBody}
                  </p>
                  
                  <p className="text-white/60 text-sm mb-8">
                    {t.successCheckEmail}
                  </p>

                  <Button
                    onClick={() => {
                      setSubmissionStatus('idle');
                      setShowForm(false);
                      setCurrentStep(0);
                      setLanguage('en');
                    }}
                    className="bg-gold text-black hover:bg-gold/90 px-8 py-6 transition-all duration-300"
                  >
                    {t.backToHome}
                  </Button>
                </div>
              </motion.div>
            ) : submissionStatus === 'error' ? (
              /* Error Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="bg-gradient-to-br from-[#1a1a1a] to-[#151515] border-2 border-red-500/40 p-8 sm:p-12 relative overflow-hidden">
                  {/* Decorative corners */}
                  <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-red-500/30"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-red-500/30"></div>

                  {/* Error Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="mx-auto w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-6"
                  >
                    <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.div>

                  <h2 className="font-[Bebas_Neue] text-3xl sm:text-4xl text-red-500 mb-2">{t.errorTitle}</h2>
                  <p className="text-red-500/70 mb-6">{t.errorSubtitle}</p>
                  
                  <p className="text-white/80 mb-8 leading-relaxed">
                    {t.errorBody}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => {
                        setSubmissionStatus('idle');
                      }}
                      variant="outline"
                      className="bg-[#151515] border-2 border-gold text-gold hover:bg-gold hover:text-black px-8 py-6 transition-all duration-300"
                    >
                      {t.tryAgain}
                    </Button>
                    <Button
                      onClick={() => {
                        setSubmissionStatus('idle');
                        setShowForm(false);
                        setCurrentStep(0);
                      }}
                      className="bg-gold text-black hover:bg-gold/90 px-8 py-6 transition-all duration-300"
                    >
                      {t.contactUs}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : !showForm ? (
              /* Contact Options */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {/* Instagram */}
                <motion.a
                  href="https://instagram.com/99rootsstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden border-2 border-[#151515] p-10 md:hover:border-gold bg-gradient-to-br from-[#1a1a1a] to-[#151515] md:hover:from-gold/10 md:hover:to-gold/5 shadow-lg md:hover:shadow-gold/20 md:hover:shadow-2xl cursor-pointer"
                >
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  
                  <div className="flex flex-col items-center text-center space-y-5 relative z-10">
                    <motion.div 
                      className="relative"
                      whileHover={{ rotate: 6 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gold/20 blur-xl md:group-hover:bg-gold/30 transition-all duration-300"></div>
                      <Instagram className="w-16 h-16 text-gold relative" />
                    </motion.div>
                    <h3 className="font-[Bebas_Neue] text-2xl text-white md:group-hover:text-gold transition-colors duration-300">Instagram</h3>
                    <p className="font-inter text-white/70 text-sm leading-relaxed">
                      DM us on Instagram for quick responses
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-gold/60 md:group-hover:text-gold text-xs uppercase tracking-wider">
                      <span className="text-[#FF9D56]">Connect Now</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >→</motion.span>
                    </div>
                  </div>
                </motion.a>

                {/* Email */}
                <motion.a
                  href="mailto:info@99rootsstudio.com"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="group relative overflow-hidden border-2 border-[#151515] p-10 md:hover:border-gold bg-gradient-to-br from-[#1a1a1a] to-[#151515] md:hover:from-gold/10 md:hover:to-gold/5 shadow-lg md:hover:shadow-gold/20 md:hover:shadow-2xl cursor-pointer"
                >
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  
                  <div className="flex flex-col items-center text-center space-y-5 relative z-10">
                    <motion.div 
                      className="relative"
                      whileHover={{ rotate: 6 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gold/20 blur-xl md:group-hover:bg-gold/30 transition-all duration-300"></div>
                      <Mail className="w-16 h-16 text-gold relative" />
                    </motion.div>
                    <h3 className="font-[Bebas_Neue] text-2xl text-white md:group-hover:text-gold transition-colors duration-300">Email</h3>
                    <p className="font-inter text-white/70 text-sm leading-relaxed">
                      Send us a detailed email inquiry
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-gold/60 md:group-hover:text-gold text-xs uppercase tracking-wider">
                      <span className="text-[#FF9D56]">Send Email</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >→</motion.span>
                    </div>
                  </div>
                </motion.a>

                {/* WhatsApp */}
                <motion.a
                  href="https://wa.me/491234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="group relative overflow-hidden border-2 border-[#151515] p-10 md:hover:border-gold bg-gradient-to-br from-[#1a1a1a] to-[#151515] md:hover:from-gold/10 md:hover:to-gold/5 shadow-lg md:hover:shadow-gold/20 md:hover:shadow-2xl cursor-pointer"
                >
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  
                  <div className="flex flex-col items-center text-center space-y-5 relative z-10">
                    <motion.div 
                      className="relative"
                      whileHover={{ rotate: 6 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gold/20 blur-xl md:group-hover:bg-gold/30 transition-all duration-300"></div>
                      <MessageCircle className="w-16 h-16 text-gold relative" />
                    </motion.div>
                    <h3 className="font-[Bebas_Neue] text-2xl text-white md:group-hover:text-gold transition-colors duration-300">WhatsApp</h3>
                    <p className="font-inter text-white/70 text-sm leading-relaxed">
                      Chat with us directly on WhatsApp
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-gold/60 md:group-hover:text-gold text-xs uppercase tracking-wider">
                      <span className="text-[#FF9D56]">Start Chat</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >→</motion.span>
                    </div>
                  </div>
                </motion.a>

                {/* Form */}
                <motion.button
                  onClick={() => {
                    setShowForm(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="group relative overflow-hidden border-2 border-[#151515] p-10 md:hover:border-gold bg-gradient-to-br from-[#1a1a1a] to-[#151515] md:hover:from-gold/10 md:hover:to-gold/5 shadow-lg md:hover:shadow-gold/20 md:hover:shadow-2xl cursor-pointer"
                >
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  
                  <div className="flex flex-col items-center text-center space-y-5 relative z-10">
                    <motion.div 
                      className="relative"
                      whileHover={{ rotate: 6 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gold/20 blur-xl md:group-hover:bg-gold/30 transition-all duration-300"></div>
                      <FileText className="w-16 h-16 text-gold relative" />
                    </motion.div>
                    <h3 className="font-[Bebas_Neue] text-2xl text-white md:group-hover:text-gold transition-colors duration-300">Form</h3>
                    <p className="font-inter text-white/70 text-sm leading-relaxed">
                      Fill out our detailed appointment form
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-gold/60 md:group-hover:text-gold text-xs uppercase tracking-wider">
                      <span className="text-[#FF9D56]">Open Form</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >→</motion.span>
                    </div>
                  </div>
                </motion.button>
              </div>
            ) : (
              /* Multi-Step Appointment Form */
              <div>

                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-between max-w-sm sm:max-w-2xl mx-auto mb-4 px-4 sm:px-0">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div key={step} className="flex items-center flex-1">
                        <motion.div 
                          animate={currentStep + 1 === step ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 0.3 }}
                          className={`flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 text-xs sm:text-base ${
                          currentStep + 1 === step 
                            ? 'border-gold bg-gold text-black shadow-lg shadow-gold/50' 
                            : currentStep + 1 > step 
                            ? 'border-gold bg-gold/20 text-gold' 
                            : 'border-gold/30 text-gold/30'
                        }`}>
                          {currentStep + 1 > step ? (
                            <Check className="w-3 h-3 sm:w-5 sm:h-5" />
                          ) : (
                            step
                          )}
                        </motion.div>
                        {step < 5 && (
                          <motion.div 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: currentStep + 1 > step ? 1 : 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ originX: 0 }}
                            className={`flex-1 h-0.5 mx-1 sm:mx-2 ${
                            currentStep + 1 > step ? 'bg-gold' : 'bg-gold/30'
                          }`}></motion.div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 text-sm">
                      {t.step} {currentStep + 1} {t.stepOf} {totalSteps}
                    </p>
                  </div>
                </div>

                <form 
                  onSubmit={handleSubmit} 
                  noValidate 
                  onKeyDown={(e) => {
                    // Prevent Enter key from submitting the form unless we're on the last step
                    if (e.key === 'Enter' && currentStep !== totalSteps - 1) {
                      e.preventDefault();
                      handleNextStep();
                    }
                  }}
                  className="space-y-6 sm:space-y-8"
                >
                  <AnimatePresence mode="wait">
                    {/* Step 1: Placement */}
                    {currentStep === 0 && (
                      <motion.div
                        key="step-0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 sm:p-6"
                      >
                        <h2 className="font-[Bebas_Neue] text-2xl sm:text-3xl text-gold mb-6">{t.placement}</h2>
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="placement" className="text-white/90 text-base mb-2 block">
                              {t.placementQuestion}
                            </Label>
                            <Input
                              id="placement"
                              value={formData.placement}
                              onChange={(e) => handleChange('placement', e.target.value)}
                              placeholder={t.placementPlaceholder}
                              className="bg-[#151515] border-gold/30 text-white focus:border-gold transition-all duration-300 focus:shadow-lg focus:shadow-gold/20"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Size */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 sm:p-6"
                      >
                        <h2 className="font-[Bebas_Neue] text-2xl sm:text-3xl text-gold mb-6">{t.size}</h2>
                        <div className="space-y-6">
                          <div>
                            <Label className="text-white/90 text-base mb-4 block">
                              {t.approximateSize}
                            </Label>
                            <div className="space-y-3">
                              {[
                                { value: 'small', label: t.small, desc: '5-10 cm' },
                                { value: 'medium', label: t.medium, desc: '10-15 cm' },
                                { value: 'large', label: t.large, desc: '15-25 cm' },
                                { value: 'xl', label: t.extraLarge, desc: '25+ cm' },
                                { value: 'not-sure', label: t.notSure, desc: t.notSureDesc },
                              ].map((option) => (
                                <motion.button
                                  key={option.value}
                                  type="button"
                                  onClick={() => handleChange('size', option.value)}
                                  whileHover={{ x: 4 }}
                                  whileTap={{ scale: 0.98 }}
                                  transition={{ duration: 0.2 }}
                                  className={`w-full text-left px-4 py-4 border-l-2 transition-all duration-300 ${
                                    formData.size === option.value
                                      ? 'border-gold bg-gold/10 shadow-lg shadow-gold/10'
                                      : 'border-gold/30 md:hover:border-gold/50 md:hover:bg-gold/5'
                                  }`}
                                >
                                  <div className="flex items-center gap-4">
                                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all duration-300 ${
                                      formData.size === option.value
                                        ? 'border-gold bg-gold'
                                        : 'border-gold/30'
                                    }`}>
                                      <AnimatePresence>
                                        {formData.size === option.value && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="w-full h-full flex items-center justify-center"
                                          >
                                            <Check className="w-3 h-3 text-black" />
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                    <div>
                                      <h3 className="text-gold">{option.label}</h3>
                                      <p className="text-white/70 text-sm">{option.desc}</p>
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Describe Tattoo */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 sm:p-6"
                      >
                        <h2 className="font-[Bebas_Neue] text-2xl sm:text-3xl text-gold mb-6">{t.describe}</h2>
                        <div className="space-y-6">
                          <div>
                            <Label htmlFor="description" className="text-white/90 text-base mb-2 block">
                              {t.designDescription}
                            </Label>
                            <Textarea
                              id="description"
                              value={formData.description}
                              onChange={(e) => handleChange('description', e.target.value)}
                              placeholder={t.descriptionPlaceholder}
                              className="bg-[#151515] border-gold/30 text-white focus:border-gold min-h-40 transition-all duration-300 focus:shadow-lg focus:shadow-gold/20"
                            />
                            <p className="text-white/50 text-xs mt-2">
                              {t.descriptionHelp}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Urgency */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 sm:p-6"
                      >
                        <h2 className="font-[Bebas_Neue] text-2xl sm:text-3xl text-gold mb-6">{t.urgency}</h2>
                        <div className="space-y-6">
                          <div>
                            <Label className="text-white/90 text-base mb-4 block">
                              {t.timeframe}
                            </Label>
                            <div className="space-y-3">
                              {[
                                { value: 'asap', label: t.asap, desc: t.asapDesc },
                                { value: 'flexible-month', label: t.flexible, desc: t.flexibleDesc },
                                { value: 'flexible-months', label: t.veryFlexible, desc: t.veryFlexibleDesc },
                                { value: 'planning', label: t.justPlanning, desc: t.justPlanningDesc },
                              ].map((option) => (
                                <motion.button
                                  key={option.value}
                                  type="button"
                                  onClick={() => handleChange('timeframe', option.value)}
                                  whileHover={{ x: 4 }}
                                  whileTap={{ scale: 0.98 }}
                                  transition={{ duration: 0.2 }}
                                  className={`w-full text-left px-4 py-4 border-l-2 transition-all duration-300 ${
                                    formData.timeframe === option.value
                                      ? 'border-gold bg-gold/10 shadow-lg shadow-gold/10'
                                      : 'border-gold/30 md:hover:border-gold/50 md:hover:bg-gold/5'
                                  }`}
                                >
                                  <div className="flex items-center gap-4">
                                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all duration-300 ${
                                      formData.timeframe === option.value
                                        ? 'border-gold bg-gold'
                                        : 'border-gold/30'
                                    }`}>
                                      <AnimatePresence>
                                        {formData.timeframe === option.value && (
                                          <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="w-full h-full flex items-center justify-center"
                                          >
                                            <Check className="w-3 h-3 text-black" />
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                    <div>
                                      <h3 className="text-gold">{option.label}</h3>
                                      <p className="text-white/70 text-sm">{option.desc}</p>
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 5: Contact Information */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 sm:p-6"
                      >
                        <h2 className="font-[Bebas_Neue] text-2xl sm:text-3xl text-gold mb-6">{t.contact}</h2>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="firstName" className="text-white/90 text-base mb-2 block">
                                {t.firstName}
                              </Label>
                              <Input
                                id="firstName"
                                value={formData.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                className="bg-[#151515] border-gold/30 text-white focus:border-gold transition-all duration-300 focus:shadow-lg focus:shadow-gold/20"
                              />
                            </div>
                            <div>
                              <Label htmlFor="lastName" className="text-white/90 text-base mb-2 block">
                                {t.lastName}
                              </Label>
                              <Input
                                id="lastName"
                                value={formData.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                className="bg-[#151515] border-gold/30 text-white focus:border-gold transition-all duration-300 focus:shadow-lg focus:shadow-gold/20"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="phone" className="text-white/90 text-base mb-2 block">
                              {t.phoneNumber}
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9+\-() ]/g, '');
                                handleChange('phone', value);
                              }}
                              placeholder={t.phonePlaceholder}
                              className="bg-[#151515] border-gold/30 text-white focus:border-gold transition-all duration-300 focus:shadow-lg focus:shadow-gold/20"
                            />
                          </div>

                          <div>
                            <Label htmlFor="email" className="text-white/90 text-base mb-2 block">
                              {t.emailAddress}
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              placeholder={t.emailPlaceholder}
                              className="bg-[#151515] border-gold/30 text-white focus:border-gold transition-all duration-300 focus:shadow-lg focus:shadow-gold/20"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <Label htmlFor="city" className="text-white/90 text-base mb-2 block">
                                {t.city}
                              </Label>
                              <Input
                                id="city"
                                value={formData.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                                placeholder={t.cityPlaceholder}
                                className="bg-[#151515] border-gold/30 text-white focus:border-gold transition-all duration-300 focus:shadow-lg focus:shadow-gold/20"
                              />
                            </div>
                            <AnimatePresence>
                              {formData.city.toLowerCase().includes('berlin') && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Label htmlFor="district" className="text-white/90 text-base mb-2 block">
                                    {t.district}
                                  </Label>
                                  <Input
                                    id="district"
                                    value={formData.district}
                                    onChange={(e) => handleChange('district', e.target.value)}
                                    placeholder={t.districtPlaceholder}
                                    className="bg-[#151515] border-gold/30 text-white focus:border-gold transition-all duration-300 focus:shadow-lg focus:shadow-gold/20"
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between gap-4 pt-6">
                    {currentStep > 0 && (
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="button"
                          onClick={handlePreviousStep}
                          variant="outline"
                          className="bg-[#151515] border-2 border-gold/40 text-gold hover:bg-gold/10 hover:border-gold px-6 py-3 sm:px-8 sm:py-6 transition-all duration-300"
                        >
                          <ArrowLeft className="sm:mr-2" size={18} />
                          <span className="hidden sm:inline">{t.back}</span>
                        </Button>
                      </motion.div>
                    )}
                    <div className={currentStep === 0 ? 'w-full' : 'flex-1 flex justify-end'}>
                      {currentStep < totalSteps - 1 ? (
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                          <Button
                            type="button"
                            onClick={handleNextStep}
                            variant="outline"
                            className="w-full sm:w-auto bg-[#151515] border-2 border-gold text-gold hover:bg-gold hover:text-black px-4 py-3 sm:px-8 sm:py-6 transition-all duration-300"
                          >
                            <span className="hidden sm:inline">{t.next}</span>
                            <ArrowRight className="sm:ml-2" size={18} />
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div 
                          whileHover={{ scale: 1.02 }} 
                          whileTap={{ scale: 0.98 }}
                          className="w-full sm:w-auto"
                        >
                          <Button
                            type="submit"
                            variant="outline"
                            className="w-full sm:w-auto bg-[#151515] border-2 border-gold text-gold hover:bg-gold hover:text-black px-4 py-3 sm:px-12 sm:py-6 transition-all duration-300 shadow-lg shadow-gold/20"
                            disabled={isSubmitting}
                            onClick={() => setShouldValidate(true)}
                          >
                            {isSubmitting ? t.submitting : t.submitRequest}
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <p className="text-white/60 text-xs sm:text-sm text-center px-4 pt-4">
                    {t.formDisclaimer}
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}