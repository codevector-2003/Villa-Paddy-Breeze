import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // First 5 selected images for carousel
  const featuredImages = [
    { src: "/Final-webp/DRW07703.webp", alt: "Villa Paddy Breeze" },
    { src: "/Final-webp/DRW07641.webp", alt: "Villa Paddy Breeze" },
    { src: "/Final-webp/DRW07723.webp", alt: "Villa Paddy Breeze" },
    { src: "/Final-webp/DRW07744.webp", alt: "Villa Paddy Breeze" },
    { src: "/Final-webp/DRW07541.webp", alt: "Villa Paddy Breeze" },
    { src: "/Final-webp/DRW07627.webp", alt: "Villa Paddy Breeze" }

  ];

  // All images for the gallery modal
  const allImages = [
    "/Final-webp/DRW07494.webp", "/Final-webp/DRW07509.webp", "/Final-webp/DRW07534.webp",
    "/Final-webp/DRW07541.webp", "/Final-webp/DRW07542.webp", "/Final-webp/DRW07546.webp",
    "/Final-webp/DRW07572.webp", "/Final-webp/DRW07576.webp", "/Final-webp/DRW07599.webp",
    "/Final-webp/DRW07625.webp", "/Final-webp/DRW07641.webp", "/Final-webp/DRW07646.webp",
    "/Final-webp/DRW07678.webp", "/Final-webp/DRW07681.webp", "/Final-webp/DRW07690.webp",
    "/Final-webp/DRW07700.webp", "/Final-webp/DRW07703.webp", "/Final-webp/DRW07704.webp",
    "/Final-webp/DRW07714.webp", "/Final-webp/DRW07715.webp", "/Final-webp/DRW07723.webp",
    "/Final-webp/DRW07731.webp", "/Final-webp/DRW07737.webp", "/Final-webp/DRW07744.webp",
    "/Final-webp/DRW07758.webp", "/Final-webp/DRW07768.webp", "/Final-webp/DRW07813.webp",
    "/Final-webp/DRW07627.webp", "/Final-webp/DRW07513.webp", "/Final-webp/DRW07491.webp"
  ].map(src => ({ src, alt: "Villa Paddy Breeze" }));

  // Auto-slide effect
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredImages.length);
    }, 4500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex]);

  // Sync scroll position with currentIndex
  useEffect(() => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollLeft = currentIndex * container.offsetWidth;

      // Use requestAnimationFrame for smoother transitions
      requestAnimationFrame(() => {
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      });
    }
  }, [currentIndex]);

  // Keyboard support for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevLightboxImage();
      } else if (e.key === 'ArrowRight') {
        nextLightboxImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, lightboxIndex]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredImages.length) % featuredImages.length);
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
          <h2 className="text-4xl md:text-5xl mb-2 bg-linear-to-r from-blue-800 to-teal-600 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the beauty and luxury that awaits you at VillPaddy Breeze
          </p>
        </motion.div>

        {/* Main Carousel - Lightweight CSS Scroll Snap */}
        <div className="relative rounded-2xl shadow-2xl mb-6 max-w-4xl mx-auto overflow-hidden">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredImages.map((image, index) => (
              <div
                key={index}
                className="w-full shrink-0 snap-center snap-always"
              >
                <div
                  className="relative h-64 md:h-80 cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {featuredImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Navigation - Show only 5 images */}
        <div className="flex justify-center items-center space-x-3 pb-4">
          {[-2, -1, 0, 1, 2].map((offset) => {
            const index = (currentIndex + offset + featuredImages.length) % featuredImages.length;
            const image = featuredImages[index];
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
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
            className="bg-linear-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/90 z-60 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLightboxImage();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={48} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextLightboxImage();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10 p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Next image"
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
