// src/pages/Requerimientos/RequerimientosWrapper.js

import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import MisRequerimientos from './MisRequerimientos.js';
import Requerimientos from './Requerimientos.js';

function RequerimientosWrapper() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>No autorizado. Por favor, inicia sesión.</p>;
  }

  const { role } = user;

  if (role === 'Externo') {
    return <MisRequerimientos />;
  } else if (role === 'Interno' || role === 'Admin') {
    return <Requerimientos />;
  } else {
    return <p>Rol de usuario no reconocido.</p>;
  }
}

export default RequerimientosWrapper;