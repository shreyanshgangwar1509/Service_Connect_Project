import { useLocation } from "react-router-dom";

function BookPage() {
    
        const token = localStorage.getItem('token');
    
  const location = useLocation();
  const { service } = location.state || {};

    return token ?
        (<h1>Booking for: {service}</h1>) :
  (<h1>Login first</h1>);
}

export default BookPage;
