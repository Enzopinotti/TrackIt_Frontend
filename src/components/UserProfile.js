// src/components/UserProfile/UserProfile.js

import React from 'react';

function UserProfile({ onClick, user }) {
    console.log(user)
  return (
    
    <button
      className="user-profile-button"
      onClick={onClick}
      aria-label="Perfil de usuario"
    >
      <img src={user.image || '/assets/images/user-placeholder.png'} alt="Perfil de Usuario" className="user-image" />
      <span>Bienvenido, {user.firstName}</span>
    </button>
  );
}

export default UserProfile;
