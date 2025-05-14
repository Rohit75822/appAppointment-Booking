import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ExternalLink, AlertCircle } from 'lucide-react';
import { format, isAfter } from 'date-fns';
import { useAppointment } from '../context/AppointmentContext';
import { Appointment } from '../types';

const Dashboard = () => {
  const { appointments, cancelAppointment } = useAppointment();
  const [activeTab, setActiveTab] = useState('upcoming');
  
  useEffect(() => {
    document.title = 'My Appointments - AppointEase';
  }, []);

  const upcomingAppointments = appointments.filter(appointment => 
    isAfter(new Date(appointment.startTime), new Date())
  );
  
  const pastAppointments = appointments.filter(appointment => 
    !isAfter(new Date(appointment.startTime), new Date())
  );

  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelClick = (appointment: Appointment) => {
    setAppointmentToCancel(appointment);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (appointmentToCancel) {
      cancelAppointment(appointmentToCancel.id);
      setShowCancelModal(false);
      setAppointmentToCancel(null);
    }
  };

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
    const isUpcoming = isAfter(new Date(appointment.startTime), new Date());
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-shadow duration-300 hover:shadow-md">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{appointment.serviceName}</h3>
              <div className="flex items-center text-gray-600 mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">{format(new Date(appointment.date), 'EEEE, MMMM d, yyyy')}</span>
              </div>
            </div>
            {isUpcoming && (
              <button
                onClick={() => handleCancelClick(appointment)}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Cancel
              </button>
            )}
          </div>
          
          <div className="flex items-center text-gray-700 mb-4">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {format(new Date(appointment.startTime), 'h:mm a')} - {format(new Date(appointment.endTime), 'h:mm a')}
            </span>
          </div>
          
          {appointment.notes && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 italic">"{appointment.notes}"</p>
            </div>
          )}
          
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="text-gray-500">Confirmation #:</p>
                <p className="font-medium text-gray-900">{appointment.id.substring(5, 13).toUpperCase()}</p>
              </div>
              {isUpcoming && (
                <Link 
                  to="/booking" 
                  className="flex items-center text-blue-600 text-sm font-medium hover:text-blue-800"
                >
                  Reschedule
                  <ExternalLink className="h-4 w-4 ml-1" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">View and manage your scheduled appointments</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 font-medium text-sm mr-4 border-b-2 transition-colors ${
              activeTab === 'upcoming' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming ({upcomingAppointments.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'past' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Past ({pastAppointments.length})
          </button>
        </div>

        {/* Appointments List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeTab === 'upcoming' && (
            <>
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map(appointment => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              ) : (
                <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <Calendar className="h-16 w-16 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Upcoming Appointments</h3>
                  <p className="text-gray-600 mb-6">You don't have any appointments scheduled.</p>
                  <Link
                    to="/booking"
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Book an Appointment
                  </Link>
                </div>
              )}
            </>
          )}

          {activeTab === 'past' && (
            <>
              {pastAppointments.length > 0 ? (
                pastAppointments.map(appointment => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              ) : (
                <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <Calendar className="h-16 w-16 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Past Appointments</h3>
                  <p className="text-gray-600 mb-6">You don't have any past appointment history.</p>
                  <Link
                    to="/booking"
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Book an Appointment
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4 text-red-600">
              <AlertCircle className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-semibold">Cancel Appointment</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to cancel your {appointmentToCancel?.serviceName} appointment on {format(new Date(appointmentToCancel?.date || new Date()), 'MMMM d')} at {format(new Date(appointmentToCancel?.startTime || new Date()), 'h:mm a')}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition duration-300"
              >
                Keep Appointment
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;