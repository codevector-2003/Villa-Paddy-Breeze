import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-b from-[#f7f3ee] via-[#e8e4d9] to-[#d8ebe8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-800 to-teal-600 bg-clip-text text-transparent">
            Experience VillPaddy Breeze
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Take a virtual tour and immerse yourself in the tranquility of our luxury villa
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
        >
          {!isPlaying ? (
            // Video Thumbnail with Play Button
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1689937537536-d97423eef922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHN1bnNldCUyMHRyb3BpY2FsfGVufDF8fHx8MTc1OTMyNzEzOHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Villa video preview"
                className="w-full h-96 md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <motion.button
                  onClick={() => setIsPlaying(true)}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(255, 255, 255, 0.4)",
                      "0 0 0 20px rgba(255, 255, 255, 0)",
                      "0 0 0 0 rgba(255, 255, 255, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Play size={48} className="text-white ml-1" />
                </motion.button>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl mb-1">Virtual Villa Tour</h3>
                <p className="text-sm opacity-80">Click to play</p>
              </div>
            </div>
          ) : (
            // Embedded Video (simulated with image for demo)
            <div className="relative">
              <div className="w-full h-96 md:h-[500px] bg-black flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                  </div>
                  <p>Video would be embedded here</p>
                  <p className="text-sm text-gray-300 mt-2">
                    In a real implementation, this would be a YouTube/Vimeo embed
                  </p>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Back to Preview
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Video Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {[
            {
              title: "360° Views",
              description: "Explore every corner of our luxury villa"
            },
            {
              title: "Drone Footage",
              description: "See the stunning location from above"
            },
            {
              title: "Interior Tour",
              description: "Walk through our beautifully designed spaces"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play size={24} className="text-white" />
              </div>
              <h3 className="text-xl mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;