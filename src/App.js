// src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importar los layouts
import MainLayout from './components/layouts/MainLayout.js';
import AuthLayout from './components/layouts/AuthLayout.js';

// Importar las páginas
import SeleccionLogin from './pages/SeleccionLogin.js';
import Login from './pages/Login.js';
import RecuperarContrasenia from './pages/RecuperarContrasenia.js';
import ResetearContrasenia from './pages/ResetearContrasenia.js';
import Inicio from './pages/Inicio.js';
import RequerimientosWrapper from './pages/Requerimientos/RequerimientosWrapper.js'; // Ruta actualizada
import TiposCategorias from './pages/TiposCategorias/TiposCategorias.js'; // Ruta actualizada
import Usuarios from './pages/Usuarios/Usuarios.js';
import Notificaciones from './pages/Notificaciones.js';
import PerfilUsuario from './pages/PerfilUsuario.js';

import ConfirmacionRegistro from './pages/ConfirmacionRegistro.js';
import RegistroExterno from './pages/RegistroExterno.js';
import RegistroInterno from './pages/RegistroInterno.js';
import SeleccionRegistro from './pages/SeleccionRegistro.js';

// Importar componentes de rutas
import ProtectedRoute from './components/ProtectedRoute.js';
import PublicRoute from './components/PublicRoute.js';
import DetalleRequerimiento from './pages/Requerimientos/DetalleRequerimiento.js';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplat: true,
      }}
    >
      <Routes>
        {/* Rutas Públicas */}
        <Route
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route path="/" element={<SeleccionLogin />} />
          <Route path="/login/:tipoUsuario" element={<Login />} />
          <Route path="/recuperar-contrasenia" element={<RecuperarContrasenia />} />
          <Route path="/resetear-contrasenia" element={<ResetearContrasenia />} />
          {/* Rutas de Registro */}
          <Route path="/registro" element={<SeleccionRegistro />} />
          <Route path="/registro/interno" element={<RegistroInterno />} />
          <Route path="/registro/externo" element={<RegistroExterno />} />
          {/* Ruta de Confirmación de Registro */}
          <Route path="/confirmacion-registro/" element={<ConfirmacionRegistro />} />
        </Route>

        {/* Rutas Protegidas */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Inicio />} />
          <Route path="/requerimientos" element={<RequerimientosWrapper />} />
          <Route path="/requerimiento/:id" element={<DetalleRequerimiento />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/perfil-usuario" element={<PerfilUsuario />} />

          {/* Rutas exclusivas para usuarios internos */}
          <Route path="/tipos-categorias" element={<TiposCategorias />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
