import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-native';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authState } = useContext(AuthContext);
  const { user, token } = authState;
  const location = useLocation();

  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (allowedRoles && allowedRoles.includes(user.role)) {
    return <Navigate to={user.isAdmin ? '/' : '/employee-dashboard'} replace />;
  }

  return children;
};
