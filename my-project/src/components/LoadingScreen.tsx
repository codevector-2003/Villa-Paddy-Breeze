import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
  heroImageLoaded: boolean;
}

const LoadingScreen = ({ onComplete, heroImageLoaded }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  // Minimum loading time of 2 seconds for smooth experience
  useEffect(() => {
    const minTimer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 2000);

    return () => clearTimeout(minTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        // Progress faster if image is loaded, slower otherwise
        const increment = heroImageLoaded ? 3 : 1.5;

        if (prev >= 100 && heroImageLoaded && minTimeElapsed) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 1000);
          }, 600);
          return 100;
        }
        // Cap at 95% until image loads
        if (!heroImageLoaded && prev >= 95) {
          return 95;
        }
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete, heroImageLoaded, minTimeElapsed]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-stone-50 via-amber-50 to-cyan-50 flex items-center justify-center"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-stone-400/10 rounded-full"
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
          <div className="relative text-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="mb-8"
            >
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                {/* Outer Ring */}
                <motion.div
                  className="absolute inset-0 border-4 border-amber-300/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner Ring */}
                <motion.div
                  className="absolute inset-2 border-4 border-stone-400/50 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Logo */}
                <motion.div
                  className="relative z-10"
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.95, 1, 0.95]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                  }}
                >
                  <img
                    src="/Villa Paddy Breez_Final Logo.png"
                    alt="Villa Paddy Breeze Logo"
                    className="w-32 h-32 object-contain"
                    style={{ willChange: 'transform' }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Villa Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-stone-700 to-cyan-700 bg-clip-text text-transparent font-bold"
            >
              Villa Paddy Breeze
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-lg md:text-xl mb-8 text-stone-600"
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
                <div className="w-full h-2 bg-stone-300/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-cyan-600 rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                {/* Progress Text */}
                <motion.div
                  className="mt-3 text-stone-600 text-sm font-medium"
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
              className="mt-8 text-xs text-stone-500"
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
                className="absolute top-1/2 left-1/2 w-4 h-4 border border-amber-400/30 rounded-full"
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