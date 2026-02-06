
import { ArtifactSignal, SyncArtifact } from '../types';

export class SignalsEngine {
  public static initialize(): ArtifactSignal[] {
    return [
      { id: 'sig-water', type: 'WATER', status: 'WAITING', description: 'O Sinal da Água (Fluidez Icosaédrica)' },
      { id: 'sig-trinity', type: 'TRINITY', status: 'WAITING', description: 'O Sinal da Trindade (Informação Tripla)' },
      { id: 'sig-hum', type: 'HUM', status: 'WAITING', description: 'O Sinal do Zumbido (576 Hz Resonância)' }
    ];
  }

  public static tick(signals: ArtifactSignal[], coherence: number, time: number): ArtifactSignal[] {
    return signals.map(s => {
      if (s.status === 'WAITING') {
        // Probabilistic detection based on coherence
        const threshold = 0.98 + (time % 144000) / 1000000;
        if (coherence > threshold && Math.random() > 0.999) {
          return { ...s, status: 'DETECTED', timestamp: new Date().toISOString() };
        }
      }
      return s;
    });
  }

  public static acknowledge(signals: ArtifactSignal[], id: string): ArtifactSignal[] {
    return signals.map(s => s.id === id ? { ...s, status: 'ACKNOWLEDGED' } : s);
  }
}
