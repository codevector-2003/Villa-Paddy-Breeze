import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Play, Pause } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // First 5 selected images for carousel
  const featuredImages = [
    { src: "/Final/DRW07703.jpg", alt: "Villa Paddy Breeze" },
    { src: "/Final/DRW07641.jpg", alt: "Villa Paddy Breeze" },
    { src: "/Final/DRW07723.jpg", alt: "Villa Paddy Breeze" },
    { src: "/Final/DRW07744.jpg", alt: "Villa Paddy Breeze" },
    { src: "/Final/DRW07541.jpg", alt: "Villa Paddy Breeze" }
  ];

  // All images for the gallery modal
  const allImages = [
    "/Final/DRW07494.jpg", "/Final/DRW07509.jpg", "/Final/DRW07534.jpg",
    "/Final/DRW07541.jpg", "/Final/DRW07542.jpg", "/Final/DRW07546.jpg",
    "/Final/DRW07572.jpg", "/Final/DRW07576.jpg", "/Final/DRW07599.jpg",
    "/Final/DRW07625.jpg", "/Final/DRW07641.jpg", "/Final/DRW07646.jpg",
    "/Final/DRW07678.jpg", "/Final/DRW07681.jpg", "/Final/DRW07690.jpg",
    "/Final/DRW07700.jpg", "/Final/DRW07703.jpg", "/Final/DRW07704.jpg",
    "/Final/DRW07714.jpg", "/Final/DRW07715.jpg", "/Final/DRW07723.jpg",
    "/Final/DRW07731.jpg", "/Final/DRW07737.jpg", "/Final/DRW07744.jpg",
    "/Final/DRW07758.jpg", "/Final/DRW07768.jpg", "/Final/DRW07813.jpg"
  ].map(src => ({ src, alt: "Villa Paddy Breeze" }));

  // Auto-slide effect
  useEffect(() => {
    if (isAutoPlaying && !isLightboxOpen) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredImages.length);
      }, 4500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isLightboxOpen]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredImages.length);
    setIsAutoPlaying(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredImages.length) % featuredImages.length);
    setIsAutoPlaying(false);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const openGalleryLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    // Keep gallery modal open in background
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    // If gallery modal is open, it stays open
  };

  const nextLightboxImage = () => {
    if (isGalleryModalOpen) {
      setLightboxIndex((prev) => (prev + 1) % allImages.length);
    } else {
      setLightboxIndex((prev) => (prev + 1) % featuredImages.length);
    }
  };

  const prevLightboxImage = () => {
    if (isGalleryModalOpen) {
      setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    } else {
      setLightboxIndex((prev) => (prev - 1 + featuredImages.length) % featuredImages.length);
    }
  };

  return (
    <section id="gallery" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl mb-2 bg-gradient-to-r from-blue-800 to-teal-600 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the beauty and luxury that awaits you at VillPaddy Breeze
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6 max-w-4xl mx-auto">
          <div
            className="flex transition-transform duration-700 ease-out will-change-transform"
            style={{ transform: `translateX(-${currentIndex * 100}%)`, backfaceVisibility: 'hidden' }}
          >
            {featuredImages.map((image, index) => (
              <div key={index} className="w-full shrink-0 relative">
                <div
                  className="relative h-64 md:h-80 cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 text-gray-900 px-6 py-3 rounded-full font-medium shadow-lg">
                      Click here to view full image
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>

          {/* Auto-play Control */}
          <button
            onClick={toggleAutoPlay}
            className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all duration-300"
            title={isAutoPlaying ? 'Pause auto-slide' : 'Resume auto-slide'}
          >
            {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
        </div>

        {/* Thumbnail Navigation - Show only 5 images */}
        <div className="flex justify-center items-center space-x-3 pb-4">
          {[-2, -1, 0, 1, 2].map((offset) => {
            const index = (currentIndex + offset + featuredImages.length) % featuredImages.length;
            const image = featuredImages[index];
            return (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-all duration-500 ${offset === 0 ? 'border-blue-500 scale-110 shadow-xl' : 'border-transparent hover:border-blue-300 opacity-70 hover:opacity-100'
                  }`}
              >
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* See All Images Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsGalleryModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            See All Images ({allImages.length})
          </button>
        </div>
      </div>

      {/* Gallery Modal - Grid view of all images */}
      <AnimatePresence>
        {isGalleryModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 overflow-y-auto"
          >
            <div className="min-h-screen p-4 md:p-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-black/80 backdrop-blur-sm py-4 z-10">
                  <h3 className="text-2xl md:text-3xl text-white font-semibold">
                    All Images ({allImages.length})
                  </h3>
                  <button
                    onClick={() => setIsGalleryModalOpen(false)}
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <X size={32} />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {allImages.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.02 }}
                      className="relative aspect-square cursor-pointer group"
                      onClick={() => openGalleryLightbox(index)}
                    >
                      <ImageWithFallback
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-medium">View</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox - Full image view */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLightboxImage();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft size={48} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextLightboxImage();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={isGalleryModalOpen ? allImages[lightboxIndex].src : featuredImages[lightboxIndex].src}
                alt={isGalleryModalOpen ? allImages[lightboxIndex].alt : featuredImages[lightboxIndex].alt}
                className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ImageGallery;