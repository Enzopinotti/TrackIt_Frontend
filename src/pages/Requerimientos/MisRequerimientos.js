// src/pages/Requerimientos/MisRequerimientos.js
import React, { useContext, useState } from 'react';
import KanbanBoard from '../../components/KanbanBoard.js';
import { AuthContext } from '../../context/AuthContext.js';
import CustomModal from '../../components/CustomModal.js';
import RequirementForm from '../../components/RequirementForm.js';
import Swal from 'sweetalert2';

function MisRequerimientos() {
  const { user, token } = useContext(AuthContext); // Obtenemos el usuario y el token
  const [requerimientos, setRequerimientos] = useState([]); // Puedes hacer un fetch para llenarlo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const estados = ['Pendiente', 'En Proceso', 'Completado'];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /**
   * Maneja la creación de requerimientos enviando la información a la API.
   */
  const handleCreateRequirement = async (data) => {
    try {
      // Ajusta la URL según tus rutas en el servidor
      const response = await fetch('http://trackit.somee.com/api/Requirements/createRequeriment', {
        method: 'POST', // Es recomendable que en tu backend cambies el método a POST
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Enviar el token
        },
        body: JSON.stringify(data),
      });
      console.log(response)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Message || 'Error al crear requerimiento');
      }

      // Respuesta exitosa
      const result = await response.json();
      const newRequirement = result.Data; // Suponiendo que el backend devuelva { Message, Data }

      // Actualizar estado local (si es que quieres reflejar el nuevo requerimiento en tu Kanban de inmediato)
      setRequerimientos((prev) => [newRequirement, ...prev]);

      Swal.fire({
        title: 'Éxito',
        text: 'Requerimiento creado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      closeModal();
    } catch (error) {
      console.error('Error al crear el requerimiento:', error.message);
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  // Verificar permisos de acceso (rol "Externo")
  if (!user || user.role !== 'Externo') {
    Swal.fire({
      title: 'Acceso Denegado',
      text: 'No tienes permisos para acceder a esta página.',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
    return null;
  }

  return (
    <div className="mis-requerimientos-page">
      <div className="header">
        <h1 className="title">Mis Requerimientos</h1>
        <button className="create-button" onClick={openModal}>
          <img src="/assets/icons/plus-icon.png" alt="Crear Requerimiento" />
          <p>Crear Requerimiento</p>
        </button>
      </div>

      {/* Aquí iría tu tablero Kanban si así lo deseas */}
      <KanbanBoard requerimientos={requerimientos} estados={estados} isDraggable={false} />

      {/* Modal para crear requerimiento */}
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <RequirementForm onSubmit={handleCreateRequirement} onCancel={closeModal} />
      </CustomModal>
    </div>
  );
}

export default MisRequerimientos;