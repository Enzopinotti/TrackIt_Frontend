// src/components/UserList.js


function UserList({ usuarios, onSeleccionar }) {
  return (
    <div className="user-list">
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id} onClick={() => onSeleccionar(usuario.id)}>
            <img src={usuario.avatar} alt={usuario.nombre} className="avatar" />
            <div className="info">
              <p className="nombre">{usuario.nombre}</p>
              <p className="cargo">{usuario.cargo}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
