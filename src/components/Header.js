import React, { useState, useEffect } from 'react';
import { FaAnchor } from 'react-icons/fa';
import { GiAmmoniteFossil } from 'react-icons/gi';
import './Header.css';

export default function Header({ usuario }) {
  const [mensagemInicial, setMensagemInicial] = useState('');
  const [mensagemChat, setMensagemChat] = useState('');
  const [chatAberto, setChatAberto] = useState(false);
  const [chatVisivel, setChatVisivel] = useState(true);
  const [conversas, setConversas] = useState([]);
  const [esperandoRespostaContinuar, setEsperandoRespostaContinuar] = useState(false);
  const [mensagemAcolhimento, setMensagemAcolhimento] = useState('');

  const audio = new Audio('/sounds/notificacao.mp3');

  useEffect(() => {
    const conversasAntigas = localStorage.getItem('conversasBot');
    if (conversasAntigas) {
      setEsperandoRespostaContinuar(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('conversasBot', JSON.stringify(conversas));
  }, [conversas]);

  const gerarMensagemAcolhimento = () => {
    const hora = new Date().getHours();
    const frasesManha = [
      "Bom dia! Que seu dia seja leve ☀️",
      "Comece o dia com calma 💙",
      "Estou aqui com você nesta manhã 🌅"
    ];
    const frasesTarde = [
      "Boa tarde! Vamos conversar? 🌤️",
      "Me conta como está sendo seu dia 💬",
      "Estou aqui com você nesta tarde 💛"
    ];
    const frasesNoite = [
      "Boa noite! Você não está sozinha 🌙",
      "Vamos desacelerar juntos 💆",
      "Estou aqui com você nesta noite 💙"
    ];

    let frases;

    if (hora >= 5 && hora < 12) frases = frasesManha;
    else if (hora >= 12 && hora < 18) frases = frasesTarde;
    else frases = frasesNoite;

    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    return fraseAleatoria;
  };

  const analisarMensagem = (texto) => {
    const msg = texto.toLowerCase();

    if (esperandoRespostaContinuar) {
      setEsperandoRespostaContinuar(false);

      if (msg.includes('sim')) {
        const salvas = JSON.parse(localStorage.getItem('conversasBot'));
        return {
          restaurar: salvas,
          resposta: "Pronto! Retomando nossa última conversa 💬"
        };
      }

      if (msg.includes('não')) {
        localStorage.removeItem('conversasBot');
        return {
          restaurar: [],
          resposta: "Sem problemas! Vamos começar do zero 💙"
        };
      }
    }

    if (msg.includes("triste") || msg.includes("deprimida") || msg.includes("chateada")) {
      return {
        resposta: "Sinto muito que esteja se sentindo assim 🫂 Que tal assistir a um filme leve ou ouvir uma música que você gosta?",
        sugestao: "🎬 Assistir a um filme aconchegante"
      };
    }

    if (msg.includes("ansiosa") || msg.includes("ansioso") || msg.includes("preocupada")) {
      return {
        resposta: "Respira fundo comigo 🧘‍♀️ Talvez uma caminhada ao ar livre ajude a acalmar a mente.",
        sugestao: "🚶‍♀️ Caminhar na praia ou em um parque"
      };
    }

    if (msg.includes("cansada") || msg.includes("exausta") || msg.includes("sobrecarregada")) {
      return {
        resposta: "Você merece descansar 💆 Que tal um banho quente ou uma pausa com chá?",
        sugestao: "🛁 Tomar um banho relaxante"
      };
    }

    if (msg.includes("entediada") || msg.includes("sem graça") || msg.includes("parada")) {
      return {
        resposta: "Vamos dar um pouco de cor ao seu dia 🎨 Que tal tentar algo criativo?",
        sugestao: "🎨 Pintar, desenhar ou fazer algo manual"
      };
    }

    if (msg.includes("feliz") || msg.includes("animada") || msg.includes("empolgada")) {
      return {
        resposta: "Que maravilha! 😄 Aproveite essa energia! Que tal compartilhar com alguém ou fazer algo divertido?",
        sugestao: "📞 Ligar para alguém querido ou sair para celebrar"
      };
    }

    return {
      resposta: "Estou aqui pra te ouvir 💙 Me conta mais sobre como você está se sentindo.",
      sugestao: null
    };
  };

  const enviarMensagem = (texto, limparCampo) => {
    if (texto.trim() === '') return;

    if (!chatVisivel) setChatVisivel(true);

    if (!chatAberto) {
      setChatAberto(true);
      setMensagemAcolhimento(gerarMensagemAcolhimento());

      const historico = localStorage.getItem('conversasBot');

      if (historico && JSON.parse(historico).length > 0) {
        setConversas([
          { autor: 'bot', texto: `Oi${usuario ? `, ${usuario.nome}` : ''}! Você quer continuar de onde parou? 😊 (Responda com sim ou não)` }
        ]);
        limparCampo('');
        return;
      } else {
        setConversas([
          { autor: 'bot', texto: `Oi${usuario ? `, ${usuario.nome}` : ''}! Que bom que você veio conversar comigo 😊` }
        ]);
      }
    }

    const analise = analisarMensagem(texto);

    if (analise.restaurar) {
      setConversas([
        { autor: 'bot', texto: analise.resposta },
        ...analise.restaurar
      ]);
    } else {
      setConversas(prev => [
        ...prev,
        { autor: 'usuario', texto },
        { autor: 'bot', texto: analise.resposta },
        ...(analise.sugestao ? [{ autor: 'bot', texto: `Sugestão: ${analise.sugestao}` }] : [])
      ]);
    }

    audio.play();
    limparCampo('');
  };

  return (
    <header
      className="header"
      style={{
        backgroundImage: "url('/assets/7184206.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    >
      <FaAnchor className="anchor-icon" />
      <div className="overlay">
        <h1 className="title">ÂNCORA BOT</h1>
        <h2 className="subtitle">Bot de Bem-Estar Mental</h2>

        <div className="message-container">
          <img src="/assets/avatar.png" alt="Bot Avatar" className="bot-avatar" />
          <div className="bot-message">
           <p>
          {!chatAberto
         ? "Olá! Você pode desabafar comigo a qualquer momento!"
         : mensagemAcolhimento}
          </p>
</div>
        </div>

        {!chatAberto && (
          <div className="chat-input">
            <input
              type="text"
              placeholder="Desabafe..."
              className="input"
              value={mensagemInicial}
              onChange={e => setMensagemInicial(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  enviarMensagem(mensagemInicial, setMensagemInicial);
                }
              }}
            />
            <button className="button icon-button" onClick={() => enviarMensagem(mensagemInicial, setMensagemInicial)}>
              <GiAmmoniteFossil className="bot-icon" />
            </button>
          </div>
        )}

        {chatVisivel && (
          chatAberto ? (
            <div className="chat-dm">
              <div className="chat-header">
                <span>Âncora Bot ⚓</span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button onClick={() => setChatAberto(false)}>−</button>
                  <button onClick={() => {
                    setChatVisivel(false);
                    setChatAberto(false);
                    setConversas([]);
                    localStorage.removeItem('conversasBot');
                  }}>✖</button>
                </div>
              </div>

              <div className="chat-mensagens">
                {conversas.map((msg, index) => (
                  <div key={index} className={`mensagem ${msg.autor === 'usuario' ? 'usuario' : 'bot'}`}>
                    {msg.texto}
                  </div>
                ))}
              </div>

              <div className="chat-input-dm">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  value={mensagemChat}
                  onChange={e => setMensagemChat(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      enviarMensagem(mensagemChat, setMensagemChat);
                    }
                  }}
                />
                <button onClick={() => enviarMensagem(mensagemChat, setMensagemChat)}>
                  Enviar
                </button>
              </div>
            </div>
          ) : (
            <button className="chat-reabrir" onClick={() => setChatAberto(true)}>
              💬 Abrir Chat
            </button>
          )
        )}
      </div>
    </header>
  );
}