import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Recomendacoes from './components/Recomendacoes';
import Login from './components/Login';
import PerfilDropdown from './components/PerfilDropdown'; // atualizado

function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [historico, setHistorico] = useState([]);

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
      setUsuario(dados);
      setMostrarLogin(false);
    } else {
      setMostrarLogin(false);
    }
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

  return (
    <div className="App">
      {/* Botão de login */}
      {!usuario && (
        <button
          onClick={() => setMostrarLogin(true)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: '#b03f6d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            zIndex: 200
          }}
        >
          Entrar
        </button>
      )}

      {/* Modal de login */}
      {mostrarLogin && !usuario && (
        <div style={modalEstilo}>
          <Login onLogin={handleLogin} />
        </div>
      )}

      {/* Dropdown do perfil no topo */}
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
      <Recomendacoes />
    </div>
  );
}

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
  zIndex: 100
};

export default App;
