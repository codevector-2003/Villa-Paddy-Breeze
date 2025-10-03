import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "VillPaddy Breeze exceeded all our expectations. The seamless blend of luxury and nature created the perfect romantic getaway. Waking up to ocean views and rice paddies was absolutely magical.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Marco & Elena",
      location: "Milan, Italy",
      rating: 5,
      text: "Our honeymoon at VillPaddy Breeze was unforgettable. The villa's unique location between sea and paddies offered incredible photo opportunities and peaceful moments. The staff was exceptional.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Yuki Tanaka",
      location: "Tokyo, Japan",
      rating: 5,
      text: "The tranquility and beauty of this place is indescribable. Every detail was perfectly thought out, from the infinity pool to the traditional rice field walks. A true paradise.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "David & Lisa Chen",
      location: "Sydney, Australia",
      rating: 5,
      text: "We've stayed at luxury resorts worldwide, but VillPaddy Breeze stands out for its authentic connection to nature. The sunrise over the rice terraces will forever be etched in our memories.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      rating: 5,
      text: "Solo travel at VillPaddy Breeze was incredibly rejuvenating. The peaceful environment and beautiful surroundings provided the perfect space for reflection and relaxation.",
      image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
      >
        <Star
          size={20}
          className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      </motion.div>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 via-green-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-800 to-teal-600 bg-clip-text text-transparent">
            Guest Testimonials
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear from our guests about their unforgettable experiences
          </p>
        </motion.div>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Testimonial Display */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-blue-100">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-grow text-center md:text-left">
                    {/* Stars */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex justify-center md:justify-start space-x-1 mb-4"
                    >
                      {renderStars(testimonials[currentIndex].rating)}
                    </motion.div>

                    {/* Quote */}
                    <motion.blockquote
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-gray-700 text-lg md:text-xl italic leading-relaxed mb-6"
                    >
                      "{testimonials[currentIndex].text}"
                    </motion.blockquote>

                    {/* Author */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <div className="text-gray-900 text-lg">{testimonials[currentIndex].name}</div>
                      <div className="text-gray-500">{testimonials[currentIndex].location}</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              {isAutoPlaying ? 'Auto-playing (hover to pause)' : 'Paused (move cursor away to resume)'}
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
        >
          {[
            { number: "500+", label: "Happy Guests" },
            { number: "4.9/5", label: "Average Rating" },
            { number: "98%", label: "Return Rate" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;