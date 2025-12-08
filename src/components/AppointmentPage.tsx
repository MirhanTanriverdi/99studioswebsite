import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { ArrowLeft, Calendar as CalendarIcon, Instagram, Mail, MessageCircle, FileText } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { toast } from 'sonner@2.0.3';
import logo from 'figma:asset/8d811ca05c847b26d58e972726d1fedb6e42a47d.png';

interface AppointmentPageProps {
  onBack: () => void;
}

export function AppointmentPage({ onBack }: AppointmentPageProps) {
  const [date, setDate] = useState<Date>();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    artist: '',
    tattooType: '',
    placement: '',
    size: '',
    description: '',
    hasAllergies: '',
    allergiesDetails: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !date) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Show success message
    toast.success('Appointment request submitted! We\'ll contact you within 24-48 hours.');
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      artist: '',
      tattooType: '',
      placement: '',
      size: '',
      description: '',
      hasAllergies: '',
      allergiesDetails: '',
    });
    setDate(undefined);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#151515]">
      {/* Header */}
      <header className="border-b border-gold/20 bg-transparent sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-transparent">
          <div className="flex items-center justify-between">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-gold hover:text-gold/80 hover:bg-gold/10"
            >
              <ArrowLeft className="sm:mr-2" size={20} />
              <span className="hidden sm:inline">Back to Home</span>
            </Button>

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
            <h1 className="font-roboto text-4xl lg:text-5xl text-gold mb-4 text-center">
              Request an Appointment
            </h1>
            <p className="font-inter text-white/70 text-center mb-12">
              Choose how you'd like to get in touch with us
            </p>

            {!showForm ? (
              /* Contact Options */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
                {/* Instagram */}
                <motion.a
                  href="https://instagram.com/99rootsstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="group relative overflow-hidden border-2 border-gold/40 p-10 md:hover:border-gold bg-gradient-to-br from-[#1a1a1a] to-[#151515] md:hover:from-gold/10 md:hover:to-gold/5 transition-all duration-500 shadow-lg md:hover:shadow-gold/20 md:hover:shadow-2xl md:hover:-translate-y-1"
                >
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  
                  <div className="flex flex-col items-center text-center space-y-5 relative z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gold/20 blur-xl md:group-hover:bg-gold/30 transition-all duration-300"></div>
                      <Instagram className="w-16 h-16 text-gold md:group-hover:scale-110 md:group-hover:rotate-6 transition-all duration-300 relative" />
                    </div>
                    <h3 className="font-roboto text-2xl text-white md:group-hover:text-gold transition-colors duration-300">Instagram</h3>
                    <p className="font-inter text-white/70 text-sm leading-relaxed">
                      DM us on Instagram for quick responses
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-gold/60 md:group-hover:text-gold text-xs uppercase tracking-wider">
                      <span className="text-[rgb(200,157,83)]">Connect Now</span>
                      <span className="md:group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </motion.a>

                {/* Email */}
                <motion.a
                  href="mailto:info@99rootsstudio.com"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group relative overflow-hidden border-2 border-gold/40 p-10 md:hover:border-gold bg-gradient-to-br from-[#1a1a1a] to-[#151515] md:hover:from-gold/10 md:hover:to-gold/5 transition-all duration-500 shadow-lg md:hover:shadow-gold/20 md:hover:shadow-2xl md:hover:-translate-y-1"
                >
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  
                  <div className="flex flex-col items-center text-center space-y-5 relative z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gold/20 blur-xl md:group-hover:bg-gold/30 transition-all duration-300"></div>
                      <Mail className="w-16 h-16 text-gold md:group-hover:scale-110 md:group-hover:rotate-6 transition-all duration-300 relative" />
                    </div>
                    <h3 className="font-roboto text-2xl text-white md:group-hover:text-gold transition-colors duration-300">Email</h3>
                    <p className="font-inter text-white/70 text-sm leading-relaxed">
                      Send us a detailed email inquiry
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-gold/60 md:group-hover:text-gold text-xs uppercase tracking-wider">
                      <span className="text-[rgb(200,157,83)]">Send Email</span>
                      <span className="md:group-hover:translate-x-1 transition-transform duration-300">→</span>
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
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="group relative overflow-hidden border-2 border-gold/40 p-10 md:hover:border-gold bg-gradient-to-br from-[#1a1a1a] to-[#151515] md:hover:from-gold/10 md:hover:to-gold/5 transition-all duration-500 shadow-lg md:hover:shadow-gold/20 md:hover:shadow-2xl md:hover:-translate-y-1"
                >
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  
                  <div className="flex flex-col items-center text-center space-y-5 relative z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gold/20 blur-xl md:group-hover:bg-gold/30 transition-all duration-300"></div>
                      <MessageCircle className="w-16 h-16 text-gold md:group-hover:scale-110 md:group-hover:rotate-6 transition-all duration-300 relative" />
                    </div>
                    <h3 className="font-roboto text-2xl text-white md:group-hover:text-gold transition-colors duration-300">WhatsApp</h3>
                    <p className="font-inter text-white/70 text-sm leading-relaxed">
                      Chat with us directly on WhatsApp
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-gold/60 md:group-hover:text-gold text-xs uppercase tracking-wider">
                      <span className="text-[#FF9D56]">Start Chat</span>
                      <span className="md:group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </motion.a>

                {/* Form */}
                <motion.button
                  onClick={() => setShowForm(true)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="group relative overflow-hidden border-2 border-gold/40 p-10 md:hover:border-gold bg-gradient-to-br from-[#1a1a1a] to-[#151515] md:hover:from-gold/10 md:hover:to-gold/5 transition-all duration-500 shadow-lg md:hover:shadow-gold/20 md:hover:shadow-2xl md:hover:-translate-y-1"
                >
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gold/20 md:group-hover:border-gold/40 transition-colors duration-300"></div>
                  
                  <div className="flex flex-col items-center text-center space-y-5 relative z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gold/20 blur-xl md:group-hover:bg-gold/30 transition-all duration-300"></div>
                      <FileText className="w-16 h-16 text-gold md:group-hover:scale-110 md:group-hover:rotate-6 transition-all duration-300 relative" />
                    </div>
                    <h3 className="font-roboto text-2xl text-white md:group-hover:text-gold transition-colors duration-300">Form</h3>
                    <p className="font-inter text-white/70 text-sm leading-relaxed">
                      Fill out our detailed appointment form
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-gold/60 md:group-hover:text-gold text-xs uppercase tracking-wider">
                      <span className="text-[#FF9D56]">Open Form</span>
                      <span className="md:group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </motion.button>
              </div>
            ) : (
              /* Appointment Form */
              <div>
                <Button
                  onClick={() => setShowForm(false)}
                  variant="ghost"
                  className="text-gold hover:text-gold/80 hover:bg-gold/10 mb-6"
                >
                  <ArrowLeft className="mr-2" size={20} />
                  Back to Contact Options
                </Button>

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  {/* Personal Information */}
                  <div className="border border-gold/20 p-4 sm:p-6 rounded-none">
                    <h2 className="font-roboto text-xl sm:text-2xl text-gold mb-4 sm:mb-6">Personal Information</h2>
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-white/90">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          className="bg-[#151515] border-white text-white focus:border-gold rounded-none"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-white/90">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          className="bg-[#151515] border-white text-white focus:border-gold rounded-none"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white/90">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="bg-[#151515] border-white text-white focus:border-gold rounded-none"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-white/90">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="bg-[#151515] border-white text-white focus:border-gold rounded-none"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="border border-gold/20 p-4 sm:p-6 rounded-none">
                    <h2 className="font-roboto text-xl sm:text-2xl text-gold mb-4 sm:mb-6">Appointment Details</h2>
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <Label htmlFor="date" className="text-white/90">
                          Preferred Date *
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-inter bg-[#151515] border-gold/30 text-white hover:bg-gold/10 hover:text-white rounded-none"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-gold" />
                              {date ? date.toLocaleDateString() : 'Select a date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-[#151515] border-gold/30 button-white rounded-none">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={(date) => date < new Date()}
                              className="bg-[#151515] text-white"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label htmlFor="artist" className="text-white/90">
                          Preferred Artist (Optional)
                        </Label>
                        <Select value={formData.artist} onValueChange={(value) => handleChange('artist', value)}>
                          <SelectTrigger className="bg-[#151515] border-gold/30 text-white rounded-none">
                            <SelectValue placeholder="Select an artist" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#151515] border-gold/30 rounded-none">
                            <SelectItem value="no-preference" className="text-white hover:bg-gold/10">No Preference</SelectItem>
                            <SelectItem value="anna" className="text-white hover:bg-gold/10">Anna Schmidt - Fine Line</SelectItem>
                            <SelectItem value="marcus" className="text-white hover:bg-gold/10">Marcus Wolf - Realism</SelectItem>
                            <SelectItem value="luna" className="text-white hover:bg-gold/10">Luna Rivera - Traditional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Tattoo Details */}
                  <div className="border border-gold/20 p-4 sm:p-6 rounded-none">
                    <h2 className="font-roboto text-xl sm:text-2xl text-gold mb-4 sm:mb-6">Tattoo Details</h2>
                    <div className="space-y-4 sm:space-y-6">
                      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <Label htmlFor="tattooType" className="text-white/90">
                            Tattoo Style
                          </Label>
                          <Select value={formData.tattooType} onValueChange={(value) => handleChange('tattooType', value)}>
                            <SelectTrigger className="bg-[#151515] border-gold/30 text-white rounded-none">
                              <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#151515] border-gold/30 rounded-none">
                              <SelectItem value="fine-line" className="text-white hover:bg-gold/10">Fine Line</SelectItem>
                              <SelectItem value="realism" className="text-white hover:bg-gold/10">Realism</SelectItem>
                              <SelectItem value="traditional" className="text-white hover:bg-gold/10">Traditional</SelectItem>
                              <SelectItem value="blackwork" className="text-white hover:bg-gold/10">Blackwork</SelectItem>
                              <SelectItem value="custom" className="text-white hover:bg-gold/10">Custom Design</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="size" className="text-white/90">
                            Approximate Size
                          </Label>
                          <Select value={formData.size} onValueChange={(value) => handleChange('size', value)}>
                            <SelectTrigger className="bg-[#151515] border-gold/30 text-white rounded-none">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#151515] border-gold/30 rounded-none">
                              <SelectItem value="small" className="text-white hover:bg-gold/10">Small (2-4 inches)</SelectItem>
                              <SelectItem value="medium" className="text-white hover:bg-gold/10">Medium (4-6 inches)</SelectItem>
                              <SelectItem value="large" className="text-white hover:bg-gold/10">Large (6-10 inches)</SelectItem>
                              <SelectItem value="xl" className="text-white hover:bg-gold/10">Extra Large (10+ inches)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="placement" className="text-white/90">
                          Placement on Body
                        </Label>
                        <Input
                          id="placement"
                          value={formData.placement}
                          onChange={(e) => handleChange('placement', e.target.value)}
                          placeholder="e.g., forearm, shoulder, back"
                          className="bg-[#151515] border-white text-white focus:border-gold rounded-none"
                        />
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-white/90">
                          Design Description
                        </Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleChange('description', e.target.value)}
                          placeholder="Describe your tattoo idea, including any specific details, themes, or reference images you have..."
                          className="bg-[#151515] border-white text-white focus:border-gold min-h-32 rounded-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Health Information */}
                  <div className="border border-gold/20 p-4 sm:p-6 rounded-none">
                    <h2 className="font-roboto text-xl sm:text-2xl text-gold mb-4 sm:mb-6">Health Information</h2>
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <Label htmlFor="hasAllergies" className="text-white/90">
                          Do you have any allergies or skin conditions?
                        </Label>
                        <Select value={formData.hasAllergies} onValueChange={(value) => handleChange('hasAllergies', value)}>
                          <SelectTrigger className="bg-[#151515] border-gold/30 text-white rounded-none">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#151515] border-gold/30 rounded-none">
                            <SelectItem value="no" className="text-white hover:bg-gold/10">No</SelectItem>
                            <SelectItem value="yes" className="text-white hover:bg-gold/10">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.hasAllergies === 'yes' && (
                        <div>
                          <Label htmlFor="allergiesDetails" className="text-white/90">
                            Please provide details
                          </Label>
                          <Textarea
                            id="allergiesDetails"
                            value={formData.allergiesDetails}
                            onChange={(e) => handleChange('allergiesDetails', e.target.value)}
                            placeholder="Describe any allergies or skin conditions..."
                            className="bg-[#151515] border-white text-white focus:border-gold rounded-none"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-4 sm:pt-6">
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full sm:w-auto border-2 border-gold text-gold hover:bg-gold hover:text-black px-12 py-6 transition-all duration-300 rounded-none"
                    >
                      Submit Appointment Request
                    </Button>
                  </div>

                  <p className="text-white/60 text-xs sm:text-sm text-center px-4">
                    By submitting this form, you agree to our terms and conditions. 
                    We'll contact you within 24-48 hours to confirm your appointment.
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