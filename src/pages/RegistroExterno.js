// src/pages/RegistroExterno.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../components/Logo.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerExternalSchema } from '../validations/validationSchemas.js';
import DOMPurify from 'dompurify';
import { validatePasswordConditions } from '../validations/passwordValidation.js';
import { handleErrors } from '../utils/handleErrors.js';

function RegistroExterno() {
  const navigate = useNavigate();
  const clientUri = "http://localhost:3000/confirmacion-registro";

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(registerExternalSchema),
  });

  const password = watch('password', '');

  // Estados para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Funciones para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevState => !prevState);
  };

  const passwordConditions = validatePasswordConditions(password);

  const onSubmit = async (data) => {
    // Sanitizar datos
    const sanitizedData = {
      firstName: DOMPurify.sanitize(data.firstName),
      lastName: DOMPurify.sanitize(data.lastName),
      email: DOMPurify.sanitize(data.email),
      password: DOMPurify.sanitize(data.password),
      confirmPassword: DOMPurify.sanitize(data.confirmPassword),
      cuil: DOMPurify.sanitize(data.cuil),
      empresa: DOMPurify.sanitize(data.empresa),
      descripcion: DOMPurify.sanitize(data.descripcion),
      clientUri: clientUri,
    };

    try {
      const res = await fetch('http://trackit.somee.com/api/User/register-external', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData),
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
        const errorMessage = await handleErrors(res);
        await Swal.fire({
          title: 'Error',
          text: errorMessage,
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
        <form className='formRegistro' onSubmit={handleSubmit(onSubmit)}>
          <div className='logoContainer'>
            <Logo />
          </div>
          <div className='inputsContainer'>
            <input
              type="text"
              name="firstName"
              placeholder="Nombre"
              {...register('firstName')}
            />
            {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}

            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              {...register('lastName')}
            />
            {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              {...register('email')}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}

            {/* Campo de contraseña */}
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Contraseña"
                {...register('password')}
              />
              <div
                onClick={togglePasswordVisibility}
                className="toggle-password ojo"
                aria-label="Mostrar u ocultar contraseña"
              >
                {showPassword ? (
                  <img src="/assets/icons/ojo-cerrado.png" alt="Ocultar contraseña" />
                ) : (
                  <img src="/assets/icons/ojoAbierto.png" alt="Mostrar contraseña" />
                )}
              </div>
            </div>
            {errors.password && <p className="error-message">{errors.password.message}</p>}

            {/* Mostrar las condiciones de la contraseña */}
            <ul className="password-conditions">
              <li className={passwordConditions.hasUpperCase ? 'met' : 'unmet'}>
                Al menos una letra mayúscula
              </li>
              <li className={passwordConditions.hasNumber ? 'met' : 'unmet'}>
                Al menos un número
              </li>
              <li className={passwordConditions.hasSpecialChar ? 'met' : 'unmet'}>
                Al menos un carácter especial
              </li>
              <li className={passwordConditions.minLength ? 'met' : 'unmet'}>
                Más de 6 caracteres
              </li>
            </ul>

            {/* Campo de confirmar contraseña */}
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                {...register('confirmPassword')}
              />
              <div
                onClick={toggleConfirmPasswordVisibility}
                className="toggle-password ojo"
                aria-label="Mostrar u ocultar contraseña"
              >
                {showConfirmPassword ? (
                  <img src="/assets/icons/ojo-cerrado.png" alt="Ocultar contraseña" />
                ) : (
                  <img src="/assets/icons/ojoAbierto.png" alt="Mostrar contraseña" />
                )}
              </div>
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}

            <input
              type="text"
              name="cuil"
              placeholder="CUIL"
              {...register('cuil')}
            />
            {errors.cuil && <p className="error-message">{errors.cuil.message}</p>}

            <input
              type="text"
              name="empresa"
              placeholder="Empresa"
              {...register('empresa')}
            />
            {errors.empresa && <p className="error-message">{errors.empresa.message}</p>}

            <textarea
              name="descripcion"
              placeholder="Descripción"
              {...register('descripcion')}
            ></textarea>
            {errors.descripcion && <p className="error-message">{errors.descripcion.message}</p>}

            <button type="submit">Registrar</button>
          </div>
          <Link to="/" className="volver-btn">Volver al inicio</Link>
        </form>
      </article>
    </div>
  );
}

export default RegistroExterno;
