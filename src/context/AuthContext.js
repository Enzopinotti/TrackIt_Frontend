// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import config from '../config/config.js'; // Importar la configuración

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export function AuthProvider({ children }) {
  // Estado de autenticación
  const [user, setUser] = useState(null);

  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (config.useBackend) {
      // Aquí deberías implementar la lógica para obtener el usuario desde el backend
      // Por ejemplo, verificar el token en localStorage y obtener datos del usuario
      // Este es un ejemplo simulado
      const fetchUserFromBackend = async () => {
        try {
          // Simular una llamada al backend
          const response = await new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  id: 1,
                  name: 'Usuario Backend',
                  email: 'usuario@backend.com',
                  role: 'interno', // Cambia según sea necesario
                }),
              1000
            )
          );
          setUser(response);
        } catch (error) {
          console.error('Error al obtener el usuario del backend:', error);
          setUser(null);
        }
      };

      fetchUserFromBackend();
    } else {
      // Establecer un usuario falso para pruebas
      const fakeUser = {
        id: 999,
        name: 'Usuario Falso',
        email: 'falso@ejemplo.com',
        role: 'externo', // Cambia a 'interno' o 'admin' para probar
      };
      setUser(fakeUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
