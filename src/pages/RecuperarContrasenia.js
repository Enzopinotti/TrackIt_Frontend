import React from 'react';

function RecuperarContrasenia() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar correo de recuperación
    alert('Se ha enviado un enlace para recuperar su contraseña.');
  };

  return (
    <div className="recuperar-contrasenia">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo electrónico" required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default RecuperarContrasenia;
