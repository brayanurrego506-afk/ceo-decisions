import { useEffect, useState } from 'react';
import { INSTITUCIONES, NIVELES_COMPETITIVIDAD } from '../../data/instituciones';
import './InstitutionsScreen.css';

export default function InstitutionsScreen({ onBack, onContinue, mode }) {
  const [show, setShow] = useState(false);
  const [tab, setTab] = useState('instituciones');

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`inst-screen ${show ? 'show' : ''}`}>
      <div className="inst-header">
        <button className="inst-back" onClick={onBack}>
          <span>←</span>
          <span>VOLVER</span>
        </button>
        <div className="inst-meta">
          <span className="inst-meta-dot">●</span>
          <span>MATERIAL EDUCATIVO · COMPETITIVIDAD SISTÉMICA</span>
        </div>
      </div>

      <div className="inst-tabs">
        <button
          className={`inst-tab ${tab === 'instituciones' ? 'active' : ''}`}
          onClick={() => setTab('instituciones')}
        >
          <span className="inst-tab-num">01</span>
          <span className="inst-tab-label">INSTITUCIONES DE FOMENTO</span>
        </button>
        <button
          className={`inst-tab ${tab === 'niveles' ? 'active' : ''}`}
          onClick={() => setTab('niveles')}
        >
          <span className="inst-tab-num">02</span>
          <span className="inst-tab-label">NIVELES DE COMPETITIVIDAD</span>
        </button>
        <button
          className={`inst-tab ${tab === 'porque' ? 'active' : ''}`}
          onClick={() => setTab('porque')}
        >
          <span className="inst-tab-num">03</span>
          <span className="inst-tab-label">POR QUÉ FUNCIONA</span>
        </button>
      </div>

      <div className="inst-body">
        {tab === 'instituciones' && (
          <div className="inst-stack">
            <h1 className="inst-h1">
              LAS TRES INSTITUCIONES <br />
              QUE CAMBIAN EL JUEGO
            </h1>
            <p className="inst-lead">
              Colombia tiene un ecosistema de fomento empresarial calificado entre los mejores
              de Latinoamérica. Estas son las tres entidades que un CEO colombiano DEBE conocer.
            </p>

            {INSTITUCIONES.map((inst, i) => (
              <article className="inst-card" key={inst.id} data-color={inst.color}>
                <div className="inst-card-head">
                  <span className="inst-card-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 className="inst-card-name">{inst.name}</h2>
                    <div className="inst-card-sub">{inst.sub}</div>
                  </div>
                </div>

                <blockquote className="inst-card-quote">"{inst.quote}"</blockquote>

                <p className="inst-card-desc">{inst.description}</p>

                <div className="inst-card-impacts">
                  {inst.impacts.map((imp, k) => (
                    <div className="inst-impact" key={k}>
                      <div className="inst-impact-value">{imp.value}</div>
                      <div className="inst-impact-label">{imp.label}</div>
                    </div>
                  ))}
                </div>

                <div className="inst-card-row">
                  <div className="inst-card-col">
                    <div className="inst-card-col-label">QUÉ OFRECE</div>
                    <ul className="inst-card-list">
                      {inst.services.map((s, k) => (
                        <li key={k}>
                          <span className="inst-bullet">▸</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="inst-card-col">
                    <div className="inst-card-col-label">POR QUÉ HACE A LAS EMPRESAS MÁS COMPETITIVAS</div>
                    <p className="inst-card-why">{inst.why}</p>
                  </div>
                </div>

                <div className="inst-card-source">{inst.source}</div>
              </article>
            ))}
          </div>
        )}

        {tab === 'niveles' && (
          <div className="inst-stack">
            <h1 className="inst-h1">
              LOS 4 NIVELES <br />
              DE COMPETITIVIDAD SISTÉMICA
            </h1>
            <p className="inst-lead">
              Marco teórico desarrollado por Esser, Hillebrand, Messner y Meyer-Stamer (1996).
              Explica que la competitividad de un país <strong>no depende solo de las empresas</strong> —
              depende de cuatro niveles que tienen que funcionar al mismo tiempo.
            </p>

            <div className="inst-levels">
              {NIVELES_COMPETITIVIDAD.map((n) => (
                <article className="inst-level" key={n.id} data-id={n.id}>
                  <div className="inst-level-code">{n.code}</div>
                  <div className="inst-level-body">
                    <h3 className="inst-level-name">{n.name}</h3>
                    <div className="inst-level-sub">{n.sub}</div>
                    <p
                      className="inst-level-desc"
                      dangerouslySetInnerHTML={{
                        __html: n.desc.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                      }}
                    />
                    <div className="inst-level-example">
                      <span className="inst-level-example-label">EJEMPLO:</span>
                      <span>{n.example}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="inst-callout">
              <div className="inst-callout-tag">◆ LA TESIS CENTRAL</div>
              <p>
                Una empresa solo puede competir globalmente cuando los 4 niveles están alineados.
                Por eso <strong>iNNpulsa, ProColombia y Colombia Productiva existen</strong>: son el
                puente del nivel Macro (política) al nivel Micro (empresa). Sin el nivel Meso, las
                empresas pequeñas no pueden absorber las oportunidades del mercado global.
              </p>
            </div>
          </div>
        )}

        {tab === 'porque' && (
          <div className="inst-stack">
            <h1 className="inst-h1">
              ¿POR QUÉ HACEN MÁS <br />
              COMPETITIVAS A LAS EMPRESAS?
            </h1>

            <div className="inst-reasons">
              <article className="inst-reason">
                <div className="inst-reason-num">01</div>
                <h3>COMPENSAN LA FALTA DE ESCALA</h3>
                <p>
                  Una microempresa no puede pagar un consultor alemán de productividad, ni viajar a Madrid a
                  conocer compradores, ni cubrir 8 meses de runway esperando un contrato estatal. El
                  Estado, mediante iNNpulsa y ProColombia, le da esa escala temporalmente.
                </p>
                <div className="inst-reason-dato">
                  Fábricas de Productividad cofinanció 60 horas de experto por empresa. Sin el programa,
                  esto costaría COP 30M+ por empresa. El programa lo redujo a casi cero.
                </div>
              </article>

              <article className="inst-reason">
                <div className="inst-reason-num">02</div>
                <h3>ABREN PUERTAS QUE ESTÁN CERRADAS</h3>
                <p>
                  Un caficultor en Antioquia no tiene cómo conseguir una reunión con un importador en
                  Berlín. ProColombia organiza Macrorruedas con 1,100+ citas pre-agendadas. La barrera de
                  entrada al mercado internacional baja del 99% al 30%.
                </p>
                <div className="inst-reason-dato">
                  Macrorrueda Madrid 2023: USD 3.4M ventas inmediatas, USD 24M expectativa,
                  130 exportadores de 16 departamentos colombianos.
                </div>
              </article>

              <article className="inst-reason">
                <div className="inst-reason-num">03</div>
                <h3>TRANSFIEREN CONOCIMIENTO QUE NO ESTÁ EN GOOGLE</h3>
                <p>
                  Cómo certificarte Rainforest Alliance, cómo aplicar a un fondo de inversión, cómo
                  negociar con MinTIC. Este conocimiento es práctico, contextual y caro de adquirir.
                  Los programas lo transfieren gratis a empresas que califican.
                </p>
                <div className="inst-reason-dato">
                  iNNpulsa apoyó a 4,000+ empresas en 2023 con asesoría, capital y mentoría.
                </div>
              </article>

              <article className="inst-reason">
                <div className="inst-reason-num">04</div>
                <h3>ACTÚAN EN EL NIVEL QUE LA EMPRESA NO PUEDE</h3>
                <p>
                  Una empresa no puede negociar el TLC con la UE. No puede crear una Política de Desarrollo
                  Productivo. No puede gestionar la denominación de origen "Café de Colombia". Pero SÍ
                  puede usar todo eso para competir mejor. Ese es el corazón de la Competitividad Sistémica.
                </p>
                <div className="inst-reason-dato">
                  Conpes 3866 (Política de Desarrollo Productivo) establece 7 ejes estratégicos
                  que conectan empresas con el ecosistema completo.
                </div>
              </article>
            </div>

            <div className="inst-results">
              <h2 className="inst-results-title">EL RESULTADO MEDIBLE</h2>
              <div className="inst-results-grid">
                <div className="inst-result">
                  <div className="inst-result-value">+37%</div>
                  <div className="inst-result-label">
                    más probabilidad de permanecer en el mercado<br />
                    <span>Confecámaras 2024</span>
                  </div>
                </div>
                <div className="inst-result">
                  <div className="inst-result-value">+16%</div>
                  <div className="inst-result-label">
                    más posibilidad de expandirse<br />
                    <span>Confecámaras 2024</span>
                  </div>
                </div>
                <div className="inst-result">
                  <div className="inst-result-value">2.4x</div>
                  <div className="inst-result-label">
                    más probabilidad de internacionalizarse<br />
                    <span>iNNpulsa 2024</span>
                  </div>
                </div>
                <div className="inst-result">
                  <div className="inst-result-value">+21%</div>
                  <div className="inst-result-label">
                    reducción costos unitarios promedio<br />
                    <span>Fábricas de Productividad 2022</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="inst-foot">
        <div className="inst-foot-meta">
          UNIVERSIDAD ESUMER · EXPOSICIÓN COMPETITIVIDAD SISTÉMICA · 2026
        </div>
        {onContinue && (
          <button className="inst-continue" onClick={onContinue}>
            <span>CONTINUAR AL JUEGO</span>
            <span>→</span>
          </button>
        )}
      </div>
    </div>
  );
}
