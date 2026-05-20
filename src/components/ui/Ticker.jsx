import './Ticker.css';

const ITEMS_CAFE = [
  'FÁBRICAS DE PRODUCTIVIDAD · 21% ↓ COSTOS UNITARIOS',
  '+82.7% REDUCCIÓN TIEMPO SIN VALOR — Líneas Hospitalarias',
  'iNNpulsa 2023 · 4,000+ EMPRESAS APOYADAS',
  'MACRORRUEDA MADRID · USD 3.4M VENTAS INMEDIATAS',
  'EXPORT NO MINERO A ESPAÑA +18.9% (2022)',
  'NPS Fábricas de Productividad: 76 (>Apple 47, >Intel 52)',
  '+37% MÁS PROBABILIDAD DE SOBREVIVIR — CONFECÁMARAS',
  'Café especial: +3X PRECIO vs commodity',
  'Fedesarrollo: "más eficiente que JP, US, CL, MA"',
  'Indicación Geográfica UE desde 2007 · CAFÉ DE COLOMBIA',
];

const ITEMS_TECH = [
  'COL INVESTMENT SUMMIT 2024 · 67 MANIFESTACIONES INVERSIÓN',
  'iNNpulsa 2023 · COP 250M CAPITAL NO REEMBOLSABLE',
  'TI E INDUSTRIAS CREATIVAS · SECTORES PRIORITARIOS PROCOLOMBIA',
  'MACRORRUEDA MÉXICO · 86 CITAS DE NEGOCIO',
  'COLOMBIA · TOP 3 ECOSISTEMA STARTUP DE LATAM',
  '+15% CRECIMIENTO CON CALIDAD TÉCNICA — iNNpulsa',
  '5 UNICORNIOS COLOMBIANOS · RAPPI · HABI · BOLD · TREINTA · ADDI',
  'TRANSFORMACIÓN DIGITAL · EJE PRIORITARIO 2024',
  '+37% EXPANSIÓN CON CAPITAL HUMANO CALIFICADO',
  'PROCOLOMBIA · 30+ PAÍSES DE CONEXIÓN COMERCIAL',
];

export default function Ticker({ mode = 'tech' }) {
  const items = mode === 'cafe' ? ITEMS_CAFE : ITEMS_TECH;
  const doubled = [...items, ...items];
  return (
    <div className="ticker" data-mode={mode}>
      <div className="ticker-track">
        {doubled.map((it, i) => (
          <span className="ticker-item" key={i}>
            <span className="ticker-bullet">●</span>
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
