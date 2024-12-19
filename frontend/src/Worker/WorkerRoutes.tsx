
import { Navigate, Outlet } from "react-router-dom";

const WorkerRoutes = () => {
  const {token, role}= localStorage.getItem('worker') ;
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default WorkerRoutes;