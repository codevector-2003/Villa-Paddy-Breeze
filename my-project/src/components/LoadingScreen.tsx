import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 800);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-blue-900 via-teal-800 to-blue-900 flex items-center justify-center"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-white/5 rounded-full"
                style={{
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative text-center text-white">
            {/* Logo/Icon Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="relative w-24 h-24 mx-auto">
                {/* Outer Ring */}
                <motion.div
                  className="absolute inset-0 border-4 border-blue-300/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner Ring */}
                <motion.div
                  className="absolute inset-2 border-4 border-teal-300/50 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Waves size={32} className="text-blue-200" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Villa Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-200 to-teal-200 bg-clip-text text-transparent"
            >
              Villa Paddy Breeze
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-lg md:text-xl mb-8 text-blue-100"
            >
              Where the Sea Meets the Fields
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="w-64 mx-auto"
            >
              {/* Progress Container */}
              <div className="relative">
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-400 to-teal-400 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                {/* Progress Text */}
                <motion.div
                  className="mt-3 text-blue-200 text-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Loading your luxury experience... {progress}%
                </motion.div>
              </div>
            </motion.div>

            {/* Loading Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="mt-8 text-xs text-blue-300"
            >
              {progress < 30 && "Preparing ocean views..."}
              {progress >= 30 && progress < 60 && "Setting up rice paddy scenes..."}
              {progress >= 60 && progress < 90 && "Arranging luxury amenities..."}
              {progress >= 90 && "Almost ready for your arrival..."}
            </motion.div>
          </div>

          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-4 h-4 border border-white/20 rounded-full"
                style={{ marginLeft: '-8px', marginTop: '-8px' }}
                animate={{
                  scale: [1, 20, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 1.3,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;