import { CheckCircle } from 'lucide-react';
import { Order } from './Order';

interface OrderHeaderProps {
  order: Order;
}

export function OrderHeader({ order }: OrderHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Order #{order.id}</h2>
        <p className="text-gray-600">{order.serviceType}</p>
      </div>
      <div className="flex items-center text-green-600">
        <CheckCircle className="mr-2" />
        <span>Order Confirmed</span>
      </div>
    </div>
  );
}