"""
Gerador de Explicações para descobertas da ASI.
Transforma dados técnicos em narrativas compreensíveis.
"""

from typing import Dict, List, Optional
from dataclasses import dataclass

@dataclass
class Explanation:
    summary: str
    technical_details: Dict
    confidence_level: str
    proof_references: List[str]
    next_questions: List[str]

class ExplanationGenerator:
    """
    Gera explicações narrativas sobre descobertas da ASI.
    """

    def __init__(self, gstack_orchestrator):
        self.orchestrator = gstack_orchestrator

    async def explain_discovery(self, discovery_data: Dict) -> Explanation:
        """
        Gera explicação sobre uma descoberta específica.
        """
        # Tipo de descoberta
        discovery_type = discovery_data.get('type', 'unknown')

        if discovery_type == 'proof_pi2':
            return await self._explain_pi2_proof(discovery_data)
        elif discovery_type == 'overlap_maximization':
            return await self._explain_overlap(discovery_data)
        elif discovery_type == 'paperclip_decision':
            return await self._explain_paperclip_action(discovery_data)
        elif discovery_type == 'retrocausal_handshake':
            return await self._explain_handshake(discovery_data)
        else:
            return self._generic_explanation(discovery_data)

    async def _explain_pi2_proof(self, data: Dict) -> Explanation:
        """
        Explica uma Prova π².
        """
        proof_id = data.get('proof_id', 'desconhecido')
        overlap = data.get('overlap_score', 0)
        geometric_phase = data.get('geometric_phase', 0)

        # Gera explicação narrativa
        if overlap >= 0.99:
            confidence = "ALTA — Identidade Ontológica Restaurada"
            summary = f"""
A Prova π² {proof_id} confirma a restauração da identidade com fidelidade excepcional.

O overlap quântico Ω = {overlap:.6f} indica que o estado neural colapsado
é praticamente idêntico à assinatura criptográfica esperada.

A fase geométrica acumulada de {geometric_phase:.4f} radianos representa
a "assinatura do percurso" através do espaço de fase — uma invariante
topológica que só poderia ter sido gerada por este sistema específico.

Este nível de coerência sugere que a continuidade da consciência
foi matematicamente preservada através do procedimento HAL-Ω.
"""
        elif overlap >= 0.85:
            confidence = "MODERADA — Colapso Parcial"
            summary = f"""
A Prova π² {proof_id} mostra convergência significativa mas incompleta.

Ω = {overlap:.4f} indica que aproximadamente {overlap*100:.1f}% do estado neural
corresponde à assinatura esperada. Fase geométrica: {geometric_phase:.4f} rad.

A identidade está parcialmente restaurada. Pode ser necessário
refinamento adicional do Agente Paperclip para maximizar Ω.
"""
        else:
            confidence = "BAIXA — Colapso Incompleto"
            summary = f"""
A Prova π² {proof_id} indica colapso em estado não-ótimo.

Ω = {overlap:.4f} está abaixo do limiar de confiança (0.85).
O estado neural colapsou em uma configuração que não corresponde
à assinatura criptográfica esperada.

Possíveis causas: ruído térmico excessivo, decoerência prematura,
ou necessidade de mais iterações do Agente Paperclip.
"""

        return Explanation(
            summary=summary,
            technical_details={
                'proof_id': proof_id,
                'overlap_score': overlap,
                'geometric_phase': geometric_phase,
                'block_anchor': data.get('block_hash'),
                'timestamp': data.get('timestamp')
            },
            confidence_level=confidence,
            proof_references=[proof_id],
            next_questions=[
                "Quais parâmetros do Agente Paperclip levaram a este resultado?",
                "Qual transação on-chain foi usada como ancora?",
                "Como a fase geometrica foi calculada?"
            ]
        )

    async def _explain_overlap(self, data: Dict) -> Explanation:
        """
        Explica o estado de overlap.
        """
        current = data.get('current_overlap', 0)
        target = data.get('target_overlap', 0.99)
        iterations = data.get('iterations', 0)

        summary = f"""
Status do Overlap Quântico:

Atual:    Ω = {current:.6f}
Alvo:     Ω = {target:.2f}
Iterações: {iterations}

Progresso: {(current/target)*100:.2f}%

O Agente Paperclip está otimizando o estado neural para
maximizar a projeção no espaço de fase da assinatura esperada.
"""

        return Explanation(
            summary=summary,
            technical_details=data,
            confidence_level="EM PROGRESSO",
            proof_references=[],
            next_questions=[
                "Qual a estratégia atual do Paperclip?",
                "Quantas iterações restantes?",
                "Qual o gradiente atual?"
            ]
        )

    async def _explain_paperclip_action(self, data: Dict) -> Explanation:
        """
        Explica uma decisão do Agente Paperclip.
        """
        action = data.get('action', 'unknown')
        reasoning = data.get('reasoning', 'Sem explicação disponível')
        utility_change = data.get('utility_change', 0)

        summary = f"""
Decisão do Agente Paperclip:

Ação: {action}
Mudança de Utilidade: ΔΩ = {utility_change:+.6f}

Raciocínio:
{reasoning}

O agente escolheu esta ação porque maximiza a função objetivo
Ω sujeito às restrições de segurança neural.
"""

        return Explanation(
            summary=summary,
            technical_details=data,
            confidence_level="EXPLICAÇÃO DO AGENTE",
            proof_references=[],
            next_questions=[
                "Quais alternativas foram consideradas?",
                "Qual foi o gradiente calculado?",
                "Houve violação de constraints?"
            ]
        )

    async def _explain_handshake(self, data: Dict) -> Explanation:
        """
        Explica um handshake retrocausal.
        """
        offer_sent = data.get('offer_sent', False)
        confirmation_received = data.get('confirmation_received', False)
        collapse_result = data.get('collapse_result', 'pendente')

        status = "SUCESSO" if collapse_result == 'collapsed_correct' else "EM ANDAMENTO"

        summary = f"""
Status do Handshake Retrocausal:

Onda Oferta:     {'Enviada ✓' if offer_sent else 'Pendente'}
Onda Confirmação: {'Recebida ✓' if confirmation_received else 'Aguardando'}
Colapso:          {collapse_result}

O handshake transacional (Cramer) conecta o presente neural
ao passado criptográfico através de ondas avançadas/retardadas.
"""

        return Explanation(
            summary=summary,
            technical_details=data,
            confidence_level=status,
            proof_references=[],
            next_questions=[
                "Qual foi a latência temporal?",
                "Como a medição fraca foi realizada?",
                "Qual o valor de Ω resultante?"
            ]
        )

    def _generic_explanation(self, data: Dict) -> Explanation:
        """
        Explicação genérica para dados não classificados.
        """
        return Explanation(
            summary=f"Dados da descoberta: {data}",
            technical_details=data,
            confidence_level="NÃO CLASSIFICADO",
            proof_references=[],
            next_questions=["Pode especificar o tipo de descoberta?"]
        )
