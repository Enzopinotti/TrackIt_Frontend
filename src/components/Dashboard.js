import React from 'react';

function Dashboard() {
  // Datos hardcodeados para mostrar
  const requerimientosRecientes = [
    { codigo: 'REH-2023-0001', asunto: 'Solicitud de nuevo hardware' },
    { codigo: 'ERR-2023-0002', asunto: 'Error en sistema operativo' },
  ];

  const comentariosRecientes = [
    { usuario: 'Juan Pérez', comentario: 'Necesito asistencia urgente.' },
    { usuario: 'María López', comentario: 'El problema ha sido resuelto.' },
  ];

  const notificaciones = [
    { mensaje: 'Tienes 2 requerimientos asignados pendientes.' },
    { mensaje: 'Nuevo comentario en el requerimiento REH-2023-0001.' },
  ];

  return (
    <div className="dashboard">
      <h2>Bienvenido al Dashboard</h2>

      <section>
        <h3>Requerimientos Recientes</h3>
        <ul>
          {requerimientosRecientes.map((req) => (
            <li key={req.codigo}>
              {req.codigo} - {req.asunto}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Comentarios Recientes</h3>
        <ul>
          {comentariosRecientes.map((com, index) => (
            <li key={index}>
              {com.usuario}: {com.comentario}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Notificaciones</h3>
        <ul>
          {notificaciones.map((noti, index) => (
            <li key={index}>{noti.mensaje}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;
