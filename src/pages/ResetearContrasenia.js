// src/pages/ResetearContrasenia.js

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../components/Logo.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '../validations/validationSchemas.js';
import DOMPurify from 'dompurify';
import { validatePasswordConditions } from '../validations/passwordValidation.js';
import { handleErrors } from '../utils/handleErrors.js';

function ResetearContrasenia() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(resetPasswordSchema),
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

  useEffect(() => {
    const userId = searchParams.get('userId');
    const token = searchParams.get('token');

    if (!userId || !token) {
      Swal.fire({
        title: 'Error',
        text: 'El enlace no contiene parámetros válidos.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      navigate('/');
    }
  }, [searchParams, navigate]);

  const onSubmit = async (data) => {
    const sanitizedData = {
      userId: DOMPurify.sanitize(searchParams.get('userId')),
      token: DOMPurify.sanitize(searchParams.get('token')),
      newPassword: DOMPurify.sanitize(data.password),
      confirmPassword: DOMPurify.sanitize(data.confirmPassword),
    };

    if (!sanitizedData.userId || !sanitizedData.token) {
      await Swal.fire({
        title: 'Error',
        text: 'El enlace de restablecimiento de contraseña es inválido.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      navigate('/');
      return;
    }

    try {
      const response = await fetch('http://trackit.somee.com/api/User/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      if (response.ok) {
        await Swal.fire({
          title: 'Contraseña Restablecida',
          text: 'Su contraseña ha sido restablecida exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        navigate('/login/interno');
      } else {
        const errorMessage = await handleErrors(response);
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
        <form className="formLogin" onSubmit={handleSubmit(onSubmit)}>
          <Logo />
          <div className="inputsContainer">
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nueva contraseña"
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

            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar contraseña"
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

            <button type="submit">Restablecer</button>
          </div>
          <a href="/login/interno">Volver al inicio de sesión</a>
        </form>
      </article>
    </div>
  );
}

export default ResetearContrasenia;
