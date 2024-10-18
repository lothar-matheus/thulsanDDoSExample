import './App.css';
import thulsan from './img/thulsan.png';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app, database } from './db';

function App() {
  const [email, setEmail] = useState('');  // Corrigido: estado para o e-mail
  const [password, setPassword] = useState('');  // Corrigido: estado para a senha
  const [error, setError] = useState('');  // Estado para exibir mensagens de erro

  const handleLogin = (e) => {
    e.preventDefault();  // Previne o comportamento padrão de recarregar a página

    const auth = getAuth(app);  // Inicializa a autenticação
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login bem-sucedido
        const user = userCredential.user;
        console.log('Usuário logado:', user);
        alert('Login bem-sucedido!');  // Opcional: pode redirecionar o usuário aqui
      })
      .catch((error) => {
        // Se der erro no login, exibe a mensagem de erro
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro ao logar:', errorCode, errorMessage);
        setError(errorMessage);  // Atualiza o estado para exibir a mensagem de erro
      });
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <img src={thulsan} className="thulsanFlag" alt="Thulsan flag" />
      <div className="formDiv">
        <form onSubmit={handleLogin}>  {/* Chamando a função handleLogin ao submeter */}
          <label>
            e-mail de Acesso:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Atualiza o estado com o valor do e-mail
              required
            />
          </label>
          <br />
          <label>
            Informe Sua Senha:
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Atualiza o estado com o valor da senha
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>  {/* Botão de login */}
        </form>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Exibe erro, se houver */}
      </div>
    </div>
  );
}

export default App;
