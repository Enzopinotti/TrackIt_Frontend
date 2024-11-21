import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from '../components/Logo.js';

function Login() {
  const navigate = useNavigate();
  const { tipoUsuario } = useParams();

  const handleLogin = (e) => {
    e.preventDefault();
    // Lógica de autenticación
    navigate('/inicio');
  };

  return (
    <div className="login-page">
      <article className='titulo-login'>
        <h1>
          <span>Centralización </span> y <span>eficiencia</span> en la gestión de requerimientos
        </h1>
      </article>
      <article className='formContainer'>
        <form className='formLogin' onSubmit={handleLogin}>
          <Logo />
          <div className='inputsContainer'>
            {tipoUsuario === 'interno' && (
              <input type="text" placeholder="Legajo" required />
            )}
            <input type="email" placeholder="Correo electrónico" required />
            <input type="password" placeholder="Contraseña" required />
            <a href="/recuperar-contrasenia">¿Olvidó su contraseña?</a>
            <button type="submit">Ingresar</button>
          </div>
          
        </form>
      </article>
    </div>
  );
}

export default Login;
