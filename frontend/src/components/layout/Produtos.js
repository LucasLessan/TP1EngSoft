import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react'; // Importando useState e useEffect para gerenciar o estado e efeitos colaterais

export default function Produtos() {
  // Exemplo de produtos
  const [products, setProdutosList] = useState([]); // Estado para armazenar a lista de usuários
  const [error, setError] = useState(null); // Estado para armazenar erros (caso aconteçam)

  // Função para carregar os produtos da API
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        // Fazendo a requisição GET para buscar os produtos
        const response = await fetch('http://localhost:5000/api/rotas/products');
        if (!response.ok) {
          throw new Error('Erro ao carregar os produtos');
        }
        const data = await response.json(); // Convertendo a resposta para JSON
        console.log(data);
        setProdutosList(data); // Atualizando o estado com os dados dos produtos
      } catch (error) {
        setError(error.message); // Armazenando o erro, caso haja algum
      }
    };

    fetchProdutos(); // Chama a função para buscar os dados dos usuários quando o componente for montado
  }, []); // O array vazio significa que a função só será chamada uma vez, na montagem do componente
  {/*
  const products = [
    { id: 1, name: 'Produto A', quantity: 100, price: 10.0 },
    { id: 2, name: 'Produto B', quantity: 50, price: 20.0 },
    { id: 3, name: 'Produto C', quantity: 20, price: 30.0 },
    // { id: 3, name: 'Produto C', quantity: 20, price: 30.0 },
    // { id: 3, name: 'Produto C', quantity: 20, price: 30.0 },
    // { id: 3, name: 'Produto C', quantity: 20, price: 30.0 },
    // { id: 3, name: 'Produto C', quantity: 20, price: 30.0 },
    // { id: 3, name: 'Produto C', quantity: 20, price: 30.0 },
    // { id: 3, name: 'Produto C', quantity: 20, price: 30.0 },
    // { id: 3, name: 'Produto C', quantity: 20, price: 30.0 },
    // { id: 3, name: 'Produto C', quantity: 20, price: 30.0 },
    // { id: 3, name: 'Produto C', quantity: 20, price: 30.0 },
    // { id: 3, name: 'Produto C', quantity: 20, price: 30.0 },
    // { id: 3, name: 'Produto C', quantity: 20, price: 30.0 },
    // { id: 3, name: 'Produto C', quantity: 20, price: 30.0 },
  ]
  */}
  return (
    <Outlet context={products}/>
    // <Outlet/>
  );
};
