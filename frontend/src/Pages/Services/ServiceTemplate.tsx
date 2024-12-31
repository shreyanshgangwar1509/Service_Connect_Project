import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Worker {
  id: string;
  name: string;
  charges: number;
  rating: number;
}

const api = axios.create({
  baseURL: 'http://localhost:3000', // Backend API base URL
  withCredentials: true, // Ensures cookies are included
});

function ServiceTemplate({ serviceName }: { serviceName: string }) {
  const [workerData, setWorkerData] = useState<Worker[]>([]); // Initialized as empty array
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => setCurrentLocation(position),
      () => setError("Failed to get location")
    );
  }, []);

  // Fetch workers data
  useEffect(() => {
    if (currentLocation) {
      const fetchWorkerData = async () => {
        try {
          const token = localStorage.getItem('token') || '{}';
          const response = await api.get(
            `api/worker/${serviceName}?longitude=${currentLocation.coords.longitude}&latitude=${currentLocation.coords.latitude}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          console.log(response.data);
          // Ensure response is an array before setting
          if (Array.isArray(response.data)) {
            setWorkerData(response.data);
          } else {
            throw new Error('Invalid data format: Expected an array');
          }

          setLoading(false);
        } catch (error) {
          setError("Failed to fetch worker data");
          console.error(error);
          setLoading(false);
        }
      };

      fetchWorkerData();
    }
  }, [currentLocation, serviceName]);

  const book = (worker: Worker) => {
    navigate("/book", { state: { service: serviceName.toLowerCase(), price: worker.charges } });
  };

  return (
    <div className="container mt-10 mx-auto p-4">
      {/* AI Suggestion Section */}
      <div className="bg-gray-100 p-4 rounded-lg text-center mb-6 shadow-sm">
        <p className="text-gray-700 mb-2">
          Don’t know who to contact? Use our Smart AI Suggestion to get the best provider in your locality.
        </p>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
          onClick={() => navigate('/recommendation')}
        >
          AI Suggestion
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Available {serviceName} Professionals</h1>

      {/* Display loading state or error */}
      {loading ? (
        <p className="text-blue-500">Loading professionals...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workerData.length > 0 ? (
            workerData.map((worker) => (
              <Card key={worker.id} className="p-4 shadow-md rounded-lg flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{worker.name}</h2>
                  <p className="text-gray-600 mb-1">Charges: {worker.charges} </p>
                  <p className="text-yellow-500 mb-4">Rating: {worker.rating} ⭐</p>
                </div>
                <div className="flex justify-end gap-2 mt-auto">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => book(worker)}
                  >
                    Book Now
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => navigate("/chat")}
                  >
                    Chat
                  </button>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No professionals available at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ServiceTemplate;
