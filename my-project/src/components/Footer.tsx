import { motion } from 'framer-motion';
import { Instagram, Facebook } from 'lucide-react';

// TikTok SVG Icon Component
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", color: "hover:text-pink-400" },
    { icon: Facebook, href: "#", color: "hover:text-blue-400" },
    { icon: TikTokIcon, href: "#", color: "hover:text-white" }
  ];

  const footerLinks = [
    {
      title: "Villa",
      links: ["Rooms & Suites", "Amenities", "Gallery", "Virtual Tour"]
    },
    {
      title: "Experiences",
      links: ["Rice Paddy Tours", "Ocean Activities", "Local Culture", "Dining"]
    },
    {
      title: "Services",
      links: ["Concierge", "Transportation", "Spa Treatments", "Private Events"]
    },
    {
      title: "Information",
      links: ["Location", "Policies", "Sustainability", "Contact"]
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-stone-800 to-cyan-900 text-white overflow-hidden -mt-1">
      {/* Static Wave Separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="#d8ebe8"
          />
        </svg>
      </div>

      <div className="relative pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/Villa Paddy Breez_Final Logo.png"
                    alt="Villa Paddy Breeze Logo"
                    className="h-16 w-auto"
                  />
                  <h3 className="text-2xl bg-gradient-to-r from-amber-200 to-cyan-200 bg-clip-text text-transparent">
                    Villa Paddy Breeze
                  </h3>
                </div>
                <p className="text-stone-100 mb-6 leading-relaxed">
                  Experience luxury where the sea meets the fields. A unique sanctuary
                  that harmoniously blends ocean views with the tranquil beauty of rice paddies.
                </p>

                {/* Social Media */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${social.color}`}
                      >
                        <IconComponent size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              >
                <h4 className="text-lg mb-4 text-amber-200">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 5 }}
                        className="text-stone-100 hover:text-white transition-all duration-300 text-sm"
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 text-center md:text-left">
                <h4 className="text-xl mb-2">Stay Connected</h4>
                <p className="text-stone-100 text-sm">
                  Subscribe for exclusive offers and updates from Villa Paddy Breeze
                </p>
              </div>
              <div className="w-full md:w-auto md:max-w-sm">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full sm:flex-grow sm:rounded-l-lg sm:rounded-r-none rounded-lg px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-600 to-cyan-600 hover:from-amber-700 hover:to-cyan-700 sm:rounded-r-lg sm:rounded-l-none rounded-lg transition-all duration-300 whitespace-nowrap"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between"
          >
            <div className="flex items-center mb-4 md:mb-0">
              <p className="text-stone-100 text-sm">
                © 2024 Villa Paddy Breeze. All rights reserved.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;