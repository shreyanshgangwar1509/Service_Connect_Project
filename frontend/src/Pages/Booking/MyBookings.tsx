import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Booking {
  id: string;
  details: string;
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${process.env.BASE_URL}/api/user/mybookings`);
        setBookings(response.data);
      } catch (err) {
        setError("Error in fetching bookings: Server Error");
      }
    };

    fetchBookings();
  }, []);

  const { isVerified } = useSelector((state)=>state.auth);

  if (!isVerified) {
    return <p>Please login to access this page.</p>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  if (!bookings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10">
      <h1>My Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>{booking.details}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
