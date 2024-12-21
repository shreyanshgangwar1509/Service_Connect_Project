import { useLocation } from "react-router-dom";
import BookingForm from "./BookingForm";

function BookPage() {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const { service, price } = location.state || {}; 

  // console.log("Service:", service); 
  // console.log("Charges:", price); 

  return (
    <div>
      <h1>Booking for: {service}</h1>
      <BookingForm service={service} charges={price} /> 
    </div>
  );
}

export default BookPage;
