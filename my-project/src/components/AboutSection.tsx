import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" ref={ref} className="py-20 bg-gradient-to-b from-[#f7f3ee] via-[#e8e4d9] to-[#d8ebe8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl bg-gradient-to-r from-blue-800 to-teal-600 bg-clip-text text-transparent"
            >
              A Tranquil Escape
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-700 text-lg leading-relaxed"
            >
              Nestled between the endless blue of the ocean and the emerald green of ancient rice paddies,
              Villa Paddy Breeze offers a unique sanctuary where luxury meets nature's untouched beauty.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-gray-700 text-lg leading-relaxed"
            >
              Our villa is more than just accommodation it's a gateway to experiencing the harmony between
              traditional agricultural landscapes and coastal serenity. Wake up to the sound of gentle waves
              and the whisper of rice stalks dancing in the morning breeze.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">Oceanfront Views</div>
              <div className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full">Rice Terrace Access</div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full">Eco-Luxury</div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <ImageWithFallback
                src="/Final/DRW07704.jpg"
                alt="Villa Paddy Breeze"
                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-teal-400 to-green-400 rounded-full opacity-15"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;