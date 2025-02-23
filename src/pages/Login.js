// src/pages/Login.js
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Logo from '../components/Logo.js';
import { AuthContext } from '../context/AuthContext.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validations/validationSchemas.js';
import DOMPurify from 'dompurify';
import { handleErrors } from '../utils/handleErrors.js';
import Swal from 'sweetalert2';
import LoadingOverlay from '../components/LoadingOverlay.js';

function Login() {
  const { tipoUsuario } = useParams();
  const { login, loading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para evitar múltiples envíos

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async (data) => {
    setIsSubmitting(true); // Deshabilita el botón al iniciar
    // Sanitizar datos
    const sanitizedData = {
      email: DOMPurify.sanitize(data.email),
      password: DOMPurify.sanitize(data.password),
    };

    try {
      const response = await fetch('http://trackit.somee.com/api/User/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });
      
      if (!response.ok) {
        const errorMessage = await handleErrors(response);
        throw new Error(errorMessage);
      }

      const resData = await response.json();
      console.log(resData);
      login(resData.token);
    } catch (error) {
      console.error('Error de autenticación:', error.message);
      Swal.fire({
        title: 'Error de autenticación',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setIsSubmitting(false); // Vuelve a habilitar el botón
    }
  };

  if (loading) {
    return <LoadingOverlay isLoading={true} />;
  }

  return (
    <div className="login-page">
      <article className="titulo-login">
        <h1>
          <span>Centralización </span> y <span>eficiencia</span> en la gestión de requerimientos
        </h1>
      </article>
      <article className="formContainer">
        <form className="formLogin" onSubmit={handleSubmit(handleLogin)}>
          <Logo />
          <div className="inputsContainer">
            <input
              type="email"
              placeholder="Correo electrónico"
              {...register('email')}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}

            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
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

            <Link to="/recuperar-contrasenia">¿Olvidó su contraseña?</Link>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Procesando...' : 'Ingresar'}
            </button>
          </div>
          <div className="registro-link">
            <p>¿No tienes una cuenta?</p>
            {tipoUsuario === 'interno' && (
              <Link to="/registro/interno">Regístrate aquí</Link>
            )}
            {tipoUsuario === 'externo' && (
              <Link to="/registro/externo">Regístrate aquí</Link>
            )}
          </div>
        </form>
      </article>
    </div>
  );
}

export default Login;
