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
  const [selectedRequirementType, setSelectedRequirementType] = useState(''); // Tipo seleccionado
  const [categories, setCategories] = useState([]); // Categorías según tipo

  // Estado para indicar si se está enviando el formulario (para evitar múltiples envíos)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm();

  // Obtener tipos de requerimiento desde el backend
  useEffect(() => {
    const fetchRequirementTypes = async () => {
      try {
        const response = await fetch('http://trackit.somee.com/api/RequirementType', {
          headers: { Authorization: `Bearer ${token}` },
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

  // Obtener categorías según el tipo seleccionado
  useEffect(() => {
    if (!selectedRequirementType) {
      setCategories([]);
      setValue('categoryId', '');
      return;
    }
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `http://trackit.somee.com/api/Category/by-requirement-type/${selectedRequirementType}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!response.ok) {
          throw new Error('Error al obtener las categorías para ese tipo');
        }
        const data = await response.json();
        setCategories(data);
        setValue('categoryId', '');
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [selectedRequirementType, token, setValue]);

  // Manejar cambio del select de tipo
  const handleRequirementTypeChange = (event) => {
    setSelectedRequirementType(event.target.value);
  };

  // Manejar modal para enlazar requerimientos (solo para usuarios Internos)
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

  // Función para construir FormData y enviar el formulario
  const submitForm = async (data) => {
    setIsSubmitting(true);
    try {
      // Sanitizar y preparar datos básicos
      const sanitizedSubject = DOMPurify.sanitize(data.subject);
      const sanitizedDescription = DOMPurify.sanitize(data.description);

      // Crear FormData (para enviar multipart/form-data)
      const formData = new FormData();
      formData.append('subject', sanitizedSubject);
      formData.append('description', sanitizedDescription);
      formData.append('requirementTypeId', data.requirementTypeId);
      formData.append('categoryId', data.categoryId);
      if(data.priorityId) {
        formData.append('priorityId', data.priorityId);
      }
      // Si el usuario es Interno, se asigna al usuario seleccionado (opcional)
      if (user.role === 'Interno' && data.assignedUser) {
        formData.append('assignedUsers', data.assignedUser);
      }
      // Agregar requerimientos relacionados (si los hay)
      if (relatedRequirements && relatedRequirements.length > 0) {
        // Se puede enviar como cadena JSON o repetir el mismo nombre para cada valor
        formData.append('relatedRequirementIds', JSON.stringify(relatedRequirements));
      }

      // Procesar archivos adjuntos:
      // data.files es un FileList; convertirlo a array:
      const files = data.files ? Array.from(data.files) : [];
      // Validar cantidad máxima de archivos:
      if (files.length > 5) {
        throw new Error("Solo se permiten hasta 5 archivos adjuntos.");
      }
      // Extensiones permitidas:
      const allowedExtensions = ['.doc', '.docx', '.xls', '.xlsx', '.pdf'];
      const maxFileSize = 5 * 1024 * 1024; // 5 MB

      files.forEach((file, index) => {
        const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        if (!allowedExtensions.includes(extension)) {
          throw new Error(`El archivo '${file.name}' tiene una extensión no permitida.`);
        }
        if (file.size > maxFileSize) {
          throw new Error(`El archivo '${file.name}' excede el tamaño máximo permitido de 5 MB.`);
        }
        // Se añade cada archivo a FormData con el mismo nombre, por ejemplo "files"
        formData.append('files', file);
      });

      // Llamar a la función onSubmit pasada por props, enviando FormData
      await onSubmit(formData);
    } catch (error) {
      console.error(error);
      // Puedes utilizar un alert o Swal para notificar el error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="requirement-form-container">
      <form className="requirement-form" onSubmit={handleSubmit(submitForm)} encType="multipart/form-data">
        <h2>Crear Requerimiento</h2>
        <input
          type="text"
          placeholder="Asunto"
          {...register('subject', { required: 'El asunto es obligatorio' })}
        />
        {errors.subject && <p className="error">{errors.subject.message}</p>}

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
        {errors.requirementTypeId && <p className="error">{errors.requirementTypeId.message}</p>}

        <select {...register('categoryId', { required: 'La categoría es obligatoria' })}>
          <option value="">Seleccione Categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && <p className="error">{errors.categoryId.message}</p>}

        {/* Campo para archivos adjuntos */}
        <input
          type="file"
          {...register('files')}
          multiple
          accept=".doc,.docx,.xls,.xlsx,.pdf"
        />
        <p className="file-warning">
          Solo se permiten hasta 5 archivos. Los formatos admitidos son: WORD, EXCEL y PDF. Cada archivo no debe exceder 5 MB.
        </p>
        {errors.files && <p className="error">{errors.files.message}</p>}

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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Procesando...' : 'Crear'}
          </button>
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