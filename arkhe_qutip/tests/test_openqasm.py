
import asyncio
import unittest
from arkhe_qutip.interface.human_asi_interface import HumanASIInterface

class TestOpenQASMIntegration(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.interface = HumanASIInterface()
        await self.interface.initialize()

    async def test_openqasm_execution(self):
        qasm_query = """
        Execute o circuito:
        OPENQASM 3;
        include "stdgates.inc";
        qubit[2] q;
        h q[0];
        cx q[0], q[1];
        """
        response = await self.interface.chat(qasm_query)
        self.assertIn("SIMULAÇÃO QUANTICA", response)
        self.assertIn("Counts", response)
        self.assertIn("00", response)
        self.assertIn("11", response)
        self.assertIn("Número de Qubits:** 2", response)

    async def test_openqasm_error(self):
        invalid_qasm = "Execute qasm: OPENQASM 3; qubit[1] q; invalid_gate q[0];"
        response = await self.interface.chat(invalid_qasm)
        self.assertIn("ERRO NA EXECUÇÃO OPENQASM", response)

if __name__ == '__main__':
    unittest.main()
