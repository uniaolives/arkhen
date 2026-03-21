import numpy as np
import qutip as qt
from arkhe_lang.k.engine import KEngine, Term, Sort, Rule, DecoherenceException
from arkhe_lang.q.engine import QEngine
from arkhe_lang.hermes.bridge import HermesBridge
from arkhe_lang.lib.std_k import build_std_k

def simulate_decoherence_survival():
    print("--- Ontological Exception Handling: Decoherence Survival Example ---")

    # 1. Initialize Engines
    k_engine = KEngine()
    build_std_k(k_engine)
    q_engine = QEngine()

    s_logic = k_engine.sorts["LogicValue"]

    # 2. Trigger Decoherence in K
    k_engine.config["omega"] = 0.5
    print(f"Current K-Coherence (Ω): {k_engine.config['omega']}")

    # 3. Try a rewrite step - should trigger DecoherenceException and use recovery rule
    trigger_term = Term("recovery_trigger", s_logic)

    print(f"Attempting to rewrite: {trigger_term}")
    result_k = k_engine.rewrite(trigger_term)

    print(f"Result after potential recovery: {result_k}")
    print(f"New K-Coherence (Ω): {k_engine.config['omega']}")

    # 4. Phase Collapse in Q
    print("\nSimulating Phase Collapse in Q Evolution...")
    q_engine.coherence_threshold = 1.1 # Impossible threshold to force failure
    state = q_engine.create_state("fragile_state", alpha=1, beta=1)

    try:
        # Manually check and raise for demonstration
        if state.coherence < q_engine.coherence_threshold:
             raise DecoherenceException(f"Phase Collapse detected: Ω={state.coherence:.4f}", omega=state.coherence)
    except DecoherenceException as e:
        print(f"CAUGHT Phase Collapse: {e.message}")
        print("Restoring phase via patch...")
        q_engine.coherence_threshold = 0.5
        print(f"Coherence restored to threshold: {q_engine.coherence_threshold}")

if __name__ == "__main__":
    simulate_decoherence_survival()
