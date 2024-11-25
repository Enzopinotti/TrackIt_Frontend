// src/components/layouts/MainLayout.js

import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../layouts/Header.js';
import Footer from '../layouts/Footer.js';
import { AuthContext } from '../../context/AuthContext.js';

function MainLayout() {
  const { user, loading } = useContext(AuthContext);

  // Si estamos cargando, mostramos un indicador de carga o null
  if (loading) {
    return null; // O puedes mostrar un spinner u otro componente de carga
  }

  // Si el usuario no está autenticado, redirigir al inicio de sesión
  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
