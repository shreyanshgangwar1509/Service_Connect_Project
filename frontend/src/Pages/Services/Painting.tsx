// import { Card } from "@/components/ui/card";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// interface Worker {
//   id: string;
//   name: string;
//   charges: string;
//   rating: number;
// }

// function Painting() {
//   const [painterData, setPainterData] = useState<Worker[]>([]);
//   const [currentLocation, setCurrentLocation] = useState<GeolocationPosition | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();
//   // Fetch current location
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => setCurrentLocation(position),
//       (err) => setError("Failed to get location")
//     );
//   }, []);

//   // Fetch painter data
//   useEffect(() => {
//     const fetchPainterData = async () => {
//       try {
//         const response = await axios.get("/api/service/painter");
//         setPainterData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch painters");
//         setLoading(false);
//       }
//     };
//     fetchPainterData();
//   }, []);
//     const book = () => {
//         navigate("/book", { state: { service: "painter", price: 500 } });
//     }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Available Painters</h1>

//       {currentLocation ? (
//         <div className="mb-4 text-gray-700 w-[50%] h-4vh">
//           <p>
//             Current Location: {currentLocation.coords.latitude}, {currentLocation.coords.longitude}
//           </p>
          
//         </div>
//       ) : (
//         <p className="text-red-500">{error ? error : "Fetching location..."}</p>
//       )}

//       {loading ? (
//         <p className="text-blue-500">Loading painters...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {painterData.map((worker) => (
//             <Card key={worker.id} className="p-4 shadow-md rounded-lg flex flex-col justify-between">
//               <div>
//                 <h2 className="text-xl font-semibold">{worker.name}</h2>
//                 <p className="text-gray-600">Charges: {worker.charges}</p>
//                 <p className="text-yellow-500 mb-4">Rating: {worker.rating} ⭐</p>
//               </div>
//               <div className="flex justify-end gap-2 mt-auto">
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={book}>
//                   Book Now
//                 </button>
//                 <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
//                   Chat
//                 </button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Painting;

import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Worker {
  id: string;
  name: string;
  charges: string;
  rating: number;
}

function Painting() {
  const [painterData, setPainterData] = useState<Worker[]>([]);
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

  // Simulate fetching painter data with dummy data
  useEffect(() => {
    const dummyPainters: Worker[] = [
      { id: "1", name: "John Doe", charges: "₹500/hr", rating: 4.5 },
      { id: "2", name: "Jane Smith", charges: "₹450/hr", rating: 4.8 },
      { id: "3", name: "Bob Williams", charges: "₹550/hr", rating: 4.2 },
      { id: "4", name: "Alice Johnson", charges: "₹600/hr", rating: 4.9 },
      { id: "5", name: "Charlie Brown", charges: "₹400/hr", rating: 4.0 },
    ];

    // Simulate a loading delay
    setTimeout(() => {
      setPainterData(dummyPainters);
      setLoading(false);
    }, 1000);
  }, []);

  const book = (worker: Worker) => {
    navigate("/book", { state: { service: "painter", price: worker.charges } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Painters</h1>

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
        <p className="text-blue-500">Loading painters...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {painterData.map((worker) => (
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

export default Painting;
