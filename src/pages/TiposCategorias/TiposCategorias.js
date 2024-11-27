// src/pages/TiposCategorias/TiposCategorias.js

import React, { useState, useEffect } from 'react';
import TypeList from '../../pages/TiposCategorias/TypeList.js';
import CategoryList from '../../pages/TiposCategorias/CategoryList.js';
import TypeForm from '../../pages/TiposCategorias/TypeForm.js';
import CategoryForm from '../../pages/TiposCategorias/CategoryForm.js';
import mockTypes from '../../data/mockTypes.js';
import mockCategories from '../../data/mockCategories.js';

function TiposCategorias() {
  // Estado para manejar la lista de Tipos
  const [tipos, setTipos] = useState(() => {
    const storedTipos = localStorage.getItem('tipos');
    return storedTipos ? JSON.parse(storedTipos) : mockTypes;
  });

  // Estado para manejar la lista de Categorías
  const [categorias, setCategorias] = useState(() => {
    const storedCategorias = localStorage.getItem('categorias');
    return storedCategorias ? JSON.parse(storedCategorias) : mockCategories;
  });

  // Estado para manejar el Tipo seleccionado para editar
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);

  // Estado para manejar la Categoría seleccionada para editar
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  // Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem('tipos', JSON.stringify(tipos));
  }, [tipos]);

  useEffect(() => {
    localStorage.setItem('categorias', JSON.stringify(categorias));
  }, [categorias]);

  // Función para agregar un nuevo Tipo
  const agregarTipo = (nuevoTipo) => {
    const newId = `type${tipos.length + 1}`;
    setTipos((prevTipos) => [
      ...prevTipos,
      { ...nuevoTipo, id: newId, categorias: [] },
    ]);
  };

  // Función para actualizar un Tipo existente
  const actualizarTipo = (tipoActualizado) => {
    setTipos((prevTipos) =>
      prevTipos.map((tipo) =>
        tipo.id === tipoActualizado.id ? tipoActualizado : tipo
      )
    );
    setTipoSeleccionado(null); // Limpiar la selección después de actualizar
  };

  // Función para seleccionar un Tipo para editar
  const seleccionarTipo = (tipoId) => {
    const tipo = tipos.find((t) => t.id === tipoId);
    setTipoSeleccionado(tipo);
  };

  // Función para agregar una nueva Categoría
  const agregarCategoria = (nuevaCategoria) => {
    const newId = `cat${categorias.length + 1}`;
    setCategorias((prevCategorias) => [
      ...prevCategorias,
      { ...nuevaCategoria, id: newId },
    ]);
  };

  // Función para actualizar una Categoría existente
  const actualizarCategoria = (categoriaActualizada) => {
    setCategorias((prevCategorias) =>
      prevCategorias.map((categoria) =>
        categoria.id === categoriaActualizada.id ? categoriaActualizada : categoria
      )
    );
    setCategoriaSeleccionada(null); // Limpiar la selección después de actualizar
  };

  // Función para seleccionar una Categoría para editar
  const seleccionarCategoria = (categoriaId) => {
    const categoria = categorias.find((c) => c.id === categoriaId);
    setCategoriaSeleccionada(categoria);
  };

  return (
    <div className="tipos-categorias-page">
      <div className="header">
        <h1 className="title">Tipos y Categorías</h1>
      </div>
      <div className="content">
        <div className="lists">
          <TypeList tipos={tipos} onSeleccionar={seleccionarTipo} />
          <CategoryList categorias={categorias} onSeleccionar={seleccionarCategoria} />
        </div>
        <div className="forms">
          <TypeForm
            onAgregar={agregarTipo}
            onActualizar={actualizarTipo}
            tipoSeleccionado={tipoSeleccionado}
            categorias={categorias} // Para el dropdown de categorías
          />
          <CategoryForm
            onAgregar={agregarCategoria}
            onActualizar={actualizarCategoria}
            categoriaSeleccionada={categoriaSeleccionada}
          />
        </div>
      </div>
    </div>
  );
}

export default TiposCategorias;
