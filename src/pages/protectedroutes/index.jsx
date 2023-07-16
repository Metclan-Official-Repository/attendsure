import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const auth = localStorage.getItem("_token") || undefined;
  return auth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
