
import React, { useState } from 'react';

const perguntas = {
  extro: [
    "Faço amigos com facilidade", "Me comunico com entusiasmo", "Gosto de interagir em grupo", "Tenho energia social",
    "Me sinto confortável com desconhecidos", "Prefiro o silêncio", "Tenho dificuldade em me expressar",
    "Evito contato social", "Tenho vergonha em ambientes sociais", "Fico travado em interações"
  ],
  abert: [
    "Sou curioso por novas ideias", "Gosto de aprender coisas diferentes", "Sou criativo", "Sou aberto a novas experiências",
    "Adapto-me bem a mudanças", "Tenho dificuldade com mudanças", "Prefiro sempre fazer do meu jeito",
    "Sou rígido com regras", "Evito sair da rotina", "Prefiro o que é familiar"
  ],
  amab: [
    "Sou gentil e educado", "Gosto de ajudar as pessoas", "Tenho empatia com os outros", "Evito conflitos desnecessários",
    "Escuto com atenção", "Sou compreensivo", "Evito dizer o que penso para não magoar",
    "Tenho dificuldade em impor limites", "Me deixo levar pelos outros", "Sou passivo em discussões"
  ],
  cons: [
    "Cumpro prazos com responsabilidade", "Sou organizado com minhas tarefas", "Tenho disciplina pessoal", "Me concentro no que precisa ser feito",
    "Evito deixar tarefas pela metade", "Procrastino com frequência", "Sou desorganizado", "Tenho dificuldade em seguir rotinas",
    "Me distraio com facilidade", "Desisto com facilidade"
  ],
  emo: [
    "Tenho equilíbrio emocional", "Mantenho a calma sob pressão", "Lido bem com frustrações", "Tenho controle sobre minhas reações",
    "Costumo ver o lado positivo das coisas", "Me estresso com facilidade", "Reajo impulsivamente",
    "Fico ansioso com frequência", "Tenho pensamentos negativos recorrentes", "Me sinto inseguro constantemente"
  ]
};

const traços = ["extro", "abert", "amab", "cons", "emo"];

export default function Plataforma() {
  const [passo, setPasso] = useState(0);
  const [respostas, setRespostas] = useState({ extro: [], abert: [], amab: [], cons: [], emo: [] });

  const grupoAtual = traços[passo];
  const progresso = Math.round((respostas[grupoAtual].length / 10) * 100);

  const handleToggle = (idx) => {
    const atual = respostas[grupoAtual];
    const nova = atual.includes(idx) ? atual.filter(i => i !== idx) : [...atual, idx];
    setRespostas({ ...respostas, [grupoAtual]: nova });
  };

  const avancar = () => {
    if (respostas[grupoAtual].length < 3) {
      alert('Selecione pelo menos 3 itens antes de avançar.');
      return;
    }
    setPasso(passo + 1);
  };

  const resultado = () => (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h2>Resultados Interpretativos</h2>
      {traços.map(t => (
        <div key={t}>
          <h3>
            {t === 'extro' ? 'Extroversão — Introversão' :
             t === 'abert' ? 'Abertura — Tradicionalismo' :
             t === 'amab' ? 'Amabilidade — Combatividade' :
             t === 'cons' ? 'Conscienciosidade — Despreocupação' :
             'Estabilidade Emocional — Neuroticismo'}
          </h3>
          <p>Seus resultados indicam uma presença de comportamentos comumente associados à predominância dos polos do traço <strong>{
            t === 'extro' ? 'Extroversão — Introversão' :
            t === 'abert' ? 'Abertura — Tradicionalismo' :
            t === 'amab' ? 'Amabilidade — Combatividade' :
            t === 'cons' ? 'Conscienciosidade — Despreocupação' :
            'Estabilidade Emocional — Neuroticismo'
          }</strong>.</p>
        </div>
      ))}
    </div>
  );

  if (passo >= traços.length) return resultado();

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h2>{grupoAtual === 'extro' ? 'Extroversão — Introversão' :
            grupoAtual === 'abert' ? 'Abertura — Tradicionalismo' :
            grupoAtual === 'amab' ? 'Amabilidade — Combatividade' :
            grupoAtual === 'cons' ? 'Conscienciosidade — Despreocupação' :
            'Estabilidade Emocional — Neuroticismo'}</h2>
      <progress value={progresso} max={100} style={{ width: '100%' }}></progress>
      <div>
        {perguntas[grupoAtual].map((txt, idx) => (
          <label key={idx} style={{ display: 'block', margin: '10px 0' }}>
            <input
              type="checkbox"
              checked={respostas[grupoAtual].includes(idx)}
              onChange={() => handleToggle(idx)}
            /> {txt}
          </label>
        ))}
      </div>
      <button onClick={avancar} style={{ marginTop: 20 }}>Avançar</button>
    </div>
  );
}
