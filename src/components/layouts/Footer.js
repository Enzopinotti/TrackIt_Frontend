// src/components/Footer.js

import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Información de la Empresa */}
        <div className="footer-section company-info">
          <h2 className="company-name">Tu Empresa</h2>
          <p className="company-description">
            Somos una empresa líder en soluciones tecnológicas, comprometida con la innovación y la excelencia.
          </p>
        </div>

        {/* Enlaces de Navegación */}
        <div className="footer-section navigation">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="/home">Inicio</a></li>
            <li><a href="/requerimientos">Requerimientos</a></li>
            <li><a href="/tipos-categorias">Tipos y Categorías</a></li>
            <li><a href="/usuarios">Usuarios</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>

        {/* Redes Sociales */}
        <div className="footer-section social-media">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Información de Contacto */}
        <div className="footer-section contact-info">
          <h3>Contacto</h3>
          <p>Dirección: Calle Falsa 123, Ciudad, País</p>
          <p>Email: <a href="mailto:contacto@tuempresa.com">contacto@tuempresa.com</a></p>
          <p>Teléfono: <a href="tel:+1234567890">+123 456 7890</a></p>
        </div>
      </div>
      {/* Línea divisoria */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} - Tu Empresa. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
