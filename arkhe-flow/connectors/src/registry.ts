
// registry.ts
// Registro central de conectores.

import { INodeType } from './types';
// Note: We'll assume these exist as provided in the pattern
// import { WebhookNode, HttpNode, ArkheSignNode } from './nodes';

const NODE_REGISTRY = new Map<string, INodeType>();

export function registerNode(node: INodeType) {
  NODE_REGISTRY.set(node.name, node);
}

export function getNode(name: string): INodeType | undefined {
  return NODE_REGISTRY.get(name);
}

export function initDefaultNodes() {
  // registerNode(new WebhookNode());
  // registerNode(new HttpNode());
  // registerNode(new ArkheSignNode());
}
