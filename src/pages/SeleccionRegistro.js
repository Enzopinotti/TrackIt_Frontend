// src/pages/SeleccionRegistro.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo.js';

function SeleccionRegistro() {
  const navigate = useNavigate();

  const handleInternalRegister = () => {
    navigate('/registro/interno');
  };

  const handleExternalRegister = () => {
    navigate('/registro/externo');
  };

  return (
    <div className="seleccion-registro">
      <article className='titulo-registro'>
        <h1><span>Únete a </span>TrackIt para una <span>gestión eficiente</span></h1>
      </article>
      <article className='formContainer'>
        <div className='formRegistro'>
          <Logo />
          <div className='botonesContainer'>
            <button type="button" onClick={handleInternalRegister}>Registrar Usuario Interno</button>
            <button type="button" onClick={handleExternalRegister}>Registrar Usuario Externo</button>
          </div>
          <Link to="/" className="volver-btn">Volver al inicio</Link>
        </div>
        
      </article>
     
    </div>
  );
}

export default SeleccionRegistro;
