import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

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
          <h2 className="text-4xl md:text-5xl mb-4 bg-linear-to-r from-blue-800 to-teal-600 bg-clip-text text-transparent">
            Experience Villa Paddy Breeze
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
          className="relative rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto"
        >
          <div className="relative bg-black">
            <video
              ref={videoRef}
              className="w-full h-[70vh] max-h-[600px] object-contain"
              src="/Video Project.mp4"
              preload="none"
              playsInline
              onClick={togglePlay}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Play/Pause Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <motion.button
                  onClick={togglePlay}
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
            )}

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-gray-300 transition-colors p-2"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-gray-300 transition-colors p-2"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                </div>
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-gray-300 transition-colors p-2"
                  aria-label="Fullscreen"
                >
                  <Maximize size={24} />
                </button>
              </div>
            </div>

            {/* Title Overlay */}
            <div className="absolute top-4 left-4 text-white">
              <h3 className="text-xl mb-1 drop-shadow-lg">Villa Tour</h3>
              <p className="text-sm opacity-80 drop-shadow-lg">Click to {isPlaying ? 'pause' : 'play'}</p>
            </div>
          </div>
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