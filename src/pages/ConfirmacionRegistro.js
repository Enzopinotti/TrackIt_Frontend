import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../components/Logo.js';

function ConfirmacionRegistro() {
  const [searchParams] = useSearchParams(); // Obtener parámetros de la URL
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = searchParams.get('userId');
    const token = searchParams.get('token');
    console.log('userId:', userId, 'token:', token);  // Verificar que los parámetros estén presentes

    if (!userId || !token) {
      setError('El enlace no contiene parámetros válidos.');
      Swal.fire({
        title: 'Error',
        text: 'El enlace no contiene parámetros válidos.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      navigate('/');
      return;
    }

    const confirmarEmail = async () => {
      try {
        const res = await fetch(
          `http://trackit.somee.com/api/User/confirm-email?userId=${encodeURIComponent(userId)}&token=${encodeURIComponent(token)}`
        );

        console.log('Respuesta del servidor:', res);
        const responseText = await res.text(); // Obtenemos el texto de la respuesta

        if (res.ok) {
          await Swal.fire({
            title: 'Correo Confirmado',
            text: responseText || 'Tu cuenta ha sido confirmada. Espera a que un administrador habilite tu acceso.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          navigate('/');
        } else {
          await Swal.fire({
            title: 'Error',
            text: responseText || 'Hubo un problema al confirmar tu correo electrónico. Intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
          navigate('/');
        }
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
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
  }, [searchParams, navigate]);

  return (
    <div className="confirmacion-registro-page">
      <article className='titulo-confirmacion'>
        <Logo />
      </article>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ConfirmacionRegistro;
