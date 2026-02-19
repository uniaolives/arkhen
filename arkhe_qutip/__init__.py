import qutip as qt

# Compatibility layer for QuTiP 5.x+
try:
    import qutip_qip.operations as qip_ops
    if not hasattr(qt, 'hadamard_transform'):
        qt.hadamard_transform = qip_ops.hadamard_transform
    if not hasattr(qt, 'cnot'):
        qt.cnot = qip_ops.cnot
except ImportError:
    pass

__version__ = "1.1.0"

from .core import ArkheQobj, ArkheSolver
from .hypergraph import QuantumHypergraph
from .visualization import plot_hypergraph, plot_coherence_trajectory
from .chain_bridge import ArkheChainBridge
from .mining import ArkheMiner, FPGAArkheMiner, ArkheNetwork
from .hardware import FPGAQubitEmulator, NoiseEngine
from .network import ArkheNetworkNode, PoCNode, DistributedPoCConsensus
