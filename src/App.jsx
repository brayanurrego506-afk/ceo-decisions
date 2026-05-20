import { useEffect, Suspense, lazy } from 'react';
import { useGameState } from './hooks/useGameState';
import { useAudio } from './hooks/useAudio';
import SplashScreen from './components/screens/SplashScreen';
import NameScreen from './components/screens/NameScreen';
import IntroScreen from './components/screens/IntroScreen';
import DecisionScreen from './components/screens/DecisionScreen';
import ConsequenceScreen from './components/screens/ConsequenceScreen';
import EndingScreen from './components/screens/EndingScreen';
import InstitutionsScreen from './components/screens/InstitutionsScreen';
import Ticker from './components/ui/Ticker';
import MetricsBar from './components/ui/MetricsBar';
import './App.css';

const CafeParticles = lazy(() => import('./three/CafeParticles'));
const TechParticles = lazy(() => import('./three/TechParticles'));

export default function App() {
  const { state, currentDecision, totalSteps, actions } = useGameState();
  const { startMusic, stopMusic, playTone } = useAudio();

  // Sincronizar data-mode con CSS variables
  useEffect(() => {
    if (state.mode) {
      document.documentElement.setAttribute('data-mode', state.mode);
    } else {
      document.documentElement.removeAttribute('data-mode');
    }
  }, [state.mode]);

  // Audio según pantalla
  useEffect(() => {
    if (state.screen === 'splash' || !state.mode) {
      stopMusic();
      return;
    }
    startMusic(state.mode);
  }, [state.screen, state.mode, startMusic, stopMusic]);

  const handleSelectMode = (mode) => {
    playTone(mode === 'cafe' ? 392 : 523, 0.18, 'sine', 0.08);
    actions.selectMode(mode);
  };

  const handleChooseOption = (optionId) => {
    playTone(440, 0.1, 'triangle', 0.06);
    actions.chooseOption(optionId);
  };

  const handleNext = () => {
    playTone(523, 0.1, 'sine', 0.05);
    actions.nextDecision();
  };

  const showMetrics = state.screen === 'decision' || state.screen === 'consequence';
  const showTicker = state.screen !== 'splash' && state.screen !== 'institutions';
  const showParticles = state.screen !== 'splash' && state.mode;

  return (
    <div className="app-shell">
      {/* Three.js — solo cuando hay modo */}
      {showParticles && (
        <Suspense fallback={null}>
          {state.mode === 'cafe' ? <CafeParticles /> : <TechParticles />}
        </Suspense>
      )}

      {/* Grain overlay siempre presente excepto splash */}
      {state.screen !== 'splash' && <div className="grain-overlay" />}

      {showTicker && <Ticker mode={state.mode} />}

      {showMetrics && currentDecision && (
        <MetricsBar
          metrics={state.metrics}
          mode={state.mode}
          ceoName={state.ceoName}
          step={state.step}
          totalSteps={totalSteps}
        />
      )}

      <main className="app-main">
        {state.screen === 'institutions' && (
          <InstitutionsScreen
            mode={state.mode}
            onBack={() => actions.closeInstitutions()}
          />
        )}

        {state.screen === 'splash' && (
          <SplashScreen
            onSelectMode={handleSelectMode}
            onOpenInstitutions={() => actions.openInstitutions()}
          />
        )}

        {state.screen === 'name' && (
          <NameScreen
            mode={state.mode}
            onConfirm={(name) => {
              actions.setName(name);
              playTone(659, 0.12, 'sine', 0.06);
              setTimeout(() => actions.confirmName(), 100);
            }}
          />
        )}

        {state.screen === 'intro' && (
          <IntroScreen
            mode={state.mode}
            ceoName={state.ceoName}
            metrics={state.metrics}
            onStart={() => {
              playTone(523, 0.14, 'sine', 0.06);
              actions.startDecisions();
            }}
          />
        )}

        {state.screen === 'decision' && currentDecision && (
          <DecisionScreen
            decision={currentDecision}
            step={state.step}
            totalSteps={totalSteps}
            onChoose={handleChooseOption}
          />
        )}

        {state.screen === 'consequence' && state.pendingConsequence && (
          <ConsequenceScreen
            decision={currentDecision}
            choice={state.pendingChoice}
            consequence={state.pendingConsequence}
            metrics={state.metrics}
            mode={state.mode}
            onNext={handleNext}
          />
        )}

        {state.screen === 'ending' && state.ending && (
          <EndingScreen
            ending={state.ending}
            mode={state.mode}
            ceoName={state.ceoName}
            metrics={state.metrics}
            scoreData={state.scoreData}
            onRestart={() => {
              stopMusic();
              actions.restart();
            }}
            onLearnMore={() => actions.openInstitutions()}
          />
        )}
      </main>
    </div>
  );
}
