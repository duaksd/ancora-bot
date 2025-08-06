export function salvarInteracao(nome, texto, sugestao) {
  const chave = `historico_${nome}`;
  const historico = JSON.parse(localStorage.getItem(chave)) || [];
  historico.push({ texto, sugestao, data: new Date().toISOString() });
  localStorage.setItem(chave, JSON.stringify(historico));
}

export function recuperarHistorico(nome) {
  const chave = `historico_${nome}`;
  return JSON.parse(localStorage.getItem(chave)) || [];
}
