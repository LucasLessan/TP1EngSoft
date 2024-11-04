// src/LoginPage.js
// import { useState } from 'react';

import styles from './LoginPage.module.css';
import logo from '../../imgs/logo2.png';

function LoginPage() {
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
        
        <form className={styles.login_form}>
          <h2>Login</h2>
          <div className={`form-floating mb-3 ${styles.input_group}`}>
            <input type="email" className="form-control" id="floatingInput" placeholder="" required />
            <label htmlFor="floatingInput">Usuário</label>
          </div>
          <div className={`form-floating ${styles.input_group}`}>
            <input type="password" className="form-control" id="floatingPassword" placeholder="" required />
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
