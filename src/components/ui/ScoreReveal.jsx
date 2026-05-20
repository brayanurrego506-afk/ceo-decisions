import { useEffect, useRef, useState } from 'react';
import './ScoreReveal.css';

// Score animado de 0.0 → score final
// Estrellas que aparecen según el score
// Rank pulsando

export default function ScoreReveal({ scoreData }) {
  const [displayScore, setDisplayScore] = useState(0);
  const rafRef = useRef();

  useEffect(() => {
    if (!scoreData) return;
    const start = performance.now();
    const duration = 2200;
    const target = scoreData.score;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // Easing: easeOutQuart con bounce ligero al final
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplayScore(target * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [scoreData]);

  if (!scoreData) return null;

  const stars = Array.from({ length: 5 }, (_, i) => {
    const fillAmount = Math.max(0, Math.min(1, displayScore - i));
    return fillAmount;
  });

  return (
    <div className="score-reveal">
      <div className="sr-tag">CALIFICACIÓN FINAL</div>

      <div className="sr-main">
        <div className="sr-number">
          <span className="sr-number-int">{Math.floor(displayScore)}</span>
          <span className="sr-number-dot">.</span>
          <span className="sr-number-dec">
            {Math.floor((displayScore - Math.floor(displayScore)) * 10)}
          </span>
        </div>
        <div className="sr-out">
          <span className="sr-out-bar">/</span>
          <span className="sr-out-max">5.0</span>
        </div>
      </div>

      <div className="sr-stars">
        {stars.map((fill, i) => (
          <div className="sr-star" key={i}>
            <svg viewBox="0 0 24 24" className="sr-star-bg">
              <path
                d="M12 2 L14.39 8.59 L21.51 9.09 L16 13.74 L17.78 20.93 L12 17.27 L6.22 20.93 L8 13.74 L2.49 9.09 L9.61 8.59 Z"
                fill="rgba(255,255,255,0.12)"
              />
            </svg>
            <svg
              viewBox="0 0 24 24"
              className="sr-star-fill"
              style={{ clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)` }}
            >
              <path
                d="M12 2 L14.39 8.59 L21.51 9.09 L16 13.74 L17.78 20.93 L12 17.27 L6.22 20.93 L8 13.74 L2.49 9.09 L9.61 8.59 Z"
                fill="currentColor"
              />
            </svg>
          </div>
        ))}
      </div>

      <div className="sr-rank">{scoreData.rank}</div>

      <div className="sr-stats">
        <div className="sr-stat">
          <span className="sr-stat-num">{scoreData.optimalCount}</span>
          <span className="sr-stat-out">/ {scoreData.totalDecisions}</span>
          <span className="sr-stat-label">DECISIONES ÓPTIMAS</span>
        </div>
      </div>
    </div>
  );
}
