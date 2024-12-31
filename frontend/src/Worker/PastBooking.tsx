import axios from 'axios';
import { useEffect } from 'react';
import { Booking } from './Booking';
import { BookingCard } from './BookingCard';

const pastBookings: Booking[] = [
  {
    id: '3',
    serviceType: 'Home Cleaning',
    address: '789 Pine St, City',
    date: '2024-03-10',
    time: '2:00 PM',
    status: 'completed',
    rating: 5,
    review: 'Excellent service! Very thorough and professional.'
  },
  {
    id: '4',
    serviceType: 'Plumbing Service',
    address: '321 Elm St, City',
    date: '2024-03-08',
    time: '1:00 PM',
    status: 'completed'
  }
];

export function PastBookings() {
  useEffect( () => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/worker/bookings/past',{
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token to headers
          },
      });
        console.log("response ", response.data);
          pastBookings.push(response.data);
          
          
    } catch (error) {
      console.log(error);
    }
      }
    fetch();
  },[])
  const handleReview = (id: string) => {
    console.log('Adding review for booking:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Deleting booking:', id);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Past Bookings</h3>
      {pastBookings.length === 0 ? (
        <p className="text-gray-600">No past bookings found</p>
      ) : (
        pastBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            type="past"
            onReview={handleReview}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}