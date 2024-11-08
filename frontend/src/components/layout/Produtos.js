import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react'; // Importando useState e useEffect para gerenciar o estado e efeitos colaterais

export default function Produtos() {
  // Exemplo de produtos
  const [produtosList, setProdutosList] = useState([]); // Estado para armazenar a lista de produtos
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erros

  // Função para carregar os produtos da API
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        // Fazendo a requisição GET para buscar os produtos
        const response = await fetch('http://localhost:5000/api/rotas/products');
        if (!response.ok) {
          throw new Error('Erro ao carregar os produtos!');
        }
        const data = await response.json(); // Convertendo a resposta para JSON
        setProdutosList(data); // Atualizando o estado com os dados dos produtos
      } catch (error) {
        setError(error.message); // Armazenando o erro, caso haja algum
      }
    };

    fetchProdutos(); // Chama a função para buscar os dados dos produtos quando o componente for montado
  }, []); // O array vazio significa que a função só será chamada uma vez, na montagem do componente
  
  
  return (
    <Outlet context={produtosList}/>
  );
};
