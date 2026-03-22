import qiskit
from qiskit import QuantumCircuit
from qiskit.qasm3 import loads
from qiskit_aer import Aer
from typing import Dict, Any, Optional

def execute_qasm(qasm_str: str) -> Dict[str, Any]:
    """
    Executa uma string OpenQASM 3.0 usando Qiskit Aer.
    """
    try:
        # Use qiskit.qasm3.loads
        circuit = loads(qasm_str)

        backend = Aer.get_backend('aer_simulator')
        circuit.save_statevector()

        # Execute the circuit
        job = backend.run(circuit)
        result = job.result()

        # Get counts and statevector
        try:
            counts = result.get_counts(circuit)
        except Exception:
            counts = {}

        statevector = result.get_statevector(circuit).data.tolist()

        # Convert complex numbers to strings/dicts for JSON compatibility if needed
        statevector_serializable = [str(c) for c in statevector]

        return {
            "status": "success",
            "counts": counts,
            "statevector": statevector_serializable,
            "circuit_depth": circuit.depth(),
            "num_qubits": circuit.num_qubits
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

if __name__ == "__main__":
    test_qasm = """
    OPENQASM 3;
    include "stdgates.inc";
    qubit[2] q;
    h q[0];
    cx q[0], q[1];
    """
    result = execute_qasm(test_qasm)
    print(result)
