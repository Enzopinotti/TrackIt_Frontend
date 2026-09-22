// src/App.js

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';

// Core route guards remain eager so auth decisions happen before route chunks load.
import ProtectedRoute from './components/ProtectedRoute.js';
import PublicRoute from './components/PublicRoute.js';

// Route surfaces are split by navigation boundary instead of shipping every screen
// in the initial application bundle.
const MainLayout = lazy(() => import('./components/layouts/MainLayout.js'));
const AuthLayout = lazy(() => import('./components/layouts/AuthLayout.js'));
const SeleccionLogin = lazy(() => import('./pages/SeleccionLogin.js'));
const Login = lazy(() => import('./pages/Login.js'));
const RecuperarContrasenia = lazy(() => import('./pages/RecuperarContrasenia.js'));
const ResetearContrasenia = lazy(() => import('./pages/ResetearContrasenia.js'));
const Inicio = lazy(() => import('./pages/Inicio.js'));
const RequerimientosWrapper = lazy(() =>
  import('./pages/Requerimientos/RequerimientosWrapper.js')
);
const TiposCategorias = lazy(() => import('./pages/TiposCategorias/TiposCategorias.js'));
const Usuarios = lazy(() => import('./pages/Usuarios/Usuarios.js'));
const Notificaciones = lazy(() => import('./pages/Notificaciones.js'));
const PerfilUsuario = lazy(() => import('./pages/PerfilUsuario.js'));
const ConfirmacionRegistro = lazy(() => import('./pages/ConfirmacionRegistro.js'));
const RegistroExterno = lazy(() => import('./pages/RegistroExterno.js'));
const RegistroInterno = lazy(() => import('./pages/RegistroInterno.js'));
const SeleccionRegistro = lazy(() => import('./pages/SeleccionRegistro.js'));
const DetalleRequerimiento = lazy(() =>
  import('./pages/Requerimientos/DetalleRequerimiento.js')
);
const PageNotFound = lazy(() => import('./pages/PageNotFound.js'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.js'));

function RouteFallback() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      Cargando...
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
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
            <Route path="/registro" element={<SeleccionRegistro />} />
            <Route path="/registro/interno" element={<RegistroInterno />} />
            <Route path="/registro/externo" element={<RegistroExterno />} />
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
            <Route path="/tipos-categorias" element={<TiposCategorias />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
