import { useLocation } from "react-router-dom";
import BookingForm from "./BookingForm";

function BookPage() {
    
        const token = localStorage.getItem('token');
    
  const location = useLocation();
  const { service } = location.state || {};

    return(
       <div>
          <h1>Booking for: {service}</h1>
          <BookingForm service={service}/>
        </div>
    )
    //after backend
      // (
      //   <div>
      //     <h1>Booking for: {service}</h1>
      //     <BookingForm service={service}/>
      //   </div>
      // ) 
      // 
      // (
      //   // <h1>Login first</h1>
      // );
}

export default BookPage;
