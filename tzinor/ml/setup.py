# tzinor/ml/setup.py
from setuptools import setup
from torch.utils.cpp_extension import BuildExtension, CUDAExtension
import os

def build():
    print("Compilando Layer 12 CUDA Backend...")
    setup(
        name='arkhe_cuda',
        ext_modules=[
            CUDAExtension(
                'arkhe_cuda',
                ['tzinor/ml/cuda_resonance.cu'],
                extra_compile_args={'cxx': ['-O3'], 'nvcc': ['-O3', '-arch=sm_80']}
            )
        ],
        cmdclass={'build_ext': BuildExtension}
    )

if __name__ == "__main__":
    try:
        import torch
        build()
    except ImportError:
        print("Ambiente sem Torch/CUDA. O build requer nvcc e pytorch-dev.")
