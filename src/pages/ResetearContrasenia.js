import React from 'react';

function ResetearContrasenia() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para resetear la contraseña
    alert('Su contraseña ha sido restablecida exitosamente.');
  };

  return (
    <div className="resetear-contrasenia">
      <h2>Resetear Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input type="password" placeholder="Nueva contraseña" required />
        <input type="password" placeholder="Confirmar contraseña" required />
        <button type="submit">Restablecer</button>
      </form>
    </div>
  );
}

export default ResetearContrasenia;
