// src/components/Navigation/Navigation.js

import { NavLink } from 'react-router';

function Navigation({ className = 'navigation', role, onLinkClick = () => {} }) {
  return (
    <nav className={className}>
      <ul>
        <li>
          <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''} onClick={onLinkClick}>
            INICIO
          </NavLink>
        </li>
        <li>
          <NavLink to="/requerimientos" className={({ isActive }) => isActive ? 'active' : ''} onClick={onLinkClick}>
            REQUERIMIENTOS
          </NavLink>
        </li>
        {(role === 'Admin' || role === 'Interno') && (
          <>
            <li>
              <NavLink to="/usuarios" className={({ isActive }) => isActive ? 'active' : ''} onClick={onLinkClick}>
                USUARIOS
              </NavLink>
            </li>
            <li>
              <NavLink to="/tipos-categorias" className={({ isActive }) => isActive ? 'active' : ''} onClick={onLinkClick}>
                TIPOS Y CATEGORÍAS
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
