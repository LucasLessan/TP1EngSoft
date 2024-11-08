import { useState } from 'react';
import { useOutletContext, useNavigate, useLocation, useLoaderData } from "react-router-dom";

// import { getUsuarios } from "../data/UsuariosData";

// export async function loader() {
//   const usuariosList = await getUsuarios();
//   return { usuariosList };
// }

export default function UserForm() {
  var usuariosList = useOutletContext(); // Recebe dados da rota pai
  // const { usuariosList } = useLoaderData();

  const navigate = useNavigate();
  const location = useLocation();

  // Preenche com valor de location.state se existir, ou seja, se o botão de editar na lista foi clicado
  var usuario = location.state ? location.state.usuario : {id: -1, nome: '', tipo: '', email: '', password: ''};
  const [id, setId] = useState(usuario.id);
  const [nome, setNome] = useState(usuario.nome);
  const [tipo, setTipo] = useState(usuario.tipo);
  const [email, setEmail] = useState(usuario.email);
  const [password, setPassword] = useState(usuario.password);

  const generateID = () => {
    // Cria um conjunto de IDs da lista
    const IDs = new Set(usuariosList.map(obj => obj.id));
    
    // Checa qual o primeiro ID que ainda não foi usado
    let newID = 1;
    while (IDs.has(newID)) {
      newID++;
    }
    
    return newID;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Cria objeto usuario
    setNome(document.getElementById('inputNome').value);
    setTipo(document.getElementById('inputTipo').value);
    setEmail(document.getElementById('inputEmail').value);
    setPassword(document.getElementById('inputPassword').value);
    var usuario = { id: generateID(), nome: nome, tipo: tipo, email: email, password: password };
    
    // Insere objeto usuario no array de usuarios
    usuariosList.push(usuario);

    // Volta para a view UserList
    navigate('../');
  };

  const handleDelete = () => {
    console.log(usuariosList);
    usuariosList = usuariosList.filter(function(x) { return x.id != id; }); 
    console.log(usuariosList);

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
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required />
          </div>
          <div className="col-6">
            <label htmlFor="inputEmail" className="form-label">E-mail</label>
            <input
              type="text"
              className="form-control h-75"
              id="inputEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
          </div>
        </div>

        <div className="row p-3">
          <div className="col-6">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input
              type="text"
              className="form-control h-75"
              id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />
          </div>
          <div className="col-6">
            <label htmlFor="inputTipo" className="form-label">Tipo</label>
            <select id="inputTipo" className="form-select h-75" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
              <option selected disabled hidden value="">Escolha...</option>
              <option>Vendedor</option>
              <option>Gerente</option>
              <option>Diretor</option>
            </select>
          </div>
        </div>

        <div className="row p-4">
          <div className="col-md">
            <button onClick={handleDelete} type="button" className="btn btn-secondary">Deletar Usuário</button>
          </div>
          <div className="col-md">
            <button type="submit" className="btn btn-primary">Inserir Usuário</button>
          </div>
        </div>
      </form>
    </div>
  );
};
