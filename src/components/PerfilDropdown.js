import React, { useState, useEffect } from 'react';
import './PerfilDropdown.css';

function PerfilDropdown({ usuario, onLogout, onDelete, onUpdate }) {
  const [aberto, setAberto] = useState(false);
  const [editando, setEditando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mostrarDiario, setMostrarDiario] = useState(false);
  const [historicoLocal, setHistoricoLocal] = useState([]);

  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [foto, setFoto] = useState(usuario.foto || '');
  const [nascimento, setNascimento] = useState(usuario.nascimento || '');
  const [genero, setGenero] = useState(usuario.genero || '');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('historicoEmocional')) || [];
    setHistoricoLocal(dados);
  }, []);

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const salvar = () => {
    if (mostrarSenha && (!novaSenha || !confirmarNovaSenha)) {
      return alert("Preencha os campos de senha");
    }

    if (mostrarSenha && novaSenha !== confirmarNovaSenha) {
      return alert("As senhas não coincidem");
    }

    const idadeAtualizada = calcularIdade(nascimento);

    const atualizado = {
      ...usuario,
      nome,
      email,
      foto,
      nascimento,
      genero,
      idade: idadeAtualizada,
      senha: mostrarSenha ? novaSenha : usuario.senha
    };

    localStorage.setItem('usuario', JSON.stringify(atualizado));
    onUpdate(atualizado);
    setEditando(false);
    setMostrarSenha(false);
    setNovaSenha('');
    setConfirmarNovaSenha('');
    setMensagemSucesso('✅ Perfil atualizado com sucesso!');

    setTimeout(() => setMensagemSucesso(''), 3000);
  };

  return (
    <div className="perfil-dropdown">
      <div className="perfil-topo">
        <button
          className={`botao-diario ${mostrarDiario ? 'ativo' : ''}`}
          onClick={() => setMostrarDiario(!mostrarDiario)}
        >
          📔
        </button>
        <img
          src={foto || '/assets/avatar.png'}
          alt="Avatar"
          className="perfil-avatar"
          onClick={() => setAberto(!aberto)}
        />
      </div>

      <div className="painel-popups">
        {mostrarDiario && (
          <div className="popup-diario animado">
            <h3>📔 Meu Diário Emocional</h3>
            {historicoLocal.length > 0 ? (
              <ul>
                {historicoLocal.map((item, i) => (
                  <li key={i}>
                    <span className="diario-data">{item.data}</span> — 
                    <span className="diario-humor">{item.humor}</span>: 
                    <span className="diario-sugestao">{item.sugestao}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma emoção registrada ainda.</p>
            )}
            <button onClick={() => setMostrarDiario(false)}>Fechar</button>
          </div>
        )}

        {aberto && (
          <div className="dropdown-conteudo">
            {!editando ? (
              <>
                <h3 className="perfil-nome">{usuario.nome}</h3>
                <p className="perfil-email">📧 {usuario.email}</p>
                <p>🎂 Nascimento: {usuario.nascimento}</p>
                <p>🎈 Idade: {usuario.idade} anos</p>
                <p>⚧ Gênero: {usuario.genero || 'Não informado'}</p>

                <div className="botoes">
                  <button onClick={() => setEditando(true)}>Editar</button>
                  <button onClick={onLogout}>Sair</button>
                  <button
                    className="excluir"
                    onClick={() => window.confirm('Apagar conta?') && onDelete()}
                  >
                    Apagar Conta
                  </button>
                </div>

                {mensagemSucesso && (
                  <p className="mensagem-sucesso">{mensagemSucesso}</p>
                )}
              </>
            ) : (
              <div className="edicao">
                <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
                <input value={foto} onChange={e => setFoto(e.target.value)} placeholder="URL da foto" />
                <input value={nascimento} onChange={e => setNascimento(e.target.value)} type="date" />
                <select value={genero} onChange={e => setGenero(e.target.value)}>
                  <option value="">Gênero</option>
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                  <option value="outro">Outro</option>
                  <option value="prefiro-nao-dizer">Prefiro não dizer</option>
                </select>

                {!mostrarSenha ? (
                  <p className="link-senha" onClick={() => setMostrarSenha(true)}>
                    🔒 Alterar senha
                  </p>
                ) : (
                  <>
                    <input
                      type="password"
                      value={novaSenha}
                      onChange={e => setNovaSenha(e.target.value)}
                      placeholder="Nova senha"
                    />
                    <input
                      type="password"
                      value={confirmarNovaSenha}
                      onChange={e => setConfirmarNovaSenha(e.target.value)}
                      placeholder="Confirmar nova senha"
                    />
                  </>
                )}

                <div className="botoes">
                  <button onClick={salvar}>Salvar</button>
                  <button onClick={() => {
                    setEditando(false);
                    setMostrarSenha(false);
                    setNovaSenha('');
                    setConfirmarNovaSenha('');
                  }}>Cancelar</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PerfilDropdown;
