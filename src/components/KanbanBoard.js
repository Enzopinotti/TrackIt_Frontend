// src/components/KanbanBoard/KanbanBoard.js
import React from 'react';
import RequerimientoCard from './RequerimientoCard.js'; // Ajusta la ruta si es necesario

function KanbanBoard({ requerimientos, estados, isDraggable = false }) {
  // Asegurarse de que requerimientos sea un array, en caso contrario usar un array vacío
  const validRequerimientos = Array.isArray(requerimientos) ? requerimientos : [];
  console.log(requerimientos)
  console.log(estados)
  return (
    <div className={`kanban-board ${isDraggable ? 'draggable' : ''}`}>
      {estados.map((estado) => {
        const requerimientosPorEstado = validRequerimientos.filter(r => r.status === estado);
        
        return (
          <div className="kanban-column" key={estado}>
            <div className="column-header">
              <h2>{estado}</h2>
              <span className="count">{requerimientosPorEstado.length}</span>
            </div>
            <div className="column-content">
              {requerimientosPorEstado.map(requerimiento => (
                <RequerimientoCard key={requerimiento.id} requerimiento={requerimiento} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KanbanBoard;
