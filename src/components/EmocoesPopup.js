import React, { useState } from "react";
import "./Emocoes.css";

function EmocoesPopup({ onClose }) {
  const [emocaoSelecionada, setEmocaoSelecionada] = useState(null);

  const emocoes = ["😀 Feliz", "😢 Triste", "😠 Bravo", "😨 Com medo", "😐 Neutro"];

  const handleSalvar = () => {
    if (emocaoSelecionada) {
      const historico = JSON.parse(localStorage.getItem("historicoEmocional")) || [];
      historico.push({
        emocao: emocaoSelecionada,
        data: new Date().toLocaleString(),
      });
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

