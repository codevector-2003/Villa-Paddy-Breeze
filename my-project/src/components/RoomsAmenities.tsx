import { useState } from 'react';
import { motion } from 'framer-motion';
import { Waves, Wind, Utensils, Wifi, Car, Trees } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const RoomsAmenities = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const rooms = [
    {
      title: "Ocean Suite",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHZpbGxhJTIwYmVkcm9vbSUyMGx1eHVyeXxlbnwxfHx8fDE3NTkzODU3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["King Size Bed", "Ocean Views", "Private Balcony", "En-suite Bathroom"],
      description: "Wake up to breathtaking ocean views in our luxurious ocean suite with panoramic windows and premium amenities."
    },
    {
      title: "Paddy View Room",
      image: "https://images.unsplash.com/photo-1650656184425-62806eaeac4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzU5Mzg1Nzk4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["Queen Bed", "Rice Field Views", "Reading Nook", "Spa Bathroom"],
      description: "Experience tranquility overlooking emerald rice paddies with traditional design elements and modern comfort."
    },
    {
      title: "Pool Villa",
      image: "https://images.unsplash.com/photo-1564151433509-b1983f987580?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2wlMjBpbmZpbml0eXxlbnwxfHx8fDE3NTkzODU3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["Private Pool", "Outdoor Shower", "Sunset Deck", "Kitchenette"],
      description: "Your own private oasis with infinity pool and outdoor living spaces perfect for romantic getaways."
    }
  ];

  const amenities = [
    { icon: Waves, name: "Infinity Pool", color: "from-blue-500 to-blue-600" },
    { icon: Wind, name: "Air Conditioning", color: "from-teal-500 to-teal-600" },
    { icon: Utensils, name: "Fine Dining", color: "from-green-500 to-green-600" },
    { icon: Wifi, name: "High-Speed WiFi", color: "from-blue-600 to-teal-600" },
    { icon: Car, name: "Private Transport", color: "from-teal-600 to-green-600" },
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
              className="relative h-96 perspective-1000"
              onMouseEnter={() => setFlippedCard(index)}
              onMouseLeave={() => setFlippedCard(null)}
            >
              <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${flippedCard === index ? 'rotate-y-180' : ''
                }`}>
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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