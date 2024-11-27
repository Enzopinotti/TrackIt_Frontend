// src/components/CategoryForm.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function CategoryForm({ onAgregar, onActualizar, categoriaSeleccionada }) {
  const [nombre, setNombre] = useState('');
  const [typeId, setTypeId] = useState('');

  useEffect(() => {
    if (categoriaSeleccionada) {
      setNombre(categoriaSeleccionada.nombre);
      setTypeId(categoriaSeleccionada.typeId);
    } else {
      setNombre('');
      setTypeId('');
    }
  }, [categoriaSeleccionada]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !typeId) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const categoriaData = {
      nombre,
      typeId,
    };

    if (categoriaSeleccionada) {
      onActualizar({ ...categoriaSeleccionada, ...categoriaData });
    } else {
      onAgregar(categoriaData);
    }

    // Limpiar el formulario
    setNombre('');
    setTypeId('');
  };

  return (
    <div className="category-form">
      <h2>{categoriaSeleccionada ? 'Editar Categoría' : 'Agregar Categoría'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de la Categoría:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre de la Categoría"
            required
          />
        </div>

        <div className="form-group">
          <label>Tipo Asociado:</label>
          <select
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
            required
          >
            <option value="">Seleccionar Tipo</option>
            {/* Opciones de Tipos disponibles */}
            {/* Puedes pasar las opciones como props si es necesario */}
            <option value="type1">Tipo A</option>
            <option value="type2">Tipo B</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit">{categoriaSeleccionada ? 'Actualizar' : 'Agregar'}</button>
          <button
            type="button"
            onClick={() => {
              // Limpiar el formulario y deseleccionar
              setNombre('');
              setTypeId('');
              if (categoriaSeleccionada) {
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

CategoryForm.propTypes = {
  onAgregar: PropTypes.func.isRequired,
  onActualizar: PropTypes.func.isRequired,
  categoriaSeleccionada: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    typeId: PropTypes.string.isRequired,
  }),
};

CategoryForm.defaultProps = {
  categoriaSeleccionada: null,
};

export default CategoryForm;
