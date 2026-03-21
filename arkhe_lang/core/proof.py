import hashlib
import time
from dataclasses import dataclass, field
from typing import Dict, Any, List, Optional

@dataclass
class Pi2Proof:
    neural_state_hash: str
    chain_anchor: str
    overlap: float
    timestamp: int = field(default_factory=lambda: int(time.time()))
    depth: int = 1
    metadata: Dict[str, Any] = field(default_factory=dict)

    def calculate_hash(self) -> str:
        """Calculates a unique identifier for the proof."""
        content = f"{self.neural_state_hash}{self.chain_anchor}{self.overlap}{self.timestamp}{self.depth}"
        return hashlib.sha256(content.encode()).hexdigest()

    def is_valid(self, threshold: float = 0.95) -> bool:
        """Checks if the proof satisfies the ontological coherence requirement."""
        return self.overlap >= threshold

    def anchor_to_chain(self, block_hash: str):
        """Anchors the proof to a specific blockchain state."""
        self.chain_anchor = block_hash

    def __repr__(self):
        return f"π²[overlap={self.overlap:.4f}, depth={self.depth}, anchor={self.chain_anchor[:8]}]"

def generate_pi2(state_hash: str, anchor: str, overlap: float, depth: int = 1) -> Pi2Proof:
    """Convenience function to generate a new π² proof."""
    return Pi2Proof(
        neural_state_hash=state_hash,
        chain_anchor=anchor,
        overlap=overlap,
        depth=depth
    )
