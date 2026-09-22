// src/components/PublicRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../context/AuthContext.js';
import LoadingOverlay from './LoadingOverlay.js';

function PublicRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingOverlay isLoading={true} />;
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default PublicRoute;
