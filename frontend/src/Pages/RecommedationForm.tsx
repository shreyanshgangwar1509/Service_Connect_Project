import axios from 'axios';
import React, { useState } from 'react';

interface Recommendation {
  name: string;
  expertise: string;
  budgetRange: number;
  responseTime: string;
  rating: number;
}

const RecommendationForm: React.FC = () => {
  const [serviceType, setServiceType] = useState('');
  const [budget, setBudget] = useState('');
  const [urgency, setUrgency] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const serviceOptions = [
    'Plumbing',
    'Electrical',
    'House Cleaning',
    'Gardening',
    'Carpentry',
    'Pest Control',
    'Painting',
    'Appliance Repair',
    'HVAC Services',
    'General Maintenance',
  ];

  const urgencyOptions = [
    'Immediate',
    '1h',
    '2h',
    '4h',
    '12h',
    '24h',
    'Flexible',
  ];

  // Dummy recommendations
  const dummyRecommendations: Recommendation[] = [
    {
      name: 'John Doe',
      expertise: 'Plumber',
      budgetRange: 500,
      responseTime: '1 hour',
      rating: 4.5,
    },
    {
      name: 'Jane Smith',
      expertise: 'Electrician',
      budgetRange: 800,
      responseTime: '30 minutes',
      rating: 4.8,
    },
    {
      name: 'Alice Johnson',
      expertise: 'House Cleaner',
      budgetRange: 300,
      responseTime: '2 hours',
      rating: 4.3,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a call to the database (you can replace this with actual backend logic)
    setTimeout(async () => {
      try {
        // Fetch recommendations from your backend (replace with actual API URL)
        const response = await axios.post(`${process.env.BASE_URL}/api/recommendations`, {
          serviceType,
          budget: Number(budget),
          urgency,
        });

        // If the API call is successful, set the recommendations
        setRecommendations(response.data.data || dummyRecommendations); // Default to dummy data if no data
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setRecommendations(dummyRecommendations); // Use dummy data if the API call fails
      }
      setLoading(false);
    }, 1500); // Simulating API call delay
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
        SmartMatch AI  Find the Best Professionals
      </h2>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4"
      >
        {/* Service Type Dropdown */}
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="bg-white w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select Service Type</option>
          {serviceOptions.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>

        {/* Budget Input */}
        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="bg-white w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Urgency Dropdown */}
        <select
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          className="bg-white w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select Urgency</option>
          {urgencyOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition"
        >
          {loading ? 'Loading...' : 'Find Professionals'}
        </button>
      </form>

      {/* Recommendations Section */}
      <div className="w-full max-w-md mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recommendations:</h3>
        {recommendations.length > 0 ? (
          <ul className="space-y-2">
            {recommendations.map((pro, index) => (
              <li
                key={index}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{pro.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{pro.expertise}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Response Time: {pro.responseTime}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Budget Range: ₹{pro.budgetRange}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Rating: ⭐ {pro.rating}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No recommendations yet. Fill the form to get started!</p>
        )}
      </div>
    </div>
  );
};

export default RecommendationForm;
