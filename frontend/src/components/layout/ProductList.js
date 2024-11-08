import { useState } from 'react';
import { useOutletContext, Link, useNavigate } from "react-router-dom";

export default function ProductList() {
  var produtosList = useOutletContext();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/rotas/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        setMessage('Produto deletado com sucesso!');
        navigate(0);
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao deletar produto: ${errorData.error}`);
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="container-fluid p-2 text-center">
      <div className="row p-2">
        <h2 className="p-2">Produtos</h2>
        <div className="col-md-8 offset-2 border border-1 rounded-4 shadow-sm">
          <table className="table table-striped table-borderless table-hover table-sm">
            <thead>
              <tr>
                <th scope="col" className="p-3">ID</th>
                <th scope="col" className="p-3">Nome</th>
                <th scope="col" className="p-3">Quantidade</th>
                <th scope="col" className="p-3">Descrição</th>
                <th scope="col" className="p-3">Valor</th>
                <th scope="col" className="p-3">Deletar</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {produtosList.map((item) => (
                <tr key={item.id}>
                  <th scope="row" className="text-center">{item.id}</th>
                  <td className="text-center">
                    <Link to="update" state={{ produto: item }} className="link-primary link-underline link-underline-opacity-50 link-offset-1">
                      <b>{item.name}</b>
                    </Link>
                  </td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-center">{item.desc}</td>
                  <td className="text-center">R$ {item.price}</td>
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
              <button  className="btn btn-success btn-lg">Inserir Produto</button>
            </Link>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};
