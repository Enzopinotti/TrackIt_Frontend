// src/pages/Inicio.js

import React from 'react';
import { Link } from 'react-router-dom';
import mockUsers from '../data/mockUsers.js'; // Importar mockUsers

function Inicio() {
  // Datos hardcodeados para requerimientos y notificaciones
  const requerimientosRecientes = []; // Puedes agregar objetos para mostrar requerimientos

  // Generar comentarios recientes usando mockUsers
  const comentariosRecientes = [
    {
      userId: 'user1',
      tiempo: 'Hace 2 minutos',
      comentario: 'He completado el módulo de autenticación.',
    },
    {
      userId: 'user2',
      tiempo: 'Hace 15 minutos',
      comentario: 'Necesitamos revisar el servidor de base de datos.',
    },
    {
      userId: 'user3',
      tiempo: 'Hace 30 minutos',
      comentario: 'Actualización de la infraestructura de red completada.',
    },
    {
      userId: 'user4',
      tiempo: 'Hace 45 minutos',
      comentario: 'Implementando nuevas medidas de seguridad.',
    },
    {
      userId: 'user5',
      tiempo: 'Hace 1 hora',
      comentario: 'Soporte para el sistema de reportes financieros.',
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

  // Función para obtener datos del usuario por ID
  const getUserById = (id) => mockUsers.find((user) => user.id === id);

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
              {comentariosRecientes.map((comentario, index) => {
                const user = getUserById(comentario.userId);
                return (
                  <li key={index}>
                    <img
                      src={user.avatar}
                      alt={user.nombre}
                      className="icono-interaccion avatar-icon" // Clase actualizada para el avatar
                    />
                    <div className="info-comentario">
                      <p className="nombre">{user.nombre}</p>
                      <p className="cargo">{user.cargo}</p>
                      <p className="comentario">{comentario.comentario}</p>
                      <p className="tiempo">{comentario.tiempo}</p>
                    </div>
                  </li>
                );
              })}
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
