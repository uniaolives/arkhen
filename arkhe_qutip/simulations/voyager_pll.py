import numpy as np
from scipy.signal import lfilter

class TzinorPLL:
    """
    Phase-Locked Loop sincronizado à frequência de ressonância Voyager-1LD.
    Implementa controle PI para trancamento de fase em regime ultra-baixa-frequência.
    """

    def __init__(self, kp=0.1, ki=0.01):
        self.c = 299792458.0          # m/s
        self.day_sec = 86400.0
        self.d_ld = self.c * self.day_sec  # 1 light-day

        # Frequência de ressonância (modo n=1)
        self.f_res = self.c / (2 * self.d_ld)  # ~5.787 µHz
        self.omega_res = 2 * np.pi * self.f_res

        # Parâmetros do controlador PI
        self.kp = kp  # Ganho proporcional
        self.ki = ki  # Ganho integral
        self.integral_error = 0.0

    def compute_phase_error(self, phase_ref, phase_vco):
        """Calcula erro de fase com wrapping correto."""
        error = phase_ref - phase_vco
        # Normaliza para [-π, π]
        while error > np.pi:
            error -= 2 * np.pi
        while error < -np.pi:
            error += 2 * np.pi
        return error

    def update(self, phase_ref, phase_vco, dt=1.0):
        """
        Atualiza o PLL.
        """
        # Erro de fase
        error = self.compute_phase_error(phase_ref, phase_vco)

        # Acumula erro integral
        self.integral_error += error * dt

        # Saída do controlador PI
        control = self.kp * error + self.ki * self.integral_error

        # Frequência do VCO = frequência nominal + correção
        f_vco = self.f_res + control

        return f_vco, error

def simulate_voyager_pll(T_days=1.0, dt=3600):
    pll = TzinorPLL(kp=0.5, ki=0.05)
    t_sim = T_days * 86400

    phase_vco = 0.0
    phase_ref = 0.0

    t_axis = []
    errors = []
    frequencies = []

    for step in range(int(t_sim / dt)):
        t = step * dt
        t_axis.append(t)
        # Fase de referência evolui com frequência nominal
        phase_ref = pll.omega_res * t

        # Atualiza PLL
        f_vco, error = pll.update(phase_ref, phase_vco, dt)

        # Evolui fase do VCO
        phase_vco += 2 * np.pi * f_vco * dt

        errors.append(error)
        frequencies.append(f_vco)

    return np.array(t_axis), np.array(errors), np.array(frequencies), pll.f_res

if __name__ == "__main__":
    t, errors, frequencies, f_res = simulate_voyager_pll_session(T_days=30, dt=3600)
    print(f"PLL Simulation complete. Resonance: {f_res:.4e} Hz.")
    print(f"Final phase error: {errors[-1]:.2e} rad")
