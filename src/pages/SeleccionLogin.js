import React from 'react';
import { useNavigate } from 'react-router-dom';
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
          <form className='formLogin'>
            <Logo />
            <div className='botonesContainer'>
              <button type="button" onClick={handleInternalLogin}>Usuario Interno</button>
              <button type="button" onClick={handleExternalLogin}>Usuario Externo</button>
            </div>
            
          </form>  
        </article>
        
    </div>
  );
}

export default SeleccionLogin;
