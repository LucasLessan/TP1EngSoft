import { Outlet } from "react-router-dom";

export default function Produtos() {
  // Exemplo de produtos
  const products = [
    { id: 1, name: 'Produto A', price: 10.0 },
    { id: 2, name: 'Produto B', price: 20.0 },
    { id: 3, name: 'Produto C', price: 30.0 },
    // { id: 3, name: 'Produto C', price: 30.0 },
    // { id: 3, name: 'Produto C', price: 30.0 },
    // { id: 3, name: 'Produto C', price: 30.0 },
    // { id: 3, name: 'Produto C', price: 30.0 },
    // { id: 3, name: 'Produto C', price: 30.0 },
    // { id: 3, name: 'Produto C', price: 30.0 },
    // { id: 3, name: 'Produto C', price: 30.0 },
    // { id: 3, name: 'Produto C', price: 30.0 },
    // { id: 3, name: 'Produto C', price: 30.0 },
    // { id: 3, name: 'Produto C', price: 30.0 },
    // { id: 3, name: 'Produto C', price: 30.0 },
    // { id: 3, name: 'Produto C', price: 30.0 },
  ];

  return (
    <Outlet context={products}/>
    // <Outlet/>
  );
};
