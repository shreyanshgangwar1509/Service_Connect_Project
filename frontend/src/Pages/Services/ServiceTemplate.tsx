import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Worker {
  id: string;
  name: string;
  charges: string;
  rating: number;
}

function ServiceTemplate({ serviceName, dummyData }: { serviceName: string; dummyData: Worker[] }) {
  const [workerData, setWorkerData] = useState<Worker[]>([]);
  const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation(position);
      },
      (err) => {
        setError("Failed to get location");
      }
    );
  }, []);

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      setWorkerData(dummyData);
      setLoading(false);
    }, 1000);
  }, [dummyData]);

  const book = (worker: Worker) => {
    navigate("/book", { state: { service: serviceName.toLowerCase(), price: worker.charges } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available {serviceName} Professionals</h1>

      {/* Display current location */}
      {currentLocation ? (
        <div className="mb-4 text-gray-700">
          <p>
            Current Location: {currentLocation.coords.latitude}, {currentLocation.coords.longitude}
          </p>
        </div>
      ) : (
        <p className="text-red-500">{error ? error : "Fetching location..."}</p>
      )}

      {/* Display loading state or error */}
      {loading ? (
        <p className="text-blue-500">Loading professionals...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workerData.map((worker) => (
            <Card key={worker.id} className="p-4 shadow-md rounded-lg flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{worker.name}</h2>
                <p className="text-gray-600 mb-1">Charges: {worker.charges}</p>
                <p className="text-yellow-500 mb-4">Rating: {worker.rating} ⭐</p>
              </div>
              <div className="flex justify-end gap-2 mt-auto">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => book(worker)}
                >
                  Book Now
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                  Chat
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServiceTemplate;

// Example usage for all services
export const Painting = () => (
  <ServiceTemplate
    serviceName="Painting"
    dummyData={[
      { id: "1", name: "John Doe", charges: "₹500/hr", rating: 4.5 },
      { id: "2", name: "Jane Smith", charges: "₹450/hr", rating: 4.8 },
      { id: "3", name: "Bob Williams", charges: "₹550/hr", rating: 4.2 },
      { id: "4", name: "Alice Johnson", charges: "₹600/hr", rating: 4.9 },
      { id: "5", name: "Charlie Brown", charges: "₹400/hr", rating: 4.0 },
    ]}
  />
);

export const CarRepair = () => (
  <ServiceTemplate
    serviceName="Car Repair"
    dummyData={[
      { id: "1", name: "John Mechanic", charges: "₹800/hr", rating: 4.7 },
      { id: "2", name: "Jane Mechanic", charges: "₹750/hr", rating: 4.6 },
      { id: "3", name: "Bob Fixer", charges: "₹900/hr", rating: 4.8 },
    ]}
  />
);

export const Electronics = () => (
  <ServiceTemplate
    serviceName="Electronics"
    dummyData={[
      { id: "1", name: "Gadget Guru", charges: "₹700/hr", rating: 4.5 },
      { id: "2", name: "Device Doctor", charges: "₹650/hr", rating: 4.8 },
      { id: "3", name: "Tech Fixer", charges: "₹800/hr", rating: 4.4 },
    ]}
  />
);

export const EventManagement = () => (
  <ServiceTemplate
    serviceName="Event Management"
    dummyData={[
      { id: "1", name: "Event Expert", charges: "₹1500/hr", rating: 4.9 },
      { id: "2", name: "Celebration Pro", charges: "₹1300/hr", rating: 4.8 },
      { id: "3", name: "Occasion Manager", charges: "₹1400/hr", rating: 4.7 },
    ]}
  />
);

export const HomeCleaning = () => (
  <ServiceTemplate
    serviceName="Home Cleaning"
    dummyData={[
      { id: "1", name: "Clean Genie", charges: "₹300/hr", rating: 4.9 },
      { id: "2", name: "Spotless Pro", charges: "₹350/hr", rating: 4.7 },
      { id: "3", name: "Dust Buster", charges: "₹400/hr", rating: 4.6 },
    ]}
  />
);

export const Laundry = () => (
  <ServiceTemplate
    serviceName="Laundry"
    dummyData={[
      { id: "1", name: "Wash Wizard", charges: "₹150/load", rating: 4.8 },
      { id: "2", name: "Laundry Expert", charges: "₹180/load", rating: 4.7 },
      { id: "3", name: "Fabric Cleaner", charges: "₹200/load", rating: 4.6 },
    ]}
  />
);

export const Maids = () => (
  <ServiceTemplate
    serviceName="Maids"
    dummyData={[
      { id: "1", name: "Daily Helper", charges: "₹250/hr", rating: 4.8 },
      { id: "2", name: "House Assistant", charges: "₹300/hr", rating: 4.7 },
      { id: "3", name: "Home Aid", charges: "₹280/hr", rating: 4.6 },
    ]}
  />
);

export const Plumbing = () => (
  <ServiceTemplate
    serviceName="Plumbing"
    dummyData={[
      { id: "1", name: "Pipe Expert", charges: "₹500/hr", rating: 4.8 },
      { id: "2", name: "Leak Fixer", charges: "₹450/hr", rating: 4.7 },
      { id: "3", name: "Drain Master", charges: "₹550/hr", rating: 4.6 },
    ]}
  />
);

export const Salon = () => (
  <ServiceTemplate
    serviceName="Salon"
    dummyData={[
      { id: "1", name: "Beauty Pro", charges: "₹700/session", rating: 4.9 },
      { id: "2", name: "Style Expert", charges: "₹800/session", rating: 4.8 },
      { id: "3", name: "Makeover Guru", charges: "₹750/session", rating: 4.7 },
    ]}
  />
);


