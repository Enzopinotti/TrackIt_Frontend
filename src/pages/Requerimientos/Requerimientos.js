// src/pages/Requerimientos/Requerimientos.js

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KanbanBoard from '../../components/KanbanBoard.js';
import { AuthContext } from '../../context/AuthContext.js';
import CustomModal from '../../components/CustomModal.js';
import RequirementForm from '../../components/RequirementForm.js';
import Swal from 'sweetalert2';
import mockRequirements from '../../data/mockRequirements.js';
import mockUsers from '../../data/mockUsers.js';
import { loadFromLocalStorage, saveToLocalStorage } from '../../utils/localStorageUtils.js';

function Requerimientos() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  // Clave de localStorage específica para Interno/Admin
  const LOCAL_STORAGE_KEY = 'requerimientosInternos';

  const [requerimientos, setRequerimientos] = useState(() =>
    loadFromLocalStorage(LOCAL_STORAGE_KEY, mockRequirements)
  );

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
    const newId =
      requerimientos.length > 0
        ? typeof requerimientos[requerimientos.length - 1].id === 'number'
          ? requerimientos[requerimientos.length - 1].id + 1
          : requerimientos.length + 1
        : 1;
    const currentYear = new Date().getFullYear();
    const newCodigo = `REH-${currentYear}-${String(newId).padStart(8, '0')}`;

    // Obtener los usuarios asignados desde mockUsers
    const assignedUsers = data.assignedUsers
      .map((userId) => {
        const foundUser = mockUsers.find((u) => u.id === userId);
        return foundUser ? { ...foundUser } : null;
      })
      .filter((u) => u !== null);

    const newRequirement = {
      id: newId,
      tipo:
        data.requirementTypeId === '1'
          ? 'Software'
          : data.requirementTypeId === '2'
          ? 'Hardware'
          : 'Red',
      title: data.subject,
      descripcion: data.description,
      codigo: newCodigo,
      fechaCreacion: new Date().toLocaleDateString(),
      status: 'Pendiente',
      assignedUsers: assignedUsers,
      relatedRequirementIds: data.relatedRequirementIds || [],
    };

    const updatedRequerimientos = [newRequirement, ...requerimientos];
    setRequerimientos(updatedRequerimientos);
    saveToLocalStorage(LOCAL_STORAGE_KEY, updatedRequerimientos);

    Swal.fire({
      title: 'Éxito',
      text: 'Requerimiento creado exitosamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });

    closeModal();
  };

  // Agregar Requerimiento Temporal al Montar el Componente
  useEffect(() => {
    const agregarRequerimientoTemporal = () => {
      // Verificar si el requerimiento temporal ya existe para evitar duplicados
      if (!requerimientos.some((r) => r.id === 'temp')) {
        const tempRequirement = {
          id: 'temp', // ID único para el requerimiento temporal
          tipo: 'Prueba',
          title: 'Requerimiento Temporal',
          descripcion: 'Este es un requerimiento temporal para probar la funcionalidad.',
          codigo: 'REH-2024-99999999',
          fechaCreacion: new Date().toLocaleDateString(),
          status: 'Pendiente',
          assignedUsers: [mockUsers[0], mockUsers[1]], // Asignar usuarios existentes
          relatedRequirementIds: [],
        };
        const updatedRequerimientos = [tempRequirement, ...requerimientos];
        setRequerimientos(updatedRequerimientos);
        saveToLocalStorage(LOCAL_STORAGE_KEY, updatedRequerimientos);
      }
    };

    agregarRequerimientoTemporal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Ejecutar solo una vez al montar

  // Verificar permisos de acceso
  if (!user || (user.role !== 'Interno' && user.role !== 'Admin')) {
    Swal.fire({
      title: 'Acceso Denegado',
      text: 'No tienes permisos para acceder a esta página.',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      navigate('/'); // Redirigir a la página principal o de login
    });
    return null;
  }

  return (
    <div className="requerimientos-page">
      <div className="header">
        <h1 className="title">Requerimientos</h1>
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

export default Requerimientos;
