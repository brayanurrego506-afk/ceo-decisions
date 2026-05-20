import { useState } from 'react';
import './DatoReal.css';

export default function DatoReal({ briefDato, dato, source }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = dato && briefDato && dato !== briefDato;

  return (
    <div className="dato-real">
      <div className="dr-header">
        <span className="dr-icon">◆</span>
        <span className="dr-tag">DATO REAL · COMPETITIVIDAD SISTÉMICA</span>
      </div>

      <p className="dr-text">{briefDato || dato}</p>

      {hasMore && expanded && (
        <p className="dr-text dr-text-expanded">{dato}</p>
      )}

      <div className="dr-foot">
        {hasMore && (
          <button className="dr-toggle" onClick={() => setExpanded(!expanded)}>
            <span>{expanded ? 'CERRAR' : 'PROFUNDIZAR'}</span>
            <span className="dr-toggle-arrow">{expanded ? '↑' : '↓'}</span>
          </button>
        )}
        {source && <div className="dr-source">{source}</div>}
      </div>
    </div>
  );
}
