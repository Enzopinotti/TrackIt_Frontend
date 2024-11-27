// src/components/TypeList.js

import React from 'react';
import PropTypes from 'prop-types';

function TypeList({ tipos, onSeleccionar }) {
  return (
    <div className="type-list">
      <h2>Lista de Tipos</h2>
      <ul>
        {tipos.map((tipo) => (
          <li key={tipo.id} onClick={() => onSeleccionar(tipo.id)}>
            <div className="info">
              <p className="nombre">{tipo.nombre}</p>
              <p className="cantidad">
                Categorías: {tipo.categorias.length}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

TypeList.propTypes = {
  tipos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      categorias: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  onSeleccionar: PropTypes.func.isRequired,
};

export default TypeList;
