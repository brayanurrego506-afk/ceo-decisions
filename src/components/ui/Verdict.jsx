import './Verdict.css';

const VERDICT_CONFIG = {
  optima: {
    label: 'DECISIÓN ÓPTIMA',
    icon: '⬆',
    feedback: 'Excelente. Elegiste la mejor opción posible — usaste el ecosistema al máximo.',
  },
  buena: {
    label: 'DECISIÓN BUENA',
    icon: '✓',
    feedback: 'Buena decisión. Funciona — pero había una opción aún mejor que aprovechaba más el ecosistema.',
  },
  aceptable: {
    label: 'DECISIÓN ACEPTABLE',
    icon: '◐',
    feedback: 'Aceptable. Sobrevives pero no maximizas el impacto. Mira la alternativa óptima.',
  },
  riesgosa: {
    label: 'DECISIÓN RIESGOSA',
    icon: '⚠',
    feedback: 'Cuidado. Esta decisión funciona corto plazo pero compromete competitividad estructural.',
  },
  mala: {
    label: 'NO RECOMENDADA',
    icon: '✕',
    feedback: 'Esta no fue la mejor opción. La empresa pierde competitividad estructural.',
  },
};

export default function Verdict({ verdict, bestOption, choiceId, whyBest, bestLabel }) {
  const config = VERDICT_CONFIG[verdict] || VERDICT_CONFIG.aceptable;
  const wasBest = choiceId === bestOption;

  return (
    <div className={`verdict verdict-${verdict}`}>
      <div className="vrd-header">
        <span className="vrd-icon">{config.icon}</span>
        <span className="vrd-label">{config.label}</span>
      </div>

      <p className="vrd-feedback">{config.feedback}</p>

      {!wasBest && whyBest && (
        <div className="vrd-better">
          <div className="vrd-better-head">
            <span className="vrd-better-tag">¿QUÉ HABRÍA SIDO MEJOR?</span>
            {bestLabel && (
              <span className="vrd-better-option">OPCIÓN {bestOption} · {bestLabel}</span>
            )}
          </div>
          <p className="vrd-better-text">{whyBest}</p>
        </div>
      )}

      {wasBest && whyBest && (
        <div className="vrd-best">
          <div className="vrd-best-head">
            <span className="vrd-best-tag">★ POR QUÉ ERA LA MEJOR</span>
          </div>
          <p className="vrd-best-text">{whyBest}</p>
        </div>
      )}
    </div>
  );
}
