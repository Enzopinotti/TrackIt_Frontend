// src/components/UsuarioAdmin.js
import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import LoadingOverlay from './LoadingOverlay.js';
import { AuthContext } from '../context/AuthContext.js';

function AdminUsers() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext); // Suponiendo que el token se gestiona en AuthContext

  // Función para obtener el listado de usuarios
  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://trackit.somee.com/api/Admin/GetAllUsers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error fetching users');
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, [token]);

  // Manejo de aceptar usuario (cambiar isEnabled a true)
  const handleAccept = async (user) => {
    try {
      // Se requiere el DTO: { Email, IsEnabled } en el body
      const response = await fetch('http://trackit.somee.com/api/Admin/UpdateUserStatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          Email: user.email,
          IsEnabled: true
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating user status');
      }
      Swal.fire({
        title: 'Éxito',
        text: 'Usuario aceptado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
      // Actualiza la lista
      fetchUsuarios();
    } catch (error) {
      console.error('Error updating user status:', error);
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  // Manejo de rechazar usuario (eliminarlo)
  const handleReject = async (userId) => {
    try {
      const response = await fetch(`http://trackit.somee.com/api/Admin/DeleteUser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error deleting user');
      }
      Swal.fire({
        title: 'Usuario eliminado',
        text: 'El usuario ha sido eliminado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
      // Actualiza la lista
      fetchUsuarios();
    } catch (error) {
      console.error('Error deleting user:', error);
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  if (loading) {
    return <LoadingOverlay isLoading={true} />;
  }
  return (
    <div className="usuario-admin-container">
      {usuarios.length === 0 ? (
        <p>No hay usuarios para mostrar.</p>
      ) : (
        <div className="users-grid">
          {
          usuarios.map((user) => (
            <div className="user-card" key={user.id}>
              <img
                src={user.image || '/assets/images/user-placeholder.png'}
                alt={user.userName}
                className="user-image"
              />
              <h3 className="user-name">
                {user.firstName} {user.lastName}
              </h3>
              <p className="user-email">{user.email}</p>
              <p className="user-status">
                Estado: {user.isEnabled ? <span className="accepted">Aceptado</span> : <span className="pending">Pendiente</span>}
              </p>
              {/* Mostrar botones solo para usuarios pendientes */}
              {!user.isEnabled && (
                <div className="user-actions">
                  <button className="btn-accept" onClick={() => handleAccept(user)}>
                    Aceptar
                  </button>
                  <button className="btn-reject" onClick={() => handleReject(user.id)}>
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
