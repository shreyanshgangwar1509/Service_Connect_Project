import { Calendar, Clock, MapPin } from 'lucide-react';
import { useState } from "react";
<<<<<<< Updated upstream
import { useNavigate } from "react-router-dom";
=======
import { Calendar, MapPin, Clock, Menu } from 'lucide-react';
>>>>>>> Stashed changes
import { Booking } from './Booking';

interface BookingCardProps {
  booking: Booking;
  type: 'upcoming' | 'past';
  onDelete?: (id: string) => void;
  onReview?: (id: string) => void;
}

export function BookingCard({ booking, type, onDelete, onReview }: BookingCardProps) {
    const [menuOpen, setMenuOpen] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true); 
  const navigate = useNavigate(); 
  const handleMenuClick = (route) => {
    navigate(route);
    setMenuOpen(false);
  }
  return (

    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
      <div className="absolute top-15 left-4 z-50">
        <button
          className="p-2 border rounded-md bg-black mt-5 hover:bg-gray-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
        {menuOpen && (
          <div className="mt-2 w-48 bg-white shadow-lg rounded-md border">
            <ul className="flex flex-col">
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/portfolio")}>Dashboard</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/community")}>Community</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/feedback")}>Feedback</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/allbookings")}>Bookings</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick("/logout")}>Logout</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer" onClick={()=>handleMenuClick("/HomeWorker")}>Home</li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start">
        
        <div>
          <h3 className="text-xl font-semibold">{booking.serviceType}</h3>
          <div className="flex items-center text-gray-600 mt-2">
            <MapPin size={18} className="mr-2" />
            <p>{booking.address}</p>
          </div>
          <div className="flex items-center text-gray-600 mt-2">
            <Calendar size={18} className="mr-2" />
            <p>{booking.date}</p>
          </div>
          <div className="flex items-center text-gray-600 mt-2">
            <Clock size={18} className="mr-2" />
            <p>{booking.time}</p>
          </div>
        </div>
        
        {type === 'past' && (
          <div className="flex gap-2">
            <button
              onClick={() => handleMenuClick("/review")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Review
            </button>
            <button
              onClick={() => onDelete?.(booking.id)}
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      
      {booking.review && type === 'past' && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < booking.rating! ? "text-yellow-400" : "text-gray-300"}>
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">{booking.rating}/5</span>
          </div>
          <p className="text-gray-600 italic">"{booking.review}"</p>
        </div>
      )}
    </div>
  );
}