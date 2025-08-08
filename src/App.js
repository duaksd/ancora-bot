import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Recomendacoes from './components/Recomendacoes';
import Login from './components/Login';
import PerfilDropdown from './components/PerfilDropdown';
import EmocoesPopup from './components/EmocoesPopup';
import YoutubeMusicPlayer from './components/YoutubeMusicPlayer';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarPopupEmocao, setMostrarPopupEmocao] = useState(false);
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuario');
    if (dadosSalvos) {
      setUsuario(JSON.parse(dadosSalvos));
    }
  }, []);

  const atualizarHistorico = (analise) => {
    setHistorico(prev => [...prev, analise]);
  };

  const handleLogin = (dados) => {
    if (dados) {
      localStorage.setItem('usuario', JSON.stringify(dados));
      setUsuario(dados);
      setMostrarPopupEmocao(true); // mostra o popup ao logar
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  const handleDelete = () => {
    localStorage.removeItem('usuario');
    alert('Conta apagada com sucesso 💔');
    setUsuario(null);
  };

  return (
    <div className="App">
      {/* Ícone de login aparece apenas se não estiver logado */}
      {!usuario && <Login onLogin={handleLogin} />}

      {/* Menu do usuário aparece após login */}
      {usuario && (
        <PerfilDropdown
          usuario={usuario}
          historico={historico}
          onLogout={handleLogout}
          onDelete={handleDelete}
          onUpdate={setUsuario}
        />
      )}

      <Header usuario={usuario} atualizarHistorico={atualizarHistorico} />

      {mostrarPopupEmocao && (
        <EmocoesPopup onClose={() => setMostrarPopupEmocao(false)} />
      )}

      <YoutubeMusicPlayer />
      <Recomendacoes />
    </div>
  );
}

export default App;
