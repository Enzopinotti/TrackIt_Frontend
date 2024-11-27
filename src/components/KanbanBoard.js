  // src/components/KanbanBoard/KanbanBoard.js

  import React from 'react';
  import PropTypes from 'prop-types';
  import RequerimientoCard from './RequerimientoCard.js'; // Ajusta la ruta si es necesario

  function KanbanBoard({ requerimientos, estados, isDraggable = false }) {
    return (
      <div className={`kanban-board ${isDraggable ? 'draggable' : ''}`}>
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
        tipo: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        descripcion: PropTypes.string.isRequired,
        codigo: PropTypes.string.isRequired,
        fechaCreacion: PropTypes.string.isRequired,
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
