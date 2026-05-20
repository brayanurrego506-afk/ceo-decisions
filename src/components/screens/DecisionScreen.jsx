import { useEffect, useState, useMemo } from 'react';
import OptionCard from '../ui/OptionCard';
import './DecisionScreen.css';

export default function DecisionScreen({ decision, step, totalSteps, onChoose }) {
  const [show, setShow] = useState(false);

  // Reset animación cuando cambia decision
  useEffect(() => {
    setShow(false);
    const t = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(t);
  }, [decision.id]);

  const dots = useMemo(() => Array.from({ length: totalSteps }), [totalSteps]);

  return (
    <div className={`decision-screen ${show ? 'show' : ''}`} key={decision.id}>
      <div className="ds-img-side">
        <div className="ds-img" style={{ backgroundImage: `url(${decision.img})` }} />
        <div className="ds-img-overlay" />

        <div className="ds-progress">
          <div className="ds-progress-label">PROGRESO</div>
          <div className="ds-progress-dots">
            {dots.map((_, i) => (
              <span
                key={i}
                className="ds-dot"
                data-state={i < step ? 'done' : i === step ? 'active' : 'pending'}
              />
            ))}
          </div>
          <div className="ds-progress-count">
            <span className="ds-progress-num">{String(step + 1).padStart(2, '0')}</span>
            <span className="ds-progress-sep">/</span>
            <span className="ds-progress-total">{String(totalSteps).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="ds-chapter-tag">{decision.chapter}</div>
      </div>

      <div className="ds-content">
        <div className="ds-scroll">
          <div className="ds-chapter">{decision.chapter}</div>
          <h1 className="ds-title">{decision.title}</h1>

          <p
            className="ds-narrative"
            dangerouslySetInnerHTML={{ __html: decision.narrative }}
          />

          <div className="ds-question">
            <span className="ds-question-mark">?</span>
            <span className="ds-question-text">{decision.question}</span>
          </div>

          <div className="ds-options">
            {decision.options.map((opt, i) => (
              <OptionCard
                key={opt.id}
                option={opt}
                index={i}
                onClick={() => onChoose(opt.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
