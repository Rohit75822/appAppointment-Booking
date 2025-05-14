import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, Users } from 'lucide-react';
import { useAppointment } from '../context/AppointmentContext';
import ServiceCard from '../components/services/ServiceCard';

const Home = () => {
  const { services } = useAppointment();

  useEffect(() => {
    document.title = 'AppointEase - Easy Online Appointment Booking';
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-blue-900 opacity-20"></div>
          {/* Decorative elements */}
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full"></div>
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Book Your Appointments <br />
                <span className="text-blue-300">Effortlessly</span>
              </motion.h1>
              <motion.p 
                className="text-lg text-blue-100 mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Schedule services online, manage your appointments, and receive reminders—all in one place. No more phone tag or scheduling headaches.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link 
                  to="/booking" 
                  className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition duration-300 flex items-center justify-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Appointment
                </Link>
                <Link 
                  to="/dashboard" 
                  className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition duration-300 flex items-center justify-center"
                >
                  <Users className="h-5 w-5 mr-2" />
                  My Appointments
                </Link>
              </motion.div>
            </div>
            <div className="md:w-1/2 px-4 md:px-0">
              <motion.div 
                className="rounded-xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <img 
                  src="https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Appointment Booking" 
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              Why Choose Our Booking System
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              Streamline your scheduling process and enhance your customer experience
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Calendar className="h-10 w-10 text-blue-600" />,
                title: "Easy Scheduling",
                description: "Book appointments in just a few clicks, 24/7 from anywhere"
              },
              {
                icon: <Clock className="h-10 w-10 text-blue-600" />,
                title: "Save Time",
                description: "No more waiting on hold or playing phone tag to book services"
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-blue-600" />,
                title: "Instant Confirmation",
                description: "Receive immediate confirmation and reminders for your appointments"
              },
              {
                icon: <Users className="h-10 w-10 text-blue-600" />,
                title: "Manage Bookings",
                description: "View, reschedule, or cancel your appointments with ease"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-4 bg-blue-50 rounded-full inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              Our Services
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              Discover our range of premium services and book your appointment today
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service, index) => (
              <motion.div 
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/booking" 
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 inline-flex items-center"
            >
              View All Services
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                Ready to Book Your Appointment?
              </motion.h2>
              <motion.p 
                className="text-lg text-blue-100 mb-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                Join thousands of satisfied clients who love our simple booking system
              </motion.p>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Link 
                  to="/booking" 
                  className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition duration-300 inline-flex items-center"
                >
                  Book Now
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </div>
            <div className="lg:w-1/3">
              <motion.div 
                className="bg-white/10 p-6 md:p-8 rounded-xl backdrop-blur-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=300" 
                      alt="Customer" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="italic mb-4">
                  "AppointEase has completely transformed how I book my salon appointments. No more waiting on hold or forgetting my appointments. The reminders are also super helpful!"
                </p>
                <span className="text-sm text-blue-200">Regular Customer - 2 years</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;