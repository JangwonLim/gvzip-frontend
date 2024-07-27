import React, { createContext, useContext, useState, useEffect } from "react";
import { getIsLogIn } from "../service/getService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const result = await getIsLogIn();
        setIsAuthenticated(result.isSuccess);
      } catch (error) {
        console.log("error in checkAuth")
      } finally {
        setLoading(false);
      }
    }

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);