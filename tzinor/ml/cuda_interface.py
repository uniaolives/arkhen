# tzinor/ml/cuda_interface.py
# INTERFACE PYTHON PARA O BACKEND CUDA

import ctypes
import os
import torch
import numpy as np

class CUDAResonanceEngine:
    def __init__(self):
        # Tentar carregar a lib compilada
        lib_path = "./tzinor/ml/libcuda_resonance.so"
        if os.path.exists(lib_path):
            self.lib = ctypes.CDLL(lib_path)
            self.lib.compute_resonance_cuda.argtypes = [
                ctypes.POINTER(ctypes.c_float),
                ctypes.POINTER(ctypes.c_float),
                ctypes.c_int,
                ctypes.POINTER(ctypes.c_float)
            ]
            self.enabled = True
        else:
            print("CUDA Backend não encontrado. Usando fallback PyTorch.")
            self.enabled = False

    def compute_density(self, params: torch.Tensor, grads: torch.Tensor) -> float:
        if self.enabled and params.is_cuda:
            size = params.numel()
            result = ctypes.c_float(0.0)
            # Em um cenário real, usaríamos o ponteiro do tensor CUDA diretamente
            # via torch.utils.dlpack ou similar. Aqui simulamos a chamada.
            return torch.sum((grads**2) / (1.0 + torch.abs(params))).item()
        else:
            # Fallback CPU/PyTorch
            rho = torch.sum((grads**2) / (1.0 + torch.abs(params)))
            return rho.item()
