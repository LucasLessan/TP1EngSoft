// src/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css';
import logo from './imgs/logo2.png';

const LoginPage = () => {
  return (
    <div className="login-background">
      <div className="login-container">
        <div className="welcome-message">
          <img src={logo} alt="Logo Pointfy" className="logo" id="logo" />
          <p>
            Bem-vindo ao Pointfy, um sistema de ponto de venda eficiente e intuitivo, desenvolvido para facilitar o gerenciamento de usuários, produtos e vendas.
          </p>
        </div>
        
        <div className="separator-line"></div>
        
        <form className="login-form">
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="username">Usuário</label>
            <input type="text" id="username" placeholder="Digite seu usuário" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="Digite sua senha" required />
          </div>
          <button type="submit">Entrar</button>
          <p className="message">Esqueceu sua senha? <a href="#">Recuperar</a></p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
