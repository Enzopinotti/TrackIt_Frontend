import React from 'react';
import Logo from '../components/Logo.js';

function ResetearContrasenia() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para resetear la contraseña
    alert('Su contraseña ha sido restablecida exitosamente.');
  };

  return (
    <div className="login-page">
      <article className='titulo-login'>
        <h1>
          <span>Restablecer </span>Contraseña
        </h1>
      </article>
      <article className='formContainer'>
        <form className='formLogin' onSubmit={handleSubmit}>
          <Logo />
          <div className='inputsContainer'>
            <input type="password" placeholder="Nueva contraseña" required />
            <input type="password" placeholder="Confirmar contraseña" required />
            <button type="submit">Restablecer</button>
          </div>
          <a href="/login/interno">Volver al inicio de sesión</a>
        </form>
      </article>
    </div>
  );
}

export default ResetearContrasenia;
