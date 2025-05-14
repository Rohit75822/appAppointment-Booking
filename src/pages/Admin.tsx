import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronDown, ChevronUp, Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useAppointment } from '../context/AppointmentContext';

const Admin = () => {
  const { appointments, services } = useAppointment();
  const [activeTab, setActiveTab] = useState('appointments');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAppointment, setExpandedAppointment] = useState<string | null>(null);
  
  useEffect(() => {
    document.title = 'Admin Dashboard - AppointEase';
  }, []);

  const toggleAppointmentDetails = (appointmentId: string) => {
    if (expandedAppointment === appointmentId) {
      setExpandedAppointment(null);
    } else {
      setExpandedAppointment(appointmentId);
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const searchLower = searchTerm.toLowerCase();
    return (
      appointment.customerName.toLowerCase().includes(searchLower) ||
      appointment.serviceName.toLowerCase().includes(searchLower) ||
      appointment.customerEmail.toLowerCase().includes(searchLower) ||
      format(new Date(appointment.date), 'MMMM d, yyyy').toLowerCase().includes(searchLower)
    );
  });

  const filteredServices = services.filter(service => {
    const searchLower = searchTerm.toLowerCase();
    return (
      service.name.toLowerCase().includes(searchLower) ||
      service.category.toLowerCase().includes(searchLower) ||
      service.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage appointments, services, and business settings</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search appointments, services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 font-medium text-sm mr-4 border-b-2 transition-colors ${
              activeTab === 'appointments' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 font-medium text-sm mr-4 border-b-2 transition-colors ${
              activeTab === 'services' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveTab('availability')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'availability' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Availability
          </button>
        </div>

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {filteredAppointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAppointments.map(appointment => (
                      <React.Fragment key={appointment.id}>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{appointment.customerName}</div>
                            <div className="text-sm text-gray-500">{appointment.customerEmail}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{appointment.serviceName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {format(new Date(appointment.date), 'MMMM d, yyyy')}
                            </div>
                            <div className="text-sm text-gray-500">
                              {format(new Date(appointment.startTime), 'h:mm a')} - {format(new Date(appointment.endTime), 'h:mm a')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                              new Date(appointment.startTime) > new Date()
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {new Date(appointment.startTime) > new Date() ? 'Upcoming' : 'Completed'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => toggleAppointmentDetails(appointment.id)}
                              className="text-blue-600 hover:text-blue-900 ml-4"
                            >
                              {expandedAppointment === appointment.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                            </button>
                          </td>
                        </tr>
                        {expandedAppointment === appointment.id && (
                          <tr>
                            <td colSpan={5} className="px-6 py-4 bg-gray-50">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 mb-1">Contact Information</h4>
                                  <p className="text-sm mb-2">Phone: {appointment.customerPhone}</p>
                                  <h4 className="text-sm font-medium text-gray-500 mb-1">Additional Notes</h4>
                                  <p className="text-sm">{appointment.notes || "No additional notes"}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 mb-1">Appointment ID</h4>
                                  <p className="text-sm mb-2">{appointment.id}</p>
                                  <h4 className="text-sm font-medium text-gray-500 mb-1">Created On</h4>
                                  <p className="text-sm">{format(new Date(appointment.createdAt), 'MMMM d, yyyy h:mm a')}</p>
                                </div>
                              </div>
                              <div className="mt-4 flex space-x-3">
                                <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition duration-300 flex items-center">
                                  <Pencil className="h-3 w-3 mr-1" />
                                  Edit
                                </button>
                                <button className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition duration-300 flex items-center">
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Cancel
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Calendar className="h-16 w-16 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Appointments Found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? "No appointments match your search criteria." : "There are no appointments in the system yet."}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Manage Services</h2>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300 flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                Add Service
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <div key={service.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {service.category}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-500 hover:text-blue-600">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                    <div className="flex justify-between">
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{service.durationMinutes} min</span>
                      </div>
                      <span className="font-bold text-gray-900">${service.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredServices.length === 0 && (
              <div className="p-8 text-center bg-white rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Services Found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? "No services match your search criteria." : "There are no services in the system yet."}
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300 flex items-center mx-auto">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Your First Service
                </button>
              </div>
            )}
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Business Hours</h2>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                Save Changes
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                <div key={day} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-32">
                      <span className="font-medium text-gray-800">{day}</span>
                    </div>
                    <div className="flex items-center ml-4">
                      <select className="border border-gray-300 rounded-md mr-2 p-2 text-sm">
                        {Array.from({ length: 13 }, (_, i) => i + 8).map(hour => (
                          <option key={hour} value={hour}>
                            {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
                          </option>
                        ))}
                      </select>
                      <span className="mx-2">to</span>
                      <select className="border border-gray-300 rounded-md p-2 text-sm">
                        {Array.from({ length: 13 }, (_, i) => i + 9).map(hour => (
                          <option key={hour} value={hour}>
                            {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={index < 6} className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {index < 6 ? "Open" : "Closed"}
                    </span>
                  </label>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Closures</h3>
              <div className="flex items-end space-x-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input 
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <input 
                    type="text"
                    placeholder="Holiday, Staff Training, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-300">
                  Add
                </button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-500">No special closures have been added yet.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;