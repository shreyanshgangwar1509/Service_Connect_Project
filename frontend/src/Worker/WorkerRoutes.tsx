
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const WorkerRoutes = () => {
  const { isWorker } = useSelector((state)=>state.auth);
  if (!isWorker) {
    return <Navigate to="/login" />;
  }

  if (role !== "worker") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default WorkerRoutes;