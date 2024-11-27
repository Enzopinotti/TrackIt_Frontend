// src/components/RequerimientoCard/RequerimientoCard.js

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function RequerimientoCard({ requerimiento }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/requerimiento/${requerimiento.id}`);
  };

  const handleEyeClick = (e) => {
    e.stopPropagation(); // Evita que el evento de clic se propague al contenedor principal
    navigate(`/requerimiento/${requerimiento.id}`);
  };

  const handleSubrequirementsClick = (e) => {
    e.stopPropagation(); // Evita que el evento de clic se propague al contenedor principal
    navigate(`/requerimiento/${requerimiento.id}/subrequerimientos`); // Ruta a sub-requerimientos
  };

  return (
    <div className="requerimiento-card" onClick={handleCardClick}>
      <div className="card-content">
        {/* Tipo del Requerimiento */}
        <div className="requirement-type">{requerimiento.tipo}</div>

        {/* Título del Requerimiento */}
        <h2 className="requirement-title">{requerimiento.title}</h2>

        {/* Botón de Sub-Requerimientos */}
        <button
          className="subrequirements-button"
          onClick={handleSubrequirementsClick}
        >
          Requerimientos Hijos
        </button>

        {/* Información del Requerimiento */}
        <div className="requirement-info">
          {/* Información de la Fecha */}
          <div className="calendar-info">
            <img
              src="/assets/icons/calendar.png"
              alt="Calendario"
              className="icon calendar-icon"
            />
            <span className="date-range">
              {requerimiento.fechaCreacion}
            </span>
          </div>

          {/* Información de Usuarios y Acceso al Detalle */}
          <div className="user-info">
            <div className="users">
              {(requerimiento.assignedUsers || []).map((usuario, index) => (
                <img
                  key={index}
                  src={usuario.avatar}
                  alt={usuario.nombre}
                  className="user-icon"
                />
              ))}
            </div>
            <img
              src="/assets/icons/eye.png"
              alt="Ver Detalle"
              className="eye-icon"
              onClick={handleEyeClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

RequerimientoCard.propTypes = {
  requerimiento: PropTypes.shape({
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
  }).isRequired,
};

export default RequerimientoCard;
