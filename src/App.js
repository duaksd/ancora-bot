import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Recomendacoes from './components/Recomendacoes';
import Login from './components/Login';
import PerfilDropdown from './components/PerfilDropdown';
import EmocoesPopup from './components/EmocoesPopup';
import YoutubeMusicPlayer from './components/YoutubeMusicPlayer';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [mostrarPopupEmocao, setMostrarPopupEmocao] = useState(false);
  const [historico, setHistorico] = useState([]);
  const modalRef = useRef(null);

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
    setMostrarLogin(false);
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

  const handleClickForaModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setMostrarLogin(false);
    }
  };

  useEffect(() => {
    if (mostrarLogin) {
      document.addEventListener('mousedown', handleClickForaModal);
    } else {
      document.removeEventListener('mousedown', handleClickForaModal);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickForaModal);
    };
  }, [mostrarLogin]);

  return (
    <div className="App">
      {!usuario && (
        <button
          onClick={() => setMostrarLogin(true)}
          style={botaoLoginEstilo}
        >
          Entrar
        </button>
      )}

      {mostrarLogin && !usuario && (
        <div style={modalEstilo}>
          <div ref={modalRef} style={modalConteudoEstilo}>
            <Login onLogin={handleLogin} />
          </div>
        </div>
      )}

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

const botaoLoginEstilo = {
  position: 'fixed',
  top: '1rem',
  right: '1rem',
  backgroundColor: '#b03f6d',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  zIndex: 200,
  width: 'auto',
  maxWidth: '200px',
  whiteSpace: 'nowrap'
};

const modalEstilo = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
  transition: 'opacity 0.3s ease'
};

const modalConteudoEstilo = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 0 10px rgba(0,0,0,0.3)',
  minWidth: '300px',
  maxWidth: '90%',
};

export default App;
