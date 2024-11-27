// src/components/CategoryList.js

import React from 'react';
import PropTypes from 'prop-types';

function CategoryList({ categorias, onSeleccionar }) {
  return (
    <div className="category-list">
      <h2>Lista de Categorías</h2>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id} onClick={() => onSeleccionar(categoria.id)}>
            <p className="nombre">{categoria.nombre}</p>
            <p className="tipo">Tipo: {categoria.typeId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

CategoryList.propTypes = {
  categorias: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      typeId: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSeleccionar: PropTypes.func.isRequired,
};

export default CategoryList;
