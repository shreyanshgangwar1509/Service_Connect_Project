import useAuth from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";
import BookingForm from "./BookingForm";

function BookPage() {
  
  const { isAuthenticated, userId, role } = useAuth();
  const location = useLocation();
  const { service, price } = location.state || {}; 

  console.log("Service:", service); 
  console.log("Charges:", price); 

  return isAuthenticated===true ?(
    <div>
      <h1>Booking for: {service}</h1>
      <BookingForm service={service} charges={price} /> 
    </div>
  ):(<h1>Log in first...</h1>)
}

export default BookPage;
