// src/components/TypeList.js


function TypeList({ tipos, onSeleccionar }) {
  const handleItemKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSeleccionar(id);
    }
  };

  return (
    <div className="type-list">
      <h2>Lista de Tipos</h2>
      <ul>
        {tipos.map((tipo) => (
          <li
            key={tipo.id}
            onClick={() => onSeleccionar(tipo.id)}
            onKeyDown={(event) => handleItemKeyDown(event, tipo.id)}
            role="button"
            tabIndex={0}
          >
            <div className="info">
              <p className="nombre">{tipo.nombre}</p>
              <p className="cantidad">
                Categorías: {tipo.categorias.length}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TypeList;
