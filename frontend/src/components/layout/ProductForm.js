import { useState } from 'react';
import { useOutletContext, useNavigate, useLocation, useLoaderData } from "react-router-dom";

export default function ProductForm() {
  var products = useOutletContext(); // Recebe dados da rota pai
  // const { usuariosList } = useLoaderData();

  const navigate = useNavigate();
  const location = useLocation();

  // Preenche com valor de location.state se existir, ou seja, se o botão de editar na lista foi clicado
  var produto = location.state ? location.state.produto : { id: -1, name: '', price: 0.0 };
  const [id, setId] = useState(produto.id);
  const [name, setName] = useState(produto.name);
  const [price, setPrice] = useState(produto.price);

  const generateID = () => {
    // Cria um conjunto de IDs da lista
    const IDs = new Set(products.map(obj => obj.id));
    
    // Checa qual o primeiro ID que ainda não foi usado
    let newID = 1;
    while (IDs.has(newID)) {
      newID++;
    }
    
    return newID;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Cria objeto produto
    setName(document.getElementById('inputNome').value);
    setPrice(document.getElementById('inputValor').value);
    var produto = { id: generateID(), name: name, price: price };
    
    // Insere objeto produto no array de produtos
    products.push(produto);

    // Volta para a view UserList
    navigate('../');
  };

  const handleDelete = () => {
    console.log(products);
    products = products.filter(function(x) { return x.id != id; }); 
    console.log(products);

    navigate('../');
    // navigate(0); // Força refresh
  };

  return (
    <div className="container w-75">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-sm">
          <label htmlFor="inputNome" className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            id="inputNome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required />
        </div>
        <div className="col-sm">
          <label htmlFor="inputEmail" className="form-label">Valor</label>
          <input
          type="number"
          className="form-control"
          id="inputValor"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required />
        </div>
        <div className="col-md-6">
          <button onClick={handleDelete} type="button" className="btn btn-secondary">Deletar Produto</button>
        </div>
        <div className="col-md-6">
          <button type="submit" className="btn btn-primary">Inserir Produto</button>
        </div>
      </form>
    </div>
  );
};
