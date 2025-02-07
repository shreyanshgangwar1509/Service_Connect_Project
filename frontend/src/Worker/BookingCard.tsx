import { Calendar, Clock, MapPin } from 'lucide-react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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