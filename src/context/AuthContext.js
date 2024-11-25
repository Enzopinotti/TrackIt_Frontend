// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export function AuthProvider({ children }) {
  // Estado de autenticación
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga

  // Función para iniciar sesión
  const login = async (token) => {
    // Guardar el token en localStorage
    localStorage.setItem('authToken', token);

    try {
      // Realizar una solicitud al backend para obtener el perfil del usuario
      const response = await fetch('http://trackit.somee.com/api/User/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Enviar el token en la cabecera
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Si la respuesta no es ok, manejar el error
        console.error('Error al obtener el perfil del usuario:', response.statusText);
        localStorage.removeItem('authToken');
        setUser(null);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      localStorage.removeItem('authToken');
      setUser(null);
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem('authToken');
    setUser(null);
  };

  // Función para actualizar el usuario
  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
  };

  useEffect(() => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('authToken');

    if (token) {
      // Intentar obtener el perfil del usuario
      const fetchUserProfile = async () => {
        try {
          const response = await fetch('http://trackit.somee.com/api/User/profile', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Enviar el token en la cabecera
            },
          });

          if (response.ok) {
            const userData = await response.json();
            console.log(userData);
            setUser(userData);
          } else {
            // Si la respuesta no es ok, manejar el error
            console.error('Error al obtener el perfil del usuario:', response.statusText);
            localStorage.removeItem('authToken');
            setUser(null);
          }
        } catch (error) {
          console.error('Error al conectar con el servidor:', error);
          localStorage.removeItem('authToken');
          setUser(null);
        } finally {
          setLoading(false); // Finalizar la carga
        }
      };

      fetchUserProfile();
    } else {
      // No hay token, el usuario no está autenticado
      setUser(null);
      setLoading(false); // Finalizar la carga
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
