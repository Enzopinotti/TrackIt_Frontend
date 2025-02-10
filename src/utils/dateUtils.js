// src/utils/dateUtils.js

export function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString); // Convertimos el string en un objeto Date
    const day = String(date.getDate()).padStart(2, '0'); // Añadimos un 0 si el día es menor de 10
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript empiezan desde 0
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  