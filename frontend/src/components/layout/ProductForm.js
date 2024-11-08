import { useState } from 'react';
import { useOutletContext, useNavigate, useLocation, useLoaderData } from "react-router-dom";

export default function ProductForm() {
  var products = useOutletContext(); // Recebe dados da rota pai
  // const { usuariosList } = useLoaderData();

  const navigate = useNavigate();
  const location = useLocation();

  // Preenche com valor de location.state se existir, ou seja, se o botão de editar na lista foi clicado
  var produto = location.state ? location.state.produto : { id: -1, name: '', quantity: 0.0, price: 0.0 };
  const [id, setId] = useState(produto.id);
  const [name, setName] = useState(produto.name);
  const [quantity, setQuantity] = useState(produto.quantity);
  const [price, setPrice] = useState(produto.price);
  const [message, setMessage] = useState('');
  const [description] = useState('Produto');

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
/*
  const handleSubmit = (event) => {
    event.preventDefault();

    // Cria objeto produto
    setName(document.getElementById('inputNome').value);
    setPrice(document.getElementById('inputValor').value);
    setQuantity(document.getElementById('inputQuantidade').value);
    var produto = { id: generateID(), name: name, quantity: quantity, price: price };
    
    // Insere objeto produto no array de produtos
    products.push(produto);

    // Volta para a view UserList
    navigate('../');
  };
  */

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Cria o objeto do produto a ser enviado
    const produto = {
      name: name,
      description: description,
      quantity: quantity,
      price: price
    };
    console.log(produto);
    try {
      const response = await fetch('http://localhost:5000/api/rotas/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto)
      });
      if (response.ok) {
        setMessage('Produto criado com sucesso!');
        navigate('../'); // Navega de volta para a lista de produtos
        navigate(0);
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao criar produto: ${errorData.error}`);
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  const handleDelete = () => {
    console.log(products);
    products = products.filter(function(x) { return x.id != id; }); 
    console.log(products);

    navigate('../');
    // navigate(0); // Força refresh
  };

  return (
    <div className="container w-50 p-3">
      <form className="g-3 p-3" onSubmit={handleSubmit}>

        <div className="row p-3">
          <div className="col-6">
            <label htmlFor="inputNome" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control h-75"
              id="inputNome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required />
          </div>
          <div className="col-6">
            <label htmlFor="inputQuantidade" className="form-label">Quantidade</label>
            <input
            type="number"
            className="form-control h-75"
            id="inputQuantidade"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required />
          </div>
        </div>

        <div className="row p-4">
          <div className="col-md">
            <button onClick={handleDelete} type="button" className="btn btn-secondary">Deletar Produto</button>
          </div>
          <div className="col-md">
            <button type="submit" className="btn btn-primary">Inserir Produto</button>
          </div>
        </div>
      </form>
    </div>
  );
};
