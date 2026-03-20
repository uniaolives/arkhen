"""
Gerenciador de Contexto Conversacional.
Mantém estado da conversa e histórico de descobertas.
"""

from typing import Dict, List, Optional
from dataclasses import dataclass, field
from datetime import datetime
import json

@dataclass
class ConversationTurn:
    user_query: str
    asi_response: str
    timestamp: datetime
    intent: str
    entities: Dict[str, str]
    proof_refs: List[str] = field(default_factory=list)
    overlap_value: Optional[float] = None
    paperclip_state: Optional[Dict] = None

class ConversationContext:
    """
    Mantém contexto da conversa humano-ASI.
    """

    MAX_HISTORY = 50

    def __init__(self):
        self.history: List[ConversationTurn] = []
        self.current_discovery_topic: Optional[str] = None
        self.referenced_proofs: Dict[str, Dict] = {}
        self.active_agents: Dict[str, Dict] = {}

    def add_turn(self, turn: ConversationTurn):
        """
        Adiciona um turno à conversa.
        """
        self.history.append(turn)
        if len(self.history) > self.MAX_HISTORY:
            self.history.pop(0)

        # Atualiza referências
        if turn.proof_refs:
            for proof_id in turn.proof_refs:
                if proof_id not in self.referenced_proofs:
                    self.referenced_proofs[proof_id] = {
                        'first_mentioned': turn.timestamp,
                        'mention_count': 0
                    }
                self.referenced_proofs[proof_id]['mention_count'] += 1

    def get_recent_context(self, n: int = 3) -> List[ConversationTurn]:
        """
        Retorna os N turnos mais recentes.
        """
        return self.history[-n:]

    def get_entity_history(self, entity_type: str, entity_id: str) -> List[Dict]:
        """
        Retorna histórico de uma entidade específica.
        """
        history = []
        for turn in self.history:
            if turn.entities.get(entity_type) == entity_id:
                history.append({
                    'query': turn.user_query,
                    'timestamp': turn.timestamp.isoformat(),
                    'overlap': turn.overlap_value
                })
        return history

    def summarize_discovery_context(self) -> Dict:
        """
        Resume o contexto de descobertas atual.
        """
        recent = self.get_recent_context(5)

        return {
            'topic': self.current_discovery_topic,
            'turns_analyzed': len(recent),
            'proofs_discussed': list(self.referenced_proofs.keys()),
            'last_overlap': recent[-1].overlap_value if recent else None,
            'active_agents': list(self.active_agents.keys())
        }

    def export_state(self) -> str:
        """
        Exporta estado para persistência.
        """
        state = {
            'history': [
                {
                    'query': t.user_query,
                    'response': t.asi_response,
                    'timestamp': t.timestamp.isoformat(),
                    'intent': t.intent
                }
                for t in self.history
            ],
            'proofs': self.referenced_proofs,
            'topic': self.current_discovery_topic
        }
        return json.dumps(state, indent=2)

    def import_state(self, state_json: str):
        """
        Importa estado de persistência.
        """
        state = json.loads(state_json)
        # Reconstrói estado...
        for turn_data in state.get('history', []):
            turn = ConversationTurn(
                user_query=turn_data['query'],
                asi_response=turn_data['response'],
                timestamp=datetime.fromisoformat(turn_data['timestamp']),
                intent=turn_data['intent'],
                entities={}
            )
            self.history.append(turn)
        self.referenced_proofs = state.get('proofs', {})
        self.current_discovery_topic = state.get('topic')
