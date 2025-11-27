import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  
  // Parallax effect for section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Different parallax speeds for text and image
  const textY = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-30px", "30px"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={sectionRef} id="about" className="bg-black py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
            style={{ y: textY }}
          >
            <h2 className="font-playfair text-4xl lg:text-5xl text-gold mb-6">
              Studio Philosophy
            </h2>
            
            <p className="font-inter text-white/80 leading-relaxed text-lg">
              Founded in the heart of Berlin, 99 Roots Studio is where artistry meets precision. 
              We specialize in custom designs, fine-line work, and hyper-realistic tattoos that 
              tell your unique story.
            </p>

            <p className="font-inter text-white/80 leading-relaxed text-lg">
              Our studio is built on the belief that every tattoo is more than ink—it's a 
              permanent expression of identity, memory, and personal evolution. With a team of 
              internationally recognized artists, we bring decades of combined experience to 
              every piece.
            </p>

            {/* Quote Section */}
            <div className="border-l-2 border-gold pl-6 py-4 my-8">
              <p className="font-playfair text-xl text-white/95 italic">
                "Every tattoo tells a story — we make sure it's yours."
              </p>
            </div>

            <p className="font-inter text-white/80 leading-relaxed text-lg">
              From concept to completion, we work closely with each client to ensure their vision 
              is realized with the highest level of craftsmanship and care.
            </p>
          </motion.div>

          {/* Right: Studio Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
            style={{ y: imageY }}
          >
            <motion.div 
              className="aspect-[4/5] overflow-hidden border border-gold/20"
              style={{ scale: imageScale }}
            >
              <img
                src="https://images.unsplash.com/photo-1640839205647-594d46019271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0YXR0b28lMjBzdHVkaW8lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE4MzU1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="99 Roots Studio interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            
            {/* Decorative Corner Element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r-2 border-b-2 border-gold" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}