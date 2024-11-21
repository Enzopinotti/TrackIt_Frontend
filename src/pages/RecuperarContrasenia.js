import React from 'react';
import Logo from '../components/Logo.js';

function RecuperarContrasenia() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar correo de recuperación
    alert('Se ha enviado un enlace para recuperar su contraseña.');
  };

  return (
    <div className="login-page">
      <article className='titulo-login'>
        <h1>
          <span>Recuperar </span>Contraseña
        </h1>
      </article>
      <article className='formContainer'>
        <form className='formLogin' onSubmit={handleSubmit}>
          <Logo />
          <div className='inputsContainer'>
            <input type="email" placeholder="Correo electrónico" required />
            <button type="submit">Enviar</button>
          </div>
          <a href="/login/interno">Volver al inicio de sesión</a>
        </form>
      </article>
    </div>
  );
}

export default RecuperarContrasenia;
