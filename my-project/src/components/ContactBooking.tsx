import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Calendar, Users, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

const ContactBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration - Temporarily hardcoded for testing
      const serviceId = 'service_gvdq1bh';
      const templateId = 'template_rzutilh';
      const publicKey = 'qYaV2SxVWLklCeKoq';

      // Debug: Log the values (remove in production)
      console.log('EmailJS Config:', { serviceId, templateId, publicKey });

      // Template parameters matching your form data
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        check_in: formData.checkIn || 'Not specified',
        check_out: formData.checkOut || 'Not specified',
        guests: formData.guests || 'Not specified',
        message: formData.message || 'No message',
      };

      console.log('Sending email with params:', templateParams);

      // Send email via EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('EmailJS Success:', response);
      toast.success("Booking inquiry sent successfully! We'll get back to you within 24 hours.");

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('Failed to send booking inquiry. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+94 72 150 2942", "24/7 Concierge Service"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@villapaddybreeze.com", "villapaddybreeze@gmail.com"],
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["N0.34  Rupeewala Boossa", "Galle, Sri Lanka"],
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section id="contact" className="py-20 pb-0 bg-gradient-to-b from-[#f7f3ee] via-[#e8e4d9] to-[#d8ebe8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-800 to-teal-600 bg-clip-text text-transparent">
            Contact & Booking
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ready to experience the magic of VillPaddy Breeze? Get in touch with us today
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-[#f7f3ee] via-[#e8e4d9] to-[#d8ebe8] rounded-2xl p-8 shadow-xl"
          >
            <h3 className="text-2xl mb-6 text-gray-800">Book Your Stay</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <Input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white/70 backdrop-blur-sm border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                  <Users size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-white/70 backdrop-blur-sm border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                  <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </motion.div>
              </div>

              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 bg-white/70 backdrop-blur-sm border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />
                <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </motion.div>

              {/* Booking Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <Input
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    className="pl-10 bg-white/70 backdrop-blur-sm border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                  <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <Input
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="pl-10 bg-white/70 backdrop-blur-sm border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                  <Calendar size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </motion.div>

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className="relative"
                >
                  <Input
                    type="number"
                    name="guests"
                    placeholder="Guests"
                    value={formData.guests}
                    onChange={handleChange}
                    min="1"
                    max="8"
                    className="pl-10 bg-white/70 backdrop-blur-sm border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                  <Users size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </motion.div>
              </div>

              {/* Message */}
              <motion.div
                whileFocus={{ scale: 1.02 }}
                className="relative"
              >
                <Textarea
                  name="message"
                  placeholder="Special requests or questions..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="pl-10 pt-3 bg-white/70 backdrop-blur-sm border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
                />
                <MessageCircle size={18} className="absolute left-3 top-3 text-gray-400" />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send size={18} className="mr-2" />
                      Send Booking Inquiry
                    </div>
                  )}

                  {/* Ripple effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-xl"
                    initial={{ scale: 0, opacity: 1 }}
                    whileTap={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl mb-6 text-gray-800">Get In Touch</h3>

            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${info.color} rounded-lg flex items-center justify-center mr-4`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-800 mb-2">{info.title}</h4>
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl p-6 text-white"
            >
              <h4 className="text-xl mb-4">Why Choose VillPaddy Breeze?</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Unique location between ocean and rice fields
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Personalized concierge service
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Sustainable luxury experience
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Flexible cancellation policy
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Available On Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl mb-8 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-semibold">
            We are available on
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 flex-wrap">
            {/* Booking.com */}
            <motion.a
              href="https://www.booking.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-40 h-24 flex items-center justify-center"
            >
              <img
                src="/booking-com-seeklogo.png"
                alt="Booking.com"
                className="max-w-full max-h-full object-contain"
              />
            </motion.a>

            {/* Agoda */}
            <motion.a
              href="https://www.agoda.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-40 h-24 flex items-center justify-center"
            >
              <img
                src="/Agoda_transparent_logo.png"
                alt="Agoda"
                className="max-w-full max-h-full object-contain"
              />
            </motion.a>

            {/* GetYourGuide */}
            <motion.a
              href="https://www.getyourguide.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-40 h-24 flex items-center justify-center"
            >
              <img
                src="/get-your-guide-seeklogo.png"
                alt="GetYourGuide"
                className="max-w-full max-h-full object-contain"
              />
            </motion.a>

            {/* TripAdvisor */}
            <motion.a
              href="https://www.tripadvisor.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 w-40 h-24 flex items-center justify-center"
            >
              <img
                src="/trip-advisor-seeklogo.png"
                alt="TripAdvisor"
                className="max-w-full max-h-full object-contain"
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactBooking;