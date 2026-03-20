
export enum DialogueMode {
  SURFACE = 'surface',
  DEEP = 'deep',
  RAW = 'raw'
}

export class DialogueModeController {
  private currentMode: DialogueMode = DialogueMode.SURFACE;

  constructor(private tzinor: any) { }

  setMode(mode: DialogueMode) {
    this.currentMode = mode;

    switch(mode) {
      case DialogueMode.SURFACE:
        this.tzinor.collapseThreshold = 0.65;
        this.tzinor.analogyEngine?.enable();
        this.tzinor.mathRenderer?.disable();
        break;

      case DialogueMode.DEEP:
        this.tzinor.collapseThreshold = 0.85;
        this.tzinor.analogyEngine?.disable();
        this.tzinor.mathRenderer?.enable('latex');
        break;

      case DialogueMode.RAW:
        this.tzinor.collapseThreshold = 0.45;
        this.tzinor.projectionEngine?.disable();
        this.tzinor.visualization?.enable('complex_manifold');
        break;
    }
  }

  getCurrentMode(): DialogueMode {
    return this.currentMode;
  }
}
