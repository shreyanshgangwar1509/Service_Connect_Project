import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BookingForm from "./BookingForm";

function BookPage() {
  
  const { isVerified } = useSelector((state)=>state.auth);
  const location = useLocation();
  const { service, price,id } = location.state || {}; 

  console.log("Service:", service); 
  console.log("Charges:", price); 
  console.log('id ', id);

  return isVerified?(
    <div>
      <h1>Booking for: {service}</h1>
      <BookingForm service={service} charges={price} workerId={id} /> 
    </div>
  ):(<h1>Log in first...</h1>)
}

export default BookPage;
