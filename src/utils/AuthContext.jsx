import React, { createContext, useContext, useState, useEffect } from "react";
import { getIsLogIn } from "../service/getService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const result = await getIsLogIn();
        setTimeout(() => {
          setIsAuthenticated(result.isSuccess);
        }, 1000)
      } catch (error) {
        console.log("error in checkAuth")
      }
    }

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);