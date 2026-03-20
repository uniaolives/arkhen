
export interface NomadTool {
  id: string;
  name: string;
  poweredBy: string;
  description: string;
  status: 'ONLINE' | 'OFFLINE' | 'INSTALLING';
}

export interface NomadState {
  isActive: boolean;
  tools: NomadTool[];
  lastUpdate: string | null;
  storageUsedGb: number;
}

class NomadService {
  private initialized = false;

  public getTools(): NomadTool[] {
    return [
      { id: 'kiwix', name: 'Information Library', poweredBy: 'Kiwix', description: 'Offline Wikipedia, medical references, survival guides.', status: 'ONLINE' },
      { id: 'ollama', name: 'AI Assistant', poweredBy: 'Ollama + Qdrant', description: 'Local chat with document upload and RAG.', status: 'ONLINE' },
      { id: 'kolibri', name: 'Education Platform', poweredBy: 'Kolibri', description: 'Khan Academy courses and progress tracking.', status: 'ONLINE' },
      { id: 'protomaps', name: 'Offline Maps', poweredBy: 'ProtoMaps', description: 'Downloadable regional maps with search.', status: 'ONLINE' },
      { id: 'cyberchef', name: 'Data Tools', poweredBy: 'CyberChef', description: 'Encryption, encoding, and data analysis.', status: 'ONLINE' },
      { id: 'flatnotes', name: 'Notes', poweredBy: 'FlatNotes', description: 'Local markdown note-taking.', status: 'ONLINE' }
    ];
  }

  public initialize() {
    this.initialized = true;
    console.log('[NomadService] Initialized Offline Survival Knowledge Center');
  }

  public isInitialized(): boolean {
    return this.initialized;
  }
}

export const nomadService = new NomadService();
