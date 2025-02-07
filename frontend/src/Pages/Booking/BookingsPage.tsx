import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Booking {
  id: string;
  service: string;
  provider: string;
  date: string;
  status: string;
  price: string;
}

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Simulate fetching bookings data
  useEffect(() => {
    // const reponse = await axios.get("http://localhost:3000/api/worker/bookings")
    // setBookings(reponse);
    
    setTimeout(() => {

      setBookings([
        {
          id: "1",
          service: "Plumbing",
          provider: "John Doe",
          date: "2024-12-25",
          status: "Confirmed",
          price: "₹500",
        },
        {
          id: "2",
          service: "Salon",
          provider: "Jane Smith",
          date: "2024-12-26",
          status: "Pending",
          price: "₹700",
        },
        {
          id: "3",
          service: "Home Cleaning",
          provider: "Clean Genie",
          date: "2024-12-27",
          status: "Completed",
          price: "₹300",
        },
      ]);
      
      const fetchbookings = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.BASE_URL}/api/user/myBookings`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          });
        console.log("user booking ",response.data);
        
        setBookings(response.data);
      }
      fetchbookings();
      setLoading(false);
    }, 1000);
  }, []);

  const handleViewDetails = (booking: Booking) => {
    navigate(`/bookings/${booking.id}`, { state: booking });
  };
  const { isVerified } = useSelector((state)=>state.auth);

  if (!isVerified) {
    return <p>Please login to access this page.</p>;
  }


  return (
    <div className="container mx-auto mt-20 p-4">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {loading ? (
        <p className="text-blue-500">Loading your bookings...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 shadow-md rounded-lg border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold mb-2">{booking.service}</h2>
                <p className="text-gray-600">Provider: {booking.provider}</p>
                <p className="text-gray-600">Date: {booking.date}</p>
                <p className="text-gray-600">Status: {booking.status}</p>
                <p className="text-gray-600">Price: {booking.price}</p>
              </div>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => handleViewDetails(booking)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
