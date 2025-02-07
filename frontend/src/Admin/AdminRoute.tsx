
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  // if (isAdmin !== "admin") {
  //   return <Navigate to="/" />;
  // } 

  return <Outlet />;
};

export default AdminRoute;