export async function obterSugestao(texto, nome) {
  const msg = texto.toLowerCase();

  if (msg.includes("filme"))
    return { texto: "Claro! Me diz como está seu humor hoje?", sugestao: null };

  if (msg.includes("ansiosa"))
    return { texto: "Respira comigo 🧘‍♀️", sugestao: "Filme: 'Divertida Mente' 🍿" };

  if (msg.includes("triste"))
    return { texto: "Sinto muito 😢 Que tal algo que emociona?", sugestao: "Filme: 'Soul' 🎬" };

  if (msg.includes("feliz"))
    return { texto: "Amo ver isso 😄", sugestao: "Atividade: sair com amigos ou dançar 💃" };

  if (msg.includes("praia") || msg.includes("natureza"))
    return { texto: "Ótimo para se reconectar 🌿", sugestao: "Lugar: Parque Estadual Serra do Mar 🏞️" };

  // Genérico
  return { texto: "Estou aqui com você. Me conta mais sobre o que precisa 💙", sugestao: null };
}
