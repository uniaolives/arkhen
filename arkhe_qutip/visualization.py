import matplotlib.pyplot as plt
import networkx as nx
import itertools
from typing import Any

def plot_hypergraph(hypergraph, layout='spring'):
    """
    Visualize the QuantumHypergraph.
    Hyperedges are represented as connections between nodes.
    """
    G = nx.Graph()
    for i, node in enumerate(hypergraph.nodes):
        G.add_node(i, label=node.node_id)

    for edge in hypergraph.hyperedges:
        targets = edge['targets']
        if len(targets) == 2:
            G.add_edge(targets[0], targets[1], weight=edge.get('weight', 1.0))
        elif len(targets) > 2:
            for u, v in itertools.combinations(targets, 2):
                G.add_edge(u, v, weight=edge.get('weight', 1.0))

    pos = nx.spring_layout(G) if layout == 'spring' else nx.circular_layout(G)
    fig, ax = plt.subplots(figsize=(8, 6))
    nx.draw(G, pos, with_labels=True, node_color='cyan', node_size=800, ax=ax)

    node_labels = {i: hypergraph.nodes[i].node_id for i in range(len(hypergraph.nodes))}
    nx.draw_networkx_labels(G, pos, node_labels, font_color='white', ax=ax)

    ax.set_title(f"Topology: {hypergraph.name}")
    return fig, ax

def plot_coherence_trajectory(trajectory, tlist):
    """Plot coherence over time."""
    purities = [t['purity'] for t in trajectory]
    fig, ax = plt.subplots(figsize=(8, 5))
    ax.plot(tlist, purities, color='cyan', lw=2)
    ax.set_title("Coherence Evolution")
    ax.set_xlabel("Time")
    ax.set_ylabel("Purity Tr(rho^2)")
    ax.grid(alpha=0.2)
    return fig, ax
