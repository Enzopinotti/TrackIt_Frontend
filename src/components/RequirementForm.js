// src/components/RequirementForm.js

import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext.js';
import { useForm } from 'react-hook-form';
import DOMPurify from 'dompurify';
import LinkRequirementModal from './LinkRequirementModal.js';

function RequirementForm({ onSubmit, onCancel }) {
  const { user, token } = useContext(AuthContext);

  // Estados para datos del formulario
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [relatedRequirements, setRelatedRequirements] = useState([]);

  // Estados para combos dependientes
  const [requirementTypes, setRequirementTypes] = useState([]); 
  const [selectedRequirementType, setSelectedRequirementType] = useState(''); // Guarda el tipo seleccionado
  const [categories, setCategories] = useState([]); // Guarda las categorías según el tipo

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  // -------------------------------------------
  // 1. useEffect para obtener la lista de tipos
  // -------------------------------------------
  useEffect(() => {
    const fetchRequirementTypes = async () => {
      try {
        const response = await fetch('http://trackit.somee.com/api/RequirementType', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Error al obtener los tipos de requerimiento');
        }
        const data = await response.json();
        setRequirementTypes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRequirementTypes();
  }, [token]);

  // --------------------------------------------------------------
  // 2. useEffect para obtener categorías una vez elegido el "tipo"
  // --------------------------------------------------------------
  useEffect(() => {
    // Si no hay un requirementType seleccionado, vaciamos categorías
    if (!selectedRequirementType) {
      setCategories([]);
      // También podríamos resetear el valor del select categoryId
      setValue('categoryId', '');
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `http://trackit.somee.com/api/Category/by-requirement-type/${selectedRequirementType}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error('Error al obtener las categorías para ese tipo');
        }
        const data = await response.json();
        setCategories(data);
        // Opcionalmente resetear o forzar un valor por defecto de categoryId:
        setValue('categoryId', '');
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [selectedRequirementType, token, setValue]);

  // --------------------------------------------------------------
  // Manejar el cambio de tipo para setear el selectedRequirementType
  // --------------------------------------------------------------
  const handleRequirementTypeChange = (event) => {
    setSelectedRequirementType(event.target.value);
  };

  // ------------------------
  // Enlazar Requerimientos
  // ------------------------
  const handleLinkRequirement = () => {
    setIsLinkModalOpen(true);
  };

  const closeLinkModal = () => {
    setIsLinkModalOpen(false);
  };

  const handleLinkSelection = (selectedIds) => {
    setRelatedRequirements(selectedIds);
    closeLinkModal();
  };

  // ------------------------
  // Submit del Formulario
  // ------------------------
  const submitForm = (data) => {
    // Sanitizar
    const sanitizedData = {
      subject: DOMPurify.sanitize(data.subject),
      requirementTypeId: parseInt(data.requirementTypeId, 10) || 0,
      categoryId: parseInt(data.categoryId, 10) || 0,
      description: DOMPurify.sanitize(data.description),
      priorityId: data.priorityId ? parseInt(data.priorityId, 10) : null,
      assignedUsers: user.role === 'Interno' ? [data.assignedUser] : [],
      relatedRequirementIds: relatedRequirements,
    };

    onSubmit(sanitizedData);
  };

  return (
    <div className="requirement-form-container">
      <form className="requirement-form" onSubmit={handleSubmit(submitForm)}>
        <h2>Crear Requerimiento</h2>

        {/* Asunto */}
        <input
          type="text"
          placeholder="Asunto"
          {...register('subject', { required: 'El asunto es obligatorio' })}
        />
        {errors.subject && <p className="error">{errors.subject.message}</p>}

        {/* Tipo de Requerimiento */}
        <select
          {...register('requirementTypeId', { required: 'El tipo es obligatorio' })}
          onChange={handleRequirementTypeChange}
        >
          <option value="">Seleccione Tipo</option>
          {requirementTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        {errors.requirementTypeId && (
          <p className="error">{errors.requirementTypeId.message}</p>
        )}

        {/* Categorías dependientes del tipo */}
        <select {...register('categoryId', { required: 'La categoría es obligatoria' })}>
          <option value="">Seleccione Categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="error">{errors.categoryId.message}</p>}

        {/* Asignar usuarios si es rol Interno */}
        {user.role === 'Interno' && (
          <>
            <input
              type="text"
              placeholder="Asignado a"
              {...register('assignedUser')}
              list="assignedUsers"
            />
            <datalist id="assignedUsers">
              <option value="user1" label="Juan Pérez" />
              <option value="user2" label="María García" />
              {/* ... */}
            </datalist>
          </>
        )}

        {/* Descripción */}
        <textarea
          placeholder="Descripción"
          {...register('description', { required: 'La descripción es obligatoria' })}
        />
        {errors.description && <p className="error">{errors.description.message}</p>}

        {/* Botón para enlazar requerimientos (solo Interno) */}
        {user.role === 'Interno' && (
          <button type="button" onClick={handleLinkRequirement} className="link-button">
            Enlazar Requerimiento
          </button>
        )}

        {/* Botones de acción */}
        <div className="buttons">
          <button type="submit">Crear</button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>

      {/* Modal para enlazar requerimientos (solo Interno) */}
      {user.role === 'Interno' && isLinkModalOpen && (
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
