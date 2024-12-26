
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const adminData = JSON.parse(localStorage.getItem('user-info') || '{}')
  const token = adminData.token || null
  const role = adminData.role || null
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;