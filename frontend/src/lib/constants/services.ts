import {
  Car,
  Home,
  Paintbrush,
  Scissors,
  Shirt,
  Users,
  Wifi,
  Wrench
} from 'lucide-react';

export const services = [
  { 
    id: 'plumbing',
    icon: Wrench, 
    name: 'Plumbing', 
    color: 'text-blue-500',
    description: 'Expert plumbing services for your home',
    price: 'Starts at ₹299'
  },
  { 
    id: 'painting',
    icon: Paintbrush, 
    name: 'Painting', 
    color: 'text-green-500',
    description: 'Professional home painting services',
    price: 'Starts at ₹999'
  },
  { 
    id: 'cleaning',
    icon: Home, 
    name: 'Home Cleaning', 
    color: 'text-purple-500',
    description: 'Complete home cleaning solutions',
    price: 'Starts at ₹399'
  },
  { 
    id: 'car',
    icon: Car, 
    name: 'Car Repair', 
    color: 'text-red-500',
    description: 'Professional car repair and service',
    price: 'Starts at ₹499'
  },
  { 
    id: 'salon',
    icon: Scissors, 
    name: 'Salon', 
    color: 'text-pink-500',
    description: 'Salon services at your doorstep',
    price: 'Starts at ₹199'
  },
  { 
    id: 'laundry',
    icon: Shirt, 
    name: 'Laundry', 
    color: 'text-yellow-500',
    description: 'Professional laundry services',
    price: 'Starts at ₹99'
  },
  { 
    id: 'electronics',
    icon: Wifi, 
    name: 'Electronics', 
    color: 'text-indigo-500',
    description: 'Electronics repair and installation',
    price: 'Starts at ₹299'
  },
  { 
    id: 'events',
    icon: Users, 
    name: 'Event Help', 
    color: 'text-orange-500',
    description: 'Event planning and support',
    price: 'Starts at ₹999'
  }
];