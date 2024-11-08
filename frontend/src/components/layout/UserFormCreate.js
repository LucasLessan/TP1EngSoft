import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

export default function UserFormCreate() {
  const navigate = useNavigate();
  const location = useLocation();

  // Preenche com valor de location.state se existir, ou seja, se o botão de editar na lista foi clicado
  var usuario = location.state ? location.state.usuario : { id: -1, nome: '', tipo: '', email: '', password: '' };
  const [id, setId] = useState(usuario.id);
  const [nome, setNome] = useState(usuario.name);
  const [tipo, setTipo] = useState(usuario.user_type);
  const [email, setEmail] = useState(usuario.email);
  const [password, setPassword] = useState(usuario.password);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Cria o objeto do usuário a ser enviado
    const usuario = {
      name: nome,
      email: email,
      password: password,
      user_type: tipo,
    };

    try {
      const response = await fetch('http://localhost:5000/api/rotas/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });
      if (response.ok) {
        setMessage('Usuário criado com sucesso!');
        navigate('../'); // Navega de volta para a lista de usuários
        navigate(0); // Força refresh
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao criar usuário: ${errorData.error}`);
      }
    } catch (error) {
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="container w-50 p-3">
      <form method="post" className="g-3 p-3" onSubmit={handleSubmit}>

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
              <option>Admin</option>
            </select>
          </div>
        </div>

        <div className="row p-4 text-center">
          <div className="col-md">
            <button type="submit" className="btn btn-success">Inserir Usuário</button>
          </div>
        </div>
      </form>
    </div>
  );
};
