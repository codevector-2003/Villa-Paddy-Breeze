import { motion } from 'framer-motion';
import { Sunrise, Utensils, Waves, Mountain } from 'lucide-react';

const ExperiencesSection = () => {
  const experiences = [
    {
      icon: Sunrise,
      title: "Rice Paddy Sunrise",
      description: "Wake up early to witness the magical sunrise over emerald rice terraces",
      image: "https://images.unsplash.com/photo-1701582015954-381d510b34ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGFkZGllcyUyMHN1bnNldHxlbnwxfHx8fDE3NTkzODU3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-orange-400 to-yellow-500"
    },
    {
      icon: Utensils,
      title: "Farm-to-Table Dining",
      description: "Enjoy fresh, locally sourced meals prepared with ingredients from our gardens",
      image: "https://images.unsplash.com/photo-1656247203824-3d6f99461ba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwcmljZSUyMHRlcnJhY2VzfGVufDF8fHx8MTc1OTM3OTk5OXww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: Waves,
      title: "Ocean Adventures",
      description: "Dive into crystal-clear waters with snorkeling and water sports",
      image: "https://images.unsplash.com/photo-1689937537536-d97423eef922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHN1bnNldCUyMHRyb3BpY2FsfGVufDF8fHx8MTc1OTMyNzEzOHww&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Mountain,
      title: "Cultural Exploration",
      description: "Discover local traditions and visit nearby temples and villages",
      image: "https://images.unsplash.com/photo-1605352081508-2e09927ecfe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMG9jZWFuJTIwcGFkZHklMjBmaWVsZHN8ZW58MXx8fHwxNzU5Mzg1Nzk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      color: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <section id="experiences" className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-800 to-teal-600 bg-clip-text text-transparent">
            Unique Experiences
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Immerse yourself in authentic local culture and natural beauty
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((experience, index) => {
            const IconComponent = experience.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-all duration-500"
                whileHover={{ y: -10 }}
              >
                {/* Background Image (appears on hover) */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundImage: `url(${experience.image})` }}
                />

                {/* Content */}
                <div className="relative p-8 text-center">
                  {/* Icon */}
                  <motion.div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${experience.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent size={32} className="text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl mb-4 text-gray-800 group-hover:text-gray-900 transition-colors">
                    {experience.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {experience.description}
                  </p>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  />

                  <motion.div
                    className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-teal-200 to-green-200 rounded-full opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  />
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl mb-4 text-gray-800">Ready for Adventure?</h3>
            <p className="text-gray-600 mb-6">
              Each experience is carefully curated to connect you with the natural beauty and rich culture of our region.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Plan Your Experience
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperiencesSection;