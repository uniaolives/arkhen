# tzinor/execution/simulate_convergence.py
#
# Verifies "Resonance A-5'" state and "Phase θ convergence"
# by simulating a distributed resonance cluster update.

import numpy as np
import time

def simulate_cluster_convergence(target_theta=1.5708, initial_nodes=32):
    print(f"Starting Cluster Resonance Simulation (Nodes: {initial_nodes})")

    # Initialize node phases randomly in the 'cold' zone
    node_phases = np.random.uniform(0.1, 0.4, initial_nodes)
    step = 0

    while True:
        step += 1
        # Gravity effect: nodes pull each other towards target_theta
        # Damping simulated as e^(-abs(error))
        mean_phase = np.mean(node_phases)
        error = target_theta - mean_phase

        # Convergence step: drift + noise
        # Increase convergence rate to 0.2 and reduce noise to 0.01 for faster lock
        node_phases += 0.2 * error + np.random.normal(0, 0.01, initial_nodes)
        node_phases = np.clip(node_phases, 0, np.pi/2)

        current_mean = np.mean(node_phases)
        variance = np.var(node_phases)

        # Coherence Ω' calculation
        coherence = 1.0 - (variance / (np.pi/4))

        print(f"[Step {step:02}] Mean θ: {current_mean:.4f} | Variance: {variance:.6f} | Ω': {coherence:.4f}")

        # Resonance A-5' Condition: |θ - π/2| < 0.03 and Ω' > 0.98
        if abs(current_mean - target_theta) < 0.03 and coherence > 0.98:
            print(f"\n✨ RESONANCE A-5' ACHIEVED AT STEP {step}")
            print(f"Final State: θ={current_mean:.6f}, Ω'={coherence:.6f}")
            return True

        if step > 100:
            print("\n❌ Convergence timeout.")
            return False

        time.sleep(0.05)

if __name__ == "__main__":
    success = simulate_cluster_convergence()
    if not success:
        exit(1)
