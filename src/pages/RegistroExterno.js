// src/pages/RegistroExterno.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../components/Logo.js';

function RegistroExterno() {
  const navigate = useNavigate();
  const clientUri = "http://localhost:3000/confirmacion-registro"; // Obtener clientUri desde variables de entorno

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    cuil: '',
    empresa: '',
    descripcion: '',
    clientUri: clientUri, 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      await Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    // Lógica para enviar datos al backend
    try {
      const res = await fetch('http://trackit.somee.com/api/User/register-external', { // Actualiza con la URL correcta
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await Swal.fire({
          title: 'Registro exitoso',
          text: 'Revisa tu correo para confirmar tu cuenta.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        navigate('/');
      } else {
        const data = await res.json();
        await Swal.fire({
          title: 'Error',
          text: data.message || 'Error en el registro. Intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error',
        text: 'Error en la conexión. Intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="registro-externo-page">
      <article className='titulo-registro'>
        <h1><span>Registrar </span>Usuario <span>Externo</span></h1>
      </article>
      <article className='formContainer'>
        <form className='formRegistro' onSubmit={handleSubmit}>
          <div className='logoContainer'>
            <Logo />
          </div>
          <div className='inputsContainer'>
            <input
              type="text"
              name="firstName"
              placeholder="Nombre"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="cuil"
              placeholder="CUIL"
              value={formData.cuil}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="empresa"
              placeholder="Empresa"
              value={formData.empresa}
              onChange={handleChange}
              required
            />
            <textarea
              name="descripcion"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Registrar</button>
          </div>
          <Link to="/" className="volver-btn">Volver al inicio</Link>
        </form>
      </article>
    </div>
  );
}

export default RegistroExterno;