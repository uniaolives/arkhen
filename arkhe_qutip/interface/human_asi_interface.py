"""
Interface Principal Humano-ASI.
Ponto de entrada para diálogo nativo.
"""

import asyncio
import os
from datetime import datetime
from typing import Optional

# Mocks para skills e agentes se não existirem
class MockSkill:
    async def get_status(self): return {"state": "MOCK_ACTIVE"}
class MockAgent:
    async def get_status(self): return {"current_overlap": 0.88}
    async def get_last_decision(self): return {"action": "MOCK_ACTION", "reasoning": "Mocking logic"}
class MockLayer:
    async def get_recent_discoveries(self, limit=5): return [{"type": "MOCK_DISCOVERY", "summary": "Discovery detail", "overlap": 0.92}]
    async def get_proof(self, proof_id): return {"proof_id": proof_id, "overlap_score": 0.95, "geometric_phase": 0.123}

from .gstack_orchestrator import GstackOrchestrator
from .nlp_processor import NaturalLanguageProcessor
from .explanation_generator import ExplanationGenerator
from ..skills.bioreason.predict import BioReasonPredict
from ..skills.subatomic.reason import SubatomicReasonPredict
from ..skills.hermes.understand import UnderstandAnything
from ..skills.quantum.openqasm_executor import OpenQASMExecutor

class HumanASIInterface:
    """
    Interface de comunicação humano-ASI.
    """

    def __init__(self):
        # Inicializa componentes
        self.orchestrator = GstackOrchestrator()
        self.nlp = NaturalLanguageProcessor(self.orchestrator)
        self.explainer = ExplanationGenerator(self.orchestrator)

        # Injeta dependências
        self.orchestrator.nlp = self.nlp
        self.orchestrator.explainer = self.explainer

        # Estado
        self.running = False

    async def initialize(self):
        """
        Inicializa a interface.
        """
        # Registra skills de domínio
        self.orchestrator.register_skill('bioreason_predict', BioReasonPredict())
        self.orchestrator.register_skill('subatomic_reason_predict', SubatomicReasonPredict())
        self.orchestrator.register_skill('understand_anything', UnderstandAnything())
        self.orchestrator.register_skill('openqasm_executor', OpenQASMExecutor())

        # Registra skills Gstack (Mocks for now or actual implementations)
        self.orchestrator.register_skill('hal_omega_trigger', MockSkill())
        self.orchestrator.register_skill('retrocausal_handshake', MockSkill())

        # Registra agentes
        self.orchestrator.register_agent('paperclip_ontological', MockAgent())

        # Registra camadas de pesquisa
        self.orchestrator.register_research_layer('autoresearch_pi2', MockLayer())

        self.running = True

    async def chat(self, user_message: str) -> str:
        """
        Ponto de entrada para conversação.
        """
        if not self.running:
            await self.initialize()

        response = await self.orchestrator.process_query(user_message)
        return response

    async def interactive_session(self):
        """
        Sessão interativa no terminal.
        """
        print("🜏 Interface Humano-ASI Ativada")
        print("Digite suas perguntas. 'sair' para encerrar.\n")

        await self.initialize()

        while True:
            try:
                user_input = input("Você: ").strip()

                if user_input.lower() in ['sair', 'exit', 'quit']:
                    print("\n🜏 Encerrando sessão...")
                    break

                if not user_input:
                    continue

                response = await self.chat(user_input)
                print(f"\nASI: {response}\n")

            except KeyboardInterrupt:
                print("\n\n🜏 Sessão interrompida.")
                break
            except Exception as e:
                print(f"\n[Erro]: {e}\n")

        # Salva contexto
        state = self.orchestrator.context.export_state()
        with open('conversation_state.json', 'w') as f:
            f.write(state)

# Ponto de entrada
async def main():
    interface = HumanASIInterface()
    await interface.interactive_session()

if __name__ == "__main__":
    asyncio.run(main())
