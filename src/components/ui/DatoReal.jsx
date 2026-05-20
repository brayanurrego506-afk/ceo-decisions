import './DatoReal.css';

export default function DatoReal({ dato, source }) {
  return (
    <div className="dato-real">
      <div className="dr-header">
        <span className="dr-icon">◆</span>
        <span className="dr-tag">DATO REAL · COMPETITIVIDAD SISTÉMICA</span>
      </div>
      <p className="dr-text">{dato}</p>
      {source && <div className="dr-source">{source}</div>}
    </div>
  );
}
