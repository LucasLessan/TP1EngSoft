import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react'; // Importando useState e useEffect para gerenciar o estado e efeitos colaterais

export default function Usuarios() {
  const [usuariosList, setUsuariosList] = useState([]); // Estado para armazenar a lista de usuários
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erros

  // Função para carregar os usuários da API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Fazendo a requisição GET para buscar os usuários
        const response = await fetch('http://localhost:5000/api/rotas/users');
        if (!response.ok) {
          throw new Error('Erro ao carregar os usuários!');
        }
        const data = await response.json(); // Convertendo a resposta para JSON
        setUsuariosList(data); // Atualizando o estado com os dados dos usuários
      } catch (error) {
        setError(error.message); // Armazenando o erro, caso haja algum
      }
    };

    fetchUsuarios(); // Chama a função para buscar os dados dos usuários quando o componente for montado
  }, []); // O array vazio significa que a função só será chamada uma vez, na montagem do componente


  return (
    <Outlet context={usuariosList}/>
  );
};
