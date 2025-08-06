import { useState } from 'react';
import './Emocoes.css';

function EmocoesPopup({ onClose }) {
  const [emocaoSelecionada, setEmocaoSelecionada] = useState(null);
  const [mostrarDiario, setMostrarDiario] = useState(false);
  const [textoDiario, setTextoDiario] = useState('');

  const emocoes = [
    { emoji: '😊', label: 'Feliz' },
    { emoji: '😢', label: 'Triste' },
    { emoji: '😡', label: 'Bravo' },
    { emoji: '😱', label: 'Assustado' },
    { emoji: '😍', label: 'Apaixonado' },
    { emoji: '😴', label: 'Cansado' },
    { emoji: '📝', label: 'Outro' },
  ];

  const sugestoes = {
    Feliz: 'Compartilhe sua alegria com alguém ou dance sua música favorita!',
    Triste: 'Escreva sobre o que está sentindo ou escute uma música suave.',
    Bravo: 'Respire fundo. Que tal uma caminhada ou meditação?',
    Assustado: 'Converse com alguém de confiança ou assista algo leve.',
    Apaixonado: 'Escreva uma mensagem carinhosa ou faça algo criativo.',
    Cansado: 'Descanse um pouco. Um cochilo ou uma pausa pode ajudar.',
  };

  const handleClick = (label) => {
    setEmocaoSelecionada(label);
    setMostrarDiario(label === 'Outro');
  };

  const handleSalvarDiario = () => {
    console.log('Desabafo salvo:', textoDiario);
    setTextoDiario('');
    alert('Seu desabafo foi registrado com carinho 💜');
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="emocoes-titulo">Como você está se sentindo?</h2>

        <div className="emocoes-container">
          {emocoes.map((emocao, index) => (
            <div
              key={index}
              className="card-emocao"
              onClick={() => handleClick(emocao.label)}
            >
              <div className="emoji">{emocao.emoji}</div>
              <div className="label">{emocao.label}</div>
            </div>
          ))}
        </div>

        {emocaoSelecionada && sugestoes[emocaoSelecionada] && (
          <div className="sugestao-box">
            <h3>Você está se sentindo <strong>{emocaoSelecionada}</strong></h3>
            <p>{sugestoes[emocaoSelecionada]}</p>
          </div>
        )}

        {mostrarDiario && (
          <div className="diario-box">
            <h3>Registre seu sentimento aqui:</h3>
            <textarea
              placeholder="Escreva o que está sentindo..."
              rows="6"
              className="diario-textarea"
              value={textoDiario}
              onChange={(e) => setTextoDiario(e.target.value)}
            />
            <button className="diario-botao" onClick={handleSalvarDiario}>
              Salvar
            </button>
          </div>
        )}

        <button className="diario-botao" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

export default EmocoesPopup;
