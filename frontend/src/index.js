import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Error from './components/pages/Error';
import LoginPage from './components/pages/LoginPage';
import Index from './components/pages/Index'; // Se houver problema, mudar nome do arquivo para IndexPage
import Dashboard from './components/layout/Dashboard';
import Usuarios from './components/layout/Usuarios';
import Vendas from './components/layout/Vendas';
import Estoque from './components/layout/Estoque';

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
          },
          {
            path: "vendas",
            element: <Vendas />,
          },
          {
            path: "estoque",
            element: <Estoque />,
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
