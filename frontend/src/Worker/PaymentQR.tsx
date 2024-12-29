import { QRCodeSVG } from 'qrcode.react';

interface PaymentQRProps {
  amount: number;
  orderId: string;
}

export function PaymentQR({ amount, orderId }: PaymentQRProps) {
  // In a real app, this would be a payment gateway URL
  const paymentData = `order=${orderId}&amount=${amount}`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Payment QR Code</h3>
      <div className="flex flex-col items-center">
        <QRCodeSVG value={paymentData} size={200} />
        <p className="mt-4 text-lg font-semibold">Amount: ${amount}</p>
      </div>
    </div>
  );
}