import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, DollarSign } from 'lucide-react';
import { Service } from '../../types';
import { useAppointment } from '../../context/AppointmentContext';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { setSelectedService } = useAppointment();
  
  const handleSelect = () => {
    setSelectedService(service);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
      <div className="h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {service.category}
          </span>
          <div className="flex items-center text-gray-700">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{service.durationMinutes} min</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-900 font-bold">
            <DollarSign className="h-5 w-5" />
            <span>${service.price}</span>
          </div>
          <Link 
            to="/booking"
            onClick={handleSelect}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 text-sm"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;