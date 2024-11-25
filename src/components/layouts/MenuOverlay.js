// src/components/MenuOverlay/MenuOverlay.js

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation.js';

function MenuOverlay({ isOpen, onClose, userRole, onProfileClick }) {
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
          <img src="/assets/images/user-placeholder.png" alt="Perfil de Usuario" className="user-image" />
        </button>
        <Navigation className="navigation-vertical" role={userRole} onLinkClick={onClose} />
      </div>
    </div>
  );
}

MenuOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  onProfileClick: PropTypes.func.isRequired,
};

export default MenuOverlay;
