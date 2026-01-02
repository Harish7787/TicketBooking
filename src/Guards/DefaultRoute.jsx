import { Navigate } from "react-router-dom";

const DefaultRoute = () => {
  const authData = JSON.parse(localStorage.getItem("authData"));

  if (!authData) {
    return <Navigate to="/login" replace />;
  }

  if (authData.role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (authData.role === "USER") {
    return <Navigate to="/user/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default DefaultRoute;
