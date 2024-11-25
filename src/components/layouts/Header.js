// src/components/Header/Header.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuOverlay from '../layouts/MenuOverlay.js';
import Logo from '../Logo.js';
import NotificationsButton from '../NotificationsButton.js';
import UserProfile from '../UserProfile.js';
import Navigation from '../Navigation.js';

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simulación del rol del usuario. En producción, obtén esto del contexto de autenticación o del backend.
  const userRole = 'interno'; // Cambia a 'admin' o 'externo' para probar

  // Función para manejar clic en el perfil de usuario
  const handleProfileClick = () => {
    navigate('/perfil-usuario');
    setIsMenuOpen(false); // Cerrar el menú al navegar
  };

  // Función para manejar clic en notificaciones
  const handleNotificationsClick = () => {
    alert('Ver notificaciones'); // Reemplaza con la funcionalidad real
    // Opcional: Puedes navegar a una página de notificaciones
  };

  // Función para alternar el menú
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Deshabilitar el scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Limpieza al desmontar el componente
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="app-header">
        <div className="header-left">
          <Logo />
          <Navigation className="navigation" role={userRole} />
        </div>
        <div className="header-right">
          <NotificationsButton onClick={handleNotificationsClick} count={3} />
          <UserProfile onClick={handleProfileClick} />
          {/* Botón de Hamburguesa */}
          <button
            className="hamburger-button"
            onClick={handleMenuToggle}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <img src="/assets/icons/hamburger.png" alt="Menú" />
          </button>
        </div>
      </header>

      {/* Componente MenuOverlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        userRole={userRole}
        onProfileClick={handleProfileClick}
      />
    </>
  );
}

export default Header;
