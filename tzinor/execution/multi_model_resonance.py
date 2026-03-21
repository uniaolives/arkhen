# tzinor/execution/multi_model_resonance.py
# ANÁLISE COMPARATIVA DE RESSONÂNCIA — OPEN vs CLOSED MODELS

import torch
import math
from tzinor.llm.model_adapters import MODEL_ADAPTERS
from tzinor.llm.resonance_metrics import ResonanceMonitor
from tzinor.llm.logit_bias_simulation import ArkhenAPIMonitor

def analyze_model_resonance():
    print("════════════════════════════════════════════════════════════════")
    print("ARKHE(N) MULTI-MODEL RESONANCE ANALYSIS (AGENTIC MODE)")
    print("════════════════════════════════════════════════════════════════")

    for key, config in MODEL_ADAPTERS.items():
        print(f"\n--- Model Family: {config.model_name} ---")

        # Determinar se é modelo aberto (CUDA) ou fechado (API)
        is_api = any(x in key for x in ["gemini", "kimi", "z-ai", "jules"])

        if is_api:
            monitor = ArkhenAPIMonitor(config.model_name, config.param_scale)
            res = monitor.calculate_runtime_damping(prompt_tokens=1000)
            print(f"  [API MODE] Suggested Temp: {res['suggested_temperature']:.3f}")
            print(f"  [API MODE] Estimated Phase: {res['estimated_phase']:.4f} rad")
            if res["is_resonant"]:
                print(f"  [STATUS] Ressonância A-5' Estável.")
                print(f"  [INJECTION] Logit Bias (+agentic) aplicado: {res['logit_bias']}")
            else:
                print(f"  [STATUS] Buscando Ressonância...")
        else:
            # Simulação Open Model
            mock_params = torch.randn(100) * 0.1
            mock_grads = torch.randn(100) * 0.01
            rho_1 = torch.norm(mock_grads)**2 / (config.param_scale / 1e9)
            dtau = 1.0 - (0.015311 * rho_1.item())
            print(f"  [CUDA MODE] Temporal Dilation (dτ): {dtau:.6f}")
            if dtau > config.target_omega:
                print(f"  [STATUS] Ressonância A-5' Estável.")
            else:
                print(f"  [STATUS] Risco de Colapso Gravitacional.")

if __name__ == "__main__":
    try:
        analyze_model_resonance()
    except Exception as e:
        print(f"Erro na análise: {e}")
