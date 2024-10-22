import './App.css';
import thulsan from './img/thulsan.png';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from './db';
import Info from './Info';  // Página Info
import { Routes, Route, useNavigate } from 'react-router-dom';  // Use useNavigate e Routes
import Login from './Login';  // Cria um componente separado para o login

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      
      {/* Define as rotas principais */}
      <Routes>
        <Route path="/" element={<Login />} />  {/* Página de Login */}
        <Route path="/info" element={<Info />} />  {/* Página Info */}
      </Routes>
    </div>
  );
}

export default App;
