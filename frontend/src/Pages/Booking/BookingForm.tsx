import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Interface for component props
interface BookingFormProps {
  service: string;
  charges: number;
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

const BookingForm: React.FC<BookingFormProps> = ({ service, charges }) => {
  const [currentService, setCurrentService] = useState(service || '');
  const [address, setAddress] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [time, setTime] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(charges || 0);

  // Generate time slots
  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];
    for (let hour = 9; hour < 21; hour++) {
      const start = `${hour}am - ${hour + 1}am`;
      slots.push(start);
    }
    slots.push("9pm - 10pm");
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Update total if charges change
  useEffect(() => {
    setTotal(Number(charges) || 0);
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
          setCurrentAddress(response.data.display_name);
          setAddress(response.data.display_name);
        } catch (err) {
          setError('Failed to fetch address. Please try again.');
        }
      },
      () => setError('Unable to access your location.')
    );
  }, []);

  const handleCheckboxChange = () => {
    setIsEditable(!isEditable);
    setAddress(isEditable ? currentAddress : '');
  };

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay script'));
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (options: RazorpayOptions): Promise<void> => {
    try {
      await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Razorpay SDK failed to load:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentService || !address || !selectedDate || !time) {
      setError('Please fill out all fields before submitting.');
      return;
    }

    const options: RazorpayOptions = {
      key: 'rzp_test_YsmTMZihOBVTve',
      amount: Math.round(total * 100),
      currency: 'INR',
      name: 'Service Connect',
      description: `Booking for ${currentService}`,
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Book a Service</h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col space-y-2">
          <label>Service</label>
          <input
            type="text"
            value={currentService}
            onChange={(e) => setCurrentService(e.target.value)}
            placeholder="Enter your service"
            className="w-full p-2 border rounded bg-white"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={!isEditable}
            className="w-full bg-white text-black p-2 border rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isEditable}
              onChange={handleCheckboxChange}
            />
            <span>Edit Address</span>
          </label>
        </div>

        <div className="flex flex-col space-y-2">
          <label>Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full p-2 border rounded bg-white"
            placeholderText="Select a date"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label>Time</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded bg-white"
            required
          >
            <option value="">Select Time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <p className="text-lg font-semibold">Price: ₹{total} INR</p>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Book Now - ₹{total} INR
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
