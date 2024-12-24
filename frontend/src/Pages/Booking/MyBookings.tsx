import axios from "axios";

const MyBookings = async() => {
    const response = await axios.get(`${process.env.BACKEND_URL}/api/user/mybookings`);
  return (
      <div>MyBookings: { response.data}</div>
  )
}

export default MyBookings