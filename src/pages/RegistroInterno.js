// src/pages/RegistroInterno.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../components/Logo.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerInternalSchema } from '../validations/validationSchemas.js';
import DOMPurify from 'dompurify';
import { validatePasswordConditions } from '../validations/passwordValidation.js';
import { handleErrors } from '../utils/handleErrors.js';

function RegistroInterno() {
  const navigate = useNavigate();
  const clientUri = "http://localhost:3000/confirmacion-registro";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(registerInternalSchema),
  });

  const password = watch('password', '');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prevState => !prevState);
  };

  const passwordConditions = validatePasswordConditions(password);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const sanitizedData = {
      firstName: DOMPurify.sanitize(data.firstName),
      lastName: DOMPurify.sanitize(data.lastName),
      email: DOMPurify.sanitize(data.email),
      password: DOMPurify.sanitize(data.password),
      confirmPassword: DOMPurify.sanitize(data.confirmPassword),
      cargo: DOMPurify.sanitize(data.cargo),
      departamento: DOMPurify.sanitize(data.departamento),
      clientUri: clientUri,
    };

    try {
      const res = await fetch('http://trackit.somee.com/api/User/register-internal', {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registro-interno-page">
      <article className='titulo-registro'>
        <h1><span>Registrar </span>Usuario <span>Interno</span></h1>
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
              name="cargo"
              placeholder="Cargo"
              {...register('cargo')}
            />
            {errors.cargo && <p className="error-message">{errors.cargo.message}</p>}

            <input
              type="text"
              name="departamento"
              placeholder="Departamento"
              {...register('departamento')}
            />
            {errors.departamento && <p className="error-message">{errors.departamento.message}</p>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Procesando...' : 'Registrar'}
            </button>
          </div>
          <Link to="/" className="volver-btn">Volver al inicio</Link>
        </form>
      </article>
    </div>
  );
}

export default RegistroInterno;
