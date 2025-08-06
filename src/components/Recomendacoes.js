import React from 'react';

export default function Recomendacoes() {
  const sugestoes = [
    {
      titulo: "Fazer uma Caminhada",
      descricao: "Dê um passeio na praia.",
      cor: "#DCECC1"
    },
    {
      titulo: "Restaurante",
      descricao: "Experimente uma refeição deliciosa.",
      cor: "#F6E2B3"
    },
    {
      titulo: "Assistir a um Filme",
      descricao: "Veja um filme para relaxar.",
      cor: "#C9DFF2"
    }
  ];

  return (
    <div style={styles.container}>
      <h3 style={styles.titulo}>Recomendações para Você</h3>
      <div style={styles.cartoes}>
        {sugestoes.map((item, index) => (
          <div
            key={index}
            style={{ ...styles.card, backgroundColor: item.cor }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            }}
          >
            <strong>{item.titulo}</strong>
            <p>{item.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#6c76d5ff',
    padding: '2rem',
    fontFamily: 'Quicksand, sans-serif'
  },
  titulo: {
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#444'
  },
  cartoes: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    flexWrap: 'wrap'
  },
  card: {
    padding: '1rem',
    borderRadius: '12px',
    minWidth: '200px',
    maxWidth: '250px',
    textAlign: 'center',
    color: '#333',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer'
  }
};
