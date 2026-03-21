from arkhe_lang.q.engine import QEngine, ArkheQobj
import qutip as qt
import numpy as np

def build_std_q(engine: QEngine):
    # Standard states
    engine.vacuum = engine.create_state(label="vacuum", alpha=1, beta=0)

    def prepare_gkp(squeezing: float) -> ArkheQobj:
        # Mock GKP preparation
        return engine.create_state(label=f"GKP_{squeezing}", alpha=1, beta=0)

    engine.prepare_gkp = prepare_gkp

    # Standard operators
    def patch_gamma(g: float) -> qt.Qobj:
        return qt.Qobj([[1-g, 0], [0, 1+g]])

    def patch_omega(w: float) -> qt.Qobj:
        return qt.Qobj([[w, np.sqrt(1-w**2)], [np.sqrt(1-w**2), w]])

    engine.patch_gamma = patch_gamma
    engine.patch_omega = patch_omega

    return engine
