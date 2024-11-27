// src/components/UserList.js

import React from 'react';
import PropTypes from 'prop-types';

function UserList({ usuarios, onSeleccionar }) {
  return (
    <div className="user-list">
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id} onClick={() => onSeleccionar(usuario.id)}>
            <img src={usuario.avatar} alt={usuario.nombre} className="avatar" />
            <div className="info">
              <p className="nombre">{usuario.nombre}</p>
              <p className="cargo">{usuario.cargo}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

UserList.propTypes = {
  usuarios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      cargo: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSeleccionar: PropTypes.func.isRequired,
};

export default UserList;
