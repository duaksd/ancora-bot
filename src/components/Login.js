import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (!nome || !email) return alert("Preencha todos os campos");

    const usuario = { nome, email };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    onLogin(usuario);
  };

  return (
    <div style={styles.container}>
      <h2>Bem-vinda ao Âncora Bot 💙</h2>
      <input
        type="text"
        placeholder="Seu nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
        style={styles.input}
      />
      <input
        type="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>Entrar</button>
      <button onClick={() => onLogin(null)} style={styles.cancelar}>Cancelar</button>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    textAlign: 'center',
    fontFamily: 'Quicksand, sans-serif',
    width: '300px'
  },
  input: {
    display: 'block',
    margin: '1rem auto',
    padding: '0.6rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '90%',
    fontSize: '1rem'
  },
  button: {
    padding: '0.6rem 1.2rem',
    backgroundColor: '#b03f6d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem'
  },
  cancelar: {
    marginTop: '0.5rem',
    backgroundColor: 'transparent',
    color: '#b03f6d',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem'
  }
};
