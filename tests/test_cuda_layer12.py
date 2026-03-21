# tests/test_cuda_layer12.py
import unittest
import torch
import os
from tzinor.ml.cuda_interface import CUDAResonanceEngine

class TestLayer12(unittest.TestCase):
    def test_cuda_compilation_presence(self):
        # Verifica se o setup gerou o binário (ou mock)
        self.assertTrue(os.path.exists("tzinor/ml/libcuda_resonance.so"))

    def test_resonance_engine_initialization(self):
        engine = CUDAResonanceEngine()
        # Deve inicializar (pode estar em modo fallback se no sandbox)
        self.assertIsNotNone(engine)

    def test_density_calculation_logic(self):
        engine = CUDAResonanceEngine()
        params = torch.tensor([1.0, 2.0, 3.0])
        grads = torch.tensor([0.1, 0.1, 0.1])
        rho = engine.compute_density(params, grads)
        self.assertGreater(rho, 0)

if __name__ == "__main__":
    unittest.main()
