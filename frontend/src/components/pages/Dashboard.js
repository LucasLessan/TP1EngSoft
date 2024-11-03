import { Routes, Route } from 'react-router-dom'

import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import Usuarios from './Usuarios'
import Vendas from './Vendas'
import Estoque from './Estoque'

function Dashboard() {
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

export default Dashboard;