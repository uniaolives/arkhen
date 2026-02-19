import hashlib
import time
from datetime import datetime
from typing import Dict, Any

class ArkheChainBridge:
    def __init__(self, mock_mode: bool = True):
        self.mock_mode = mock_mode

    def record_simulation(self, initial_state, final_state, metadata: Dict[str, Any]):
        """
        Ancora a simulação em um ledger imutável (Mock).
        """
        # Generate a mock hash based on states and metadata
        content = f"{initial_state.node_id}-{initial_state.coherence:.6f}-{final_state.coherence:.6f}-{time.time()}"
        tx_hash = hashlib.sha256(content.encode()).hexdigest()

        class SimulationRecord:
            def __init__(self, tx_hash):
                self.chain_tx_hash = f"0x{tx_hash}"
                self.chain_block_height = 810000 + (int(time.time()) % 1000) # Symbolic Bitcoin height range
                self.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        return SimulationRecord(tx_hash)
