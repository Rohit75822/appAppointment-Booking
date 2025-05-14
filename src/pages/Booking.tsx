import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import { useAppointment } from '../context/AppointmentContext';
import ServiceCard from '../components/services/ServiceCard';

const Booking = () => {
  const navigate = useNavigate();
  const { 
    services, 
    selectedService, 
    selectedDate, 
    selectedTimeSlot,
    setSelectedService,
    setSelectedDate,
    setSelectedTimeSlot,
    getAvailableTimeSlots,
    bookAppointment
  } = useAppointment();

  const [step, setStep] = useState(selectedService ? 1 : 0);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  // Generate date range for the next 14 days
  const dateRange = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));
  
  useEffect(() => {
    document.title = 'Book Your Appointment - AppointEase';
  }, []);

  useEffect(() => {
    if (selectedService && selectedDate) {
      const slots = getAvailableTimeSlots(selectedDate, selectedService.id);
      setAvailableTimeSlots(slots);
    }
  }, [selectedService, selectedDate, getAvailableTimeSlots]);

  // Handle service selection
  useEffect(() => {
    if (selectedService) {
      setStep(1);
    }
  }, [selectedService]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setStep(1);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setStep(2);
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bookAppointment(customerDetails);
    navigate('/dashboard');
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
      if (step === 1) {
        setSelectedService(null);
      } else if (step === 2) {
        setSelectedTimeSlot(null);
      }
    }
  };

  const isFormValid = () => {
    return customerDetails.name.trim() !== '' && 
           customerDetails.email.trim() !== '' && 
           customerDetails.phone.trim() !== '';
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Booking Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {['Select Service', 'Choose Date & Time', 'Your Details'].map((title, index) => (
              <div key={index} className="flex flex-col items-center w-1/3">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full mb-2 ${step >= index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {index + 1}
                </div>
                <span className={`text-xs sm:text-sm font-medium ${step >= index ? 'text-blue-600' : 'text-gray-500'}`}>
                  {title}
                </span>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-2 grid grid-cols-3 gap-0">
            <div className={`h-1 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          </div>
        </div>

        {/* Back Button */}
        {step > 0 && (
          <div className="mb-6">
            <button 
              onClick={goBack}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>Back</span>
            </button>
          </div>
        )}

        {/* Step Content */}
        <motion.div
          key={step}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          {/* Step 0: Select Service */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                  <div 
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="cursor-pointer"
                  >
                    <ServiceCard service={service} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Select Date and Time */}
          {step === 1 && selectedService && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Date & Time</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Select a Date
                </h3>
                <div className="flex overflow-x-auto pb-4 scrollbar-hide space-x-2">
                  {dateRange.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      className={`flex-shrink-0 flex flex-col items-center justify-center px-4 py-3 rounded-lg border transition-colors ${
                        isSameDay(selectedDate, date)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <span className="text-xs font-medium mb-1">
                        {format(date, 'EEE')}
                      </span>
                      <span className="text-xl font-bold">
                        {format(date, 'd')}
                      </span>
                      <span className="text-xs">
                        {format(date, 'MMM')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Select a Time Slot
                </h3>
                {availableTimeSlots.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {availableTimeSlots.map((slot) => (
                      <button
                        key={slot.id}
                        onClick={() => slot.available && handleTimeSelect(slot)}
                        disabled={!slot.available}
                        className={`px-4 py-3 rounded-lg border text-center transition-colors ${
                          selectedTimeSlot && selectedTimeSlot.id === slot.id
                            ? 'bg-blue-600 text-white border-blue-600'
                            : slot.available
                            ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        }`}
                      >
                        {format(slot.startTime, 'h:mm a')}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No available time slots for the selected date. Please choose another date.</p>
                )}
              </div>

              {selectedTimeSlot && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Customer Details */}
          {step === 2 && selectedService && selectedTimeSlot && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Details</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-gray-800 mb-2">Booking Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Service:</p>
                    <p className="font-medium text-gray-900">{selectedService.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price:</p>
                    <p className="font-medium text-gray-900">${selectedService.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date:</p>
                    <p className="font-medium text-gray-900">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time:</p>
                    <p className="font-medium text-gray-900">{format(selectedTimeSlot.startTime, 'h:mm a')} - {format(selectedTimeSlot.endTime, 'h:mm a')}</p>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerDetails.name}
                      onChange={handleCustomerInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerDetails.email}
                      onChange={handleCustomerInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerDetails.phone}
                      onChange={handleCustomerInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={customerDetails.notes}
                      onChange={handleCustomerInfoChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!isFormValid()}
                    className={`px-6 py-2 font-medium rounded-lg transition duration-300 ${
                      isFormValid()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;