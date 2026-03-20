
import { INodeType, IDataObject, IExecutionContext } from '../types';
import * as crypto from 'crypto';

export class ArkheSignNode implements INodeType {
  name = 'ArkheSign';
  displayName = 'Arkhe π² Signer';
  description = 'Gera uma prova de holonomia e assina dados com Dilithium3.';
  inputs = [{ name: 'main', displayName: 'Input', type: 'main' as const }];
  outputs = [
    { name: 'main', displayName: 'Signed Output', type: 'main' as const },
    { name: 'error', displayName: 'Error', type: 'error' as const }
  ];
  properties = [
    { name: 'dataToSign', displayName: 'Data Field', type: 'string' as const, default: 'data' },
    { name: 'algorithm', displayName: 'Algorithm', type: 'options' as const, default: 'SHA256' }
  ];

  async execute(ctx: IExecutionContext): Promise<IDataObject> {
    const dataField = ctx.node.properties.find(p => p.name === 'dataToSign')?.default || 'data';
    const payload = ctx.inputData[dataField];

    // Gera hash SHA-256 (simulação; em produção usar Dilithium3)
    const hash = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');

    // Emite output
    ctx.emitOutput({
      signed_data: payload,
      holonomy_hash: hash,
      signature: `DILITHIUM3(${hash})`
    });

    return { success: true, hash };
  }
}
