// src/pages/SeleccionLogin.js

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo.js';

function SeleccionLogin() {
  const navigate = useNavigate();

  const handleInternalLogin = () => {
    navigate('/login/interno');
  };

  const handleExternalLogin = () => {
    navigate('/login/externo');
  };

  return (
    <div className="seleccion-login">
      <article className='titulo-login'>
        <h1><span>Centralización </span> y <span>eficiencia</span> en la gestión de requerimientos</h1>
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
