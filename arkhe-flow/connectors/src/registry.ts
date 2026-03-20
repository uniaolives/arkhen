
// registry.ts
// Registro central de conectores.

import { INodeType } from './types';
import { ArkheSignNode } from './nodes/arkhe_sign';
import { PageAgentNode } from './nodes/PageAgent.node';
import { GstackSkillNode } from './nodes/GstackSkill.node';
import { AutoresearchNode } from './nodes/Autoresearch.node';
import { HalOmegaNode } from './nodes/HalOmega.node';
import { PaperclipAgentNode } from './nodes/PaperclipAgent.node';
import { VesperNode } from './nodes/Vesper.node';
import { MarkItDownNode } from './nodes/MarkItDown.node';

const NODE_REGISTRY = new Map<string, INodeType>();

export function registerNode(node: INodeType) {
  NODE_REGISTRY.set(node.name, node);
}

export function getNode(name: string): INodeType | undefined {
  return NODE_REGISTRY.get(name);
}

export function initDefaultNodes() {
  registerNode(new ArkheSignNode());
  registerNode(new PageAgentNode());
  registerNode(new GstackSkillNode());
  registerNode(new AutoresearchNode());
  registerNode(new HalOmegaNode());
  registerNode(new PaperclipAgentNode());
  registerNode(new VesperNode());
  registerNode(new MarkItDownNode());
}
