// src/components/TypeList.js

import React from 'react';

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

export default TypeList;
