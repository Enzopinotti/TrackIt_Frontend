// src/utils/handleErrors.js

export const handleErrors = async (response) => {
    let errorMessage = 'Ocurrió un error. Inténtalo de nuevo.';
    if (response && response.json) {
      const errorData = await response.json();
      if (errorData && errorData.errors) {
        // Si el backend devuelve errores de modelo
        errorMessage = Object.values(errorData.errors).join(' ');
      } else if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } else if (response && response.statusText) {
      errorMessage = response.statusText;
    }
    return errorMessage;
  };
  