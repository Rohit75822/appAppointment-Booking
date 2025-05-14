export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  image: string;
  category: string;
}

export interface TimeSlot {
  id: string;
  startTime: Date;
  endTime: Date;
  available: boolean;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  createdAt: Date;
}