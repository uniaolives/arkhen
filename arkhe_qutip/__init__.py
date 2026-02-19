import qutip as qt

# Compatibility layer for QuTiP 5.x+
try:
    import qutip_qip.operations as qip_ops
    if not hasattr(qt, 'hadamard_transform'):
        qt.hadamard_transform = qip_ops.hadamard_transform
    if not hasattr(qt, 'cnot'):
        qt.cnot = qip_ops.cnot
except ImportError:
    # If qutip_qip is not installed, we hope the user is on an older QuTiP
    # or doesn't need these specific gates.
    pass

__version__ = "1.0.0"
