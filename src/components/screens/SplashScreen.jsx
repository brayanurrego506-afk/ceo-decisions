import { useEffect, useState, Suspense, lazy } from 'react';
import './SplashScreen.css';

const SplashCoin = lazy(() => import('../../three/SplashCoin'));

export default function SplashScreen({ onSelectMode, onOpenInstitutions }) {
  const [hovered, setHovered] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`splash ${mounted ? 'splash-in' : ''}`} data-hovered={hovered}>
      <div className="splash-top">
        <div className="splash-brand">
          <span className="splash-brand-mark">◆</span>
          <span className="splash-brand-name">BRANEX · ESUMER</span>
        </div>
        <div className="splash-meta">CEO DECISIONS · COMPETITIVIDAD SISTÉMICA</div>
      </div>

      <div className="splash-grid">
        {/* CAFÉ */}
        <button
          className="splash-half splash-cafe"
          onMouseEnter={() => setHovered('cafe')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSelectMode('cafe')}
        >
          <div
            className="splash-bg"
            style={{ backgroundImage: 'url(/images/entrepreneur.jpg)' }}
          />
          <div className="splash-overlay splash-overlay-cafe" />
          <div className="splash-content">
            <div className="splash-tag">MODO COLOMBIA · SECTOR CAFETERO</div>
            <h1 className="splash-title">
              ¡TINTO O <br /> QUIEBRA!
            </h1>
            <p className="splash-desc">
              Eres CEO de una finca cafetera en Antioquia. <br />
              Cinco decisiones reales. <br />
              Cinco años en juego.
            </p>
            <div className="splash-cta">
              <span className="splash-cta-text">JUGAR</span>
              <span className="splash-cta-arrow">→</span>
            </div>
          </div>
        </button>

        {/* Moneda 3D — café/tech */}
        <div className="splash-coin-wrap">
          <Suspense fallback={<div className="splash-vs-inner">VS</div>}>
            <SplashCoin hovered={!!hovered} />
          </Suspense>
        </div>

        {/* TECH */}
        <button
          className="splash-half splash-tech"
          onMouseEnter={() => setHovered('tech')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSelectMode('tech')}
        >
          <div
            className="splash-bg"
            style={{ backgroundImage: 'url(/images/datacenter.jpg)' }}
          />
          <div className="splash-overlay splash-overlay-tech" />
          <div className="splash-content">
            <div className="splash-tag">MODO STARTUP · INDUSTRIA 4.0</div>
            <h1 className="splash-title">
              PROTOCOLO <br /> <span className="t-accent-tech">INNOVA</span>
            </h1>
            <p className="splash-desc">
              Eres CEO de una startup de inteligencia de datos. <br />
              Cinco decisiones reales. <br />
              USD 12M en juego.
            </p>
            <div className="splash-cta">
              <span className="splash-cta-text">JUGAR</span>
              <span className="splash-cta-arrow">→</span>
            </div>
          </div>
        </button>
      </div>

      <div className="splash-bottom">
        <div className="splash-foot">
          <span className="splash-foot-label">DATOS REALES</span>
          <span className="splash-foot-bar" />
          <button className="splash-foot-link" onClick={onOpenInstitutions}>
            ↗ MATERIAL EDUCATIVO · INSTITUCIONES DE FOMENTO
          </button>
        </div>
      </div>
    </div>
  );
}
