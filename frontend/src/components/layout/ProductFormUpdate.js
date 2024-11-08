import { useState } from 'react';
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";

export default function ProductFormUpdate() {
  const navigate = useNavigate();
  const location = useLocation();

  // Preenche com valor de location.state se existir, ou seja, se o botão de editar na lista foi clicado
  var produto = location.state ? location.state.produto : { id: -1, name: '', quantity: 0.0, price: 0.0 };
  const [id, setId] = useState(produto.id);
  const [nome, setNome] = useState(produto.name);
  const [quantidade, setQuantidade] = useState(produto.quantity);
  const [valor, setValor] = useState(produto.price);
  const [desc, setDesc] = useState(produto.desc);
  const [message, setMessage] = useState('');

  const handleUpdate = async (event) => {
    event.preventDefault();

    // Cria o objeto do produto a ser enviado
    const produto = {
      name: nome,
      desc: desc,
      quantity: quantidade,
      price: valor,
    };

    try {
      const response = await fetch(`http://localhost:5000/api/rotas/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
      });
      if (response.ok) {
        setMessage('Produto atualizado com sucesso!');
        navigate('../'); // Navega de volta para a lista de usuários
        navigate(0); // Força refresh
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao atualizar produto: ${errorData.error}`);
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  const handleDelete = async (event) => {
    try {
      const response = await fetch(`http://localhost:5000/api/rotas/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        setMessage('Produto deletado com sucesso!');
        navigate('../');
        navigate(0); // Força refresh
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao deletar produto: ${errorData.error}`);
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="container w-50 p-3">
      <form className="g-3 p-3" onSubmit={handleUpdate}>

        <div className="row p-3">
          <div className="col-6">
            <label htmlFor="inputNome" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control h-75"
              id="inputNome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required />
          </div>
          <div className="col-6">
            <label htmlFor="inputQuantidade" className="form-label">Quantidade</label>
            <input
            type="number"
            className="form-control h-75"
            id="inputQuantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required />
          </div>
        </div>

        <div className="row p-3">
          <div className="col-6">
            <label htmlFor="inputValor" className="form-label">Preço</label>
            <input
            type="number"
            className="form-control h-75"
            id="inputValor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required />
          </div>
          <div className="col-6">
            <label htmlFor="inputDesc" className="form-label">Descrição</label>
            <input
            type="textarea"
            className="form-control h-75"
            id="inputDesc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required />
          </div>
        </div>

        <div className="row p-4 text-center">
          <div className="col-md">
            <button onClick={handleDelete} type="button" className="btn btn-outline-danger">Deletar Produto</button>
          </div>
          <div className="col-md">
            <button type="submit" className="btn btn-success">Atualizar Produto</button>
          </div>
        </div>
      </form>
    </div>
  );
};
