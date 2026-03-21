import numpy as np
import qutip as qt
from arkhe_lang.k.engine import KEngine, Term, Sort, DecoherenceException
from arkhe_lang.q.engine import QEngine
from arkhe_lang.hermes.compiler import TzinorCompiler
from arkhe_lang.lib.std_k import build_std_k
from arkhe_lang.lib.std_hardware import build_std_hardware
from arkhe_lang.lib.std_optogen import build_std_optogen

def run_hardware_feedback_loop():
    print("--- Hardware Feedback Loop Simulation (Closed-Loop) ---")

    # 1. Initialize Engines and Compiler
    k_engine = KEngine()
    build_std_k(k_engine)
    build_std_hardware(k_engine)

    q_engine = QEngine()
    build_std_optogen(q_engine)

    compiler = TzinorCompiler(k_engine, q_engine)

    s_logic = k_engine.sorts["LogicValue"]

    # 2. Define Initial Structural State
    initial_k = Term("undecided", s_logic)
    print(f"Initial Structural State: {initial_k}")

    # 3. Closed-Loop Execution
    try:
        for era in range(4, 6):
            print(f"\nProcessing Era {era}...")

            # Step 3a: Perform Compilation Step (includes Schrödinger Bridge)
            # Lift undecided -> Bridge -> Anchor
            result_k, proof = compiler.compile_step(initial_k, f"target_era_{era}")
            print(f"Anchored State after Bridge: {result_k}")

            # Force low coherence for demonstration
            if era == 4:
                proof.overlap = 0.88

            print(f"Coherence Proof: {proof}")

            # Step 3b: Trigger Hardware Action if Coherence is low
            if not proof.is_valid():
                print("Low coherence detected. Dispatched hardware stimulation pulse...")
                compiler.emit_hardware_cmd("OPTO_STIM", {
                    "wavelength_nm": 473,
                    "intensity": 80,
                    "frequency_hz": 6.18,
                    "duration_ms": 100
                })
            else:
                print("Coherence stable. No stimulation required.")

            initial_k = result_k

        # 4. Final Output: Hardware Script
        print("\n--- Final Hardware Control Script ---")
        print(compiler.hardware_backend.generate_control_script())

    except DecoherenceException as e:
        print(f"CRITICAL: Unrecoverable decoherence during hardware loop. {e.message}")

if __name__ == "__main__":
    run_hardware_feedback_loop()
