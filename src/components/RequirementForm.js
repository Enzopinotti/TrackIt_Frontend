// src/components/RequirementForm.js

import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { requirementSchema } from '../validations/validationSchemas.js';
import DOMPurify from 'dompurify';
import LinkRequirementModal from './LinkRequirementModal.js';

function RequirementForm({ onSubmit, onCancel }) {
  const { user } = useContext(AuthContext);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [relatedRequirements, setRelatedRequirements] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(requirementSchema),
  });

  const handleLinkRequirement = () => {
    setIsLinkModalOpen(true);
  };

  const closeLinkModal = () => {
    setIsLinkModalOpen(false);
  };

  const submitForm = (data) => {
    // Sanitizar datos
    const sanitizedData = {
      subject: DOMPurify.sanitize(data.subject),
      requirementTypeId: data.requirementTypeId,
      categoryId: data.categoryId,
      description: DOMPurify.sanitize(data.description),
      priorityId: data.priorityId || null,
      assignedUsers: user.role === 'Interno' ? [data.assignedUser] : [],
      relatedRequirementIds: relatedRequirements,
    };

    onSubmit(sanitizedData);
  };

  // Simular la obtención de requerimientos existentes para enlazar
  useEffect(() => {
    // Aquí podrías obtener requerimientos desde una API
    // Para este ejemplo, usaremos datos simulados
  }, []);

  const handleLinkSelection = (selectedIds) => {
    setRelatedRequirements(selectedIds);
    closeLinkModal();
  };

  return (
    <div className="requirement-form-container">
      <form className="requirement-form" onSubmit={handleSubmit(submitForm)}>
        <h2>Crear Requerimiento</h2>

        <input
          type="text"
          placeholder="Asunto"
          {...register('subject')}
        />
        {errors.subject && <p className="error">{errors.subject.message}</p>}

        <select {...register('requirementTypeId')}>
          <option value="">Tipo</option>
          <option value="1">Software</option>
          <option value="2">Hardware</option>
          <option value="3">Red</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
        {errors.requirementTypeId && (
          <p className="error">{errors.requirementTypeId.message}</p>
        )}

        <select {...register('categoryId')}>
          <option value="">Categoría</option>
          <option value="1">Instalación</option>
          <option value="2">Actualización</option>
          <option value="3">Configuración</option>
          {/* Agrega más opciones según sea necesario */}
        </select>
        {errors.categoryId && (
          <p className="error">{errors.categoryId.message}</p>
        )}

        {user.role === 'Interno' && (
          <>
            <input
              type="text"
              placeholder="Asignado a"
              {...register('assignedUser')}
              list="assignedUsers"
            />
            <datalist id="assignedUsers">
              {/* Aquí podrías mapear una lista de usuarios internos */}
              <option value="Juan Pérez" />
              <option value="María Gómez" />
              <option value="Carlos López" />
              <option value="Ana Torres" />
              {/* Agrega más opciones según sea necesario */}
            </datalist>
            {errors.assignedUser && <p className="error">{errors.assignedUser.message}</p>}
          </>
        )}

        <textarea
          placeholder="Descripción"
          {...register('description')}
        />
        {errors.description && <p className="error">{errors.description.message}</p>}

        {user.role === 'Interno' && (
          <button type="button" onClick={handleLinkRequirement} className="link-button">
            Enlazar Requerimiento
          </button>
        )}

        <div className="buttons">
          <button type="submit">Crear</button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>

      {/* Modal para enlazar requerimientos */}
      {isLinkModalOpen && (
        <LinkRequirementModal
          isOpen={isLinkModalOpen}
          onRequestClose={closeLinkModal}
          onSelect={handleLinkSelection}
        />
      )}
    </div>
  );
}

RequirementForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default RequirementForm;
