import axios from 'axios';
import { useState } from 'react';

const ResultScreen = ({ detectedIssue }: { detectedIssue: string }) => {
  const [suggestion, setSuggestion] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchRecommendation = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${import.meta.env.BACKEND_URL}/api/recommendation`, { detectedIssue });
      setSuggestion(data.suggestion);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      setSuggestion('Failed to fetch recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-xl font-bold mb-4">Detected Issue</h2>
      <p className="text-gray-700 mb-6">{detectedIssue}</p>
      <button
        onClick={fetchRecommendation}
        disabled={loading}
        className={`px-4 py-2 rounded-lg text-white ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Loading...' : 'Get Recommendation'}
      </button>
      {suggestion && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold">Recommendation:</h3>
          <p className="text-gray-600">{suggestion}</p>
        </div>
      )}
    </div>
  );
};

export default ResultScreen;
