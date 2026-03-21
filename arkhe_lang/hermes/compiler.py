import json
import typing
from typing import Dict, List, Any
from arkhe_lang.k.engine import KEngine, Term, DecoherenceException
from arkhe_lang.q.engine import QEngine
from arkhe_lang.hermes.bridge import HermesBridge
from arkhe_lang.core.proof import Pi2Proof, generate_pi2

class HardwareBackend:
    def __init__(self, target_system: str = "maxwell_maxone"):
        self.target = target_system
        self.command_buffer: List[Dict[str, Any]] = []

    def compile_instruction(self, instr: Dict[str, Any]) -> Dict[str, Any]:
        if instr['type'] == 'OPTO_STIM':
            return {
                "action": "OPTO_STIM",
                "params": instr['params']
            }
        return {}

    def generate_control_script(self) -> str:
        script = {
            "target_hardware": self.target,
            "sequence": self.command_buffer
        }
        return json.dumps(script, indent=2)

class TzinorCompiler:
    def __init__(self, k_engine: KEngine, q_engine: QEngine):
        self.k_engine = k_engine
        self.q_engine = q_engine
        self.hermes = HermesBridge(q_engine)
        self.hardware_backend = HardwareBackend()
        self.proof_history: List[Pi2Proof] = []

    def compile_step(self, k_term: Term, target_q_label: str) -> typing.Tuple[Term, Pi2Proof]:
        q_state = self.hermes.lift(k_term)
        target_q = self.q_engine.create_state(label=target_q_label, alpha=1, beta=0)

        try:
            path = self.q_engine.bridge(q_state, target_q, steps=10)
            final_q = path[-1]
            result_k = self.hermes.anchor(final_q, k_term.sort)

            proof = generate_pi2(
                state_hash=final_q.node_id,
                anchor="0x" + final_q.node_id[:8],
                overlap=self.q_engine.get_overlap(final_q, target_q),
                depth=len(self.proof_history) + 1
            )
            self.proof_history.append(proof)

            return result_k, proof
        except DecoherenceException as e:
            raise e

    def emit_hardware_cmd(self, action_type: str, params: Dict[str, Any]):
        cmd = self.hardware_backend.compile_instruction({
            "type": action_type,
            "params": params
        })
        if cmd:
            self.hardware_backend.command_buffer.append(cmd)

    def verify_trace(self) -> bool:
        return all(p.is_valid() for p in self.proof_history)
