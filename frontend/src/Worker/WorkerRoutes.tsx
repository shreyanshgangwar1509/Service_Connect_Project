
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const WorkerRoutes = () => {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role !== "worker") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default WorkerRoutes;