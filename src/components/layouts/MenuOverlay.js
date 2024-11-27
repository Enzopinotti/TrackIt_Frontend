// src/components/MenuOverlay/MenuOverlay.js

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation.js';

function MenuOverlay({ isOpen, onClose, userRole, onProfileClick, user }) {
  const overlayRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null; // No renderizar nada si el menú no está abierto

  return (
    <div className={`menu-overlay ${isOpen ? 'active' : ''}`}>
      <button className="close-button" onClick={onClose} aria-label="Cerrar menú de navegación">
        &times;
      </button>
      <div className="menu-content" ref={overlayRef}>
        <button
          className="user-profile-button-overlay"
          onClick={() => { onProfileClick(); onClose(); }}
          aria-label="Perfil de usuario"
        >
          <img
            src={user && user.image ? user.image : "/assets/images/user-placeholder.png"}
            alt={`${user ? user.nombre : 'Usuario'} - Perfil`}
            className="user-image"
          />
          <span className="user-name">{user ? user.nombre : 'Usuario'}</span>
        </button>
        <Navigation className="navigation-vertical" role={userRole} onLinkClick={onClose} />
      </div>
    </div>
  );
}

export default MenuOverlay;
