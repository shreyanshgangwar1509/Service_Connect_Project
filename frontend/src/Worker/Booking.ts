export interface Booking {
    id: string;
    serviceType: string;
    address: string;
    date: string;
    time: string;
    status: 'upcoming' | 'completed';
    rating?: number;
    review?: string;
  }