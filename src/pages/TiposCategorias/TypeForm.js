// src/components/TypeForm.js

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function TypeForm({ onAgregar, onActualizar, tipoSeleccionado, categorias }) {
  const [nombre, setNombre] = useState('');
  const [categoriasAsignadas, setCategoriasAsignadas] = useState([]);

  useEffect(() => {
    if (tipoSeleccionado) {
      setNombre(tipoSeleccionado.nombre);
      setCategoriasAsignadas(tipoSeleccionado.categorias);
    } else {
      setNombre('');
      setCategoriasAsignadas([]);
    }
  }, [tipoSeleccionado]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre) {
      alert('Por favor, completa el nombre del Tipo.');
      return;
    }

    const tipoData = {
      nombre,
      categorias: categoriasAsignadas,
    };

    if (tipoSeleccionado) {
      onActualizar({ ...tipoSeleccionado, ...tipoData });
    } else {
      onAgregar(tipoData);
    }

    // Limpiar el formulario
    setNombre('');
    setCategoriasAsignadas([]);
  };

  const handleCategoriaChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setCategoriasAsignadas(selected);
  };

  return (
    <div className="type-form">
      <h2>{tipoSeleccionado ? 'Editar Tipo' : 'Agregar Tipo'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Tipo:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del Tipo"
            required
          />
        </div>

        <div className="form-group">
          <label>Categorías Asignadas:</label>
          <select
            multiple
            value={categoriasAsignadas}
            onChange={handleCategoriaChange}
          >
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit">{tipoSeleccionado ? 'Actualizar' : 'Agregar'}</button>
          <button
            type="button"
            onClick={() => {
              // Limpiar el formulario y deseleccionar
              setNombre('');
              setCategoriasAsignadas([]);
              if (tipoSeleccionado) {
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

TypeForm.propTypes = {
  onAgregar: PropTypes.func.isRequired,
  onActualizar: PropTypes.func.isRequired,
  tipoSeleccionado: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    categorias: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  categorias: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      typeId: PropTypes.string.isRequired,
    })
  ).isRequired,
};

TypeForm.defaultProps = {
  tipoSeleccionado: null,
};

export default TypeForm;
