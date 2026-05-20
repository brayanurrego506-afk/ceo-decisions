import { useEffect, useState, useRef } from 'react';
import './MetricsBar.css';

function formatCapital(n, mode) {
  if (mode === 'cafe') return `COP ${Math.round(n)}M`;
  return `USD ${Math.round(n)}K`;
}

function Bar({ value, label, mode }) {
  return (
    <div className="mb-cell">
      <div className="mb-row">
        <span className="mb-label">{label}</span>
        <span className="mb-value">{Math.round(value)}</span>
      </div>
      <div className="mb-bar-track">
        <div className="mb-bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function CapitalCell({ value, mode }) {
  return (
    <div className="mb-cell mb-cell-capital">
      <div className="mb-row">
        <span className="mb-label">CAPITAL</span>
        <span className="mb-value mb-value-money">{formatCapital(value, mode)}</span>
      </div>
      <div className="mb-bar-track">
        <div className="mb-bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

const FLAGS = ['🇨🇴', '🇩🇪', '🇪🇸', '🇲🇽', '🇺🇸'];

function MercadosCell({ value, mode }) {
  return (
    <div className="mb-cell mb-cell-markets">
      <div className="mb-label" style={{ marginBottom: 4 }}>MERCADOS</div>
      <div className="mb-flags">
        {FLAGS.map((f, i) => (
          <span
            key={i}
            className="mb-flag"
            data-active={i <= value ? 'true' : 'false'}
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MetricsBar({ metrics, mode, ceoName, step, totalSteps }) {
  const [animated, setAnimated] = useState(metrics);
  const rafRef = useRef();

  useEffect(() => {
    // Animar transición de valores
    const start = { ...animated };
    const startTime = performance.now();
    const duration = 800;

    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimated({
        capital: start.capital + (metrics.capital - start.capital) * eased,
        competitividad: start.competitividad + (metrics.competitividad - start.competitividad) * eased,
        reputacion: start.reputacion + (metrics.reputacion - start.reputacion) * eased,
        mercados: metrics.mercados,
      });
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metrics.capital, metrics.competitividad, metrics.reputacion, metrics.mercados]);

  return (
    <div className="metrics-bar">
      <CapitalCell value={animated.capital} mode={mode} />
      <Bar value={animated.competitividad} label="COMPETIT." mode={mode} />
      <Bar value={animated.reputacion} label="REPUTACIÓN" mode={mode} />
      <MercadosCell value={animated.mercados} mode={mode} />
      <div className="mb-ceo">
        <div className="mb-label">CEO</div>
        <div className="mb-ceo-name">{ceoName || 'ANÓNIMO'}</div>
      </div>
      <div className="mb-step">
        <div className="mb-label">DECISIÓN</div>
        <div className="mb-step-value">{step + 1} / {totalSteps}</div>
      </div>
    </div>
  );
}
