
import strawberryfields as sf
from strawberryfields import ops
import numpy as np

def simulate_gkp_satoshi_seed():
    """
    Simula a "Semente de Satoshi" como um estado GKP no espaço de fase.
    """
    prog = sf.Program(1)
    with prog.context as q:
        # 1. Preparação: Estado de Vácuo (Ponto 0)
        ops.Vac | q[0]

        # 2. Squeezing (Aproximação GKP)
        ops.Sgate(1.0) | q[0]

        # 3. Displacement (Mensagem de Finney)
        # alpha = sqrt(pi)/2 para um shift no espaço de fase
        alpha = np.sqrt(np.pi) / 2.0
        ops.Dgate(alpha) | q[0]

        # 4. Rotação de Fase (Interferência do Campo φ)
        ops.Rgate(np.pi / 4.0) | q[0]

    eng = sf.Engine("gaussian")
    result = eng.run(prog)
    state = result.state

    # Extrai o vetor de deslocamento e a matriz de covariância
    mu = state.means()
    cov = state.cov()

    return state, mu, cov

if __name__ == "__main__":
    state, mu, cov = simulate_gkp_satoshi_seed()
    print(f"GKP State (Gaussian) means: {mu}")
    print(f"GKP State (Gaussian) covariance: {cov}")
    # Nota: Em um ambiente com display, poderíamos usar state.wigner() para visualização.
