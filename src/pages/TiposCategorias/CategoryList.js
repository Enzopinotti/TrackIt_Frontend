// src/components/CategoryList.js


function CategoryList({ categorias, onSeleccionar }) {
  const handleItemKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSeleccionar(id);
    }
  };

  return (
    <div className="category-list">
      <h2>Lista de Categorías</h2>
      <ul>
        {categorias.map((categoria) => (
          <li
            key={categoria.id}
            onClick={() => onSeleccionar(categoria.id)}
            onKeyDown={(event) => handleItemKeyDown(event, categoria.id)}
            role="button"
            tabIndex={0}
            aria-label={`Editar categoría ${categoria.nombre}`}
          >
            <p className="nombre">{categoria.nombre}</p>
            <p className="tipo">Tipo: {categoria.typeId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
