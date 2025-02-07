import React, { useState } from 'react';

const Provider = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [identityType, setIdentityType] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
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
    if (!state) newErrors.push('State is required.');
    if (!city) newErrors.push('City is required.');
    if (!pincode || !/^\d{6}$/.test(pincode)) newErrors.push('Valid 6-digit pincode is required.');
    if (!experience || experience.length < 20) newErrors.push('Work experience must be at least 20 characters.');
    if (!skills || skills.length < 10) newErrors.push('Skills must be at least 10 characters.');

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
        State: ${state}
        City: ${city}
        Pincode: ${pincode}
        Experience: ${experience}
        Skills: ${skills}
      `);
      setErrors([]);
      
      setName('');
      setEmail('');
      setPhone('');
      setIdentityType('');
      setIdentityNumber('');
      setAddress('');
      setState('');
      setCity('');
      setPincode('');
      setExperience('');
      setSkills('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl overflow-y-auto h-screen bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Provider Form</h2>

          {errors.length > 0 && (
            <div className="mb-4">
              {errors.map((error, index) => (
                <p key={index} className="text-red-500">{error}</p>
              ))}
            </div>
          )}

          {/* Form Fields */}
          {[
            { label: 'Name', value: name, onChange: setName, type: 'text', placeholder: 'Enter your name' },
            { label: 'Email', value: email, onChange: setEmail, type: 'email', placeholder: 'Enter your email' },
            { label: 'Phone Number', value: phone, onChange: setPhone, type: 'tel', placeholder: 'Enter your phone number' },
            { label: 'State', value: state, onChange: setState, type: 'text', placeholder: 'Enter your state' },
            { label: 'City', value: city, onChange: setCity, type: 'text', placeholder: 'Enter your city' },
            { label: 'Pincode', value: pincode, onChange: setPincode, type: 'text', placeholder: 'Enter your pincode' },
            { label: 'Address', value: address, onChange: setAddress, type: 'text', placeholder: 'Enter your address' },
            { label: 'Experience', value: experience, onChange: setExperience, type: 'textarea', placeholder: 'Describe your work experience...' },
            { label: 'Skills', value: skills, onChange: setSkills, type: 'textarea', placeholder: 'List your skills...' },
          ].map(({ label, value, onChange, type, placeholder }, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-gray-700 font-medium mb-2">{label}</label>
              {type === 'textarea' ? (
                <textarea
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  className="w-full p-2 border rounded bg-white"
                />
              ) : (
                <input
                  type={type}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  className="w-full p-2 border rounded bg-white"
                />
              )}
            </div>
          ))}

          {/* Identity Type */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Identity Type</label>
            <select
              value={identityType}
              onChange={(e) => setIdentityType(e.target.value)}
              className="w-full p-2 border rounded bg-white"
            >
              <option value="">Select Identity Type</option>
              <option value="Aadhaar">Aadhaar</option>
              <option value="Driving License">Driving License</option>
              <option value="PAN">PAN</option>
            </select>
          </div>

          {/* Identity Number */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Identity Number</label>
            <input
              type="text"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              placeholder="Enter your identity number"
              className="w-full p-2 border rounded bg-white"
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
    </div>
  );
};

export default Provider;
