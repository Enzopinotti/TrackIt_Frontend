// src/components/KanbanBoard/KanbanBoard.js

import React from 'react';
import PropTypes from 'prop-types';
import RequerimientoCard from '../components/RequerimientoCard.js';

function KanbanBoard({ requerimientos, estados, isDraggable }) {
  return (
    <div className="kanban-board">
      {estados.map((estado) => {
        const requerimientosPorEstado = requerimientos.filter(r => r.status === estado);
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
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  estados: PropTypes.arrayOf(PropTypes.string).isRequired,
  isDraggable: PropTypes.bool,
};

KanbanBoard.defaultProps = {
  isDraggable: false,
};

export default KanbanBoard;
