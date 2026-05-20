import './OptionCard.css';

export default function OptionCard({ option, onClick, index }) {
  return (
    <button
      className="option-card"
      onClick={onClick}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <span className="oc-letter">{option.id}</span>
      <span className="oc-emoji">{option.emoji}</span>
      <div className="oc-body">
        <div className="oc-label">{option.label}</div>
        <div className="oc-desc">{option.desc}</div>
      </div>
      <span className="oc-arrow">→</span>
    </button>
  );
}
