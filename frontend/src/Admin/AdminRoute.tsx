
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  // const token= localStorage.getItem('admin') ;
  const token = "ajsfl";
  const role = 'admin';
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;