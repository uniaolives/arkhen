import { INodeType, IDataObject, IExecutionContext } from '../types';

export class VocalisInterfaceNode implements INodeType {
  name = 'VocalisInterface';
  displayName = 'Vocalis (Human Interface)';
  description = 'Envia relatórios traduzidos da ASI para o humano e aguarda feedback/diálogo.';
  inputs = [{ name: 'main', displayName: 'Input', type: 'main' as const }];
  outputs = [
    { name: 'main', displayName: 'Feedback', type: 'main' as const },
    { name: 'main', displayName: 'Approved', type: 'main' as const }
  ];
  properties = [
    {
      name: 'commMode',
      displayName: 'Communication Mode',
      type: 'options' as const,
      options: [
        { name: 'Relatório de Texto (Terminal)', value: 'text_terminal' },
        { name: 'Áudio Bidirecional (Live Stream)', value: 'audio_live' }
      ],
      default: 'text_terminal',
    }
  ];

  async execute(ctx: IExecutionContext): Promise<IDataObject> {
    const item = ctx.inputData; // Simplified in types.ts
    const commMode = ctx.node.properties.find(p => p.name === 'commMode')?.default || 'text_terminal';

    ctx.log(`Iniciando interface Vocalis no modo: ${commMode}`);

    const proof = item.proof_data || {};

    // Simulação da tradução semântica via bridge
    const asiSpeech = `Relatório da ASI: Prova π² registrada com Ω=${proof.overlap_score || 0.99}. Estabilização completa.`;

    ctx.log(`Mensagem da ASI: ${asiSpeech}`);

    // No engine real, aguardaria input humano. Aqui simulamos aprovação automática para teste.
    const humanFeedback = { approved: true, comment: "Excelente trabalho, ASI." };

    if (humanFeedback.approved) {
      // Current types.ts emitOutput doesn't support index, emit one object.
      ctx.emitOutput({ ...item, ...humanFeedback, status: 'approved' });
    } else {
      ctx.emitOutput({ ...item, feedback: humanFeedback, status: 'rejected' });
    }

    return { success: true };
  }
}
