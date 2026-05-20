import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import ScoreReveal from '../ui/ScoreReveal';
import './EndingScreen.css';

function useGlitch(active) {
  const [glitched, setGlitched] = useState(false);
  useEffect(() => {
    if (!active) return;
    let i = 0;
    const id = setInterval(() => {
      setGlitched((g) => !g);
      i++;
      if (i > 16) clearInterval(id);
    }, 90);
    return () => clearInterval(id);
  }, [active]);
  return glitched;
}

export default function EndingScreen({ ending, mode, ceoName, metrics, scoreData, onRestart, onLearnMore }) {
  const confettiRef = useRef();
  const isEpic = ending.tier === 'EPIC';
  const isDanger = ending.tier === 'DANGER';
  const isSuccess = ending.tier === 'SUCCESS';
  const glitched = useGlitch(isDanger);

  useEffect(() => {
    if (!isEpic && !isSuccess) return;
    const colors = ending.confettiColors;
    if (!colors || colors.length === 0) return;

    const duration = isEpic ? 4200 : 2200;
    const end = Date.now() + duration;
    const tick = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: isEpic ? 5 : 3,
        angle: 55,
        spread: 65,
        origin: { x: 0, y: 0.7 },
        colors,
        startVelocity: 50,
        gravity: 0.9,
        ticks: 240,
      });
      confetti({
        particleCount: isEpic ? 5 : 3,
        angle: 125,
        spread: 65,
        origin: { x: 1, y: 0.7 },
        colors,
        startVelocity: 50,
        gravity: 0.9,
        ticks: 240,
      });
      requestAnimationFrame(tick);
    };
    tick();
  }, [isEpic, isSuccess, ending]);

  return (
    <div className={`ending-screen tier-${ending.tier} ${glitched ? 'glitched' : ''}`}>
      <div className="es-bg" style={{ backgroundImage: `url(${ending.img})` }} />
      <div className="es-overlay" />

      {isDanger && <div className="es-scanlines" />}

      <div className="es-content">
        <div className="es-tier-badge">
          <span className="es-tier-dot" />
          <span>FINAL · {ending.tier}</span>
        </div>

        <h1 className="es-title">{ending.title}</h1>
        <div className="es-subtitle">{ending.subtitle}</div>

        <div className="es-headline">{ending.headline}</div>

        {scoreData && <ScoreReveal scoreData={scoreData} />}

        <p className="es-text">{ending.text}</p>

        <div className="es-stats">
          <div className="es-stat">
            <span className="es-stat-label">CAPITAL FINAL</span>
            <span className="es-stat-value">
              {mode === 'cafe' ? `COP ${Math.round(metrics.capital)}M` : `USD ${Math.round(metrics.capital)}K`}
            </span>
          </div>
          <div className="es-stat">
            <span className="es-stat-label">COMPETIT.</span>
            <span className="es-stat-value">{Math.round(metrics.competitividad)}</span>
          </div>
          <div className="es-stat">
            <span className="es-stat-label">REPUTACIÓN</span>
            <span className="es-stat-value">{Math.round(metrics.reputacion)}</span>
          </div>
          <div className="es-stat">
            <span className="es-stat-label">MERCADOS</span>
            <span className="es-stat-value">{metrics.mercados}</span>
          </div>
        </div>

        <div className="es-moral">
          <div className="es-moral-tag">
            <span>◆</span>
            <span>MORALEJA · COMPETITIVIDAD SISTÉMICA</span>
          </div>
          <p className="es-moral-text">{ending.moral}</p>
        </div>

        <div className="es-foot">
          <div className="es-signed">
            FIRMADO POR: <strong>{ceoName}</strong>
          </div>
          <div className="es-actions">
            {onLearnMore && (
              <button className="es-learn" onClick={onLearnMore}>
                <span>◆</span>
                <span>EXPLORA LAS 3 INSTITUCIONES</span>
              </button>
            )}
            <button className="es-restart" onClick={onRestart}>
              <span className="es-restart-icon">↻</span>
              <span>JUGAR DE NUEVO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
