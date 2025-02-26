// src/pages/SeleccionLogin.js

import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo.js';
import { AuthContext } from '../context/AuthContext.js';

function SeleccionLogin() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const handleInternalLogin = () => {
    navigate('/login/interno');
  };

  const handleExternalLogin = () => {
    navigate('/login/externo');
  };

  if (loading) {
    // Puedes reemplazar esto con un spinner o una pantalla de carga
    return <div>Cargando...</div>;
  }

  return (
    <div className="seleccion-login">
      <article className='titulo-login'>
        <h1><span>zación </span> y <span>incidencia</span> en la gestión de requerimientos</h1>
      </article>
      <article className='formContainer'>
        <div className='formLogin'>
          <Logo />
          <div className='botonesContainer'>
            <button type="button" onClick={handleInternalLogin}>Usuario Interno</button>
            <button type="button" onClick={handleExternalLogin}>Usuario Externo</button>
          </div>
          <div className="registro-link">
            <p>¿No tienes una cuenta?</p>
            <Link to="/registro">Regístrate aquí</Link>
          </div>
        </div>
      </article>
    </div>
  );
}

export default SeleccionLogin;
