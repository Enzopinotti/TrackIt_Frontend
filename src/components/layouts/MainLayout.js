import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../layouts/Header.js';
import Footer from '../layouts/Footer.js';

function MainLayout() {
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
