// src/components/PrivateRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

function PrivateRoute({ children, onlyInternal = false }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login/interno" />; // Redirige al login interno si no está autenticado
  }

  if (!user.isEnabled) {
    // Si el usuario no está habilitado
    return <Navigate to="/confirmacion-registro/no-habilitado" />; // Puedes crear una ruta específica
  }

  if (onlyInternal && !user.isInternal) {
    return <Navigate to="/inicio" />; // Redirige a inicio si no es interno
  }

  return children;
}

export default PrivateRoute;
