import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import Logo from '../components/Logo.js';

function SeleccionLogin() {
  const navigate = useNavigate();

  const handleInternalLogin = () => {
    navigate('/login');
  };

  const handleExternalLogin = () => {
    Swal.fire({
      icon: 'info',
      title: 'Funcionalidad en desarrollo',
      text: 'La opción de inicio de sesión para usuarios externos estará disponible próximamente.',
    });
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
              <button onClick={handleInternalLogin}>Usuario Interno</button>
              <button onClick={handleExternalLogin}>Usuario Externo</button>
            </div>
            
          </form>  
        </article>
        
    </div>
  );
}

export default SeleccionLogin;
