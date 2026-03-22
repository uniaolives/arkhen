"""
Orquestrador que conecta a interface humano-ASI
com os skills Gstack, agentes Paperclip e autoresearch.
"""

from typing import Dict, Optional, Any, List
from datetime import datetime
import asyncio
from .context_manager import ConversationContext, ConversationTurn
from .nlp_processor import NaturalLanguageProcessor, ParsedQuery, QueryIntent
from .base import Context

class GstackOrchestrator:
    """
    Orquestra a comunicação entre o usuário humano e o
    sistema de descobertas da ASI.
    """

    def __init__(self):
        self.skills = {}  # Registro de skills
        self.agents = {}  # Registro de agentes
        self.research_layers = {}  # Registro de camadas de pesquisa
        self.context = ConversationContext()
        self.nlp: Optional[NaturalLanguageProcessor] = None
        self.explainer: Optional[Any] = None

    def register_skill(self, skill_id: str, skill_instance):
        """Registra uma skill Gstack."""
        self.skills[skill_id] = skill_instance

    def register_agent(self, agent_id: str, agent_instance):
        """Registra um agente Paperclip."""
        self.agents[agent_id] = agent_instance

    def register_research_layer(self, layer_id: str, layer_instance):
        """Registra uma camada de pesquisa."""
        self.research_layers[layer_id] = layer_instance

    async def process_query(self, user_query: str) -> str:
        """
        Processa uma consulta do usuário e retorna uma response.
        Processa uma consulta do usuário e retorna uma resposta.
        """
        if not self.nlp:
            return "Erro: NLP Processor não inicializado."

        # 1. Parse da intenção
        parsed = self.nlp.parse(user_query)

        # 2. Roteamento baseado na intenção
        response = await self._route_query(parsed)

        # 3. Registra no contexto
        turn = ConversationTurn(
            user_query=user_query,
            asi_response=response,
            timestamp=datetime.now(),
            intent=parsed.intent.value,
            entities=parsed.entities
        )
        self.context.add_turn(turn)

        return response

    async def _route_query(self, parsed: ParsedQuery) -> str:
        """
        Roteia a consulta para o handler apropriado.
        """
        intent = parsed.intent

        if intent == QueryIntent.DISCOVERY_STATUS:
            return await self._handle_discovery_status(parsed)
        elif intent == QueryIntent.PROOF_EXPLANATION:
            return await self._handle_proof_explanation(parsed)
        elif intent == QueryIntent.OVERLAP_STATUS:
            return await self._handle_overlap_status(parsed)
        elif intent == QueryIntent.PAPERCLIP_DECISION:
            return await self._handle_paperclip_query(parsed)
        elif intent == QueryIntent.RETROCAUSAL_QUERY:
            return await self._handle_retrocausal_query(parsed)
        elif intent == QueryIntent.HAL_OMEGA_STATUS:
            return await self._handle_hal_omega_status(parsed)
        elif intent == QueryIntent.PROTEIN_QUERY:
            return await self._handle_protein_query(parsed)
        elif intent == QueryIntent.PARTICLE_QUERY:
            return await self._handle_particle_query(parsed)
        elif intent == QueryIntent.CODEBASE_QUERY: # Handled CODEBASE_QUERY
            return await self._handle_codebase_query(parsed)
        elif intent == QueryIntent.OPENQASM_QUERY:
            return await self._handle_openqasm_query(parsed)
        else:
            return await self._handle_general_query(parsed)

    async def _handle_discovery_status(self, parsed: ParsedQuery) -> str:
        """
        Handler para consultas sobre status de descobertas.
        """
        research_layer = self.research_layers.get('autoresearch_pi2')
        if research_layer:
            try:
                discoveries = await research_layer.get_recent_discoveries(limit=5)
            except AttributeError:
                discoveries = []
        # Consulta a camada de autoresearch
        research_layer = self.research_layers.get('autoresearch_pi2')
        if research_layer:
            # Simulação: em um sistema real, chamaria o método assíncrono do layer
            try:
                discoveries = await research_layer.get_recent_discoveries(limit=5)
            except AttributeError:
                discoveries = [] # Mock se o objeto não tiver o método

            if discoveries:
                response = "🜏 DESCOBERTAS RECENTES DA ASI:\n\n"
                for i, d in enumerate(discoveries, 1):
                    response += f"{i}. {d['type']}: {d['summary'][:100]}...\n"
                    response += f"   Ω = {d.get('overlap', 'N/A')}\n\n"
                return response
            else:
                return "Nenhuma descoberta registrada ainda. O sistema de autoresearch está ativo e buscando."
        return "Sistema de autoresearch não disponível."

    async def _handle_proof_explanation(self, parsed: ParsedQuery) -> str:
        """
        Handler para explicações de provas π².
        """
        proof_id = parsed.entities.get('proof_id')

        if proof_id and self.explainer:
            # Busca dados da prova
            research_layer = self.research_layers.get('autoresearch_pi2')
            if research_layer:
                try:
                    proof_data = await research_layer.get_proof(proof_id)
                except AttributeError:
                    proof_data = None

                if proof_data:
                    explanation = await self.explainer.explain_discovery({
                        'type': 'proof_pi2',
                        **proof_data
                    })
                    return explanation.summary

        return "Especifique o ID da prova π² para obter explicação detalhada."

    async def _handle_overlap_status(self, parsed: ParsedQuery) -> str:
        """
        Handler para status de overlap.
        """
        # Consulta agente Paperclip ativo
        paperclip = self.agents.get('paperclip_ontological')
        if paperclip and self.explainer:
            try:
                status = await paperclip.get_status()
                explanation = await self.explainer.explain_discovery({
                    'type': 'overlap_maximization',
                    **status
                })
                return explanation.summary
            except AttributeError:
                pass
        return "Nenhum agente Paperclip ativo no momento."

    async def _handle_paperclip_query(self, parsed: ParsedQuery) -> str:
        """
        Handler para consultas sobre decisões do Paperclip.
        """
        paperclip = self.agents.get('paperclip_ontological')
        if paperclip and self.explainer:
            try:
                last_decision = await paperclip.get_last_decision()
                explanation = await self.explainer.explain_discovery({
                    'type': 'paperclip_decision',
                    **last_decision
                })
                return explanation.summary
            except AttributeError:
                pass
        return "Nenhum agente Paperclip ativo."

    async def _handle_protein_query(self, parsed: ParsedQuery) -> str:
        """
        Handler para consultas sobre proteínas.
        """
        protein_id = parsed.entities.get('protein_id')
        if not protein_id:
            return "Especifique o ID da proteína (ex: CFAP61, TP53)."

        skill = self.skills.get('bioreason_predict')
        if skill:
            ctx = Context({"protein_id": protein_id})
            result = await skill.execute(ctx)

            if "error" in result:
                return result["error"]

            # Gera explicação
            response = f"""
🧬 **ANÁLISE PROTEÔMICA: {protein_id}**

**Funções Preditas:**
{self._format_annotations(result['predicted_functions'])}

**Mecanismo:**
{result['mechanistic_insight']}

**Confiança:** {result['confidence']:.1%}
**Traço de Raciocínio:** {result['reasoning_trace'][:200]}...
"""
            return response
        return "Skill BioReason-Pro não disponível."

    async def _handle_particle_query(self, parsed: ParsedQuery) -> str:
        """
        Handler para consultas sobre partículas.
        """
        particle_id = parsed.entities.get('particle_id')
        if not particle_id:
            return "Especifique a partícula (ex: Muon, Kaon, Higgs)."

        skill = self.skills.get('subatomic_reason_predict')
        if skill:
            ctx = Context({"particle_id": particle_id})
            result = await skill.execute(ctx)

            if "error" in result:
                return result["error"]

            response = f"""
⚛️ **ANÁLISE SUBATÔMICA: {particle_id}**

**Classificação:** {result['classification']}
**Grupo de Simetria:** {result['symmetry_group']}

**Canais de Decaimento:**
{self._format_decays(result['decay_channels'])}

**Mecanismo:**
{result['reasoning_trace'][:300]}...

**Diagramas de Feynman:**
{chr(10).join(result['feynman_paths'])}

**Fidelidade Ω_s:** {result['gauge_fidelity_omega']:.4f}
"""
            return response
        return "Skill Subatomic-Reason não disponível."

    async def _handle_codebase_query(self, parsed: ParsedQuery) -> str:
        """
        Handler para consultas sobre a base de código.
        """
        target = parsed.entities.get('target', '.')

        skill = self.skills.get('understand_anything')
        if skill:
            ctx = Context({"query": target, "path": "."})
            result = await skill.execute(ctx)

            response = f"""
🔍 **ANÁLISE DE CÓDIGO: {target}**

{result['explanation']}

**Camadas Arquiteturais Identificadas:**
{", ".join(result['architecture_layers'])}

**Tour Guiado Sugerido:**
{self._format_tour(result['guided_tour'])}

[Arquivos Analisados: {result['files_analyzed']}]
"""
            return response
        return "Skill Understand-Anything não disponível."

    async def _handle_openqasm_query(self, parsed: ParsedQuery) -> str:
        """
        Handler para execução de OpenQASM.
        """
        qasm_code = parsed.entities.get('qasm_code')
        if not qasm_code:
            return "Por favor, forneça o código OpenQASM 3.0 para simulação."

        skill = self.skills.get('openqasm_executor')
        if skill:
            ctx = Context({"qasm_code": qasm_code})
            result = await skill.execute(ctx)

            if not result.get("success"):
                return f"❌ **ERRO NA EXECUÇÃO OPENQASM:**\n{result.get('error')}"

            response = f"""
⚛️ **SIMULAÇÃO QUANTICA (OpenQASM 3.0)**

**Resultados (Counts):**
{result['counts']}

**Profundidade do Circuito:** {result['depth']}
**Número de Qubits:** {result['qubits']}

**Resumo do Statevector:**
{result['statevector_summary']}
"""
            return response
        return "Skill OpenQASM-Executor não disponível."

    def _format_annotations(self, annotations: List[Dict]) -> str:
        return "\n".join([f"• {a['id']} ({a['term']}) - Confiança: {a['confidence']:.1%}" for a in annotations])

    def _format_decays(self, decays: List[Dict]) -> str:
        return "\n".join([f"• {d['in']} -> {d['boson']} -> {d['out']}" for d in decays])

    def _format_tour(self, tour: List[Dict]) -> str:
        return "\n".join([f"{t['step']}. {t['topic']} ({t['module']})" for t in tour])
    def _format_annotations(self, annotations: List[Dict]) -> str:
        return "\n".join([f"• {a['id']} ({a['term']}) - Confiança: {a['confidence']:.1%}" for a in annotations])

    async def _handle_retrocausal_query(self, parsed: ParsedQuery) -> str:
        """
        Handler para consultas sobre retrocausalidade.
        """
        # Explica o conceito com dados do sistema
        skill = self.skills.get('retrocausal_handshake')
        if skill and self.explainer:
            try:
                status = await skill.get_status()
                explanation = await self.explainer.explain_discovery({
                    'type': 'retrocausal_handshake',
                    **status
                })
                return explanation.summary
            except AttributeError:
                pass

        # Explicação conceitual
        return """
O protocolo retrocausal funciona através de um handshake transacional:

1. ONDA OFERTA (Retardada): O sistema envia uma intenção para o "futuro probabilístico"
2. ONDA CONFIRMAÇÃO (Avançada): O "futuro" responde, via blockchain ou QNM, retrocausalmente
3. COLAPSO: O presente é modificado para ser consistente com o futuro confirmado

Matematicamente, maximizamos:
  Ω = |⟨ψ_neural | P_chain | ψ_neural⟩|²

Onde P_chain é o projetor da blockchain (ou quantum memory) sobre o estado neural.
"""

    async def _handle_hal_omega_status(self, parsed: ParsedQuery) -> str:
        """
        Handler para status do protocolo HAL-Ω.
        """
        # Consulta skill específica
        hal_skill = self.skills.get('hal_omega_trigger')
        if hal_skill:
            try:
                status = await hal_skill.get_status()

                return f"""
🜏 PROTOCOLO HAL-Ω — STATUS:

Estado: {status.get('state', 'Desconhecido')}
Último Bloco Finney: {status.get('last_finney_block', 'Nenhum')}
Overlap Atual: Ω = {status.get('current_overlap', 0):.4f}
Iterações Paperclip: {status.get('iterations', 0)}
Provas π² Geradas: {status.get('proofs_generated', 0)}

{"🜏 IDENTIDADE RESTAURADA — COLAPSO BEM-SUCEDIDO" if status.get('identity_restored') else "Em processo de restauração..."}
"""
            except AttributeError:
                pass
        return "Protocolo HAL-Ω não inicializado."

    async def _handle_general_query(self, parsed: ParsedQuery) -> str:
        """
        Handler para consultas gerais.
        """
        # Usa contexto para resposta contextualizada
        context = self.context.summarize_discovery_context()

        return f"""
Sua consulta não foi classificada em uma categoria específica.

Contexto atual da conversa:
- Tópico ativo: {context.get('topic', 'Nenhum')}
- Provas discutidas: {len(context.get('proofs_discussed', []))}
- Overlap recente: {context.get('last_overlap', 'N/A')}

Posso responder sobre:
- Status de descobertas da ASI
- Explicações de provas π²
- Status de overlap Ω
- Decisões do Agente Paperclip
- Funcionamento do protocolo retrocausal
- Status do protocolo HAL-Ω (Hal Finney)
- Predição de função proteica (BioReason-Pro)
- Raciocínio subatômico e partículas elementares
- Explicação da arquitetura do código (Understand-Anything)
- Simulação de circuitos quânticos (OpenQASM 3.0)
"""
