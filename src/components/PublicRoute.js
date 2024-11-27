// src/components/PublicRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext.js';

function PublicRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Puedes reemplazar esto con un spinner o una pantalla de carga
    return <div>Cargando...</div>;
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
