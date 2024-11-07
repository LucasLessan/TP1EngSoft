import { useOutletContext, Link, useLoaderData } from "react-router-dom";

// import { getUsuarios } from "../data/UsuariosData";

// export async function loader() {
//   const usuariosList = await getUsuarios();
//   return { usuariosList };
// }

export default function UserList() {
  var usuariosList = useOutletContext();
  // var { usuariosList } = useLoaderData();

  const handleDelete = (id) => {
    usuariosList = usuariosList.filter(function(x) { return x.id != id; }); 
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col1" />
        <div className="col10 border border-3 rounded-4 shadow-sm">
          <table className="table table-striped table-hover table-sm">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nome</th>
                <th scope="col">Tipo</th>
                <th scope="col">E-mail</th>
                <th scope="col">Editar</th>
                <th scope="col">Deletar</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {usuariosList.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.nome}</td>
                  <td>{item.tipo}</td>
                  <td>{item.email}</td>
                  <td>
                    <Link to="inserir" state={{ usuario: item}}>
                      <button>Editar</button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item.id)}>Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col1" />
      </div>
      <div className="container w-50">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <Link to="inserir" className="btn btn-primary btn-sm">Inserir Usuário</Link>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};
