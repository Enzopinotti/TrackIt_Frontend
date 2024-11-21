import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticación
    navigate('/inicio');
  };

  return (
    <div className="login-page">
      <h2>Iniciar Sesión - Usuario Interno</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Nombre de usuario" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Ingresar</button>
      </form>
      <a href="/recuperar-contrasenia">¿Olvidó su contraseña?</a>
    </div>
  );
}

export default Login;
