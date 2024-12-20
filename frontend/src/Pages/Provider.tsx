import React, { useState } from 'react';

const Provider = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [identityType, setIdentityType] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    // Basic validation
    if (!name) newErrors.push('Name is required.');
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.push('Valid email is required.');
    if (!phone || !/^\d{10}$/.test(phone)) newErrors.push('Valid 10-digit phone number is required.');
    if (!identityType) newErrors.push('Identity type is required.');
    if (!identityNumber) newErrors.push('Identity number is required.');
    if (!address) newErrors.push('Address is required.');

    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      alert(`
        Form Submitted Successfully!
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Identity Type: ${identityType}
        Identity Number: ${identityNumber}
        Address: ${address}
      `);
      setErrors([]);
      // Clear form fields
      setName('');
      setEmail('');
      setPhone('');
      setIdentityType('');
      setIdentityNumber('');
      setAddress('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 mt-[10%]s">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Provider Form</h2>

        {errors.length > 0 && (
            <div className="mb-4">
            {errors.map((error, index) => (
              <p key={index} className="text-red-500">
                {error}
              </p>
            ))}
          </div>
        )}

        {/* Name Input */}
        <div className="mb-4 bg-white">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border rounded bg-white"
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700  bg-white font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border rounded bg-white "
          />
        </div>

        {/* Phone Number Input */}
        <div className="mb-4">
          <label className="block text-gray-700 bg-white font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full p-2 border rounded bg-white "
          />
        </div>

        {/* Identity Type Select */}
        <div className="mb-4">
          <label className="block text-gray-700 bg-white  font-medium mb-2">Identity Type</label>
          <select
            value={identityType}
            onChange={(e) => setIdentityType(e.target.value)}
            className="w-full p-2 border rounded bg-white "
          >
            <option value="">Select Identity Type</option>
            <option value="Aadhaar">Aadhaar Number</option>
            <option value="Driving License">Driving License</option>
            <option value="PAN">PAN</option>
          </select>
        </div>

        {/* Identity Number Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Identity Number</label>
          <input
            type="text"
            value={identityNumber}
            onChange={(e) => setIdentityNumber(e.target.value)}
            placeholder="Enter your identity number"
            className="w-full p-2 border rounded bg-white "
          />
        </div>

        {/* Address Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full p-2 border rounded bg-white "
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Provider;
