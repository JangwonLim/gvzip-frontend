import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { getIsLogIn } from "../service/getService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const result = await getIsLogIn();
        setTimeout(() => {
          setIsAuthenticated(result.isSuccess);
          setLoading(false);
        }, 1000)
      } catch (error) {
        console.log("error in checkAuth");
        setLoading(false);
      }
    }

    checkAuthStatus();
  }, []);

  const value = useMemo(() => ({ isAuthenticated, loading }), [isAuthenticated, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);