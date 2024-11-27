// src/data/mockRequirements.js

import mockUsers from './mockUsers.js';

const mockRequirements = [
  {
    id: 1,
    tipo: 'Software',
    title: 'Desarrollar módulo de autenticación',
    descripcion: 'Crear un módulo de autenticación para el sistema utilizando JWT.',
    codigo: 'REH-2024-00000001',
    fechaCreacion: '27/04/2024',
    status: 'Pendiente',
    assignedUsers: [mockUsers[0], mockUsers[1]],
  },
  {
    id: 2,
    tipo: 'Hardware',
    title: 'Actualizar servidores de base de datos',
    descripcion: 'Reemplazar los servidores antiguos por nuevos equipos con mayor capacidad.',
    codigo: 'REH-2024-00000002',
    fechaCreacion: '28/04/2024',
    status: 'En Proceso',
    assignedUsers: [mockUsers[2]],
  },
  {
    id: 3,
    tipo: 'Red',
    title: 'Optimizar la infraestructura de red',
    descripcion: 'Mejorar la infraestructura de red para reducir la latencia y aumentar la seguridad.',
    codigo: 'REH-2024-00000003',
    fechaCreacion: '29/04/2024',
    status: 'Completado',
    assignedUsers: [mockUsers[3], mockUsers[4]],
  },
];

export default mockRequirements;
