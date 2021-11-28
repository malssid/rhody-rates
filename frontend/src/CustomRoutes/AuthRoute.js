import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default AuthRoute;
