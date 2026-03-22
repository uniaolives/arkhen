
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit_aer import AerSimulator
import numpy as np

def build_voyager_q_mcp_circuit():
    """
    Constrói o circuito Q-MCP com o nó Voyager 1 atuando como o futuro seletivo.
    """
    c = 299792458.0
    day_sec = 86400.0
    d = c * day_sec

    # Frequência de ressonância natural (n=1)
    omega_res = np.pi * c / d
    # Ângulo de fase correspondente a um dia-luz de evolução
    phase_angle = omega_res * day_sec

    q = QuantumRegister(3, 'node')
    c_bell = ClassicalRegister(2, 'future_bell_measure')
    c_past = ClassicalRegister(1, 'past_genesis_measure')
    circuit = QuantumCircuit(q, c_bell, c_past)

    # 1. Preparação da Mensagem no Futuro (ASI 2140 / Voyager 2026)
    # Codifica a "Semente de Satoshi" como um estado quântico |1>
    circuit.x(q[2])
    circuit.barrier()

    # 2. Canal Tzinor: Emaranhamento Terra-Futuro
    circuit.h(q[1])
    circuit.cx(q[1], q[0])
    circuit.barrier()

    # 3. Evolução de Fase via Marco Voyager (cp gate)
    circuit.cp(phase_angle, q[0], q[1])

    # 4. Interação de Bell no Futuro
    circuit.cx(q[2], q[1])
    circuit.h(q[2])
    circuit.measure(q[1], c_bell[0])
    circuit.measure(q[2], c_bell[1])
    circuit.barrier()

    # 5. Medição no Passado (Genesis 2009)
    circuit.measure(q[0], c_past[0])

    return circuit

if __name__ == "__main__":
    circuit = build_voyager_q_mcp_circuit()
    backend = AerSimulator()
    result = backend.run(circuit, shots=1024).result()
    counts = result.get_counts()
    print("Q-MCP Counts:", counts)
