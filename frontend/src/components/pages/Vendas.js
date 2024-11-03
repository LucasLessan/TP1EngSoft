import { Routes, Route } from 'react-router-dom'

import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import Dashboard from './Dashboard';
import Usuarios from './Usuarios'
import Estoque from './Estoque'

function Vendas() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/estoque" element={<Estoque />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Vendas;