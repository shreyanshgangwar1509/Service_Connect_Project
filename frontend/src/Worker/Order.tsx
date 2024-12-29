export interface Order {
  id: string;
  customerName: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  serviceType: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed';
  customerPhone: string;
  date: string;
  time: string;
}