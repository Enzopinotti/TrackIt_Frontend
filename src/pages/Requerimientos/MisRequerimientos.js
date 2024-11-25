// src/pages/Requerimientos/MisRequerimientos.js

import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KanbanBoard from '../../components/KanbanBoard.js';
import { AuthContext } from '../../context/AuthContext.js';

function MisRequerimientos() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Simular la obtención de requerimientos del usuario externo
  const [requerimientos, setRequerimientos] = useState([]);

  useEffect(() => {
    if (user) {
      setRequerimientos([
        {
          id: 1,
          tipo: 'Software',
          title: 'Requerimiento Personal 1',
          descripcion:
            'Solicitud para verificar y preparar el equipo informático de un nuevo empleado. Se requiere instalación de software esencial y verificación de periféricos.',
          fechaCreacion: '12/12/2024',
          fechaVencimiento: '12/09/2024',
          usuariosAsignados: [
            {
              nombre: 'Juan Pérez',
              avatar: '/assets/images/usuarios/juan_perez.png',
            },
            {
              nombre: 'María Gómez',
              avatar: '/assets/images/usuarios/maria_gomez.png',
            },
          ],
          status: 'Pendiente',
        },
        {
          id: 2,
          tipo: 'Hardware',
          title: 'Requerimiento Personal 2',
          descripcion:
            'Solicitud de actualización de hardware para mejorar el rendimiento de las estaciones de trabajo.',
          fechaCreacion: '15/12/2024',
          fechaVencimiento: '15/01/2025',
          usuariosAsignados: [
            {
              nombre: 'Carlos López',
              avatar: '/assets/images/usuarios/carlos_lopez.png',
            },
          ],
          status: 'En Proceso',
        },
        {
          id: 3,
          tipo: 'Red',
          title: 'Requerimiento Personal 3',
          descripcion:
            'Configuración de la red para la nueva oficina en expansión.',
          fechaCreacion: '20/12/2024',
          fechaVencimiento: '20/02/2025',
          usuariosAsignados: [
            {
              nombre: 'Ana Torres',
              avatar: '/assets/images/usuarios/ana_torres.png',
            },
          ],
          status: 'Completado',
        },
        // Agrega más requerimientos según sea necesario
      ]);
    }
  }, [user]);
  

  const estados = ['Pendiente', 'En Proceso', 'Completado'];

  const handleCrearRequerimiento = () => {
    navigate('/requerimientos/crear'); // Redirigir a la página de creación
  };

  return (
    <div className="mis-requerimientos-page">
      <div className="header">
        <h1 className="title">Mis Requerimientos</h1>
        <button className="create-button" onClick={handleCrearRequerimiento}>
          <img src='/assets/icons/plus-icon.png' alt="Crear Requerimiento" />
          <p>Crear Requerimiento</p>
        </button>
      </div>
      <KanbanBoard requerimientos={requerimientos} estados={estados} isDraggable={false} />
    </div>
  );
}

export default MisRequerimientos;
