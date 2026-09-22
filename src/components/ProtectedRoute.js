// src/components/ProtectedRoute.js

import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/AuthContext.js';
import LoadingOverlay from './LoadingOverlay.js';

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingOverlay isLoading={true} />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
