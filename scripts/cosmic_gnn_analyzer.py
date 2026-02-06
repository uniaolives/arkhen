# scripts/cosmic_gnn_analyzer.py
#!/usr/bin/env python3
"""
Analisador GNN para Topologia Cósmica do Repositório
"""

import json
import networkx as nx
import torch
import torch.nn as nn
import torch.nn.functional as F
try:
    from torch_geometric.data import Data
    from torch_geometric.nn import GCNConv
except ImportError:
    # Mocking for environments without torch_geometric
    class Data: pass
    class GCNConv:
        def __init__(self, *args, **kwargs): pass
        def __call__(self, x, edge_index): return x

import numpy as np
from pathlib import Path
from typing import Dict, List, Tuple
import hashlib

class RosehipAttention(nn.Module):
    """
    Camada de Atenção Rosehip:
    Em vez de apenas somar vizinhos, ela inibe ativamente conexões
    que não contribuem para a 'Clareza Dimensional'.
    """
    def __init__(self, dim):
        super().__init__()
        self.inhibition_gate = nn.Linear(dim, 1)

    def forward(self, x, edge_index):
        # Calcula o 'Peso de Realidade' de cada conexão
        gate = torch.sigmoid(self.inhibition_gate(x))
        # Se o gate for baixo, a Rosehip 'silencia' o ruído do grafo
        return x * gate

class CosmicGNN(nn.Module):
    """Rede Neural de Grafos para análise cósmica"""

    def __init__(self, node_features: int = 16, hidden_dim: int = 32):
        super().__init__()
        self.conv1 = GCNConv(node_features, hidden_dim)
        self.rosehip = RosehipAttention(hidden_dim)
        self.conv2 = GCNConv(hidden_dim, hidden_dim)
        self.conv3 = GCNConv(hidden_dim, hidden_dim)

        # Classificador de importância cósmica
        self.cosmic_classifier = nn.Sequential(
            nn.Linear(hidden_dim, 64),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 3)  # [estrutural, dimensional, harmônico]
        )

    def forward(self, x, edge_index, batch=None):
        # Propagação cósmica
        x = self.conv1(x, edge_index)
        x = F.relu(x)

        # Filtro Rosehip (Inibição de ruído)
        x = self.rosehip(x, edge_index)

        x = self.conv2(x, edge_index)
        x = F.relu(x)

        x = self.conv3(x, edge_index)

        # Classificação cósmica (Global Mean Pooling)
        if batch is not None:
            x_global = torch.zeros(batch.max().item() + 1, x.size(1))
            for i in range(batch.max().item() + 1):
                x_global[i] = x[batch == i].mean(dim=0)
        else:
            x_global = x.mean(dim=0, keepdim=True)

        # Classificação
        cosmic_score = self.cosmic_classifier(x_global)
        return F.softmax(cosmic_score, dim=1)

def extract_cosmic_features(file_path: str, content: str = None) -> List[float]:
    """Extrai features cósmicas de um arquivo"""
    path = Path(file_path)

    features = []

    # 1. Complexidade do caminho
    depth = len(path.parts)
    features.append(depth / 10.0)

    # 2. Tipo de arquivo
    if path.suffix in ['.c', '.cpp', '.cc']:
        features.extend([1.0, 0.0, 0.0, 0.0])  # Core
    elif path.suffix in ['.py']:
        features.extend([0.0, 1.0, 0.0, 0.0])  # Script
    elif path.suffix in ['.yml', '.yaml', '.json']:
        features.extend([0.0, 0.0, 1.0, 0.0])  # Config
    elif path.suffix in ['.md', '.txt']:
        features.extend([0.0, 0.0, 0.0, 1.0])  # Docs
    else:
        features.extend([0.0, 0.0, 0.0, 0.0])

    # 3. Tamanho
    if content:
        size = len(content)
        features.append(min(size / 10000.0, 1.0))
    else:
        features.append(0.0)

    # 4. Entropia
    if content:
        if content:
            entropy = 0
            for i in range(256):
                p_x = content.count(chr(i)) / len(content)
                if p_x > 0:
                    entropy += - p_x * np.log2(p_x)
            features.append(entropy / 8.0)
        else:
            features.append(0.0)
    else:
        features.append(0.0)

    # 5. Dependências
    dep_score = 0.0
    if content:
        if '#include' in content: dep_score += 0.3
        if 'import' in content: dep_score += 0.2
        if 'from' in content: dep_score += 0.2
    features.append(dep_score)

    # 6. Centralidade
    if 'src' in str(path) or 'core' in str(path).lower():
        features.append(1.0)
    else:
        features.append(0.0)

    while len(features) < 16:
        features.append(0.0)

    return features[:16]

def build_cosmic_graph(repo_path: str) -> nx.Graph:
    """Constrói grafo cósmico do repositório"""
    repo_root = Path(repo_path)
    G = nx.Graph()

    files = list(repo_root.rglob('*.*'))

    for i, file_path in enumerate(files):
        if file_path.is_file() and not '.git' in str(file_path):
            try:
                content = file_path.read_text(encoding='utf-8', errors='ignore')
            except:
                content = ""

            node_id = str(file_path.relative_to(repo_root))
            features = extract_cosmic_features(node_id, content)

            G.add_node(node_id,
                      features=features,
                      type='file',
                      size=len(content))

    # Adiciona arestas
    for node1 in G.nodes():
        for node2 in G.nodes():
            if node1 != node2:
                path1 = Path(node1)
                path2 = Path(node2)
                if path1.parent == path2.parent:
                    G.add_edge(node1, node2, weight=0.3)

    return G

def analyze_cosmic_topology(graph: nx.Graph, previous_graph_data: Dict = None) -> Dict:
    """Analisa topologia cósmica do grafo"""

    metrics = {
        'cosmic_complexity': 0.0,
        'is_structural_change': False,
        'dimensional_shifts': [],
        'harmonic_balance': 0.0
    }

    try:
        centrality = nx.betweenness_centrality(graph, weight='weight')
        avg_centrality = sum(centrality.values()) / len(centrality) if centrality else 0
        metrics['cosmic_complexity'] = avg_centrality * 100
    except:
        metrics['cosmic_complexity'] = len(graph.nodes()) * 0.1

    if previous_graph_data:
        prev_nodes = set(previous_graph_data.get('nodes', []))
        curr_nodes = set(graph.nodes())

        added = curr_nodes - prev_nodes
        removed = prev_nodes - curr_nodes

        if added or removed:
            metrics['is_structural_change'] = True
            metrics['dimensional_shifts'] = list(added | removed)

    return metrics

def main():
    import argparse
    parser = argparse.ArgumentParser(description='Analisador Cósmico GNN')
    parser.add_argument('--repo-path', default='.', help='Caminho do repositório')
    parser.add_argument('--previous-graph', help='Grafo anterior para comparação')
    parser.add_argument('--output', required=True, help='Arquivo de saída JSON')

    args = parser.parse_args()

    graph = build_cosmic_graph(args.repo_path)

    previous_graph_data = None
    if args.previous_graph and Path(args.previous_graph).exists():
        with open(args.previous_graph, 'r') as f:
            previous_graph_data = json.load(f)

    metrics = analyze_cosmic_topology(graph, previous_graph_data)

    # Save graph for next time
    serializable_graph = {
        'nodes': list(graph.nodes()),
        'edges': list(graph.edges(data=True))
    }
    metrics['graph_snapshot'] = serializable_graph

    with open(args.output, 'w') as f:
        json.dump(metrics, f, indent=2)

    print(f"✅ Análise cósmica concluída")

if __name__ == '__main__':
    main()
