import Sentiment from 'sentiment';

const sentiment = new Sentiment();

const palavrasPorEmocao = {
  tristeza: ['triste', 'deprimido', 'desanimado', 'cansado', 'sozinho'],
  raiva: ['raiva', 'irritado', 'ódio', 'frustrado', 'injusto'],
  alegria: ['feliz', 'animado', 'grato', 'empolgado', 'sorrindo'],
  ansiedade: ['ansiosa', 'ansioso', 'preocupado', 'nervoso', 'inseguro', 'medo']
};

const sugestoesPorEmocao = {
  tristeza: {
    texto: "Sinto muito 😢 Que tal algo que emociona?",
    sugestao: "Filme: 'Soul' 🎬",
    link: "https://www.disneyplus.com/pt-br/movies/soul/77zlWrb9vRYp"
  },
  ansiedade: {
    texto: "Respira comigo 🧘‍♀️",
    sugestao: "Filme: 'Divertida Mente' 🍿",
    link: "https://www.disneyplus.com/pt-br/movies/inside-out/1GnZVZQZjnjC"
  },
  alegria: {
    texto: "Amo ver isso 😄",
    sugestao: "Atividade: sair com amigos ou dançar 💃",
    link: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC"
  },
  raiva: {
    texto: "Vamos respirar fundo juntos 😤",
    sugestao: "Vídeo: meditação guiada",
    link: "https://www.youtube.com/watch?v=inpok4MKVLM"
  }
};

const sugestoesPorPalavra = [
  {
    condicao: (msg) => msg.includes("filme"),
    resposta: { texto: "Claro! Me diz como está seu humor hoje?", sugestao: null }
  },
  {
    condicao: (msg) => msg.includes("praia") || msg.includes("natureza"),
    resposta: {
      texto: "Ótimo para se reconectar 🌿",
      sugestao: "Lugar: Parque Estadual Serra do Mar 🏞️",
      link: "https://www.infraestruturameioambiente.sp.gov.br/parque-serra-do-mar/"
    }
  }
];

export async function obterSugestao(texto, nome) {
  const msg = texto.toLowerCase();

  // 🔍 Verifica palavras-chave específicas primeiro
  for (const item of sugestoesPorPalavra) {
    if (item.condicao(msg)) return item.resposta;
  }

  // 🧠 Análise de sentimento e emoção
  const resultado = sentiment.analyze(texto);
  const textoLower = texto.toLowerCase();
  let contagem = {};

  for (const [emocao, palavras] of Object.entries(palavrasPorEmocao)) {
    contagem[emocao] = palavras.reduce((acc, palavra) => {
      return acc + (textoLower.includes(palavra) ? 1 : 0);
    }, 0);
  }

  const emocaoDominante = Object.entries(contagem).sort((a, b) => b[1] - a[1])[0];
  const emocao = emocaoDominante[1] > 0 ? emocaoDominante[0] : null;

  if (emocao && sugestoesPorEmocao[emocao]) {
    return sugestoesPorEmocao[emocao];
  }

  // 🧘 Sugestão genérica se nada for detectado
  return {
    texto: "Estou aqui com você. Me conta mais sobre o que precisa 💙",
    sugestao: null
  };
}
