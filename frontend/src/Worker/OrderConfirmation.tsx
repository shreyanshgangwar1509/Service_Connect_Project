import React from 'react';
import { OrderHeader } from './OrderHeader';
import { OrderDetails } from './OrderDetail';
import { CustomerContact } from './CostumerContact';
import { PaymentQR } from './PaymentQR';
import { Order } from './Order';

interface OrderConfirmationPageProps {
  orderId?: string; // Will be used to fetch order details in a real app
}

// In a real app, this would be fetched based on the orderId
const mockOrder: Order = {
  id: "123",
  customerName: "John Doe",
  location: {
    lat: 40.7128,
    lng: -74.0060
  },
  address: "123 Main St, New York, NY 10001",
  serviceType: "Home Cleaning",
  amount: 75.00,
  status: "confirmed",
  customerPhone: "+1234567890",
  date: "2024-03-15",
  time: "14:00 - 16:00"
};

export function OrderConfirmationPage({ orderId }: OrderConfirmationPageProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Service Connect</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <OrderHeader order={mockOrder} />
          <OrderDetails order={mockOrder} />
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-lg font-medium mb-4">Customer Contact</h3>
            <div className="mb-4">
              <p className="text-gray-600">Customer Name: {mockOrder.customerName}</p>
            </div>
            <CustomerContact 
              phoneNumber={mockOrder.customerPhone} 
              address={mockOrder.address}
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium mb-4">Payment</h3>
            <PaymentQR amount={mockOrder.amount} orderId={mockOrder.id} />
          </div>
        </div>
      </main>
    </div>
  );
}