import { useEffect, useState } from 'react';
import DatoReal from '../ui/DatoReal';
import './ConsequenceScreen.css';

const TYPE_LABELS = {
  epic:    { label: 'IMPACTO ÉPICO',   tone: 'epic' },
  success: { label: 'RESULTADO POSITIVO', tone: 'success' },
  warning: { label: 'CON RESERVAS',     tone: 'warning' },
  neutral: { label: 'RESULTADO MIXTO',  tone: 'neutral' },
  danger:  { label: 'CONSECUENCIA NEGATIVA', tone: 'danger' },
};

function FxChip({ label, value, mode }) {
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
  metrics,
  mode,
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

  return (
    <div className={`consequence-screen ${show ? 'show' : ''}`} data-tone={tone.tone}>
      <div className="cs-hero" style={{ backgroundImage: `url(${decision.img})` }}>
        <div className="cs-hero-overlay" />
        <div className="cs-hero-content">
          <div className="cs-tag-row">
            <span className="cs-tag-badge">{tone.label}</span>
            <span className="cs-tag-chapter">{decision.chapter} · ELEGISTE {choice.id}</span>
          </div>
          <h1 className="cs-title">{consequence.title}</h1>
        </div>
      </div>

      <div className="cs-body">
        <div className="cs-scroll">
          <div className="cs-choice-recap">
            <span className="cs-choice-letter">{choice.id}</span>
            <span className="cs-choice-emoji">{choice.emoji}</span>
            <div className="cs-choice-text">
              <span className="cs-choice-label">{choice.label}</span>
              <span className="cs-choice-desc">{choice.desc}</span>
            </div>
          </div>

          <p className="cs-text">{consequence.text}</p>

          <div className="cs-fx-row">
            <span className="cs-fx-label">IMPACTO EN MÉTRICAS:</span>
            <div className="cs-fx-chips">
              <FxChip label="Capital" value={choice.fx.capital} mode={mode} />
              <FxChip label="Competit." value={choice.fx.competitividad} mode={mode} />
              <FxChip label="Reputación" value={choice.fx.reputacion} mode={mode} />
              <FxChip label="Mercados" value={choice.fx.mercados} mode={mode} />
            </div>
          </div>

          <DatoReal dato={consequence.dato} source={consequence.source} />

          <button className="cs-next" onClick={onNext}>
            <span>{isLast ? 'VER RESULTADO FINAL' : 'SIGUIENTE DECISIÓN'}</span>
            <span className="cs-next-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
