// src/pages/Requerimientos/DetalleRequerimiento.js

import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import RequirementDetails from './RequirementDetails.js';
import CommentsSection from './CommentsSection.js';

function DetalleRequerimiento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [requirement, setRequirement] = useState(null);

  useEffect(() => {
    // TODO: Reemplazar con una llamada al backend
    const fetchRequirement = async () => {
      try {
        // Simulación de una llamada al backend
        // const response = await fetch(`/api/requerimientos/${id}`);
        // const data = await response.json();
        // setRequirement(data);

        // Datos ficticios por ahora
        const dummyRequirement = {
          id: id,
          codigo: `#${id}`,
          title: 'Requerimiento de Ejemplo',
          description: 'Descripción detallada del requerimiento de ejemplo.',
          priority: 'Alta',
          recipient: 'Juan Pérez',
          sender: 'María Gómez',
          creationDate: '2023-10-01',
          creationTime: '14:30',
          status: 'Abierto',
          subRequirementsCount: 2, // Número de sub-requerimientos
          comments: [
            {
              id: 1,
              user: 'Juan Pérez',
              message: 'Este es un comentario de ejemplo.',
              date: '2023-10-02',
              time: '15:00',
            },
            {
              id: 2,
              user: 'María Gómez',
              message: 'Otro comentario de prueba.',
              date: '2023-10-03',
              time: '10:30',
            },
            // Más comentarios
          ],
          history: [
            {
              id: 1,
              action: 'Requerimiento creado',
              date: '2023-10-01',
              time: '14:30',
            },
            {
              id: 2,
              action: 'Asignado a Juan Pérez',
              date: '2023-10-02',
              time: '09:15',
            },
            // Más historial
          ],
        };

        setRequirement(dummyRequirement);
      } catch (error) {
        console.error('Error:', error);
        // Manejar errores, quizás mostrar un mensaje al usuario
      }
    };

    fetchRequirement();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Regresar a la página anterior
  };

  return (
    <div className="detalle-requerimiento">
      <div className="content">
        <div className="requirement-column">
          <RequirementDetails requirement={requirement} user={user} onBack={handleBack} />
        </div>

        <div className="messages-column">
          <CommentsSection requirement={requirement} user={user} />
        </div>
      </div>
    </div>
  );
}

export default DetalleRequerimiento;
