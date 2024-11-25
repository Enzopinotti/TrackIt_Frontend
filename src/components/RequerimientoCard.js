// src/components/RequerimientoCard/RequerimientoCard.js

import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function RequerimientoCard({ requerimiento }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/requerimientos/${requerimiento.id}`);
  };

  const handleEyeClick = (e) => {
    e.stopPropagation(); // Evita que el evento de clic se propague al contenedor principal
    navigate(`/requerimientos/${requerimiento.id}`);
  };

  const handleSubrequirementsClick = (e) => {
    e.stopPropagation(); // Evita que el evento de clic se propague al contenedor principal
    navigate(`/requerimientos/${requerimiento.id}/subrequerimientos`); // Ruta a sub-requerimientos
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
              {requerimiento.fechaCreacion} - {requerimiento.fechaVencimiento}
            </span>
          </div>

          {/* Información de Usuarios y Acceso al Detalle */}
          <div className="user-info">
            <div className="users">
              {(requerimiento.usuariosAsignados || []).map((usuario, index) => (
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
    tipo: PropTypes.string.isRequired, // Añadido para el tipo del requerimiento
    title: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    fechaCreacion: PropTypes.string.isRequired, // Fecha de creación
    fechaVencimiento: PropTypes.string.isRequired, // Fecha de vencimiento
    usuariosAsignados: PropTypes.arrayOf(
      PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
      })
    ).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default RequerimientoCard;
