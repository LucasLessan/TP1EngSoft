import { Outlet } from "react-router-dom";

export default function Produtos() {
  // Exemplo de produtos
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

  return (
    <Outlet context={products}/>
    // <Outlet/>
  );
};
