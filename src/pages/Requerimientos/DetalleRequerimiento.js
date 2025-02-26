// src/pages/Requerimientos/DetalleRequerimiento.js
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';  // Accede al contexto para obtener el usuario
import RequirementDetails from './RequirementDetails.js';
import CommentsSection from './CommentsSection.js';
import Swal from 'sweetalert2';
import LoadingOverlay from '../../components/LoadingOverlay.js';

function DetalleRequerimiento() {
  const { id } = useParams(); // Obtenemos el id del requerimiento desde la URL
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext); // Obtenemos el usuario y el token desde el contexto

  const [requirement, setRequirement] = useState(null); // Estado para almacenar los detalles del requerimiento

  useEffect(() => {
    // Llamada a la API para obtener los detalles del requerimiento
    const fetchRequirement = async () => {
      try {
        const response = await fetch(`http://trackit.somee.com/api/Requirements/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Usamos el token para autenticar la solicitud
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.Message || 'Error al obtener el requerimiento');
        }

        const result = await response.json();
        console.log('detalle del requerimieno: ', result);
        setRequirement(result.data); // Establecemos el requerimiento en el estado
      } catch (error) {
        console.error('Error al obtener el requerimiento:', error.message);
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    };

    if (id && token) {
      fetchRequirement();
    }
  }, [id, token]); // Solo se ejecuta cuando el id o el token cambian

  const handleBack = () => {
    navigate(-1); // Regresamos a la página anterior cuando el usuario hace clic en el botón de volver
  };
  
  if (!requirement) return <LoadingOverlay isLoading={true} />;; // Mostramos un mensaje de carga mientras esperamos los datos

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
