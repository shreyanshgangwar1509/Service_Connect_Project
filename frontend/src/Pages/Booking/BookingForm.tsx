import axios from 'axios';
import { Calendar } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Interface for component props
interface BookingFormProps {
  service: string;
  charges: number; // Ensure charges is passed as a numeric value
}

// Interface for Razorpay options
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
}

// Interface for Razorpay response
interface RazorpayResponse {
  razorpay_payment_id: string;
}

// Interface for GeoLocation Coordinates
interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
}

// Main Component
const BookingForm: React.FC<BookingFormProps> = ({ service, charges }) => {
  const [currentService, setCurrentService] = useState<string>(service || '');
  const [address, setAddress] = useState<string>('');
  const [currentAddress, setCurrentAddress] = useState<string>('');
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(charges || 0);

  // Update total if charges change
  useEffect(() => {
    if (typeof charges === 'number') {
      setTotal(charges);
    } else {
      const numericCharges = parseFloat(String(charges).replace(/[^0-9.]/g, ''));
      setTotal(isNaN(numericCharges) ? 0 : numericCharges);
    }
  }, [charges]);

  // Fetch current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position: { coords: GeolocationCoordinates }) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const fetchedAddress: string = response.data.display_name;
          setCurrentAddress(fetchedAddress);
          setAddress(fetchedAddress);
        } catch (err) {
          setError('Failed to fetch address. Please try again.');
        }
      },
      () => setError('Unable to access your location.')
    );
  }, []);

  // Handle checkbox for editable address
  const handleCheckboxChange = () => {
    setIsEditable(!isEditable);
    if (!isEditable) {
      setAddress('');
    } else {
      setAddress(currentAddress);
    }
  };

  // Load Razorpay script dynamically
  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay script'));
      document.body.appendChild(script);
    });
  };

  // Display Razorpay modal
  const displayRazorpay = async (options: RazorpayOptions): Promise<void> => {
    try {
      await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Razorpay SDK failed to load:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentService || !address || !date) {
      setError('Please fill out all fields before submitting.');
      return;
    }

    if (total <= 0) {
      setError('Invalid service charges. Please contact support.');
      return;
    }

    const amountInPaise = Math.round(total * 100);

    const options: RazorpayOptions = {
      key: 'rzp_test_YsmTMZihOBVTve',
      amount: amountInPaise,
      currency: 'INR',
      name: 'Service Connect',
      description: `Booking for ${currentService}`,
      image: 'https://your-logo-url.com',
      handler: (response: RazorpayResponse) => {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        contact: '1234567890',
      },
    };

    await displayRazorpay(options);

    // Reset form fields
    setCurrentService(service || '');
    setAddress(currentAddress);
    setDate('');
    setIsEditable(false);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Book a Service</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Service Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Service</label>
          <input
            type="text"
            value={currentService}
            onChange={(e) => setCurrentService(e.target.value)}
            placeholder="Enter your service"
            className="w-full p-2 border rounded bg-white"
            required
          />
        </div>

        {/* Address Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={!isEditable}
            placeholder="Enter your address"
            className={`w-full p-2 border rounded ${isEditable ? 'bg-white' : 'bg-gray-200'}`}
            required
          />
          <div className="mt-2 flex items-center bg-white">
            <input
              type="checkbox"
              id="editAddress"
              checked={isEditable}
              onChange={handleCheckboxChange}
              className="mr-2 bg-white"
            />
            <label htmlFor="editAddress" className="text-sm text-gray-600">
              I want to change my address
            </label>
          </div>
        </div>

        {/* Date Input */}
        <div className="mb-6">
          <div className="m-2 flex items-center flex-row gap-2">
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <Calendar />
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded bg-white"
            required
          />
        </div>

        {/* Price Display */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <p className="text-lg text-gray-900">₹{total} INR</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Book Now - ₹{total} INR
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
