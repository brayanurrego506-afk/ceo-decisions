import { useRef, useCallback, useEffect } from 'react';

// Web Audio API — sin libs externas, sin CDN
// Café: acorde C mayor sostenido (warm pad)
// Tech: drone electrónico bajo + pulso sutil
//
// Importante: el browser bloquea audio sin user gesture.
// startMusic() debe llamarse en el primer click del usuario (SplashScreen).

const CAFE_NOTES = [261.63, 329.63, 392.0]; // C4 + E4 + G4 (C major)
const TECH_NOTES = [55, 110, 165]; // A1 drone + harmonic

export function useAudio() {
  const ctxRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const masterGainRef = useRef(null);
  const currentModeRef = useRef(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    return ctxRef.current;
  }, []);

  const stopMusic = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;
    oscillatorsRef.current.forEach(({ osc, gain }) => {
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
        osc.stop(now + 0.55);
      } catch (e) {
        // ignore — oscillator may already be stopped
      }
    });
    oscillatorsRef.current = [];
    currentModeRef.current = null;
  }, []);

  const startMusic = useCallback(
    (mode) => {
      const ctx = getCtx();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      if (currentModeRef.current === mode) return;
      stopMusic();
      currentModeRef.current = mode;

      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      masterGainRef.current = master;

      const filter = ctx.createBiquadFilter();
      filter.type = mode === 'cafe' ? 'lowpass' : 'bandpass';
      filter.frequency.value = mode === 'cafe' ? 900 : 600;
      filter.Q.value = mode === 'cafe' ? 0.7 : 1.4;
      filter.connect(master);

      const notes = mode === 'cafe' ? CAFE_NOTES : TECH_NOTES;
      const oscType = mode === 'cafe' ? 'sine' : 'sawtooth';

      const now = ctx.currentTime;
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = oscType;
        osc.frequency.value = freq;
        gain.gain.value = 0;
        osc.connect(gain).connect(filter);
        osc.start(now);
        gain.gain.linearRampToValueAtTime(
          mode === 'cafe' ? 0.07 / notes.length : 0.05 / notes.length,
          now + 3,
        );
        // Subtle LFO modulation
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.1 + i * 0.07;
        lfoGain.gain.value = 1.2;
        lfo.connect(lfoGain).connect(osc.frequency);
        lfo.start(now);

        oscillatorsRef.current.push({ osc, gain, lfo });
      });

      // Fade master in
      master.gain.linearRampToValueAtTime(1, now + 2.5);
    },
    [getCtx, stopMusic],
  );

  const playTone = useCallback(
    (freq = 600, duration = 0.12, type = 'sine', vol = 0.06) => {
      const ctx = getCtx();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = 0;
      const now = ctx.currentTime;
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      gain.gain.linearRampToValueAtTime(vol, now + 0.01);
      gain.gain.linearRampToValueAtTime(0.0001, now + duration);
      osc.stop(now + duration + 0.02);
    },
    [getCtx],
  );

  useEffect(() => () => stopMusic(), [stopMusic]);

  return { startMusic, stopMusic, playTone };
}
