// src/components/CategoryList.js

import React from 'react';

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

export default CategoryList;
