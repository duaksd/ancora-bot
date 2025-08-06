import React, { useState } from 'react';
import './PerfilDropdown.css';

function PerfilDropdown({ usuario, historico, onLogout, onDelete, onUpdate }) {
  const [aberto, setAberto] = useState(false);
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [foto, setFoto] = useState(usuario.foto || '');

  const salvar = () => {
    const atualizado = { ...usuario, nome, email, foto };
    localStorage.setItem('usuario', JSON.stringify(atualizado));
    onUpdate(atualizado);
    setEditando(false);
  };

  return (
    <div className="perfil-dropdown">
      <img
        src={foto || '/assets/avatar.png'}
        alt="Avatar"
        className="perfil-avatar"
        onClick={() => setAberto(!aberto)}
      />

      {aberto && (
        <div className="dropdown-conteudo">
          {!editando ? (
            <>
              <span className="perfil-nome">{nome}</span>
              <span className="perfil-email">{email}</span>

              <button onClick={() => setEditando(true)}>Editar</button>
              <button onClick={onLogout}>Sair</button>
              <button
                className="excluir"
                onClick={() => window.confirm('Apagar conta?') && onDelete()}
              >
                Apagar Conta
              </button>

              <div className="perfil-historico">
                <strong>💭 Emoções Recentes:</strong>
                <ul>
                  {historico.slice(-5).map((item, i) => (
                    <li key={i}>{item.humor} → {item.sugestao}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="edicao">
              <input value={nome} onChange={e => setNome(e.target.value)} />
              <input value={email} onChange={e => setEmail(e.target.value)} />
              <input value={foto} onChange={e => setFoto(e.target.value)} placeholder="URL da foto" />

              <button onClick={salvar}>Salvar</button>
              <button onClick={() => setEditando(false)}>Cancelar</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PerfilDropdown;

