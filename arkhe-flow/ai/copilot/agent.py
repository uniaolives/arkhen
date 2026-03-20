
import ollama # Supondo Ollama para execução local
from typing import Dict, List, Any

class ArkheCopilot:
    """
    Agente de IA para criar fluxos via linguagem natural.
    """

    def __init__(self, model="arkhe-mistral:7b"):
        self.model = model

    def generate_workflow(self, prompt: str) -> Dict:
        """
        Transforma uma descrição em um JSON de workflow.
        """
        system_prompt = """
        Você é o 'Arkhe Flow Architect'.
        Sua tarefa é gerar JSON workflows para o Arkhe(n) Flow.
        Use os tipos de nó: Webhook, HttpRequest, JsonTransform, ArkheSign.
        Retorne um JSON válido.
        """

        # Simulação de resposta (Ollama mock)
        # response = ollama.chat(model=self.model, messages=[
        #     {'role': 'system', 'content': system_prompt},
        #     {'role': 'user', 'content': prompt}
        # ])
        # return self._parse_response(response['message']['content'])

        return {"status": "mocked", "workflow": prompt}

    def _parse_response(self, content: str) -> Dict:
        import json
        try:
            return json.loads(content)
        except json.JSONDecodeError:
            return {"error": "Failed to parse JSON"}

# Usage
if __name__ == "__main__":
    agent = ArkheCopilot()
    wf = agent.generate_workflow("Crie um fluxo que recebe dados via webhook, os assina e os envia para uma API.")
    print(wf)
