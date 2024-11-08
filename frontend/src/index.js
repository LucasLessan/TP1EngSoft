import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Error from './components/pages/Error';
import LoginPage from './components/pages/LoginPage';
import Index from './components/pages/Index'; // Se houver problema, mudar nome do arquivo para IndexPage
import Dashboard from './components/layout/Dashboard';
import Usuarios from './components/layout/Usuarios';
import UserList, { loader as usuariosLoader1 } from './components/layout/UserList';
import UserForm, { loader as usuariosLoader2 } from './components/layout/UserForm';
import SalesPage from './components/layout/SalesPage';
import Produtos from './components/layout/Produtos';
import ProductList from './components/layout/ProductList';
import ProductForm from './components/layout/ProductForm';

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
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "usuarios",
            element: <Usuarios />,
            children: [
              {
                index: true,
                element: <UserList />,
                // loader: usuariosLoader1,
              },
              {
                path: "inserir",
                element: <UserForm />,
                // loader: usuariosLoader2,
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
                // loader: usuariosLoader1,
              },
              {
                path: "inserir",
                element: <ProductForm />,
                // loader: usuariosLoader2,
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
