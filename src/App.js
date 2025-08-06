import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Recomendacoes from './components/Recomendacoes';
import Login from './components/Login';
import PerfilDropdown from './components/PerfilDropdown';
import Emocoes from './components/Emocoes';
import YoutubeMusicPlayer from './components/YoutubeMusicPlayer';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [historico, setHistorico] = useState([]);
  const modalRef = useRef(null);

  // Carrega dados salvos
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('usuario');
    if (dadosSalvos) {
      setUsuario(JSON.parse(dadosSalvos));
    }
  }, []);

  // Atualiza histórico emocional
  const atualizarHistorico = (analise) => {
    setHistorico(prev => [...prev, analise]);
  };

  // Login
  const handleLogin = (dados) => {
    if (dados) {
      localStorage.setItem('usuario', JSON.stringify(dados)); // salva no localStorage
      setUsuario(dados);
    }
    setMostrarLogin(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  // Apagar conta
  const handleDelete = () => {
    localStorage.removeItem('usuario');
    alert('Conta apagada com sucesso 💔');
    setUsuario(null);
  };

  // Fechar modal ao clicar fora
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
      {/* Botão de login */}
      {!usuario && (
        <button
          onClick={() => setMostrarLogin(true)}
          style={botaoLoginEstilo}
        >
          Entrar
        </button>
      )}

      {/* Modal de login */}
      {mostrarLogin && !usuario && (
        <div style={modalEstilo}>
          <div ref={modalRef} style={modalConteudoEstilo}>
            <Login onLogin={handleLogin} />
          </div>
        </div>
      )}

      {/* Dropdown do perfil */}
      {usuario && (
        <PerfilDropdown
          usuario={usuario}
          historico={historico}
          onLogout={handleLogout}
          onDelete={handleDelete}
          onUpdate={setUsuario}
        />
      )}

      {/* Conteúdo principal */}
      <Header usuario={usuario} atualizarHistorico={atualizarHistorico} />
      <Emocoes />
      <YoutubeMusicPlayer />
      <Recomendacoes />
    </div>
  );
}

const botaoLoginEstilo = {
  position: 'fixed', // fixo na tela, não relativo ao conteúdo
  top: '1rem',
  right: '1rem',
  backgroundColor: '#b03f6d',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  zIndex: 200,
  width: 'auto', // evita que ocupe largura total
  maxWidth: '200px', // limite de largura
  whiteSpace: 'nowrap' // evita quebra de linha
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
