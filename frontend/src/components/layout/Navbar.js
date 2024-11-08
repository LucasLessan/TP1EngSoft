import { Link } from 'react-router-dom'

import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    // <nav className={`navbar navbar-expand-lg bg-body-tertiary sticky-top`}>
    <nav className={`navbar navbar-expand-lg sticky-top ${styles.nav}`}>
      <div className={`container-fluid`}>
        <Link to="dashboard" className="navbar-brand">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="dashboard" className="nav-link active" aria-current="page">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="usuarios" className="nav-link">Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link to="vendas" className="nav-link">Vendas</Link>
            </li>
            <li className="nav-item">
              <Link to="produtos" className="nav-link">Produtos</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
