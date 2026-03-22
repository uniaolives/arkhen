
from typing import Dict, List, Optional
import asyncio
from ...interface.base import Skill, Context
from arkhe_lang.q.openqasm_integration import execute_qasm

class OpenQASMExecutor(Skill):
    """
    Skill para executar e analisar circuitos OpenQASM 3.0.
    """
    skill_id = "openqasm_executor_v1"
    capabilities = ["qasm_execution", "circuit_analysis", "quantum_simulation"]

    async def execute(self, ctx: Context) -> dict:
        """
        Executa o código OpenQASM fornecido.
        """
        qasm_code = ctx.input("qasm_code")

        if not qasm_code:
            return {"error": "Nenhum código OpenQASM fornecido."}

        # Executa a simulação
        result = execute_qasm(qasm_code)

        if result["status"] == "error":
            return {
                "success": False,
                "error": result["message"]
            }

        return {
            "success": True,
            "counts": result["counts"],
            "statevector_summary": result["statevector"][:8], # Limita para não sobrecarregar
            "depth": result["circuit_depth"],
            "qubits": result["num_qubits"]
        }
