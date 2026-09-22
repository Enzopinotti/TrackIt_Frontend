// src/components/UserForm.js

import { useState, useEffect } from 'react';

function UserForm({ onAgregar, onActualizar, usuarioSeleccionado = null }) {
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (usuarioSeleccionado) {
      setNombre(usuarioSeleccionado.nombre);
      setCargo(usuarioSeleccionado.cargo);
      setAvatar(usuarioSeleccionado.avatar);
    } else {
      setNombre('');
      setCargo('');
      setAvatar('');
    }
  }, [usuarioSeleccionado]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !cargo || !avatar) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const usuarioData = {
      nombre,
      cargo,
      avatar,
    };

    if (usuarioSeleccionado) {
      onActualizar({ ...usuarioSeleccionado, ...usuarioData });
    } else {
      onAgregar(usuarioData);
    }

    // Limpiar el formulario
    setNombre('');
    setCargo('');
    setAvatar('');
  };

  return (
    <div className="user-form">
      <h2>{usuarioSeleccionado ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user-name">Nombre:</label>
          <input
            id="user-name"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del usuario"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="user-role">Cargo:</label>
          <input
            id="user-role"
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            placeholder="Cargo del usuario"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="user-avatar">Avatar (URL):</label>
          <input
            id="user-avatar"
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="URL de la imagen del avatar"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit">{usuarioSeleccionado ? 'Actualizar' : 'Agregar'}</button>
          <button
            type="button"
            onClick={() => {
              // Limpiar el formulario y deseleccionar
              setNombre('');
              setCargo('');
              setAvatar('');
              if (usuarioSeleccionado) {
                onActualizar(null);
              }
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
