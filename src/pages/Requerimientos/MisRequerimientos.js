// src/pages/Requerimientos/MisRequerimientos.js

import React, { useContext, useState } from 'react';
import KanbanBoard from '../../components/KanbanBoard.js';
import { AuthContext } from '../../context/AuthContext.js';
import CustomModal from '../../components/CustomModal.js';
import RequirementForm from '../../components/RequirementForm.js';
import Swal from 'sweetalert2';
import mockRequirements from '../../data/mockRequirements.js';
import mockUsers from '../../data/mockUsers.js'; // Importar mockUsers

function MisRequerimientos() {
  const { user } = useContext(AuthContext); // Obtener usuario
  const [requerimientos, setRequerimientos] = useState(mockRequirements); // Inicializar con datos hardcodeados
  const [isModalOpen, setIsModalOpen] = useState(false);
  const estados = ['Pendiente', 'En Proceso', 'Completado'];

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateRequirement = (data) => {
    // Generar un nuevo ID y código único
    const newId = requerimientos.length > 0 ? requerimientos[requerimientos.length - 1].id + 1 : 1;
    const currentYear = new Date().getFullYear();
    const newCodigo = `REH-${currentYear}-${String(newId).padStart(8, '0')}`;

    // Obtener los usuarios asignados desde los datos hardcodeados
    const assignedUsers = data.assignedUsers.map((userId) => {
      const foundUser = mockUsers.find((u) => u.id === userId);
      return foundUser ? { ...foundUser } : null;
    }).filter(u => u !== null);

    const newRequirement = {
      id: newId,
      tipo: data.requirementTypeId === 1 ? 'Software' : data.requirementTypeId === 2 ? 'Hardware' : 'Red',
      title: data.subject,
      descripcion: data.description,
      codigo: newCodigo,
      fechaCreacion: new Date().toLocaleDateString(),
      status: 'Pendiente',
      assignedUsers: assignedUsers,
    };

    setRequerimientos((prev) => [newRequirement, ...prev]);

    Swal.fire({
      title: 'Éxito',
      text: 'Requerimiento creado exitosamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });

    closeModal();
  };

  // Verificar permisos de acceso
  if (!user || user.role !== 'Externo') {
    Swal.fire({
      title: 'Acceso Denegado',
      text: 'No tienes permisos para acceder a esta página.',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      // Redirigir a otra página si es necesario
    });
    return null;
  }

  return (
    <div className="mis-requerimientos-page">
      <div className="header">
        <h1 className="title">Mis Requerimientos</h1>
        <button className="create-button" onClick={openModal}>
          <img src='/assets/icons/plus-icon.png' alt='Crear Requerimiento' />
          <p>Crear Requerimiento</p>
        </button>
      </div>
      <KanbanBoard requerimientos={requerimientos} estados={estados} isDraggable={false} />

      {/* Modal para crear requerimiento */}
      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <RequirementForm onSubmit={handleCreateRequirement} onCancel={closeModal} />
      </CustomModal>
    </div>
  );
}

export default MisRequerimientos;
