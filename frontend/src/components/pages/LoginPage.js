// src/LoginPage.js
import { useState } from 'react';

import styles from './LoginPage.module.css';
import logo from '../../imgs/logo2.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Função de login que faz a requisição ao backend
  // const handleLogin = async (e) => {
  //   e.preventDefault(); // Evita o recarregamento da página ao enviar o formulário

  //   try {
  //     const response = await fetch('http://localhost:5000/api/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ user: email, passwd: password }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       // Armazena o token no localStorage para uso futuro
  //       localStorage.setItem('token', data.token);
  //       alert("Login realizado com sucesso!");
  //       // Redireciona o usuário para a dashboard ou outra página
  //       // Exemplo: window.location.href = '/dashboard';
  //     } else {
  //       // Exibe a mensagem de erro no frontend
  //       setErrorMessage(data.message || 'Erro no login. Verifique suas credenciais.');
  //     }
  //   } catch (error) {
  //     setErrorMessage('Erro de conexão com o servidor. Tente novamente mais tarde.');
  //   }
  // };

  const handleLogin = (event) => {
    event.preventDefault();
    setEmail(document.getElementById('floatingInput').value);
    setPassword(document.getElementById('floatingPassword').value);

    if(email === 'admin' && password === 'admin') {
      window.location.replace("/index/dashboard")
    }
    else {
      // Exibe a mensagem de erro no frontend
      setErrorMessage('Erro no login. Verifique suas credenciais.');
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
        
        <form className={styles.login_form} onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className={`form-floating mb-3 ${styles.input_group}`}>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Usuário</label>
          </div>
          <div className={`form-floating ${styles.input_group}`}>
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Senha</label>
          </div>
          <button type="submit">Entrar</button>
          {errorMessage && <p className={styles.error_message}>{errorMessage}</p>}
          <p className={styles.message}>Esqueceu sua senha? <a href="/">Recuperar</a></p>
        </form>
      </div>
    </div>
  );
};
