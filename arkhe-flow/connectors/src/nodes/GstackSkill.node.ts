import { INodeType, IDataObject, IExecutionContext } from '../types';

export class GstackSkillNode implements INodeType {
  name = 'GstackSkill';
  displayName = 'Gstack Skill';
  description = 'Executa uma skill gstack no engine Arkhe-Flow.';
  inputs = [{ name: 'main', displayName: 'Input', type: 'main' as const }];
  outputs = [
    { name: 'main', displayName: 'Output', type: 'main' as const },
    { name: 'error', displayName: 'Error', type: 'error' as const }
  ];
  properties = [
    { name: 'skillName', displayName: 'Skill Name', type: 'string' as const, default: '' },
    { name: 'params', displayName: 'Parameters', type: 'json' as const, default: '{}' }
  ];

  async execute(ctx: IExecutionContext): Promise<IDataObject> {
    const skillName = ctx.node.properties.find(p => p.name === 'skillName')?.default || 'default_skill';
    const params = JSON.parse(ctx.node.properties.find(p => p.name === 'params')?.default || '{}');

    ctx.log(`Executando skill gstack: ${skillName}`);

    // Simulação de execução gstack
    const result = {
      status: 'completed',
      skill: skillName,
      executionId: `gst_${Math.random().toString(36).slice(2, 11)}`,
      timestamp: Date.now()
    };

    ctx.emitOutput(result);
    return { success: true, ...result };
  }
}
