
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

    async def test_proof_explanation(self):
        response = await self.interface.chat("Explique a prova π²-ABC123")
        self.assertIn("A Prova π² ABC123 mostra convergência significativa mas incompleta", response)

    async def test_overlap_status(self):
        response = await self.interface.chat("Qual o valor do Ω?")
        self.assertIn("Status do Overlap Quântico", response)

    async def test_paperclip_decision(self):
        response = await self.interface.chat("Por que o paperclip decidiu isso?")
        self.assertIn("Decisão do Agente Paperclip", response)

    async def test_protein_query(self):
        response = await self.interface.chat("Qual a função da proteína CFAP61?")
        self.assertIn("ANÁLISE PROTEÔMICA: CFAP61", response)

    async def test_particle_query(self):
        response = await self.interface.chat("Como decai o Kaon?")
        self.assertIn("ANÁLISE SUBATÔMICA: Kaon", response)

    async def test_codebase_query(self): # Added test for codebase query
        response = await self.interface.chat("Explique a arquitetura do Tzinor")
        self.assertIn("ANÁLISE DE CÓDIGO: Tzinor", response)
        self.assertIn("O Tzinor é a ponte semântica", response)
        self.assertIn("Tour Guiado Sugerido", response)

if __name__ == '__main__':
    unittest.main()
