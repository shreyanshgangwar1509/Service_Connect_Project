
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const {token, role}= localStorage.getItem('admin') ;
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;