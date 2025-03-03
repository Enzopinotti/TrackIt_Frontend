import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { handleErrors } from '../utils/handleErrors.js';
import LoadingOverlay from '../components/LoadingOverlay.js';

function PerfilUsuario() {
  const { user, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // Para mostrar la imagen antes de subirla

  // Verifica si el usuario está cargado
  if (!user) {
    return <LoadingOverlay isLoading={true} />;
  }

  // Maneja el cierre de sesión
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Maneja el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      Swal.fire({
        title: 'Error',
        text: 'No se seleccionó ningún archivo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, selecciona un archivo de imagen válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    // Mostrar la imagen seleccionada como previsualización
    setPreviewImage(URL.createObjectURL(file)); // Usar URL.createObjectURL para previsualizar
    setSelectedImage(file);
  };

  // Maneja la subida de la imagen
  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      await Swal.fire({
        title: 'Error',
        text: 'Por favor, selecciona una imagen.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const token = localStorage.getItem('authToken');
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await fetch(`http://trackit.somee.com/api/User/upload-image/${user.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Enviar el token en la cabecera
        },
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        updateUser({ ...user, image: updatedUser.image });

        await Swal.fire({
          title: 'Éxito',
          text: 'Imagen actualizada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });

        setSelectedImage(null);  // Limpiar la imagen seleccionada
        setPreviewImage(null);   // Limpiar la previsualización de la imagen
      } else {
        const errorMessage = await handleErrors(response);
        await Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      await Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al conectar con el servidor.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="perfil-usuario-page">
      <h1>Perfil de Usuario</h1>
      <div className="perfil-container">
        <img
          src={previewImage || user.image || '/assets/images/user-placeholder.png'}
          alt="Foto de perfil"
          className="perfil-imagen"
        />
        <form onSubmit={handleImageUpload} className="form-upload-image">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button type="submit" className="btn-actualizar-imagen">
            Actualizar Imagen
          </button>
        </form>
        <div className="perfil-informacion">
          <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role}</p>
          {user.cargo && <p><strong>Cargo:</strong> {user.cargo}</p>}
          {user.departamento && <p><strong>Departamento:</strong> {user.departamento}</p>}
          {user.cuil && <p><strong>CUIL:</strong> {user.cuil}</p>}
          {user.empresa && <p><strong>Empresa:</strong> {user.empresa}</p>}
          {user.descripcion && <p><strong>Descripción:</strong> {user.descripcion}</p>}
        </div>
        <button onClick={handleLogout} className="btn-cerrar-sesion">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default PerfilUsuario;
