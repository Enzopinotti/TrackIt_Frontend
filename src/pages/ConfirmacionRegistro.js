// src/pages/ConfirmacionRegistro.js

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../components/Logo.js';

function ConfirmacionRegistro() {
  const { token, userId } = useParams(); // Obtener token y userId de la URL
  const navigate = useNavigate();

  useEffect(() => {
    // Validar que token y userId existan
    if (!token || !userId) {
      Swal.fire({
        title: 'Error',
        text: 'Enlace de confirmación inválido.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        navigate('/');
      });
      return;
    }

    // Realizar petición al backend para confirmar el email
    const confirmarEmail = async () => {
      try {
        const res = await fetch('https://tu-backend.com/api/confirmar-email', { // Actualiza con la URL correcta
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, userId }),
        });

        if (res.ok) {
          await Swal.fire({
            title: 'Correo Confirmado',
            text: 'Tu cuenta ha sido confirmada. Espera a que un administrador habilite tu acceso.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          navigate('/');
        } else {
          const data = await res.json();
          await Swal.fire({
            title: 'Error',
            text: data.message || 'Hubo un problema al confirmar tu correo electrónico. Intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          navigate('/');
        }
      } catch (error) {
        await Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al confirmar tu correo electrónico. Intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        navigate('/');
      }
    };

    confirmarEmail();
  }, [token, userId, navigate]);

  return (
    <div className="confirmacion-registro-page">
      <article className='titulo-confirmacion'>
        <Logo />
      </article>
    </div>
  );
}

export default ConfirmacionRegistro;
