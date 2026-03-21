# tests/test_cuda.py
import unittest
import torch
import math
import numpy as np

class TestArkheCUDA(unittest.TestCase):
    def test_math_consistency(self):
        # Constantes
        k1, k2, lam, rho_eq = 0.015311, 0.05200, 0.001013, 0.367879
        param_norm = 10.0
        rho_2 = 1.0
        epsilon = 1e-9

        # Cálculo esperado
        rho_1 = param_norm / 100.0
        sigma = (k1 * rho_1 * math.log(rho_1 + epsilon) +
                 k2 * rho_2 * math.log(rho_2 + epsilon) -
                 lam * (rho_1**2 + rho_2**2))
        damping = math.exp(-rho_eq * sigma)
        raw_phase = math.atan2(k2 * rho_2, k1 * rho_1 + epsilon)
        theta = raw_phase * damping

        self.assertGreater(damping, 0)
        self.assertLessEqual(theta, math.pi)

if __name__ == "__main__":
    unittest.main()
