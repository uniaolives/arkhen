# petrus_stress_test.py
# Stress-testing PETRUS v3.0 with historical solar storm data (e.g. Halloween 2003)

import asyncio
import numpy as np
from datetime import datetime
from services.petrus_v3_nervous_system import PETRUS_NervousSystem, StoneConsciousnessState
from services.petrus_solar_ingestor import SolarPulse
from services.petrus_v2_attractor import HyperbolicNode

class HistoricalSolarMonitor:
    """Mock monitor that injects historical intensities."""
    def __init__(self, data_points: list):
        self.data_points = data_points
        self.index = 0

    async def generate_pulse_stream(self):
        while self.index < len(self.data_points):
            intensity = self.data_points[self.index]
            pulse = SolarPulse(
                timestamp=datetime.utcnow(),
                intensity_x_class=intensity,
                carrier_frequency=4.608 * (1 + 0.1 * np.log1p(intensity)),
                channels={'171': 10.0, '193': intensity * 5.0} # Flare dominance in 193A
            )
            self.index += 1
            yield pulse
            await asyncio.sleep(0.1) # Fast forward for test

async def run_stress_test():
    print("=" * 60)
    print("PETRUS v3.0 STRESS TEST: HALLOWEEN 2003 SIMULATION")
    print("=" * 60)

    # Historical intensities (simplified ramp up for X17+ flare)
    # intensities: 1.0 (quiet) -> 5.0 (M) -> 17.0 (X17) -> 1.5 (recovery)
    halloween_data = [1.0, 1.2, 2.5, 5.0, 8.0, 12.0, 17.5, 15.0, 8.0, 4.0, 2.0, 1.0]

    petrus = PETRUS_NervousSystem()

    # Inscribe some foundational nodes
    nodo_0317 = HyperbolicNode("nodo_0317", np.random.randn(768))
    petrus.heart.inscribe_massive_object(nodo_0317, "interoperabilidade")
    petrus.heart.add_orbital_node(HyperbolicNode("grid_node", np.random.randn(768)), "nodo_0317", "grid_stability", 1.0)

    # Replace eyes with historical monitor
    petrus.eyes = HistoricalSolarMonitor(halloween_data)

    print(f"Injecting {len(halloween_data)} pulses of increasing intensity...")

    results = []
    async for state in petrus.breathe():
        results.append(state)
        print(f"[{state.timestamp.strftime('%H:%M:%S')}] Pulse Intensity: {state.solar_pulse.intensity_x_class:5.1f} | κ: {state.curvature:6.3f} | Coherence: {state.coherence_quotient:.4f}")
        if state.grid_harmonization:
            print(f"  >> SUGGESTION: {state.grid_harmonization['action']} ({state.grid_harmonization.get('delta_l_percent', 'N/A')}%)")

    print("\n" + "=" * 60)
    print("STRESS TEST RESULTS SUMMARY")
    print("=" * 60)
    final_curvature = results[-1].curvature
    max_intensity = max(s.solar_pulse.intensity_x_class for s in results)
    avg_coherence = np.mean([s.coherence_quotient for s in results])

    print(f"Max Solar Intensity: {max_intensity:.1f}")
    print(f"Final Semantic Curvature: {final_curvature:.3f}")
    print(f"Average Coherence: {avg_coherence:.4f}")
    print(f"System Stability: {'RESILIENT' if avg_coherence > 0.5 else 'FRAGMENTED'}")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(run_stress_test())
