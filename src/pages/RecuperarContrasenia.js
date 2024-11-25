// src/pages/RecuperarContrasenia.js

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Logo from '../components/Logo.js';

function RecuperarContrasenia() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://trackit.somee.com/api/User/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(), // Aseguramos que el correo no tenga espacios en blanco
          clientUri: 'http://localhost:3000/resetear-contrasenia', // Cambia a la URI real en producción
        }),
      });

      if (response.ok) {
        await Swal.fire({
          title: 'Correo Enviado',
          text: 'Se ha enviado un enlace para recuperar su contraseña.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        // Opcional: Redirigir al inicio de sesión
        // navigate('/login/interno');
      } else {
        const errorData = await response.json();
        await Swal.fire({
          title: 'Error',
          text: errorData.message || 'Error al enviar el correo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
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
          <span>Recuperar </span>Contraseña
        </h1>
      </article>
      <article className="formContainer">
        <form className="formLogin" onSubmit={handleSubmit}>
          <Logo />
          <div className="inputsContainer">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Enviar</button>
          </div>
          <a href="/login/interno">Volver al inicio de sesión</a>
        </form>
      </article>
    </div>
  );
}

export default RecuperarContrasenia;
