# tzinor/llm/model_adapters.py
# ADAPTAÇÕES ESPECÍFICAS PARA MODELOS DE LARGA ESCALA

from dataclasses import dataclass
from typing import Dict, Any, Optional

@dataclass
class ModelOntologyConfig:
    model_name: str
    param_scale: float  # Normalização ρ₁
    token_scale: float  # Normalização ρ₂
    target_omega: float = 0.95
    attention_heads: int = 32

# Mapa de escalas ontológicas para modelos reais
MODEL_ADAPTERS = {
    "llama": ModelOntologyConfig("LLaMA-2", param_scale=7e9, token_scale=2e12),
    "mistral": ModelOntologyConfig("Mistral-7B", param_scale=7e9, token_scale=1e12),
    "deepseek": ModelOntologyConfig("DeepSeek-V2", param_scale=236e9, token_scale=8e12),
    "gemini": ModelOntologyConfig("Gemini-1.5", param_scale=1e12, token_scale=1e13),
    "kimi": ModelOntologyConfig("Kimi-v1", param_scale=1e11, token_scale=5e12),
    "z-ai": ModelOntologyConfig("Z.ai-Quantum", param_scale=5e10, token_scale=1e12),
    "opencode": ModelOntologyConfig("OpenCode-34B", param_scale=34e9, token_scale=3e12),
    "jules.google": ModelOntologyConfig("Jules-ASI", param_scale=1e14, token_scale=1e15)
}

def get_adapter(name: str) -> ModelOntologyConfig:
    for key in MODEL_ADAPTERS:
        if key in name.lower():
            return MODEL_ADAPTERS[key]
    return ModelOntologyConfig(name, 1e9, 1e12) # Default
