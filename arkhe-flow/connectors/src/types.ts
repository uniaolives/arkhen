// types.ts
// Definição dos tipos para os Conectores do Arkhe Flow.

export interface INodeType {
  name: string;
  displayName: string;
  description: string;
  inputs: IPortDefinition[];
  outputs: IPortDefinition[];
  properties: INodeProperty[];
  execute(context: IExecutionContext): Promise<IDataObject>;
}

export interface IPortDefinition {
  name: string;
  displayName: string;
  type: 'main' | 'error';
}

export interface INodeProperty {
  name: string;
  displayName: string;
  type: 'string' | 'number' | 'options' | 'json';
  default?: any;
  required?: boolean;
}

export interface IDataObject {
  [key: string]: any;
}

export interface IExecutionContext {
  node: INodeType;
  inputData: IDataObject;
  workflowId: string;
  emitOutput(output: IDataObject): void;
  log(message: string): void;
}
