import Sentiment from 'sentiment';

const sentiment = new Sentiment();

const palavrasPorEmocao = {
  tristeza: ['triste', 'deprimido', 'desanimado', 'cansado', 'sozinho'],
  raiva: ['raiva', 'irritado', 'ódio', 'frustrado', 'injusto'],
  alegria: ['feliz', 'animado', 'grato', 'empolgado', 'sorrindo'],
  ansiedade: ['ansioso', 'preocupado', 'nervoso', 'inseguro', 'medo']
};

const sugestoesPorEmocao = {
  negativo: [
    {
      texto: "🎧 Ouvir uma playlist relaxante",
      link: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0"
    },
    {
      texto: "🧘‍♀️ Meditar com o app Lojong",
      link: "https://lojong.com.br/"
    }
  ],
  neutro: [
    {
      texto: "📓 Escrever num diário online",
      link: "https://www.penzu.com/"
    },
    {
      texto: "🎨 Fazer algo criativo",
      link: "https://www.youtube.com/watch?v=Zz6eOVaaelI"
    }
  ],
  positivo: [
    {
      texto: "📞 Compartilhar esse momento com alguém",
      link: "https://web.whatsapp.com/"
    },
    {
      texto: "🎉 Celebrar com algo divertido",
      link: "https://www.youtube.com/watch?v=5qap5aO4i9A"
    }
  ]
};

export const analisarMensagem = (texto) => {
  const resultado = sentiment.analyze(texto);
  const score = resultado.score;

  const textoLower = texto.toLowerCase();
  let contagem = {};

  for (const [emocao, palavras] of Object.entries(palavrasPorEmocao)) {
    contagem[emocao] = palavras.reduce((acc, palavra) => {
      return acc + (textoLower.includes(palavra) ? 1 : 0);
    }, 0);
  }

  const emocaoDominante = Object.entries(contagem).sort((a, b) => b[1] - a[1])[0];
  const emocao = emocaoDominante[1] > 0 ? emocaoDominante[0] : null;

  let categoria;
  if (score < -2) categoria = 'negativo';
  else if (score > 2) categoria = 'positivo';
  else categoria = 'neutro';

  const sugestoes = sugestoesPorEmocao[categoria];
  const sugestaoAleatoria = sugestoes[Math.floor(Math.random() * sugestoes.length)];

  let resposta = "";
  if (emocao) {
    resposta += `Percebo que você está sentindo algo como **${emocao}**. `;
  }

  if (categoria === 'negativo') {
    resposta += "Estou aqui com você. Talvez uma pequena distração possa ajudar. 💙";
  } else if (categoria === 'positivo') {
    resposta += "Que bom te ver assim! 😄 Vamos aproveitar essa energia positiva!";
  } else {
    resposta += "Se quiser, posso te sugerir algo leve pra te acompanhar.";
  }

  return {
    resposta,
    sugestao: sugestaoAleatoria.texto,
    link: sugestaoAleatoria.link
  };
};
