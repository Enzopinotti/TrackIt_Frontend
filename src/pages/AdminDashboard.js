// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import AdminUsers from '../components/AdminUsers.js';
import LoadingOverlay from '../components/LoadingOverlay.js';

function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una carga inicial o aquí puedes traer otros datos si es necesario.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingOverlay isLoading={true} />;
  }

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      <section className="usuarios-section">
        <h2>Usuarios Registrados</h2>
        <AdminUsers />
      </section>
      {/* Aquí puedes agregar más secciones del dashboard si lo requieres */}
    </div>
  );
}

export default AdminDashboard;
