// src/pages/RegistroExterno.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo.js';

function RegistroExterno() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar datos al backend
    // Asegúrate de que el backend envíe el correo de confirmación
    // Incluye la URI necesaria en la solicitud
    // Ejemplo de petición usando fetch:
    fetch('https://tu-backend/api/registro/externo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          alert('Registro exitoso. Revisa tu correo para confirmar tu cuenta.');
          navigate('/');
        } else {
          alert('Error en el registro. Intenta nuevamente.');
        }
      })
      .catch(() => {
        alert('Error en la conexión. Intenta nuevamente.');
      });
  };

  return (
    <div className="registro-externo-page">
      <article className='titulo-registro'>
        <h1><span>Registrar </span>Usuario <span>Externo</span></h1>
      </article>
      <article className='formContainer'>
        <form className='formRegistro' onSubmit={handleSubmit}>
          <Logo />
          <div className='inputsContainer'>
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
            <button type="submit">Registrar</button>
          </div>
          <Link to="/registro" className="volver-btn">Volver al inicio</Link>
        </form>
      </article>
    </div>
  );
}

export default RegistroExterno;
