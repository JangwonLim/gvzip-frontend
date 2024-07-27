import React from 'react';
import { useAuth } from '../utils/AuthContext';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ element: Component, path, setShowPopUp }) => {
  const { isAuthenticated } = useAuth();

  const handlePopUp = () => {
    setShowPopUp(true);
  }

  return (
    <>
      {isAuthenticated ? (
        <Route path={path} element={<Component />} />
      ) : (
        {handlePopUp}
      )}
    </>
  );
};

export default PrivateRoute;