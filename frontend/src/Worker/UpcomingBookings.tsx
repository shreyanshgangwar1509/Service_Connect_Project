import { BookingCard } from './BookingCard';
import { Booking } from '../types/booking';

const todayBookings: Booking[] = [
  {
    id: '1',
    serviceType: 'Home Cleaning',
    address: '123 Main St, City',
    date: 'Today',
    time: '2:00 PM',
    status: 'upcoming'
  },
  {
    id: '2',
    serviceType: 'Plumbing Service',
    address: '456 Oak St, City',
    date: 'Today',
    time: '4:00 PM',
    status: 'upcoming'
  }
];

export function UpcomingBookings() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Today's Bookings</h3>
      {todayBookings.length === 0 ? (
        <p className="text-gray-600">No bookings scheduled for today</p>
      ) : (
        todayBookings.map((booking) => (
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