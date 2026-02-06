
import React, { useEffect, useRef } from 'react';
import { AudioAlertState } from '../types';

const AudioAlertSystem: React.FC<{ state: AudioAlertState }> = ({ state }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initializing Audio Context on mount
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainRef.current = audioCtxRef.current.createGain();
      gainRef.current.connect(audioCtxRef.current.destination);
      gainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
    }

    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!audioCtxRef.current || !gainRef.current) return;

    if (state.isAlerting && state.currentFrequency > 0) {
      // Start or update oscillator
      if (!oscillatorRef.current) {
        oscillatorRef.current = audioCtxRef.current.createOscillator();
        oscillatorRef.current.type = 'sine';
        oscillatorRef.current.connect(gainRef.current);
        oscillatorRef.current.start();
      }
      
      oscillatorRef.current.frequency.setTargetAtTime(state.currentFrequency, audioCtxRef.current.currentTime, 0.1);
      gainRef.current.gain.setTargetAtTime(0.05, audioCtxRef.current.currentTime, 0.1);
    } else {
      // Silence
      if (gainRef.current) {
        gainRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.1);
      }
    }
  }, [state.isAlerting, state.currentFrequency]);

  return null; // Silent logic-only component
};

export default AudioAlertSystem;
