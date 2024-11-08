import { useState } from 'react';
import { useOutletContext, Link, useNavigate } from "react-router-dom";

export default function UserList() {
  var usuariosList = useOutletContext();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/rotas/users/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        setMessage('Usuário deletado com sucesso!');
        navigate(0); // Força refresh
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao deletar usuário: ${errorData.error}`);
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="container-fluid p-2 text-center">
      <div className="row p-2">
        <h2 className="p-2">Funcionários</h2>
        <div className="col-md-8 offset-2 border border-1 rounded-4 shadow-sm">
          <table className="table table-striped table-borderless table-hover table-sm">
            <thead>
              <tr>
                <th scope="col" className="p-3">ID</th>
                <th scope="col" className="p-3">Nome</th>
                <th scope="col" className="p-3">Tipo</th>
                <th scope="col" className="p-3">E-mail</th>
                <th scope="col" className="p-3">Deletar</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {usuariosList.map((item) => (
                <tr key={item.id}>
                  <th scope="row" className="text-center">{item.id}</th>
                  <td className="text-center">
                    <Link to={'update'} state={{ usuario: item }} className="link-primary link-underline link-underline-opacity-50 link-offset-1">
                      <b>{item.name}</b>
                    </Link>
                  </td>
                  <td className="text-center">{item.user_type}</td>
                  <td className="text-center">{item.email}</td>
                  <td className="text-center">
                    <button type="button" className="btn-close" aria-label="Close"onClick={() => handleDelete(item.id)}></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-100 p-2">
        <div className="row text-center">
          <div className="col"></div>
          <div className="col">
            <Link to="inserir">
              <button  className="btn btn-success btn-lg">Inserir Usuário</button>
            </Link>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};