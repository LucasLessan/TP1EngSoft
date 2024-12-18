// Adaptado de mdbootstrap.com

import { Link } from 'react-router-dom';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={`text-center text-lg-start text-muted fixed-bottom ${styles.footer}`}>
    
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Pointify
              </h6>
              <p>
                Criamos sistemas PDVs responsivos, customizáveis e fáceis de usar para sua empresa a um preço que cabe no seu bolso.
              </p>
            </div>
    
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Links Úteis
              </h6>
              <p>
                <Link to="usuarios" className="text-reset">Usuários</Link>
              </p>
              <p>
                <Link to="vendas" className="text-reset">Vendas</Link>
              </p>
              <p>
                <Link to="produtos" className="text-reset">Produtos</Link>
              </p>
            </div>
    
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contato</h6>
              <p><i className="fas fa-home me-3"></i> Belo Horizonte, Minas Gerais, BR</p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                contato@pointify.com
              </p>
              <p><i className="fas fa-phone me-3"></i> + 55 31 99999-9999</p>
              <p><i className="fas fa-phone me-3"></i> + 55 31 99999-9999</p>
            </div>
          </div>
        </div>
      </section>
    
      <div className="text-center p-4">
        © 2024 Copyright:
        <Link to="/" className="text-reset fw-bold">Pointify.com</Link>
      </div>
    </footer>
  );
};
