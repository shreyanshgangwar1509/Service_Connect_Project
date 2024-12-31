import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BookingCard } from './BookingCard';
import { Booking } from './Booking';

const dummyBookings: Booking[] = [
  {
    id: '1',
    serviceType: 'Home Cleaning',
    address: '123 Main St, City',
    date: 'Today',
    time: '2:00 PM',
    status: 'upcoming',
  },
  {
    id: '2',
    serviceType: 'Plumbing Service',
    address: '456 Oak St, City',
    date: 'Today',
    time: '4:00 PM',
    status: 'upcoming',
  },
];

export function UpcomingBookings() {
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchCurrentBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('http://localhost:3000/api/worker/bookings/current', {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token to headers
          },
        });

        console.log('Response:', response.data);

        // Combine dummy data with API-fetched data
        setCurrentBookings([...dummyBookings, ...response.data]);
      } catch (error) {
        console.error('Error fetching current bookings:', error);

        // Use dummy data in case of an error
        setCurrentBookings(dummyBookings);
      }
    };

    fetchCurrentBookings();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Today's Bookings</h3>
      {currentBookings.length === 0 ? (
        <p className="text-gray-600">No bookings scheduled for today</p>
      ) : (
        currentBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            type="upcoming"
          />
        ))
      )}
    </div>
  );
}
