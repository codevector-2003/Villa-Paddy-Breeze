import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 to-stone-800/70 z-10"></div>
        <ImageWithFallback
          src="/Final-webp/DRW07768.webp"
          alt="Villa Paddy Breeze"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex justify-center mb-2"
        >
          <img
            src="/Villa Paddy Breez_Final Logo.png"
            alt="Villa Paddy Breeze Logo"
            className="h-48 md:h-64 lg:h-80 w-auto drop-shadow-2xl"
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-amber-200 to-cyan-200 bg-clip-text text-transparent -mt-4"
        >
          Villa Paddy Breeze
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
        >
          Where the Sea Meets the Fields
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-gradient-to-r from-amber-600 to-cyan-700 hover:from-amber-700 hover:to-cyan-800 text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            Book Now
          </Button>
        </motion.div>
      </div>

      {/* Floating elements for added depth */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-10 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"
        animate={{
          y: [0, 20, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
          <motion.div
            className="w-1 h-3 bg-white/70 rounded-full mx-auto"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
