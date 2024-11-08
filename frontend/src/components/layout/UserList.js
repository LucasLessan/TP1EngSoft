import { useOutletContext, Link, useLoaderData } from "react-router-dom";

import styles from './UserList.module.css';

// import { getUsuarios } from "../data/UsuariosData";

// export async function loader() {
//   const usuariosList = await getUsuarios();
//   return { usuariosList };
// }

export default function UserList() {
  var usuariosList = useOutletContext();
  // var { usuariosList } = useLoaderData();

  const handleDelete = (id) => {
    console.log(usuariosList);
    usuariosList = usuariosList.filter(function(x) { return x.id != id; }); 
    console.log(usuariosList);
  };

  return (
    <div className="container-fluid p-2 text-center">
      <div className="row p-2">
        <h2 className="p-2">Funcionários</h2>
        <div className="col-md-8 offset-2 border border-1 rounded-4 shadow-sm">
          <table className="table table-striped table-borderless table-hover table-sm">
            <thead>
              <tr>
                <th scope="col" className="p-3">Id</th>
                <th scope="col" className="p-3">Nome</th>
                <th scope="col" className="p-3">Tipo</th>
                <th scope="col" className="p-3">E-mail</th>
                <th scope="col" className="p-3">Editar</th>
                <th scope="col" className="p-3">Deletar</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {usuariosList.map((item) => (
                <tr key={item.id}>
                  <th scope="row" className="text-center">{item.id}</th>
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">{item.user_type}</td>
                  <td className="text-center">{item.email}</td>
                  <td className="text-center">
                    <Link to="inserir" state={{ usuario: item }} className={`btn btn-outline-secondary`}>Editar</Link>
                  </td>
                  <td className="text-center">
                    <button className={`btn btn-outline-danger`} onClick={() => handleDelete(item.id)}>Remover</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-100 p-2">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <Link to="inserir">
              <button  className="btn btn-success btn-lg">Inserir Usuário</button>
            </Link>
          </div>
          <div className="col4"></div>
        </div>
      </div>
    </div>
  );
};