import { Navigate, Outlet } from "react-router-dom";

const RoleGuard = ({ allowedRole }) => {
  const authData = JSON.parse(localStorage.getItem("authData"));

  if (!authData) {
    return <Navigate to="/login" replace />;
  }

  if (authData.role !== allowedRole) {
    return <Navigate to="/login" replace />; // or 403 page
  }

  return <Outlet />;
};

export default RoleGuard;
