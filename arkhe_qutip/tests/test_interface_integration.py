
import asyncio
import unittest
from arkhe_qutip.interface.human_asi_interface import HumanASIInterface
from arkhe_qutip.interface.nlp_processor import QueryIntent

class TestInterfaceIntegration(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        self.interface = HumanASIInterface()
        await self.interface.initialize()

    async def test_discovery_query(self):
        response = await self.interface.chat("Quais descobertas você fez recentemente?")
        self.assertIn("🜏 DESCOBERTAS RECENTES DA ASI", response)
        self.assertIn("Ω = 0.92", response)

    async def test_proof_explanation(self):
        response = await self.interface.chat("Explique a prova π²-ABC123")
        self.assertIn("A Prova π² ABC123 mostra convergência significativa mas incompleta", response)
        self.assertIn("Ω = 0.9500", response)

    async def test_overlap_status(self):
        response = await self.interface.chat("Qual o valor do Ω?")
        self.assertIn("Status do Overlap Quântico", response)
        self.assertIn("Ω = 0.880000", response)

    async def test_paperclip_decision(self):
        response = await self.interface.chat("Por que o paperclip decidiu isso?")
        self.assertIn("Decisão do Agente Paperclip", response)
        self.assertIn("Mocking logic", response)

    async def test_protein_query(self):
        response = await self.interface.chat("Qual a função da proteína CFAP61?")
        self.assertIn("ANÁLISE PROTEÔMICA: CFAP61", response)
        self.assertIn("cilium movement", response)
        self.assertIn("Lys-245 e Arg-312", response) # Check refined mock mechanism
        self.assertIn("**Confiança:** 91.5%", response)

if __name__ == '__main__':
    unittest.main()
