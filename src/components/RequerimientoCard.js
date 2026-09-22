// src/components/RequerimientoCard/RequerimientoCard.js
import { useNavigate } from 'react-router';

function RequerimientoCard({ requerimiento }) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/requerimiento/${requerimiento.id}`);
  };

  const handleEyeClick = (e) => {
    e.stopPropagation(); // Evita que el evento de clic se propague al contenedor principal
    navigate(`/requerimiento/${requerimiento.id}`);
  };

  const handleCardKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  const handleEyeKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleEyeClick(event);
    }
  };

  const handleSubrequirementsClick = (e) => {
    e.stopPropagation(); // Evita que el evento de clic se propague al contenedor principal
    navigate(`/requerimiento/${requerimiento.id}/subrequerimientos`); // Ruta a sub-requerimientos
  };

  return (
    <div
      className="requerimiento-card"
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="card-content">
        {/* Tipo del Requerimiento */}
        <div className="requirement-type">{requerimiento.requirementType}</div> 
        
        {/* Título del Requerimiento */}
        <h2 className="requirement-title">{requerimiento.subject}</h2> 
        
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
              {requerimiento.date} {/* Cambié 'fechaCreacion' por 'date' */}
            </span>
          </div>

          {/* Información de Usuarios y Acceso al Detalle */}
          <div className="user-info">
            <div className="users">
              {(requerimiento.assignedUsers || []).map((usuario, index) => (
                <img
                  key={index}
                  src={usuario.image}
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
              onKeyDown={handleEyeKeyDown}
              role="button"
              tabIndex={0}
              aria-label="Ver detalle del requerimiento"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequerimientoCard;
