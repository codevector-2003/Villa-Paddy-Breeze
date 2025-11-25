import { motion } from 'framer-motion';
import { MapPin, Clock, Car, Plane } from 'lucide-react';

const LocationSection = () => {
  const attractions = [
    { name: "Galle Dutch Fort", distance: "10km", time: "15 min drive", mapsUrl: "https://www.google.com/maps/place/Galle+Fort/@6.0286111,80.2163889,15z" },
    { name: "Sunset Beach", distance: "500m", time: "10 min walk", mapsUrl: "https://www.google.com/maps/search/Sunset+Beach+near+Boossa+Galle" },
    { name: "National Maritime Museum", distance: "9.5km", time: "15 min drive", mapsUrl: "https://www.google.com/maps/place/National+Maritime+Museum+Galle/@6.0328333,80.2177778,15z" },
    { name: "Unawatuna Beach", distance: "15.8km", time: "30 min drive", mapsUrl: "https://www.google.com/maps/place/Unawatuna+Beach/@6.0097222,80.2502778,15z" },
    { name: "Hikkaduwa Coral Reef", distance: "11.8km", time: "20 min drive", mapsUrl: "https://www.google.com/maps/place/Hikkaduwa+Coral+Reef/@6.1388889,80.1030556,15z" },
    { name: "Sea Turtle Hatchery", distance: "7.7km", time: "15 drive", mapsUrl: "https://www.google.com/maps/search/Sea+Turtle+Hatchery+near+Galle" }
  ];

  return (
    <section id="location" className="py-20 bg-gradient-to-b from-[#f7f3ee] via-[#e8e4d9] to-[#d8ebe8]">
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
            <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-4 shadow-xl">
              {/* Google Maps Embed */}
              <div className="relative h-80 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.33939378585!2d80.15889337447823!3d6.0848933281059026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1776b3be7394d%3A0xab7b1c14ba91e03d!2sVilla%20Paddy%20Breeze!5e0!3m2!1sen!2slk!4v1764094944118!5m2!1sen!2slk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Villa Paddy Breeze Location"
                  className="rounded-xl"
                ></iframe>
              </div>

              {/* Coordinates */}
              <div className="mt-4 text-center text-gray-600">
                <p className="text-sm">Villa Paddy Breeze, No.34 Rupeewala, Boossa</p>
                <p className="text-xs opacity-75">Coordinates: 6.0846559564025° S, 80.16140392201771° E</p>
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
              <motion.a
                key={index}
                href={attraction.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl hover:shadow-lg transition-all duration-300 group cursor-pointer"
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
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;