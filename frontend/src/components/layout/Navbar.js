import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* <a className="navbar-brand" href="/dashboard">Lucas Lessan</a> */}
        <Link to="/dashboard" className="navbar-brand">Lucas Lessan</Link>
        {/* <Link to="/dashboard" >Lucas Lessan</Link> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* <a className="nav-link active" aria-current="page" href="/dashboard">Home</a> */}
              <Link to="/dashboard" className="nav-link active" aria-current="page">Home</Link>
              {/* <Link to="/dashboard" aria-current="page">Home</Link> */}
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="/usuarios">Usuarios</a> */}
              <Link to="/usuarios" className="nav-link">Usuarios</Link>
              {/* <Link to="/usuarios">Usuarios</Link> */}
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="/vendas">Vendas</a> */}
              <Link to="/vendas" className="nav-link">Vendas</Link>
              {/* <Link to="/vendas">Vendas</Link> */}
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="/estoque">Estoque</a> */}
              <Link to="/estoque" className="nav-link">Estoque</Link>
              {/* <Link to="/estoque">Estoque</Link> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;