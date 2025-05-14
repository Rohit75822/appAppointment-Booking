import React, { createContext, useState, useContext, ReactNode } from 'react';
import { addDays, format } from 'date-fns';
import { Service, TimeSlot, Appointment } from '../types';
import { serviceData } from '../data/services';

interface AppointmentContextType {
  services: Service[];
  selectedService: Service | null;
  selectedDate: Date;
  selectedTimeSlot: TimeSlot | null;
  appointments: Appointment[];
  setSelectedService: (service: Service | null) => void;
  setSelectedDate: (date: Date) => void;
  setSelectedTimeSlot: (timeSlot: TimeSlot | null) => void;
  bookAppointment: (customerDetails: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  }) => void;
  getAvailableTimeSlots: (date: Date, serviceId: string) => TimeSlot[];
  cancelAppointment: (appointmentId: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};

interface AppointmentProviderProps {
  children: ReactNode;
}

export const AppointmentProvider = ({ children }: AppointmentProviderProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services] = useState<Service[]>(serviceData);

  // Generate time slots from 9 AM to 5 PM with 30-minute intervals
  const generateTimeSlots = (date: Date, serviceId: string): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const serviceLength = services.find(s => s.id === serviceId)?.durationMinutes || 30;
    
    // Start at 9 AM
    let currentTime = new Date(date);
    currentTime.setHours(9, 0, 0, 0);
    
    // End at 5 PM
    const endTime = new Date(date);
    endTime.setHours(17, 0, 0, 0);
    
    while (currentTime < endTime) {
      const startTime = new Date(currentTime);
      const endTimeForSlot = new Date(currentTime);
      endTimeForSlot.setMinutes(currentTime.getMinutes() + serviceLength);
      
      if (endTimeForSlot <= endTime) {
        slots.push({
          id: `${format(startTime, 'HHmm')}-${serviceId}`,
          startTime: startTime,
          endTime: endTimeForSlot,
          available: true
        });
      }
      
      // Move to next slot (30 minute intervals)
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
    
    return slots;
  };

  const getAvailableTimeSlots = (date: Date, serviceId: string): TimeSlot[] => {
    const slots = generateTimeSlots(date, serviceId);
    
    // Mark slots as unavailable if they overlap with existing appointments
    return slots.map(slot => {
      const isBooked = appointments.some(appointment => {
        const apptDate = new Date(appointment.date);
        return (
          format(apptDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') &&
          (
            (slot.startTime >= appointment.startTime && slot.startTime < appointment.endTime) ||
            (slot.endTime > appointment.startTime && slot.endTime <= appointment.endTime) ||
            (slot.startTime <= appointment.startTime && slot.endTime >= appointment.endTime)
          )
        );
      });
      
      return {
        ...slot,
        available: !isBooked
      };
    });
  };

  const bookAppointment = (customerDetails: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  }) => {
    if (!selectedService || !selectedTimeSlot) {
      return;
    }

    const newAppointment: Appointment = {
      id: `appt-${Date.now()}`,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      date: selectedDate,
      startTime: selectedTimeSlot.startTime,
      endTime: selectedTimeSlot.endTime,
      customerName: customerDetails.name,
      customerEmail: customerDetails.email,
      customerPhone: customerDetails.phone,
      notes: customerDetails.notes,
      createdAt: new Date()
    };

    setAppointments([...appointments, newAppointment]);
    
    // Reset selection
    setSelectedService(null);
    setSelectedTimeSlot(null);
  };

  const cancelAppointment = (appointmentId: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
  };

  return (
    <AppointmentContext.Provider
      value={{
        services,
        selectedService,
        selectedDate,
        selectedTimeSlot,
        appointments,
        setSelectedService,
        setSelectedDate,
        setSelectedTimeSlot,
        bookAppointment,
        getAvailableTimeSlots,
        cancelAppointment
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};