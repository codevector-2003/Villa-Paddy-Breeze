import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Play, Pause } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1564151433509-b1983f987580?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2wlMjBpbmZpbml0eXxlbnwxfHx8fDE3NTkzODU3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Infinity pool overlooking ocean",
      title: "Infinity Pool"
    },
    {
      src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHZpbGxhJTIwYmVkcm9vbSUyMGx1eHVyeXxlbnwxfHx8fDE3NTkzODU3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Luxury bedroom with ocean views",
      title: "Ocean View Suite"
    },
    {
      src: "https://images.unsplash.com/photo-1701582015954-381d510b34ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGFkZGllcyUyMHN1bnNldHxlbnwxfHx8fDE3NTkzODU3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Rice paddies at sunset",
      title: "Paddy Field Views"
    },
    {
      src: "https://images.unsplash.com/photo-1752769041878-f24e37fd6aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGJhdGhyb29tfGVufDF8fHx8MTc1OTM4NTc5OXww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Luxury bathroom with natural lighting",
      title: "Spa Bathroom"
    },
    {
      src: "https://images.unsplash.com/photo-1689937537536-d97423eef922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHN1bnNldCUyMHRyb3BpY2FsfGVufDF8fHx8MTc1OTMyNzEzOHww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Tropical sunset over ocean",
      title: "Sunset Terrace"
    },
    {
      src: "https://images.unsplash.com/photo-1656247203824-3d6f99461ba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwcmljZSUyMHRlcnJhY2VzfGVufDF8fHx8MTc1OTM3OTk5OXww&ixlib=rb-4.1.0&q=80&w=1080",
      alt: "Bali rice terraces",
      title: "Terraced Gardens"
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    if (isAutoPlaying && !isLightboxOpen) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000); // Change image every 3 seconds
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isLightboxOpen, images.length]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false); // Pause auto-play when user manually navigates
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false); // Pause auto-play when user manually navigates
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-800 to-teal-600 bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the beauty and luxury that awaits you at VillPaddy Breeze
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 relative">
                <div
                  className="relative h-64 md:h-96 cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-600" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl mb-1">{image.title}</h3>
                    <p className="text-sm opacity-80">Click to view full size</p>
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

        {/* Thumbnail Navigation */}
        <div className="flex justify-center space-x-2 overflow-x-auto pb-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false); // Pause auto-play when user selects thumbnail
              }}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-500 ${currentIndex === index ? 'border-blue-500 scale-110' : 'border-transparent hover:border-blue-300'
                }`}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
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
              className="max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ImageGallery;