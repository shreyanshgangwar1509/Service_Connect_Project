

import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface BookingFormProps {
  service: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ service }) => {
  const [currentService, setCurrentService] = useState(service || '');
  const [address, setAddress] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [date, setDate] = useState('');
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const fetchedAddress = response.data.display_name;
          setCurrentAddress(fetchedAddress);
          setAddress(fetchedAddress);
        } catch (err) {
          setError('Failed to fetch address. Please try again.');
        }
      },
      () => setError('Unable to access your location.')
    );
  }, []);

  // Handle checkbox change to toggle address editability
  const handleCheckboxChange = () => {
    setIsEditable(!isEditable);
    if (!isEditable) {
      setAddress('');
    } else {
      setAddress(currentAddress);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentService || !address || !date) {
      setError('Please fill out all fields before submitting.');
      return;
    }

    alert(`Booking Details:\nService: ${currentService}\nAddress: ${address}\nDate: ${date}`);

    // Clear form fields
    setCurrentService('');
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
          <label className="block text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded bg-white"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
