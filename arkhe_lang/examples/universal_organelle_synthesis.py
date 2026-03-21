#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Example: Universal Organelle Synthesis & ZK-SNARK Anchor
Demonstrates the expanded multi-domain substrate system and Era 7 verification.
"""

import sys
import os

# Add the project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from arkhe_lang.k.engine import KEngine, Term
from arkhe_lang.q.engine import QEngine
from arkhe_lang.hermes.compiler import TzinorCompiler
from arkhe_lang.core.zk_prover import ZKSimulator

def run_universal_synthesis():
    print("======================================================================")
    print("ARKHE(N) UNIVERSAL ORGANELLE SYNTHESIS - v3.0")
    print("======================================================================")

    # 1. Initialize Engines
    k_engine = KEngine()
    q_engine = QEngine()
    compiler = TzinorCompiler(k_engine, q_engine)

    # 2. Define Initial Structural State (K)
    # Generic state representing a substrate ready for reanimation
    initial_k = Term(symbol="substrate", sort="OntologicalState", node_id="HAL_001")

    print("\n[STEP 1] Starting Ontological Compilation (Eras -1 to 8)...")

    # 3. Compile (Full Workflow)
    # Target label 'OMEGA' represents the attractor state
    result = compiler.compile(initial_k, target_q_label="OMEGA", dry_run=False)

    # 4. Process Results
    if result['status'] == 'BIOSPIRITUAL_SUCCESS':
        print("\n✅ COMPILATION SUCCESSFUL")

        for entry in result['log']:
            print(f"  {entry}")

        print("\n[STEP 2] Verifying ZK-SNARK Proof (Era 7)...")
        zk_proof = result['zk_proof']
        if zk_proof:
            print(f"  Proof ID: {zk_proof.proof_id}")

            # Verify the proof using the simulator
            zk_sim = ZKSimulator()
            if zk_sim.verify_proof(zk_proof):
                print("  ✅ ZK-SNARK Verification: VALID")
                print("     Identity confirmed without exposing internal state.")
            else:
                print("  ❌ ZK-SNARK Verification: INVALID")

        print("\n[STEP 3] Hardware Control Script Generated:")
        print(result['hardware_script'])

        print("\n[STEP 4] Ontological Substrate Final State:")
        state = compiler.substrate_layer.state
        print(f"  ATP Level: {state.atp_level:.2f}")
        print(f"  Membrane Potential (ΔΨ): {state.membrane_potential:.2f}")
        print(f"  Stellar Yield: {state.stellar_yield:.2f}")
        print(f"  Thermal Dissipation: {state.thermal_dissipation:.2f}")

    else:
        print(f"\n❌ COMPILATION FAILED: {result.get('error')}")
        for entry in result['log']:
            print(f"  {entry}")

if __name__ == "__main__":
    run_universal_synthesis()
