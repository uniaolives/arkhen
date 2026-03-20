import { INodeType, IDataObject, IExecutionContext } from '../types';
import { PageAgent } from 'page-agent';

export class PageAgentNode implements INodeType {
  name = 'PageAgent';
  displayName = 'Arkhe Page Agent';
  description = 'Executa comandos em linguagem natural na interface web atual.';
  inputs = [{ name: 'main', displayName: 'Input', type: 'main' as const }];
  outputs = [
    { name: 'main', displayName: 'Output', type: 'main' as const },
    { name: 'error', displayName: 'Error', type: 'error' as const }
  ];
  properties = [
    { name: 'instruction', displayName: 'Instruction', type: 'string' as const, default: '', required: true },
    { name: 'model', displayName: 'Model', type: 'options' as const, default: 'qwen3.5-plus' },
    { name: 'apiKey', displayName: 'API Key', type: 'string' as const, default: '' },
    { name: 'baseURL', displayName: 'Base URL', type: 'string' as const, default: 'https://dashscope.aliyuncs.com/compatible-mode/v1' }
  ];

  async execute(ctx: IExecutionContext): Promise<IDataObject> {
    const instruction = ctx.node.properties.find(p => p.name === 'instruction')?.default || '';
    const model = ctx.node.properties.find(p => p.name === 'model')?.default || 'qwen3.5-plus';
    const apiKey = ctx.node.properties.find(p => p.name === 'apiKey')?.default || '';
    const baseURL = ctx.node.properties.find(p => p.name === 'baseURL')?.default || '';

    const agent = new PageAgent({
      model,
      apiKey,
      baseURL,
    });

    try {
      ctx.log(`Iniciando PageAgent com instrução: ${instruction}`);
      const result = await agent.execute(instruction);

      ctx.emitOutput({
        success: true,
        instruction,
        result
      });

      return { success: true, result };
    } catch (error: any) {
      ctx.log(`Erro no PageAgent: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}
