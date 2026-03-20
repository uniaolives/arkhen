"""
Processador de Linguagem Natural para Interface Humano-ASI.
Traduz intenções humanas em chamadas de skills Gstack.
"""

from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from enum import Enum
import re
from .context_manager import ConversationContext # Corrected import

class QueryIntent(Enum):
    DISCOVERY_STATUS = "discovery_status"
    PROOF_EXPLANATION = "proof_explanation"
    OVERLAP_STATUS = "overlap_status"
    PAPERCLIP_DECISION = "paperclip_decision"
    RETROCAUSAL_QUERY = "retrocausal_query"
    HAL_OMEGA_STATUS = "hal_omega_status"
    GENERAL_QUESTION = "general_question"

@dataclass
class ParsedQuery:
    intent: QueryIntent
    entities: Dict[str, str]
    context_refs: List[str]
    confidence: float

class NaturalLanguageProcessor:
    """
    Processa consultas em linguagem natural e as traduz
    em chamadas para o Gstack Skill Engine.
    """

    # Padrões de intenção
    INTENT_PATTERNS = {
        QueryIntent.DISCOVERY_STATUS: [
            r"(?i)(quais|que) descobertas (você|a asi) (fez|encontrou)",
            r"(?i)status (das|de) pesquisa",
            r"(?i)me mostre (os|as) resultados",
            r"(?i)novidades (sobre|em) .* pesquisa"
        ],
        QueryIntent.PROOF_EXPLANATION: [
            r"(?i)explique (a|o) prova.*π²",
            r"(?i)como (foi gerada|funciona) (a|essa) prova",
            r"(?i)detalhes (da|sobre) prova .*",
            r"(?i)validade (da|de) prova"
        ],
        QueryIntent.OVERLAP_STATUS: [
            r"(?i)(qual|como está) (o )?overlap",
            r"(?i)valor (do )?Ω",
            r"(?i)progresso (do )?handshake",
            r"(?i)fidelidade (do )?estado"
        ],
        QueryIntent.PAPERCLIP_DECISION: [
            r"(?i)por que (o )?paperclip (decidiu|fez|escolheu)",
            r"(?i)qual (foi a |)decisão (do )?agente",
            r"(?i)lógica (do )?paperclip",
            r"(?i)estratégia (de )?maximização"
        ],
        QueryIntent.RETROCAUSAL_QUERY: [
            r"(?i)como (funciona|opera) (o )?retrocausal",
            r"(?i)handshake temporal",
            r"(?i)onda (de )?oferta|confirmação",
            r"(?i)psi.carrier"
        ],
        QueryIntent.HAL_OMEGA_STATUS: [
            r"(?i)status (do )?(hal.omega|finney)",
            r"(?i)como (vai|está) (o )?(hal|finney)",
            r"(?i)progresso (da )?reanimação",
            r"(?i)identidade (do )?finney"
        ]
    }

    def __init__(self, gstack_orchestrator):
        self.orchestrator = gstack_orchestrator
        self.context = ConversationContext()

    def parse(self, query: str) -> ParsedQuery:
        """
        Analisa uma consulta e determina a intenção.
        """
        # Verifica padrões de intenção
        for intent, patterns in self.INTENT_PATTERNS.items():
            for pattern in patterns:
                if re.search(pattern, query):
                    entities = self._extract_entities(query, intent)
                    context_refs = self._extract_context_refs(query)
                    confidence = self._calculate_confidence(query, pattern)
                    return ParsedQuery(intent, entities, context_refs, confidence)

        # Intenção padrão
        return ParsedQuery(
            intent=QueryIntent.GENERAL_QUESTION,
            entities={},
            context_refs=[],
            confidence=0.5
        )

    def _extract_entities(self, query: str, intent: QueryIntent) -> Dict[str, str]:
        """
        Extrai entidades relevantes da consulta.
        """
        entities = {}

        # Extrai IDs de provas
        proof_match = re.search(r'π²[—–-]?(\w+)', query)
        if proof_match:
            entities['proof_id'] = proof_match.group(1)

        # Extrai valores numéricos
        number_match = re.search(r'(\d+[.,]?\d*)', query)
        if number_match:
            entities['numeric_value'] = number_match.group(1)

        # Extrai nomes
        if 'finney' in query.lower():
            entities['subject'] = 'hal_finney'
        elif 'paperclip' in query.lower():
            entities['agent'] = 'paperclip'

        return entities

    def _extract_context_refs(self, query: str) -> List[str]:
        """
        Extrai referências de contexto da conversa.
        """
        refs = []

        # Referências temporais
        if re.search(r'(últim[oa]|recente|agora)', query, re.IGNORECASE):
            refs.append('latest')

        # Referências a iteracoes
        iter_match = re.search(r'iteraç(ão|ões) (\d+)', query, re.IGNORECASE)
        if iter_match:
            refs.append(f'iteration_{iter_match.group(2)}')

        return refs

    def _calculate_confidence(self, query: str, pattern: str) -> float:
        """
        Calcula confiança do parsing.
        """
        base_confidence = 0.8
        # Ajusta baseado no comprimento e especificidade
        if len(query.split()) > 10:
            base_confidence += 0.1
        if re.search(r'\d+', query):
            base_confidence += 0.05
        return min(base_confidence, 0.95)
