// src/utils/localStorageUtils.js

/**
 * Carga datos desde localStorage.
 * @param {string} key - La clave de localStorage.
 * @param {*} defaultValue - Valor por defecto si no existe.
 * @returns {*} - Datos cargados o valor por defecto.
 */
export const loadFromLocalStorage = (key, defaultValue) => {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) {
        return defaultValue;
      }
      return JSON.parse(serializedData);
    } catch (err) {
      console.error(`Error cargando ${key} desde localStorage`, err);
      return defaultValue;
    }
  };
  
  /**
   * Guarda datos en localStorage.
   * @param {string} key - La clave de localStorage.
   * @param {*} data - Datos a guardar.
   */
  export const saveToLocalStorage = (key, data) => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
    } catch (err) {
      console.error(`Error guardando ${key} en localStorage`, err);
    }
  };
  