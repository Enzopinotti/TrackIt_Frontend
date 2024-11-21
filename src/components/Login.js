import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

function Login() {
  const navigate = useNavigate();

  const handleInternalLogin = () => {
    // Lógica para iniciar sesión como usuario interno
    navigate('/dashboard');
  };

  const handleExternalLogin = () => {
    // Mostrar alerta de funcionalidad en desarrollo
    Swal.fire({
      icon: 'info',
      title: 'Funcionalidad en desarrollo',
      text: 'La opción de inicio de sesión para usuarios externos estará disponible próximamente.',
    });
  };

  return (
    <div className="login-container">
      <h2>Selecciona el tipo de usuario</h2>
      <button onClick={handleInternalLogin}>Usuario Interno</button>
      <button onClick={handleExternalLogin}>Usuario Externo</button>
    </div>
  );
}

export default Login;
