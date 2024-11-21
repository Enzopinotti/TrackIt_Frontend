import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

function PrivateRoute({ children, onlyInternal = false }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Si no está autenticado, redirige a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  if (onlyInternal && !user.isInternal) {
    // Si la ruta es solo para usuarios internos y el usuario no es interno
    return <Navigate to="/inicio" />;
  }

  // Si está autenticado y tiene permisos, renderiza el componente
  return children;
}

export default PrivateRoute;
