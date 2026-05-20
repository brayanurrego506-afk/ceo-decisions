import { useEffect, useState } from 'react';
import DatoReal from '../ui/DatoReal';
import Verdict from '../ui/Verdict';
import './ConsequenceScreen.css';

const TYPE_LABELS = {
  epic:    { tone: 'epic' },
  success: { tone: 'success' },
  warning: { tone: 'warning' },
  neutral: { tone: 'neutral' },
  danger:  { tone: 'danger' },
};

function FxChip({ label, value }) {
  if (value === 0) return null;
  const positive = value > 0;
  const sign = positive ? '+' : '';
  return (
    <span className={`fx-chip ${positive ? 'fx-pos' : 'fx-neg'}`}>
      <span className="fx-arrow">{positive ? '↑' : '↓'}</span>
      <span className="fx-label">{label}</span>
      <span className="fx-value">{sign}{value}</span>
    </span>
  );
}

export default function ConsequenceScreen({
  decision,
  choice,
  consequence,
  onNext,
}) {
  const [show, setShow] = useState(false);
  const tone = TYPE_LABELS[consequence.type] || TYPE_LABELS.neutral;
  const isLast = decision.id === 5;

  useEffect(() => {
    setShow(false);
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, [decision.id, choice?.id]);

  const bestOptionData = decision.options.find((o) => o.id === decision.bestOption);

  return (
    <div className={`consequence-screen ${show ? 'show' : ''}`} data-tone={tone.tone}>
      <div className="cs-hero" style={{ backgroundImage: `url(${decision.img})` }}>
        <div className="cs-hero-overlay" />
        <div className="cs-hero-content">
          <div className="cs-tag-chapter">{decision.chapter} · ELEGISTE {choice.id}</div>
          <h1 className="cs-title">{consequence.title}</h1>
        </div>
      </div>

      <div className="cs-body">
        <div className="cs-scroll">
          <Verdict
            verdict={choice.verdict}
            bestOption={decision.bestOption}
            choiceId={choice.id}
            whyBest={decision.whyBest}
            bestLabel={bestOptionData?.label}
          />

          <p className="cs-text" dangerouslySetInnerHTML={{ __html: consequence.text }} />

          <div className="cs-fx-row">
            <span className="cs-fx-label">IMPACTO EN MÉTRICAS</span>
            <div className="cs-fx-chips">
              <FxChip label="Capital" value={choice.fx.capital} />
              <FxChip label="Competit." value={choice.fx.competitividad} />
              <FxChip label="Reputación" value={choice.fx.reputacion} />
              <FxChip label="Mercados" value={choice.fx.mercados} />
            </div>
          </div>

          <DatoReal
            briefDato={consequence.briefDato}
            dato={consequence.dato}
            source={consequence.source}
          />

          <button className="cs-next" onClick={onNext}>
            <span>{isLast ? 'VER RESULTADO FINAL' : 'SIGUIENTE DECISIÓN'}</span>
            <span className="cs-next-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
