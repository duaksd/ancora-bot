import React, { useState } from "react";
import "./Emocoes.css";

function EmocoesPopup({ onClose }) {
  const [emocaoSelecionada, setEmocaoSelecionada] = useState(null);

  const emocoes = ["😀 Feliz", "😢 Triste", "😠 Bravo", "😨 Com medo", "😐 Neutro"];

  const gerarSugestao = (emocao) => {
    if (emocao.includes("Feliz")) return "Continue espalhando essa alegria!";
    if (emocao.includes("Triste")) return "Tudo bem se sentir assim. Cuide de você.";
    if (emocao.includes("Bravo")) return "Respire fundo. Você merece paz.";
    if (emocao.includes("Com medo")) return "Você é mais forte do que imagina.";
    if (emocao.includes("Neutro")) return "Que tal fazer algo que te inspire?";
    return "Estamos aqui com você.";
  };

  const handleSalvar = () => {
    if (emocaoSelecionada) {
      const historico = JSON.parse(localStorage.getItem("historicoEmocional")) || [];

      const novaEntrada = {
        humor: emocaoSelecionada,
        sugestao: gerarSugestao(emocaoSelecionada),
        data: new Date().toLocaleDateString("pt-BR"),
      };

      historico.push(novaEntrada);
      localStorage.setItem("historicoEmocional", JSON.stringify(historico));

      alert(`Emoção "${emocaoSelecionada}" registrada com carinho 💜`);
      onClose();
    } else {
      alert("Selecione uma emoção antes de salvar.");
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <button className="botao-fechar-canto" onClick={onClose}>❌</button>
        <h2>Como você está se sentindo hoje?</h2>
        <div className="emocoes-grid">
          {emocoes.map((emocao, index) => (
            <button
              key={index}
              className={`emocao ${emocaoSelecionada === emocao ? "selecionada" : ""}`}
              onClick={() => setEmocaoSelecionada(emocao)}
            >
              {emocao}
            </button>
          ))}
        </div>
        <button className="botao-salvar" onClick={handleSalvar}>
          Salvar Emoção
        </button>
      </div>
    </div>
  );
}

export default EmocoesPopup;
