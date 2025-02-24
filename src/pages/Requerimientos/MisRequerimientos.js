// src/pages/Requerimientos/MisRequerimientos.js
import React, { useContext, useState, useEffect, useCallback } from 'react';
import KanbanBoard from '../../components/KanbanBoard.js';
import { AuthContext } from '../../context/AuthContext.js';
import CustomModal from '../../components/CustomModal.js';
import RequirementForm from '../../components/RequirementForm.js';
import Swal from 'sweetalert2';
import { formatDateToDDMMYYYY } from '../../utils/dateUtils.js';

function MisRequerimientos() {
  const { user, token } = useContext(AuthContext);
  const [requerimientos, setRequerimientos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateRequirement = async (data) => {
    try {
      const response = await fetch('http://trackit.somee.com/api/Requirements/createRequeriment', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data, // FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Message || 'Error al crear requerimiento');
      }

      const result = await response.json();
      const newRequirement = result.data;
      
      // Actualizar el estado
      setRequerimientos((prev) => [...prev, newRequirement]);

      Swal.fire('Éxito', 'Requerimiento creado exitosamente.', 'success');
      closeModal();
    } catch (error) {
      console.error('Error al crear el requerimiento:', error.message);
      Swal.fire('Error', error.message, 'error');
    }
  };

  // Llamada al backend para obtener los requerimientos del usuario
  const fetchRequerimientos = useCallback(async () => {
    try {
      const response = await fetch(`http://trackit.somee.com/api/Requirements/created-by/${user.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.Message || 'Error al obtener los requerimientos');
      }

      const result = await response.json();
      console.log(result);  // Verifica aquí si los datos están correctos
      setRequerimientos(result.data); // Asumimos que el backend devuelve los requerimientos en `Data`
    } catch (error) {
      console.error('Error al obtener los requerimientos:', error.message);
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }, [user?.id, token]); // Dependencias de user.id y token

  useEffect(() => {
    if (user && user.id && token) { // Asegurémonos de que tenemos todos los datos antes de hacer la llamada
      fetchRequerimientos();
    }
  }, [fetchRequerimientos, user, token]); // Agregar dependencias de user y token

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

      <KanbanBoard
        requerimientos={requerimientos.map((req) => ({
          ...req,
          date: formatDateToDDMMYYYY(req.date),
        }))}
        estados={['Abierto', 'Asignado']}
        isDraggable={false}
      />

      <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
        <RequirementForm
          onSubmit={handleCreateRequirement}
          onCancel={closeModal}
          setRequerimientos={setRequerimientos} // ✅ Pasar la prop
          closeModal={closeModal} // ✅ Pasar la prop
        />
      </CustomModal>
    </div>
  );
}

export default MisRequerimientos;