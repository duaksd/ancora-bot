import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

export default function Login({ onLogin }) {
  const [mostrarPopup, setMostrarPopup] = useState(false);

  // Campos de login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');

  // Campos de registro
  const [registroNome, setRegistroNome] = useState('');
  const [registroEmail, setRegistroEmail] = useState('');
  const [registroSenha, setRegistroSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [genero, setGenero] = useState('');

  const handleLogin = () => {
    if (!loginEmail || !loginSenha) return alert("Preencha e-mail e senha");

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));
    if (
      usuarioSalvo &&
      usuarioSalvo.email === loginEmail &&
      usuarioSalvo.senha === loginSenha
    ) {
      onLogin(usuarioSalvo);
      setMostrarPopup(false);
    } else {
      alert("Credenciais inválidas");
    }
  };

  const validarData = (data) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(data)) return false;

    const dateObj = new Date(data);
    return dateObj instanceof Date && !isNaN(dateObj);
  };

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const handleRegistro = () => {
    if (!registroNome || !registroEmail || !registroSenha || !confirmarSenha || !nascimento) {
      return alert("Preencha todos os campos obrigatórios");
    }

    if (registroSenha !== confirmarSenha) {
      return alert("As senhas não coincidem");
    }

    if (!validarData(nascimento)) {
      return alert("Data de nascimento inválida. Use o formato AAAA-MM-DD");
    }

    const idadeCalculada = calcularIdade(nascimento);

    const novoUsuario = {
      nome: registroNome,
      email: registroEmail,
      senha: registroSenha,
      nascimento,
      idade: idadeCalculada,
      genero
    };

    localStorage.setItem('usuario', JSON.stringify(novoUsuario));
    onLogin(novoUsuario);
    setMostrarPopup(false);
  };

  return (
    <div>
      <FaUserCircle
        size={40}
        color="#b03f6d"
        style={styles.icone}
        onClick={() => setMostrarPopup(true)}
      />

      {mostrarPopup && (
        <div style={styles.overlay}>
          <div style={styles.card}>
            <h2 style={styles.titulo}>Login</h2>
            <input
              type="email"
              placeholder="E-mail"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Senha"
              value={loginSenha}
              onChange={e => setLoginSenha(e.target.value)}
              style={styles.input}
            />
            <button onClick={handleLogin} style={styles.button}>
              Entrar
            </button>

            <hr style={styles.divisor} />

            <h2 style={styles.titulo}>Registro</h2>
            <input
              type="text"
              placeholder="Nome completo"
              value={registroNome}
              onChange={e => setRegistroNome(e.target.value)}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="E-mail"
              value={registroEmail}
              onChange={e => setRegistroEmail(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Senha"
              value={registroSenha}
              onChange={e => setRegistroSenha(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={e => setConfirmarSenha(e.target.value)}
              style={styles.input}
            />
            <input
              type="date"
              placeholder="Data de nascimento"
              value={nascimento}
              onChange={e => setNascimento(e.target.value)}
              style={styles.input}
            />
            <select
              value={genero}
              onChange={e => setGenero(e.target.value)}
              style={styles.input}
            >
              <option value="">Gênero (opcional)</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
              <option value="prefiro-nao-dizer">Prefiro não dizer</option>
            </select>

            <button onClick={handleRegistro} style={styles.button}>
              Registrar
            </button>

            <button onClick={() => setMostrarPopup(false)} style={styles.cancelar}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  icone: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    cursor: 'pointer',
    zIndex: 1000
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    animation: 'fadeIn 0.3s ease'
  },
  card: {
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
    textAlign: 'center',
    width: '440px',
    fontFamily: 'Quicksand, sans-serif',
    animation: 'slideUp 0.4s ease'
  },
  titulo: {
    marginBottom: '1rem',
    fontSize: '1.4rem',
    color: '#b03f6d'
  },
  input: {
    display: 'block',
    margin: '0.7rem auto',
    padding: '0.7rem',
    borderRadius: '10px',
    border: '1px solid #ccc',
    width: '90%',
    fontSize: '1rem'
  },
  button: {
    padding: '0.7rem 1.4rem',
    backgroundColor: '#b03f6d',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '0.8rem',
    width: '90%'
  },
  cancelar: {
    marginTop: '1rem',
    backgroundColor: 'transparent',
    color: '#b03f6d',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  divisor: {
    margin: '2rem auto',
    width: '80%',
    border: 'none',
    borderTop: '1px solid #ccc'
  }
};
