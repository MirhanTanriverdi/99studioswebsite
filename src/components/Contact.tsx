import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Clock, Phone, Instagram, Facebook } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="bg-black py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl lg:text-5xl text-gold mb-4">
            Get In Touch
          </h2>
          <p className="font-inter text-white/70 max-w-2xl mx-auto text-lg">
            Ready to start your tattoo journey? We're here to answer your questions.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Left Column - Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Location Card */}
            <div className="bg-gradient-to-br from-gold/5 to-transparent border border-gold/20 p-6 hover:border-gold/40 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gold/10 p-3 rounded-lg">
                  <MapPin className="text-gold" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-playfair text-lg text-white mb-2">Visit Us</h3>
                  <p className="font-inter text-white/70 text-sm leading-relaxed">
                    Kreuzberg District<br />
                    Oranienstraße 123<br />
                    10999 Berlin, Germany
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-gradient-to-br from-gold/5 to-transparent border border-gold/20 p-6 hover:border-gold/40 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gold/10 p-3 rounded-lg">
                  <Clock className="text-gold" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-playfair text-lg text-white mb-2">Opening Hours</h3>
                  <div className="font-inter text-white/70 text-sm space-y-1">
                    <p>Mon - Fri: 12:00 - 20:00</p>
                    <p>Saturday: 11:00 - 19:00</p>
                    <p>Sunday: By appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-gold/5 to-transparent border border-gold/20 p-6 hover:border-gold/40 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gold/10 p-3 rounded-lg">
                  <Mail className="text-gold" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-playfair text-lg text-white mb-2">Email</h3>
                  <a
                    href="mailto:info@99rootsstudio.com"
                    className="font-inter text-white/70 hover:text-gold transition-colors text-sm"
                  >
                    info@99rootsstudio.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-gradient-to-br from-gold/5 to-transparent border border-gold/20 p-6 hover:border-gold/40 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="bg-gold/10 p-3 rounded-lg">
                  <Phone className="text-gold" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-playfair text-lg text-white mb-2">Phone</h3>
                  <a
                    href="tel:+493012345678"
                    className="font-inter text-white/70 hover:text-gold transition-colors text-sm"
                  >
                    +49 30 1234 5678
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h3 className="font-playfair text-lg text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/99rootsstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group"
                >
                  <Instagram className="text-gold group-hover:text-black" size={20} />
                </a>
                <a
                  href="https://facebook.com/99rootsstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-gold/30 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group"
                >
                  <Facebook className="text-gold group-hover:text-black" size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="border border-gold/20 p-8 lg:p-10 bg-gradient-to-br from-gold/5 to-transparent">
              <h3 className="font-playfair text-2xl text-white mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white/90 mb-2 font-inter">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="bg-black/50 border-gold/30 text-white placeholder:text-white/30 focus:border-gold h-12"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white/90 mb-2 font-inter">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="bg-black/50 border-gold/30 text-white placeholder:text-white/30 focus:border-gold h-12"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-white/90 mb-2 font-inter">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+49 30 1234 5678"
                    className="bg-black/50 border-gold/30 text-white placeholder:text-white/30 focus:border-gold h-12"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/90 mb-2 font-inter">
                    Your Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your tattoo idea..."
                    className="bg-black/50 border-gold/30 text-white placeholder:text-white/30 focus:border-gold resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold text-black hover:bg-gold/90 py-6 transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>

              {/* Booking Portal CTA */}
              <div className="mt-8 pt-8 border-t border-gold/20">
                <div className="text-center space-y-4">
                  <p className="font-inter text-white/70 text-sm">
                    Ready to book your appointment?
                  </p>
                  <Button
                    type="button"
                    onClick={() => window.open('#booking', '_blank')}
                    variant="outline"
                    className="border-gold text-gold hover:bg-gold hover:text-black px-8 py-6 transition-all duration-300"
                  >
                    Go to Booking Portal
                  </Button>
                  <p className="font-inter text-white/50 text-xs">
                    All appointment requests are handled through our external booking platform
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 aspect-video border-2 border-gold/20 overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, #C89D53 0px, #C89D53 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #C89D53 0px, #C89D53 1px, transparent 1px, transparent 20px)'
                }}></div>
                <div className="text-center z-10">
                  <MapPin className="text-gold/40 mx-auto mb-3" size={40} />
                  <p className="font-inter text-white/60">
                    Google Maps Embed
                  </p>
                  <p className="font-inter text-white/40 text-sm mt-2">
                    Kreuzberg District, Berlin
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
