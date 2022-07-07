import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const authenticated = useSelector((state) => state.auth.authenticated);

  console.log('auth', authenticated);
  if (!authenticated) {
    return <Navigate to="/signin" />;
  } else {
    return children;
  }
};

export default RequireAuth;
