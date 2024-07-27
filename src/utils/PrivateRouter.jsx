import React, { useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [showPopup, setShowPopup] = useState(false);

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Element />
        ) : (
          <>
            {setShowPopup(true)}
            <Navigate to="/" replace />
          </>
        )
      }
    />
  );
};

export default PrivateRoute;