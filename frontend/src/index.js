import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Error from './components/pages/Error';
import LoginPage from './components/pages/LoginPage';
import Index from './components/pages/Index';
import Usuarios from './components/layout/Usuarios';
import UserList from './components/layout/UserList';
import UserFormCreate from './components/layout/UserFormCreate';
import UserFormUpdate from './components/layout/UserFormUpdate';
import SalesPage from './components/layout/SalesPage';
import Produtos from './components/layout/Produtos';
import ProductList from './components/layout/ProductList';
import ProductFormCreate from './components/layout/ProductFormCreate';
import ProductFormUpdate from './components/layout/ProductFormUpdate';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <LoginPage /> },
      {
        path: "index",
        element: <Index />,
        children: [
          {
            path: "usuarios",
            element: <Usuarios />,
            children: [
              {
                index: true,
                element: <UserList />,
              },
              {
                path: "inserir",
                element: <UserFormCreate />,
              },
              {
                path: "update",
                element: <UserFormUpdate />,
              },
            ],
          },
          {
            path: "vendas",
            element: <SalesPage />,
          },
          {
            path: "produtos",
            element: <Produtos />,
            children: [
              {
                index: true,
                element: <ProductList />,
              },
              {
                path: "inserir",
                element: <ProductFormCreate />,
              },
              {
                path: "update",
                element: <ProductFormUpdate />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
