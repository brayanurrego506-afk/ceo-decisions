import { useReducer, useCallback } from 'react';
import { CAFE_DECISIONS } from '../data/cafeDecisions';
import { TECH_DECISIONS } from '../data/techDecisions';
import { ENDINGS } from '../data/endings';

const INITIAL_METRICS = {
  cafe: { capital: 50, competitividad: 28, reputacion: 35, mercados: 0 },
  tech: { capital: 18, competitividad: 32, reputacion: 30, mercados: 0 },
};

const INITIAL_STATE = {
  mode: null,
  ceoName: '',
  screen: 'splash',
  step: 0,
  metrics: { capital: 0, competitividad: 0, reputacion: 0, mercados: 0 },
  history: [],
  pendingChoice: null,
  pendingConsequence: null,
  ending: null,
};

function clamp(v, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}

function getEnding(mode, m) {
  if (mode === 'cafe') {
    if (m.capital >= 62 && m.competitividad >= 60 && m.mercados >= 1) return ENDINGS.cafe.legend;
    if (m.mercados >= 1 || m.competitividad >= 50) return ENDINGS.cafe.growth;
    if (m.capital >= 30) return ENDINGS.cafe.survivor;
    return ENDINGS.cafe.bankrupt;
  }
  if (m.capital >= 55 && m.competitividad >= 60 && m.mercados >= 2) return ENDINGS.tech.legend;
  if (m.mercados >= 2 || m.competitividad >= 52) return ENDINGS.tech.growth;
  if (m.capital >= 20) return ENDINGS.tech.survivor;
  return ENDINGS.tech.bankrupt;
}

// Calificación 0.0 a 5.0 con decimales
// Compuesta por:
//   - 3.2 pts máx: métricas finales (capital + competitividad + reputacion)
//   - 0.6 pts máx: mercados internacionales abiertos (0.15 por cada uno, max 4)
//   - 1.2 pts máx: decisiones óptimas elegidas (0.24 por cada óptima de 5)
function calculateScore(mode, history, metrics, decisions) {
  // Métricas: cada métrica va de 0 a 100. Normalizamos.
  const baseMax = mode === 'cafe' ? 75 : 70; // ajuste por dificultad inicial
  const metricsPart = Math.min(
    3.2,
    ((metrics.capital + metrics.competitividad + metrics.reputacion) / (3 * baseMax)) * 3.2,
  );

  const marketsPart = Math.min(0.6, metrics.mercados * 0.15);

  // Contar decisiones óptimas
  const optimalCount = history.reduce((acc, h) => {
    const decision = decisions[h.step];
    if (decision && decision.bestOption === h.choice) return acc + 1;
    return acc;
  }, 0);
  const optimalPart = optimalCount * 0.24;

  const total = metricsPart + marketsPart + optimalPart;
  const score = Math.max(0, Math.min(5, total));

  let rank;
  if (score >= 4.5) rank = 'CEO LEGENDARIO';
  else if (score >= 3.8) rank = 'CEO ESTRATÉGICO';
  else if (score >= 3.0) rank = 'CEO EN CRECIMIENTO';
  else if (score >= 2.0) rank = 'CEO EN APRENDIZAJE';
  else rank = 'NECESITA EL ECOSISTEMA';

  return {
    score: Math.round(score * 10) / 10,
    rank,
    optimalCount,
    totalDecisions: history.length,
  };
}

function applyFx(metrics, fx, mode) {
  return {
    capital: clamp(metrics.capital + fx.capital),
    competitividad: clamp(metrics.competitividad + fx.competitividad),
    reputacion: clamp(metrics.reputacion + fx.reputacion),
    mercados: clamp(metrics.mercados + fx.mercados, 0, 4),
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_MODE': {
      return {
        ...INITIAL_STATE,
        mode: action.mode,
        screen: 'name',
        metrics: INITIAL_METRICS[action.mode],
      };
    }
    case 'OPEN_INSTITUTIONS': {
      return { ...state, previousScreen: state.screen, screen: 'institutions' };
    }
    case 'CLOSE_INSTITUTIONS': {
      return { ...state, screen: state.previousScreen || 'splash', previousScreen: null };
    }
    case 'SET_NAME': {
      return { ...state, ceoName: action.name };
    }
    case 'CONFIRM_NAME': {
      return { ...state, screen: 'intro' };
    }
    case 'START_DECISIONS': {
      return { ...state, screen: 'decision', step: 0 };
    }
    case 'CHOOSE_OPTION': {
      const decisions = state.mode === 'cafe' ? CAFE_DECISIONS : TECH_DECISIONS;
      const decision = decisions[state.step];
      const option = decision.options.find((o) => o.id === action.optionId);
      const newMetrics = applyFx(state.metrics, option.fx, state.mode);
      return {
        ...state,
        pendingChoice: option,
        pendingConsequence: option.consequence,
        metrics: newMetrics,
        screen: 'consequence',
        history: [...state.history, { step: state.step, choice: option.id, fx: option.fx }],
      };
    }
    case 'NEXT_DECISION': {
      const decisions = state.mode === 'cafe' ? CAFE_DECISIONS : TECH_DECISIONS;
      const nextStep = state.step + 1;
      if (nextStep >= decisions.length) {
        const ending = getEnding(state.mode, state.metrics);
        const scoreData = calculateScore(state.mode, state.history, state.metrics, decisions);
        return { ...state, screen: 'ending', ending, scoreData };
      }
      return {
        ...state,
        step: nextStep,
        screen: 'decision',
        pendingChoice: null,
        pendingConsequence: null,
      };
    }
    case 'RESTART': {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const selectMode = useCallback((mode) => dispatch({ type: 'SELECT_MODE', mode }), []);
  const setName = useCallback((name) => dispatch({ type: 'SET_NAME', name }), []);
  const confirmName = useCallback(() => dispatch({ type: 'CONFIRM_NAME' }), []);
  const startDecisions = useCallback(() => dispatch({ type: 'START_DECISIONS' }), []);
  const chooseOption = useCallback((optionId) => dispatch({ type: 'CHOOSE_OPTION', optionId }), []);
  const nextDecision = useCallback(() => dispatch({ type: 'NEXT_DECISION' }), []);
  const restart = useCallback(() => dispatch({ type: 'RESTART' }), []);
  const openInstitutions = useCallback(() => dispatch({ type: 'OPEN_INSTITUTIONS' }), []);
  const closeInstitutions = useCallback(() => dispatch({ type: 'CLOSE_INSTITUTIONS' }), []);

  const decisions = state.mode === 'cafe' ? CAFE_DECISIONS : TECH_DECISIONS;
  const currentDecision = decisions[state.step] || null;

  return {
    state,
    decisions,
    currentDecision,
    totalSteps: decisions.length,
    actions: {
      selectMode, setName, confirmName, startDecisions, chooseOption, nextDecision, restart,
      openInstitutions, closeInstitutions,
    },
  };
}
