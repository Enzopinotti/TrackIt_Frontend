// src/pages/Usuarios/Usuarios.js

import React, { useState } from 'react';
import UserList from '../../pages/Usuarios/UserList.js';
import UserForm from '../../pages/Usuarios/UserForm.js';
import mockUsers from '../../data/mockUsers.js';

function Usuarios() {
  // Estado para manejar la lista de usuarios
  const [usuarios, setUsuarios] = useState(mockUsers);

  // Estado para manejar el usuario seleccionado para editar (opcional)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  // Función para agregar un nuevo usuario
  const agregarUsuario = (nuevoUsuario) => {
    const newId = `user${usuarios.length + 1}`;
    setUsuarios((prevUsuarios) => [
      ...prevUsuarios,
      { ...nuevoUsuario, id: newId },
    ]);
  };

  // Función para actualizar un usuario existente
  const actualizarUsuario = (usuarioActualizado) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.id === usuarioActualizado.id ? usuarioActualizado : usuario
      )
    );
    setUsuarioSeleccionado(null); // Limpiar la selección después de actualizar
  };

  // Función para manejar la selección de un usuario para editar
  const seleccionarUsuario = (usuarioId) => {
    const usuario = usuarios.find((u) => u.id === usuarioId);
    setUsuarioSeleccionado(usuario);
  };

  return (
    <div className="usuarios-page">
      <div className="header">
        <h1 className="title">Usuarios</h1>
      </div>
      <div className="content">
        <UserList usuarios={usuarios} onSeleccionar={seleccionarUsuario} />
        <UserForm
          onAgregar={agregarUsuario}
          onActualizar={actualizarUsuario}
          usuarioSeleccionado={usuarioSeleccionado}
        />
      </div>
    </div>
  );
}

export default Usuarios;
