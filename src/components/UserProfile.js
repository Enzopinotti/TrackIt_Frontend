// src/components/UserProfile/UserProfile.js

import React from 'react';

function UserProfile({ onClick }) {
  return (
    <button
      className="user-profile-button"
      onClick={onClick}
      aria-label="Perfil de usuario"
    >
      <img src="/assets/images/user-placeholder.png" alt="Perfil de Usuario" className="user-image" />
    </button>
  );
}

export default UserProfile;

