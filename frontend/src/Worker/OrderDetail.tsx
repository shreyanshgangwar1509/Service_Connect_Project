import { Clock, MapPin } from 'lucide-react';
import { Order } from './Order';

interface OrderDetailsProps {
  order: Order;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <Clock className="mr-2 text-gray-500" size={20} />
          <h4 className="font-medium">Service Time</h4>
        </div>
        <p className="text-gray-600">Date: {order.date}</p>
        <p className="text-gray-600">Time: {order.time}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <MapPin className="mr-2 text-gray-500" size={20} />
          <h4 className="font-medium">Location</h4>
        </div>
        <p className="text-gray-600">{order.address}</p>
      </div>
    </div>
  );
}