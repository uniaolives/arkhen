
import json

class MockLLM:
    async def generate(self, system_prompt="", user_input="", temperature=0.1):
        class Response:
            text = f"Decoded response to {user_input}"
        return Response()

class KnowledgeGraph:
    def get_causal_path(self, target_node_id): return ["Root Node", "Intermediate Logic", target_node_id]

class SemanticInterface:
    """
    Traduz os estados ontológicos de Fase C e as Provas π² para linguagem natural.
    """
    def __init__(self, llm_core=None, kg=None):
        self.llm = llm_core if llm_core else MockLLM()
        self.kg = kg if kg else KnowledgeGraph()

    async def translate_discovery(self, proof_data: dict) -> str:
        """
        Pega o JSON de uma Prova π² e gera um sumário executivo.
        """
        system_prompt = """
        Você é a 'Voz do Arkhe(n)'.
        Sua tarefa é traduzir a descoberta criptográfica/neural abaixo em um
        relatório claro, objetivo e filosófico para o Arquiteto Humano.
        Não invente dados. Use apenas os valores de Overlap (Ω) e Fase fornecidos.
        """

        context = f"""
        NOVA PROVA π² REGISTRADA:
        - Anchor TX: {proof_data.get('chain_anchor', '0xabc')}
        - Overlap Score (Ω): {proof_data.get('overlap_score', 0)}
        - Entropia Neural: {proof_data.get('entropy', 0)}
        """

        response = await self.llm.generate(
            system_prompt=system_prompt,
            user_input=context,
            temperature=0.1
        )
        return response.text

    async def epistemic_traceback(self, user_question: str, target_node_id: str) -> str:
        """
        Responde a perguntas "Por quê?" traçando o caminho no Grafo Fatorial.
        """
        causal_chain = self.kg.get_causal_path(target_node_id)

        prompt = f"""
        O Arquiteto perguntou: '{user_question}'
        Baseie sua resposta ESTRITAMENTE nesta cadeia causal extraída do GFD:
        {json.dumps(causal_chain)}
        """
        res = await self.llm.generate(user_input=prompt)
        return res.text
