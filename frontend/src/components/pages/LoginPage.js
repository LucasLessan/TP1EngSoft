// src/LoginPage.js
import { useState } from 'react';

import styles from './LoginPage.module.css';
import logo from '../../imgs/logo2.png';

function LoginPage() {

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsuario(document.getElementById('floatingInput').value);
    setSenha(document.getElementById('floatingPassword').value);

    if(usuario === 'admin' && senha === 'admin') {
      window.location.replace("/dashboard")
    }
  }

  return (
    <div className={styles.login_background}>
      <div className={styles.login_container}>
        <div className={styles.welcome_message}>
          <img src={logo} alt="Logo Pointfy" className={styles.logo} id="logo" />
          <p>
            Bem-vindo ao Pointfy, um sistema de ponto de venda eficiente e intuitivo, desenvolvido para facilitar o gerenciamento de usuários, produtos e vendas.
          </p>
        </div>
        
        <div className={styles.separator_line}></div>
        
        <form className={styles.login_form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className={`form-floating mb-3 ${styles.input_group}`}>
            <input type="text" name="usuario" className="form-control" id="floatingInput" placeholder="" required />
            <label htmlFor="floatingInput">Usuário</label>
          </div>
          <div className={`form-floating ${styles.input_group}`}>
            <input type="password" name="senha" className="form-control" id="floatingPassword" placeholder="" required />
            <label htmlFor="floatingPassword">Senha</label>
          </div>
          <button type="submit">Entrar</button>
          <p className={styles.message}>Esqueceu sua senha? <a href="/">Recuperar</a></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
