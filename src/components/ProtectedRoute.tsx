import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.user.token);

  if (!isAuthenticated?.access_token) {
    return <Navigate to='/login' replace />;
  }

  return children;
};

export default ProtectedRoute;
