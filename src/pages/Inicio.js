// src/pages/Inicio.js

import React from 'react';
import { Link } from 'react-router-dom';

function Inicio() {
  // Datos hardcodeados para requerimientos y notificaciones
  const requerimientosRecientes = []; // Puedes agregar objetos para mostrar requerimientos
  const comentariosRecientes = [
    {
      nombre: 'Leo Perez',
      cargo: 'Software',
      tiempo: 'Hace 2 minutos',
    },
    {
      nombre: 'Monica Ramirez',
      cargo: 'Soporte Hardware',
      tiempo: 'Hace 15 minutos',
    },
  ];

  const notificacionesSistema = [
    {
      titulo: 'Actualización de estado',
      descripcion: 'Soporte para Reportes Financieros',
    },
    {
      titulo: 'Mantenimiento Programado',
      descripcion: 'Mantenimiento del servidor el próximo lunes.',
    },
  ];

  return (
    <div className="inicio-page">
      {/* Sección: Tus últimos requerimientos */}
      <section className="ultimos-requerimientos">
        <h2>Tus últimos requerimientos</h2>
        {requerimientosRecientes.length === 0 ? (
          <p>Aún no tienes requerimientos.</p>
        ) : (
          <div className="carpetas-container">
            {requerimientosRecientes.map((req) => (
              <div key={req.codigo} className="carpeta">
                <img
                  src="/assets/images/placeholder-folder-icon.png" // Imagen genérica
                  alt="Carpeta"
                  className="carpeta-icon"
                />
                <p>{req.asunto}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sección: Notificaciones Rápidas */}
      <section className="notificaciones-rapidas">
        <div className="notificacion">
          <h3>Notificación de comentarios</h3>
          {comentariosRecientes.length === 0 ? (
            <p>No hay comentarios recientes.</p>
          ) : (
            <ul>
              {comentariosRecientes.map((comentario, index) => (
                <li key={index}>
                  <img
                    src="/assets/images/placeholder-comment-icon.png" // Imagen genérica
                    alt="Comentario"
                    className="icono-interaccion"
                  />
                  <div className="info-comentario">
                    <p className="nombre">{comentario.nombre}</p>
                    <p className="cargo">{comentario.cargo}</p>
                    <p className="tiempo">{comentario.tiempo}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="notificacion">
          <h3>Notificación de sistema</h3>
          {notificacionesSistema.length === 0 ? (
            <p>No hay notificaciones del sistema.</p>
          ) : (
            <ul>
              {notificacionesSistema.map((notificacion, index) => (
                <li key={index}>
                  <img
                    src="/assets/images/placeholder-system-icon.png" // Imagen genérica
                    alt="Sistema"
                    className="icono-interaccion"
                  />
                  <div className="info-notificacion">
                    <p className="titulo">{notificacion.titulo}</p>
                    <p className="descripcion">{notificacion.descripcion}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Link to="/notificaciones" className="ver-notificaciones-btn">
            Ver notificaciones
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Inicio;
