from setuptools import setup
from torch.utils.cpp_extension import BuildExtension, CUDAExtension
import os

def check_cuda():
    return os.system("nvcc --version") == 0

if check_cuda():
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
else:
    print("NVCC not found. Skipping CUDA compilation. Using stub mode.")
    # Fallback or stub logic here
