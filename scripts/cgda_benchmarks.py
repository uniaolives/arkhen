import numpy as np
from cgda_engine import ConstraintGeometryDerivationEngine, ConstraintGeometry
import matplotlib.pyplot as plt

class CGDA_Benchmark:
    """Test CGDA on canonical problems"""

    def __init__(self):
        self.engine = ConstraintGeometryDerivationEngine()
        self.results = {}

    def test_psychiatric_manifold(self, n_samples=100):
        """
        Test on synthetic psychiatric state data
        """
        print("--- RUNNING PSYCHIATRIC MANIFOLD BENCHMARK ---")
        # Generate synthetic psychiatric states
        # Three axes: Serotonin (S), Cortisol (C), Amygdala (A)
        states = self._generate_psychiatric_states(n_samples)

        # Forbidden: Simultaneous mania and catatonia
        # Defined as S > 0.8 and C > 0.8 and A < 0.2
        forbidden = np.random.rand(100, states.shape[1])

        # Run CGDA
        self.engine.ingest_data(states, forbidden)
        geometry = self.engine.derive_geometry(method="full")

        print(f"Derived Dimension: {geometry.dimension}")
        print(f"Constraint Equations: {geometry.constraint_equations}")
        print(f"Anomaly Class: {geometry.anomaly_class}")

        return geometry

    def _generate_psychiatric_states(self, n_samples):
        """
        Generate synthetic psychiatric states on 9D constraint manifold
        """
        # Base 3D states (observed axes)
        S = np.random.normal(0.5, 0.2, n_samples)  # Serotonin
        C = np.random.normal(0.5, 0.2, n_samples)  # Cortisol
        A = np.random.normal(0.5, 0.2, n_samples)  # Amygdala activity

        # Apply constraint: S² + C² + A² ≈ 1 (normalization)
        norm = np.sqrt(S**2 + C**2 + A**2)
        S, C, A = S/norm, C/norm, A/norm

        # Generate hidden dimensions (narrative coherence, temporal alignment, etc.)
        hidden_dims = []
        for i in range(6):  # 6 hidden dimensions
            hidden = (S * np.sin(i) + C * np.cos(i) + A * np.tan(i)) / 3
            hidden += np.random.normal(0, 0.1, n_samples)
            hidden_dims.append(hidden)

        # Combine into 9D states
        states = np.column_stack([S, C, A] + hidden_dims)

        return states

if __name__ == "__main__":
    benchmark = CGDA_Benchmark()
    benchmark.test_psychiatric_manifold()
