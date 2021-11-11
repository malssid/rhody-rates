import { createContext, useState, useEffect, useContext } from "react";
import Auth from "../utils/Auth";
import Loading from "../components/Loading";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthenticated = async () => {
    const data = await Auth.isAuthenticated();
    setUser(data.user);
    setIsAuthenticated(data.isAuthenticated);
    setLoading(false);
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};

export default AuthProvider;
