import { useEffect, useState } from 'react';
import './IntroScreen.css';

const COPY = {
  cafe: {
    img: '/images/entrepreneur.jpg',
    role: 'CEO · FINCA CAFETERA',
    location: 'ANTIOQUIA · COLOMBIA',
    intro:
      'Heredaste de tu familia 12 hectáreas de café especial en las montañas de Antioquia. Tu marca es respetada en la región pero el mundo no te conoce. Tienes 6 trabajadores y un sueño: que tu café llegue a Europa con tu nombre en la bolsa.',
    rules: [
      'Tu capital arranca en COP 50 millones.',
      'Cinco decisiones reales del ecosistema cafetero colombiano.',
      'Cada decisión cambia 4 métricas: capital, competitividad, reputación, mercados.',
      'Sin respuestas obvias. Sin respuestas correctas. Solo consecuencias.',
    ],
    cta: 'COMENZAR EL JUEGO',
  },
  tech: {
    img: '/images/codigo.jpg',
    role: 'CEO · STARTUP DE DATOS',
    location: 'MEDELLÍN · COLOMBIA',
    intro:
      'Llevas 18 meses construyendo una startup de inteligencia de datos para retail colombiano. MRR de USD 2,400. 12 clientes fieles. 4 desarrolladores que confían en ti. Tu sueño: convertirla en el próximo unicornio latinoamericano antes de los 30.',
    rules: [
      'Tu capital arranca en USD 18 mil.',
      'Cinco decisiones reales del ecosistema startup colombiano.',
      'Cada decisión cambia 4 métricas: capital, competitividad, reputación, mercados.',
      'Sin atajos. Sin garantías. Solo consecuencias reales.',
    ],
    cta: 'INICIAR PROTOCOLO',
  },
};

export default function IntroScreen({ mode, ceoName, metrics, onStart }) {
  const [show, setShow] = useState(false);
  const data = COPY[mode];

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`intro-screen ${show ? 'show' : ''}`}>
      <div className="is-img-side">
        <div className="is-img" style={{ backgroundImage: `url(${data.img})` }} />
        <div className="is-img-overlay" />
        <div className="is-img-tag">
          <div className="is-img-tag-line" />
          <div className="is-img-tag-text">{data.location}</div>
        </div>
      </div>

      <div className="is-content">
        <div className="is-meta">
          <span className="is-meta-label">{data.role}</span>
          <span className="is-meta-dot">·</span>
          <span className="is-meta-name">{ceoName}</span>
        </div>

        <h1 className="is-greeting">
          BIENVENIDO, <br /> <span className="is-greeting-accent">{ceoName}</span>
        </h1>

        <p className="is-intro">{data.intro}</p>

        <div className="is-stats">
          <div className="is-stat">
            <span className="is-stat-label">CAPITAL</span>
            <span className="is-stat-value">
              {mode === 'cafe' ? `COP ${metrics.capital}M` : `USD ${metrics.capital}K`}
            </span>
          </div>
          <div className="is-stat">
            <span className="is-stat-label">COMPETIT.</span>
            <span className="is-stat-value">{metrics.competitividad}</span>
          </div>
          <div className="is-stat">
            <span className="is-stat-label">REPUTACIÓN</span>
            <span className="is-stat-value">{metrics.reputacion}</span>
          </div>
          <div className="is-stat">
            <span className="is-stat-label">MERCADOS</span>
            <span className="is-stat-value">🇨🇴</span>
          </div>
        </div>

        <ul className="is-rules">
          {data.rules.map((r, i) => (
            <li key={i}>
              <span className="is-rules-num">0{i + 1}</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>

        <button className="is-cta" onClick={onStart}>
          <span>{data.cta}</span>
          <span className="is-cta-arrow">→</span>
        </button>
      </div>
    </div>
  );
}
