import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Utensils, Wifi, Car, Trees, X, ChevronLeft, ChevronRight, Bed, Users, Maximize, DollarSign } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const RoomsAmenities = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  const premiumSuiteGallery = [
    "/Final-webp/DRW07494.webp",
    "/Final-webp/DRW07509.webp",
    "/Final-webp/DRW07546.webp",
    "/Final-webp/DRW07625.webp",
    "/Final-webp/DRW07646.webp",
    "/Final-webp/DRW07703.webp",
    "/Final-webp/DRW07599.webp",
    "/Final-webp/DRW07704.webp",
    "/Final-webp/DRW07723.webp",
    "/Final-webp/DRW07731.webp",
    "/Final-webp/DRW07627.webp"
  ];

  const premiumSuiteFeatures = [
    "Extra-large double bed",
    "Living room with sofa bed",
    "149 m² entire apartment",
    "Private kitchen",
    "Ensuite bathroom",
    "Private terrace with view",
    "Air conditioning",
    "Flat-screen TV",
    "Free WiFi",
    "Free toiletries",
    "Washing machine",
    "Bath or shower",
    "Private entrance",
    "Refrigerator",
    "Satellite channels",
    "Kitchenware & Kitchenette",
    "Electric kettle",
    "Outdoor furniture",
    "Outdoor dining area",
    "Wardrobe",
    "Dining table",
    "Ironing facilities",
    "Fan",
    "Extra long beds (> 2 metres)",
    "Mini Bar"
  ];

  const scrollToContact = () => {
    setSelectedRoom(null);
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const rooms = [
    {
      title: "Ocean Suite",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHZpbGxhJTIwYmVkcm9vbSUyMGx1eHVyeXxlbnwxfHx8fDE3NTkzODU3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["King Size Bed", "Ocean Views", "Private Balcony", "En-suite Bathroom"],
      description: "Wake up to breathtaking ocean views in our luxurious ocean suite with panoramic windows and premium amenities.",
      comingSoon: true
    },
    {
      title: "Paddy View Room",
      image: "/Final-webp/DRW07714.webp",
      features: ["Queen Bed", "Rice Field Views", "Reading Nook", "Spa Bathroom"],
      description: "Experience tranquility overlooking emerald rice paddies with traditional design elements and modern comfort.",
      comingSoon: false
    },
    {
      title: "Pool Villa",
      image: "https://images.unsplash.com/photo-1564151433509-b1983f987580?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2wlMjBpbmZpbml0eXxlbnwxfHx8fDE3NTkzODU3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["Private Pool", "Outdoor Shower", "Sunset Deck", "Kitchenette"],
      description: "Your own private oasis with infinity pool and outdoor living spaces perfect for romantic getaways.",
      comingSoon: true
    }
  ];

  const amenities = [
    { icon: Utensils, name: "Private Kitchen", color: "from-blue-500 to-blue-600" },
    { icon: Wind, name: "Air Conditioning", color: "from-teal-500 to-teal-600" },
    { icon: Utensils, name: "Fine Dining", color: "from-green-500 to-green-600" },
    { icon: Wifi, name: "High-Speed WiFi", color: "from-blue-600 to-teal-600" },
    { icon: Car, name: "Private Parking", color: "from-teal-600 to-green-600" },
    { icon: Trees, name: "Garden Access", color: "from-green-600 to-blue-600" }
  ];

  return (
    <section id="rooms" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-800 to-teal-600 bg-clip-text text-transparent">
            Rooms & Amenities
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Luxurious accommodations with modern amenities and stunning views
          </p>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {rooms.map((room, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative h-96 perspective-1000 ${room.comingSoon ? 'opacity-75' : ''}`}
              onMouseEnter={() => setFlippedCard(index)}
              onMouseLeave={() => setFlippedCard(null)}
              onClick={() => !room.comingSoon && index === 1 && setSelectedRoom(1)}
            >
              <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${flippedCard === index ? 'rotate-y-180' : ''
                }`}>
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={room.image}
                    alt={room.title}
                    className={`w-full h-full object-cover transition-all duration-300 ${room.comingSoon ? 'blur-sm' : ''}`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent ${room.comingSoon ? 'backdrop-blur-sm' : ''}`} />
                  {room.comingSoon && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Coming Soon
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl mb-2">{room.title}</h3>
                    <p className="text-sm opacity-80">Hover to view details</p>
                  </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl p-6 flex flex-col justify-center text-white shadow-xl">
                  <h3 className="text-2xl mb-4">{room.title}</h3>
                  <p className="text-sm mb-4 opacity-90">{room.description}</p>
                  <ul className="space-y-2">
                    {room.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-white rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl mb-8 text-gray-800">Premium Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenities.map((amenity, index) => {
              const IconComponent = amenity.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${amenity.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <IconComponent size={28} className="text-white" />
                  </div>
                  <span className="text-gray-700 text-center">{amenity.name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Premium Suite Modal */}
      <AnimatePresence>
        {selectedRoom === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 overflow-y-auto"
            onClick={() => setSelectedRoom(null)}
          >
            <div className="min-h-screen p-4 md:p-8">
              <div className="max-w-6xl mx-auto bg-white rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-800 to-teal-600 text-white p-6">
                  <button
                    onClick={() => setSelectedRoom(null)}
                    className="absolute top-4 right-4 hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">Premium Suite</h2>
                  <p className="text-white/90">Our signature paddy view accommodation</p>
                </div>

                {/* Gallery Grid */}
                <div className="p-6 bg-gray-50">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Photo Gallery</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {premiumSuiteGallery.map((image, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="relative aspect-square cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                        onClick={() => {
                          setLightboxImageIndex(idx);
                          setIsLightboxOpen(true);
                        }}
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`Premium Suite - Image ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-sm font-medium">View</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 md:p-8">
                  {/* Quick Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg">
                      <Maximize size={24} className="text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Size</p>
                        <p className="font-semibold">149 m²</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-teal-50 p-4 rounded-lg">
                      <Bed size={24} className="text-teal-600" />
                      <div>
                        <p className="text-sm text-gray-600">Bedroom</p>
                        <p className="font-semibold">King Bed</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-green-50 p-4 rounded-lg">
                      <Users size={24} className="text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Capacity</p>
                        <p className="font-semibold">3 Guests</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-amber-50 p-4 rounded-lg">
                      <DollarSign size={24} className="text-amber-600" />
                      <div>
                        <p className="text-sm text-gray-600">Per Night</p>
                        <p className="font-semibold">$105 USD</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">About This Suite</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Experience ultimate comfort in our 149 m² premium suite featuring an extra-large double bed,
                      separate living room with sofa bed, and stunning paddy field views. This entire apartment
                      includes a private kitchen, ensuite bathroom, and private terrace perfect for enjoying your morning coffee
                      while overlooking the serene rice terraces.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">* Price excludes taxes and fees</p>
                  </div>

                  {/* Features Grid */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Features & Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {premiumSuiteFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <div className="flex justify-center pt-6 border-t">
                    <button
                      onClick={scrollToContact}
                      className="bg-gradient-to-r from-blue-800 to-teal-600 hover:from-blue-900 hover:to-teal-700 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Book Now - $105 USD/Night
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-4"
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
                setLightboxImageIndex((prev) => (prev - 1 + premiumSuiteGallery.length) % premiumSuiteGallery.length);
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft size={48} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxImageIndex((prev) => (prev + 1) % premiumSuiteGallery.length);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight size={48} />
            </button>

            <motion.div
              key={lightboxImageIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={premiumSuiteGallery[lightboxImageIndex]}
                alt={`Premium Suite - Image ${lightboxImageIndex + 1}`}
                className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain"
              />
            </motion.div>

            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {lightboxImageIndex + 1} / {premiumSuiteGallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        `
      }} />
    </section>
  );
};

export default RoomsAmenities;
