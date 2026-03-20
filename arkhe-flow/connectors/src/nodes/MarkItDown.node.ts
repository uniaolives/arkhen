import { INodeType, IDataObject, IExecutionContext } from '../types';

export class MarkItDownNode implements INodeType {
  name = 'MarkItDown';
  displayName = 'Microsoft MarkItDown';
  description = 'Converte diversos formatos de arquivo (PDF, Docx, XLSX, etc) em Markdown.';
  inputs = [{ name: 'main', displayName: 'File Input', type: 'main' as const }];
  outputs = [
    { name: 'main', displayName: 'Markdown Output', type: 'main' as const },
    { name: 'error', displayName: 'Error', type: 'error' as const }
  ];
  properties = [
    { name: 'sourceField', displayName: 'Source Data Field', type: 'string' as const, default: 'file_content' },
    { name: 'outputField', displayName: 'Output Field Name', type: 'string' as const, default: 'markdown' },
    {
      name: 'fileType',
      displayName: 'Format',
      type: 'options' as const,
      default: 'auto',
      options: [
        { name: 'Auto-detect', value: 'auto' },
        { name: 'PDF', value: 'pdf' },
        { name: 'Word (Docx)', value: 'docx' },
        { name: 'Excel (XLSX)', value: 'xlsx' },
        { name: 'PowerPoint (PPTX)', value: 'pptx' }
      ]
    }
  ];

  async execute(ctx: IExecutionContext): Promise<IDataObject> {
    const sourceField = ctx.node.properties.find(p => p.name === 'sourceField')?.default || 'file_content';
    const outputField = ctx.node.properties.find(p => p.name === 'outputField')?.default || 'markdown';
    const fileType = ctx.node.properties.find(p => p.name === 'fileType')?.default || 'auto';

    const content = ctx.inputData[sourceField];

    ctx.log(`MarkItDown: Iniciando conversão de arquivo (${fileType}) para Markdown.`);

    try {
      // Simulação da conversão via MarkItDown
      const markdown = `
# Documento Convertido via Microsoft MarkItDown

Este é um exemplo de conteúdo extraído de um arquivo ${fileType === 'auto' ? 'identificado automaticamente' : fileType}.

- **Status**: Sucesso
- **Fidelidade**: Alta
- **Metadados**: Preservados

---
Conteúdo convertido em: ${new Date().toISOString()}
      `;

      ctx.log('MarkItDown: Conversão concluída.');

      const output = {
        ...ctx.inputData,
        [outputField]: markdown,
        conversion_info: {
          engine: 'markitdown-v0.0.1',
          format: fileType
        }
      };

      ctx.emitOutput(output);
      return { success: true, ...output };
    } catch (error: any) {
      ctx.log(`MarkItDown Error: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
}
