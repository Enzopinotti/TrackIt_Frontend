// src/components/KanbanBoard/KanbanBoard.js
import React from 'react';
import PropTypes from 'prop-types';
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

KanbanBoard.propTypes = {
  requerimientos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      requirementType: PropTypes.string.isRequired, // Cambia 'tipo' por 'category' si es necesario
      subject: PropTypes.string.isRequired, // Cambia 'title' por 'subject' si es necesario
      description: PropTypes.string.isRequired, // Cambia 'descripcion' por 'description' si es necesario
      code: PropTypes.string.isRequired, // Cambia 'codigo' por 'code' si es necesario
      date: PropTypes.string.isRequired, // Cambia 'fechaCreacion' por 'date' si es necesario
      status: PropTypes.string.isRequired,
      assignedUsers: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          nombre: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  estados: PropTypes.arrayOf(PropTypes.string).isRequired,
  isDraggable: PropTypes.bool,
};

export default KanbanBoard;
