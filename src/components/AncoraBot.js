import React, { useState } from 'react';
import './AncoraBot.css';

function AncoraBot({ usuario }) {
  const [mensagens, setMensagens] = useState([
    { tipo: 'bot', texto: `Oi ${usuario?.nome || 'visitante'}! Como posso ajudar você hoje?` }
  ]);
  const [input, setInput] = useState('');
  const [aberto, setAberto] = useState(true);

  const enviarMensagem = () => {
    if (!input.trim()) return;
    setMensagens([...mensagens, { tipo: 'usuario', texto: input }]);
    setInput('');
    setTimeout(() => {
      setMensagens((prev) => [...prev, { tipo: 'bot', texto: 'Entendi! Me conta mais?' }]);
    }, 600);
  };

  if (!aberto) {
    return (
      <button className="chat-reabrir" onClick={() => setAberto(true)}>
        ✨ Reabrir Chat
      </button>
    );
  }

  return (
    <div className="chat-dm">
      <div className="chat-header">
        AncoraBot
        <button onClick={() => setAberto(false)}>×</button>
      </div>

      <div className="chat-mensagens">
        {mensagens.map((msg, i) => (
          <div key={i} className={`mensagem ${msg.tipo}`}>
            {msg.texto}
          </div>
        ))}
      </div>

      <div className="chat-input-dm">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={enviarMensagem}>Enviar</button>
      </div>
    </div>
  );
}

export default AncoraBot;
