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
import Requerimientos from './pages/Requerimientos.js';
import TiposCategorias from './pages/TiposCategorias.js';
import Usuarios from './pages/Usuarios.js';
import Notificaciones from './pages/Notificaciones.js';
import PerfilUsuario from './pages/PerfilUsuario.js';

// Importar el componente PrivateRoute si lo estás usando
import PrivateRoute from './components/PrivateRoute.js';


function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplat: true,
      }}
    >
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<SeleccionLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-contrasenia" element={<RecuperarContrasenia />} />
          <Route path="/resetear-contrasenia" element={<ResetearContrasenia />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route
            path="/inicio"
            element={
              <PrivateRoute>
                <Inicio />
              </PrivateRoute>
            }
          />
          <Route
            path="/requerimientos"
            element={
              <PrivateRoute>
                <Requerimientos />
              </PrivateRoute>
            }
          />
          <Route
            path="/notificaciones"
            element={
              <PrivateRoute>
                <Notificaciones />
              </PrivateRoute>
            }
          />
          <Route
            path="/perfil-usuario"
            element={
              <PrivateRoute>
                <PerfilUsuario />
              </PrivateRoute>
            }
          />

          {/* Rutas exclusivas para usuarios internos */}
          <Route
            path="/tipos-categorias"
            element={
              <PrivateRoute onlyInternal={true}>
                <TiposCategorias />
              </PrivateRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <PrivateRoute onlyInternal={true}>
                <Usuarios />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
