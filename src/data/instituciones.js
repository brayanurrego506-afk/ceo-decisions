// Instituciones de Fomento — contenido pedagógico verificado
// Fuentes: sitios oficiales + Conpes 3866 + Fedesarrollo

export const INSTITUCIONES = [
  {
    id: 'colombia-productiva',
    name: 'COLOMBIA PRODUCTIVA',
    sub: 'Programa de productividad y sofisticación empresarial',
    color: 'gold',
    quote: 'Hoy integrado con iNNpulsa Colombia bajo el MinCIT.',
    description:
      'Programa del Ministerio de Comercio, Industria y Turismo creado para elevar la productividad, calidad y sofisticación de las empresas colombianas. Su principal eje fueron las "Fábricas de Productividad", que llevaron expertos en eficiencia operacional a más de 5,000 empresas en 32 departamentos.',
    impacts: [
      { value: '+21%', label: 'reducción costos unitarios promedio' },
      { value: '+82.7%', label: 'eliminación tiempo sin valor agregado' },
      { value: '225K+', label: 'horas de asistencia técnica entregadas' },
      { value: 'NPS 76', label: 'superior a Apple (47) e Intel (52)' },
    ],
    services: [
      'Fábricas de Productividad — expertos gratuitos hasta 60 horas',
      'Calidad para Exportar — cofinancia certificaciones internacionales (Rainforest, ISO, BPM, BASC, HACCP)',
      'Encadenamientos productivos — alianzas entre empresas para escalar pedidos',
      'Transformación Digital — mentoría técnica para PYMEs',
    ],
    why: 'Las empresas en el programa tienen +37% más probabilidades de mantenerse en el mercado y +16% más probabilidades de expandirse (Confecámaras 2024). Fedesarrollo lo califica como "más eficiente que los programas de Japón, EE.UU., Chile y Marruecos".',
    source: 'Fuentes: iNNpulsa Colombia · MinCIT · Fedesarrollo · Confecámaras',
  },
  {
    id: 'procolombia',
    name: 'PROCOLOMBIA',
    sub: 'Agencia de promoción de exportaciones, turismo e inversión',
    color: 'signal',
    quote: 'La puerta colombiana al mercado global.',
    description:
      'Agencia gubernamental encargada de promover las exportaciones no minero-energéticas, el turismo internacional, la inversión extranjera directa y la imagen de Colombia (Marca País) en el mundo. Opera 30+ oficinas comerciales en LATAM, EE.UU., Europa y Asia.',
    impacts: [
      { value: 'USD 3.4M', label: 'ventas inmediatas Macrorrueda Madrid 2023' },
      { value: 'USD 24M', label: 'expectativas Macrorrueda Madrid 2023' },
      { value: '1,100+', label: 'citas de negocios por Macrorrueda' },
      { value: '67', label: 'manifestaciones inversión Investment Summit 2024' },
    ],
    services: [
      'Macrorruedas de Negocios — conexión directa con compradores internacionales',
      'Misiones Comerciales — viajes a mercados objetivo (México, Chile, Perú, Europa)',
      'Programa de Internacionalización — preparación exportadora completa',
      'Colombia Investment Summit — atracción de inversión extranjera directa',
      'Asesoría logística, certificaciones, denominación de origen',
    ],
    why: 'Las empresas internacionalizadas tienen acceso a mercados 10–100x más grandes que el local. ProColombia reduce el costo y tiempo de conseguir el primer comprador internacional de años a meses. Es el puente entre una empresa colombiana y compradores en 30+ países.',
    source: 'Fuentes: ProColombia · Sala de Prensa 2023–2024 · Investment Summit 2024',
  },
  {
    id: 'innpulsa',
    name: 'iNNPULSA COLOMBIA',
    sub: 'Agencia de emprendimiento, innovación y productividad',
    color: 'neural',
    quote: 'El acelerador del ecosistema startup colombiano.',
    description:
      'Entidad del Gobierno Nacional integrada con Colombia Productiva. Apoya emprendimientos dinámicos, startups innovadoras y empresas con potencial de crecimiento mediante capital, conocimiento y conexiones. En 2023 apoyó a más de 4,000 empresas.',
    impacts: [
      { value: '4,000+', label: 'empresas apoyadas en 2023' },
      { value: 'COP 250M', label: 'capital no reembolsable por convocatoria' },
      { value: '5', label: 'unicornios colombianos apoyados por el ecosistema' },
      { value: 'TOP 3', label: 'ecosistemas startup más activos de LATAM' },
    ],
    services: [
      'Capital no reembolsable para startups validadas',
      'Crédito y financiamiento puente para contratación pública',
      'Aceleración premium con mentores internacionales',
      'Programas de Capital Humano y Transformación Digital',
      'Asesoría jurídica de propiedad intelectual',
    ],
    why: 'Las 5 startups unicornio colombianas (Rappi, Habi, Bold, Treinta, Addi) usaron el ecosistema iNNpulsa en etapas críticas. Las startups que combinan iNNpulsa + ProColombia + capital privado tienen 2.4x más probabilidad de internacionalizarse exitosamente.',
    source: 'Fuentes: iNNpulsa Colombia · Ecosistema 2024 · ProColombia',
  },
];

export const NIVELES_COMPETITIVIDAD = [
  {
    id: 'meta',
    code: '01',
    name: 'NIVEL META',
    sub: 'Factores socioculturales',
    desc: 'Cultura empresarial, valores nacionales, capacidad de aprendizaje colectivo, consenso sobre el desarrollo. Es la base invisible.',
    example: 'Colombia es el 3er ecosistema startup más activo de LATAM porque hay una cultura emprendedora consolidada.',
  },
  {
    id: 'macro',
    code: '02',
    name: 'NIVEL MACRO',
    sub: 'Política económica nacional',
    desc: 'Política monetaria, fiscal, cambiaria, comercial. Estabilidad macroeconómica del país.',
    example: 'Bajos aranceles + tratados de libre comercio (CAN, CAN-Mercosur, Alianza del Pacífico) abren mercados a exportadores colombianos.',
  },
  {
    id: 'meso',
    code: '03',
    name: 'NIVEL MESO',
    sub: 'Políticas e instituciones específicas',
    desc: 'Aquí actúan iNNpulsa, ProColombia, Colombia Productiva, SENA, Bancóldex. Conectan política nacional con realidad empresarial. **Este es el nivel donde el juego enseña.**',
    example: 'Fábricas de Productividad lleva un experto alemán a tu finca. Macrorruedas te ponen frente al comprador de Berlín. iNNpulsa cubre tu runway.',
  },
  {
    id: 'micro',
    code: '04',
    name: 'NIVEL MICRO',
    sub: 'La empresa',
    desc: 'Tu empresa: estrategia, talento, calidad, operación, innovación. Lo único que tú controlas 100%.',
    example: 'Tu finca cafetera. Tu startup de datos. Tu decisión de aceptar la intervención o no.',
  },
];
