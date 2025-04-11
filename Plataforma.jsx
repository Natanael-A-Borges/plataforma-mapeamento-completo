import React, { useState } from 'react';

const perguntas = {
  extro: [
    "Faço amigos com facilidade", "Gosto de interagir em grupo", "Tenho energia social",
    "Prefiro o silêncio", "Evito contato social", "Tenho vergonha em ambientes sociais"
  ],
  abert: [
    "Sou curioso por novas ideias", "Sou criativo", "Adapto-me bem a mudanças",
    "Prefiro sempre fazer do meu jeito", "Sou rígido com regras", "Evito sair da rotina"
  ]
};

const traços = Object.keys(perguntas);

export default function Plataforma() {
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState(() =>
    Object.fromEntries(traços.map(traco => [traco, []]))
  );

  const grupoAtual = traços[passo];
  const progresso = Math.round((respostas[grupoAtual].length / perguntas[grupoAtual].length) * 100);

  const toggleResposta = (idx) => {
    const atual = respostas[grupoAtual];
    const atualizado = atual.includes(idx)
      ? atual.filter(i => i !== idx)
      : [...atual, idx];
    setRespostas({ ...respostas, [grupoAtual]: atualizado });
  };

  const avancar = () => {
    if (respostas[grupoAtual].length < 2) {
      alert('Selecione pelo menos 2 itens antes de avançar.');
      return;
    }
    setPasso(passo + 1);
  };

  if (passo >= traços.length) {
    return (
      <div style={{ padding: 24, maxWidth: 700, margin: 'auto' }}>
        <h2>Resultados Interpretativos</h2>
        {traços.map((t) => (
          <div key={t}>
            <h3>{t === 'extro' ? 'Extroversão — Introversão' : 'Abertura — Tradicionalismo'}</h3>
            <p>Você demonstrou comportamentos associados aos polos do traço <strong>{t === 'extro' ? 'Extroversão — Introversão' : 'Abertura — Tradicionalismo'}</strong>.</p>
          </div>
        ))}
        <p style={{ fontSize: 14, color: '#666', marginTop: 24 }}><em>Este é um ponto de partida para sua jornada de autoconhecimento.</em></p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: 'auto' }}>
      <h2>{grupoAtual === 'extro' ? 'Extroversão — Introversão' : 'Abertura — Tradicionalismo'}</h2>
      <progress value={progresso} max={100} style={{ width: '100%' }}></progress>
      <div style={{ marginTop: 16 }}>
        {perguntas[grupoAtual].map((p, idx) => (
          <label key={idx} style={{ display: 'block', margin: '10px 0' }}>
            <input
              type="checkbox"
              checked={respostas[grupoAtual].includes(idx)}
              onChange={() => toggleResposta(idx)}
            /> {p}
          </label>
        ))}
      </div>
      <button onClick={avancar} style={{ marginTop: 20 }}>Avançar</button>
    </div>
  );
}