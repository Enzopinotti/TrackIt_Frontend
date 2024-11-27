// src/config/config.js

const config = {
  useBackend: process.env.REACT_APP_USE_BACKEND, // Cambia a 'true' para usar el backend real
  secretKeyCaptcha: process.env.REACT_APP_SECRET_KEY_CAPTCHA, // Ahora toma la clave correcta
  clientUri: process.env.REACT_APP_CLIENT_URI, // Agregar esta variable para más flexibilidad
};

export default config;
