// src/pages/ConfirmacionRegistro.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo.js';

function ConfirmacionRegistro() {
  const { token } = useParams(); // Suponiendo que el token se pasa como parámetro
  const navigate = useNavigate();
  const [estado, setEstado] = useState('confirmando'); // estados: confirmando, exito, error

  useEffect(() => {
    // Realizar petición al backend para confirmar el email
    fetch(`https://tu-backend/api/confirmar-email?token=${token}`, {
      method: 'GET',
    })
      .then((res) => {
        if (res.ok) {
          setEstado('exito');
        } else {
          setEstado('error');
        }
      })
      .catch(() => {
        setEstado('error');
      });
  }, [token]);

  return (
    <div className="confirmacion-registro-page">
      <article className='titulo-confirmacion'>
        <Logo />
        {estado === 'confirmando' && <p>Confirmando tu correo electrónico...</p>}
        {estado === 'exito' && (
          <>
            <h1>¡Correo Confirmado!</h1>
            <p>Tu cuenta ha sido confirmada. Espera a que un administrador habilite tu acceso.</p>
            <button onClick={() => navigate('/')}>Volver al Inicio</button>
          </>
        )}
        {estado === 'error' && (
          <>
            <h1>Error en la Confirmación</h1>
            <p>Hubo un problema al confirmar tu correo electrónico. Intenta nuevamente.</p>
            <button onClick={() => navigate('/')}>Volver al Inicio</button>
          </>
        )}
      </article>
    </div>
  );
}

export default ConfirmacionRegistro;
    