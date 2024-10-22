import './App.css';
import thulsan from './img/thulsan.png';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './db';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook para redirecionamento

  const handleLogin = (e) => {
    e.preventDefault();  // Previne o comportamento padrão de recarregar a página

    const auth = getAuth(app);  // Inicializa a autenticação
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login bem-sucedido
        const user = userCredential.user;
        console.log('Usuário logado:', user);
        alert('Login bem-sucedido!');
        navigate('/info');  // Redireciona para a página Info após o login
      })
      .catch((error) => {
        // Se der erro no login, exibe a mensagem de erro
        const errorMessage = error.message;
        console.error('Erro ao logar:', errorMessage);
        setError(errorMessage);  // Atualiza o estado para exibir a mensagem de erro
      });
  };

  return (
    <div>
      <img src={thulsan} className="thulsanFlag" alt="Thulsan flag" />
      <div className="formDiv">
        <form onSubmit={handleLogin}>
          <label>
            e-mail de Acesso:
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Exibe erro, se houver */}
      </div>
    </div>
  );
}

export default Login;
