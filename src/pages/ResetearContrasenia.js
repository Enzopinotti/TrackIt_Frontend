// src/pages/ResetearContrasenia.js

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../components/Logo.js';

function ResetearContrasenia() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchParams] = useSearchParams(); // Obtener parámetros de la URL
  const navigate = useNavigate();

  useEffect(() => {
    const userId = searchParams.get('userId');
    const token = searchParams.get('token');
    console.log('userId:', userId, 'token:', token); // Verificar que los parámetros estén presentes

    if (!userId || !token) {
      Swal.fire({
        title: 'Error',
        text: 'El enlace no contiene parámetros válidos.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      navigate('/'); // Redirigir al inicio o a la página de login
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar contraseñas
    if (password !== confirmPassword) {
      await Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const userId = searchParams.get('userId');
    const token = searchParams.get('token');

    if (!userId || !token) {
      await Swal.fire({
        title: 'Error',
        text: 'El enlace de restablecimiento de contraseña es inválido.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      navigate('/'); // Redirigir al inicio o a la página de login
      return;
    }

    // Crear el objeto con los parámetros necesarios para la solicitud
    const resetData = {
      userId,
      token,
      newPassword: password,
      confirmPassword, // Asegúrate de enviar confirmPassword
    };

    try {
      const response = await fetch('http://trackit.somee.com/api/User/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resetData), // Enviar todos los campos requeridos en el DTO
      });

      if (response.ok) {
        await Swal.fire({
          title: 'Contraseña Restablecida',
          text: 'Su contraseña ha sido restablecida exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        navigate('/login/interno'); // Redirigir al inicio de sesión
      } else {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData); // Verifica la respuesta del servidor
        await Swal.fire({
          title: 'Error',
          text: errorData.message || 'Error al restablecer la contraseña.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      await Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al conectar con el servidor. Inténtelo nuevamente más tarde.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="login-page">
      <article className="titulo-login">
        <h1>
          <span>Restablecer </span>Contraseña
        </h1>
      </article>
      <article className="formContainer">
        <form className="formLogin" onSubmit={handleSubmit}>
          <Logo />
          <div className="inputsContainer">
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Restablecer</button>
          </div>
          <a href="/login/interno">Volver al inicio de sesión</a>
        </form>
      </article>
    </div>
  );
}

export default ResetearContrasenia;
