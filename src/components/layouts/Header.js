// src/components/Header/Header.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuOverlay from '../layouts/MenuOverlay.js'; // Ajusta la ruta según corresponda
import Logo from '../Logo.js';
import NotificationsButton from '../NotificationsButton.js';
import UserProfile from '../UserProfile.js';
import Navigation from '../Navigation.js';
import { AuthContext } from '../../context/AuthContext.js';
import { FaUserShield } from 'react-icons/fa'; // Icono para el admin
import LoadingOverlay from '../LoadingOverlay.js';

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);

  // Deshabilitar el scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Si el usuario no está autenticado, muestra un loader
  if (!user) {
    return <LoadingOverlay isLoading={true} />;
  }

  const userRole = user.role || '';

  // Función para manejar clic en el perfil de usuario
  const handleProfileClick = () => {
    navigate('/perfil-usuario');
    setIsMenuOpen(false);
  };

  // Función para manejar clic en notificaciones
  const handleNotificationsClick = () => {
    alert('Ver notificaciones'); // Reemplaza con la funcionalidad real
  };

  // Función para manejar el clic en el botón de administrador
  const handleAdminClick = () => {
    // Redirige a la ruta de administración, por ejemplo, a un dashboard de admin
    navigate('/admin/dashboard');
  };

  // Función para alternar el menú
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="app-header">
        <div className="header-left">
          <Logo />
          <Navigation className="navigation" role={userRole} />
        </div>
        <div className="header-right">
          <NotificationsButton onClick={handleNotificationsClick} count={3} />
          <UserProfile onClick={handleProfileClick} user={user} />
          {/* Si el usuario es administrador, mostrar botón de admin */}
          {userRole === 'admin' && (
            <button
              className="admin-button"
              onClick={handleAdminClick}
              title="Panel de administración"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginRight: '1rem',
                marginLeft: '1rem',
              }}
            >
              <FaUserShield size={24} color="#0A9396" />
              <p>Administrador</p>
            </button>
          )}
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
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        userRole={userRole}
        onProfileClick={handleProfileClick}
        user={user}
      />
    </>
  );
}

export default Header;