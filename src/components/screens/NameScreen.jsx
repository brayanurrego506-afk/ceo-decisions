import { useState, useRef, useEffect } from 'react';
import './NameScreen.css';

export default function NameScreen({ mode, onConfirm }) {
  const [name, setName] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onConfirm(trimmed.toUpperCase().slice(0, 24));
  };

  const bgImg = mode === 'cafe' ? '/images/entrepreneur.webp' : '/images/codigo.webp';

  return (
    <div className="name-screen">
      <div className="ns-bg" style={{ backgroundImage: `url(${bgImg})` }} />
      <div className="ns-overlay" />

      <form className="ns-content" onSubmit={handleSubmit}>
        <div className="ns-tag">PASO 1 DE 6 · IDENTIFICACIÓN</div>
        <h1 className="ns-title">
          ¿CUÁL ES TU <br /> NOMBRE, CEO?
        </h1>
        <p className="ns-desc">
          Vas a tomar 5 decisiones reales que enfrentan empresas colombianas todos los días.
          Cada una afecta tu capital, tu competitividad, tu reputación y los mercados a los que accedes.
        </p>

        <div className="ns-input-wrap">
          <input
            ref={inputRef}
            type="text"
            className="ns-input"
            placeholder="ESCRIBE TU NOMBRE"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={24}
            autoComplete="off"
            spellCheck={false}
          />
          <div className="ns-underline" />
        </div>

        <button type="submit" className="ns-submit" disabled={!name.trim()}>
          <span>COMENZAR</span>
          <span className="ns-submit-arrow">→</span>
        </button>

        <div className="ns-hint">Enter para continuar</div>
      </form>
    </div>
  );
}
