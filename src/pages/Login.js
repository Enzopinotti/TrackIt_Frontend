import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Logo from '../components/Logo.js';
import { AuthContext } from '../context/AuthContext.js';

function Login() {
  const navigate = useNavigate();
  const { tipoUsuario } = useParams();
  const { login } = useContext(AuthContext);
  
  const handleLogin = async (e) => {
    e.preventDefault();

    // Obtener los valores de los campos de entrada
    const email = e.target[0].value; // Correo electrónico
    const password = e.target[1].value; // Contraseña

    // Llamada a la API del backend para autenticar al usuario
    try {
      const response = await fetch('http://trackit.somee.com/api/User/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const data = await response.json();
      login(data.token);
      // Redirigir a la página principal después de un login exitoso
      navigate('/home');
    } catch (error) {
      console.error('Error de autenticación:', error);
    }
  };

  return (
    <div className="login-page">
      <article className='titulo-login'>
        <h1>
          <span>Centralización </span> y <span>eficiencia</span> en la gestión de requerimientos
        </h1>
      </article>
      <article className='formContainer'>
        <form className='formLogin' onSubmit={handleLogin}>
          <Logo />
          <div className='inputsContainer'>         
            <input type="email" placeholder="Correo electrónico" required />
            <input type="password" placeholder="Contraseña" required />
            <a href="/recuperar-contrasenia">¿Olvidó su contraseña?</a>
            <button type="submit">Ingresar</button>
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