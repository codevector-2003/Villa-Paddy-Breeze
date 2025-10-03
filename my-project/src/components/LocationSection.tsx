import { motion } from 'framer-motion';
import { MapPin, Clock, Car, Plane } from 'lucide-react';

const LocationSection = () => {
  const attractions = [
    { name: "Traditional Rice Terraces", distance: "Walking distance", time: "5 min walk" },
    { name: "Sunset Beach", distance: "500m", time: "10 min walk" },
    { name: "Local Temple", distance: "1.2km", time: "15 min drive" },
    { name: "Artisan Village", distance: "3km", time: "20 min drive" },
    { name: "Waterfalls", distance: "8km", time: "25 min drive" },
    { name: "Airport", distance: "45km", time: "1 hour drive" }
  ];

  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-800 to-teal-600 bg-clip-text text-transparent">
            Perfect Location
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Strategically positioned between ocean and rice fields, with easy access to local attractions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-8 shadow-xl">
              {/* Simulated Map */}
              <div className="relative h-80 bg-gradient-to-br from-blue-200 to-teal-200 rounded-xl overflow-hidden">
                {/* Ocean area */}
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-blue-400 to-blue-500 opacity-80"></div>

                {/* Land area */}
                <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-green-300 to-green-400 opacity-60"></div>

                {/* Rice paddies pattern */}
                <div className="absolute bottom-0 left-0 w-full h-1/2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-green-500 opacity-40 rounded"
                      style={{
                        left: `${10 + (i % 3) * 25}%`,
                        top: `${20 + Math.floor(i / 3) * 35}%`,
                        width: '20%',
                        height: '25%'
                      }}
                    />
                  ))}
                </div>

                {/* Villa location pin */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <MapPin size={40} className="text-red-500 drop-shadow-lg" fill="currentColor" />
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-3 py-1 shadow-lg whitespace-nowrap">
                      <span className="text-sm text-gray-800">VillPaddy Breeze</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Animated ripple effect */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-blue-400 rounded-full"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.7, 0, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Coordinates */}
              <div className="mt-4 text-center text-gray-600">
                <p className="text-sm">Coordinates: 8.4095° S, 115.1889° E</p>
                <p className="text-xs opacity-75">*Simulated location for demo purposes</p>
              </div>
            </div>
          </motion.div>

          {/* Attractions List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-3xl mb-8 text-gray-800">Nearby Attractions</h3>

            {attractions.map((attraction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl hover:shadow-lg transition-all duration-300 group"
                whileHover={{ x: 10 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  {index < 4 ? (
                    <MapPin size={20} className="text-white" />
                  ) : index === 4 ? (
                    <Car size={20} className="text-white" />
                  ) : (
                    <Plane size={20} className="text-white" />
                  )}
                </div>

                <div className="flex-grow">
                  <h4 className="text-lg text-gray-800 group-hover:text-gray-900 transition-colors">
                    {attraction.name}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin size={14} className="mr-1" />
                    <span className="mr-4">{attraction.distance}</span>
                    <Clock size={14} className="mr-1" />
                    <span>{attraction.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Transportation Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-8 p-6 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl text-white"
            >
              <h4 className="text-xl mb-4">Transportation Services</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Car size={16} className="mr-2" />
                  Private airport transfers available
                </li>
                <li className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  Local tour arrangements
                </li>
                <li className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  24/7 concierge assistance
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;