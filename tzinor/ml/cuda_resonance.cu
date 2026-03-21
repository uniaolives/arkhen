// tzinor/ml/cuda_resonance.cu
// ACELERAÇÃO CUDA PARA MÉTRICAS DE RESSONÂNCIA ARKHE(N)

#include <cuda_runtime.h>
#include <device_launch_parameters.h>
#include <math.h>

extern "C" {

// Kernel para calcular norma quadrática e densidade de informação
__global__ void compute_info_density_kernel(const float* params, const float* grads, int size, float* result) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx < size) {
        float g = grads[idx];
        float p = params[idx];
        // ρ = ||∇L||² / (1 + H(θ)) -> Aproximação local
        float local_rho = (g * g) / (1.0f + fabsf(p));
        atomicAdd(result, local_rho);
    }
}

// Interface para o Python via ctypes
void compute_resonance_cuda(const float* d_params, const float* d_grads, int size, float* h_result) {
    float *d_result;
    cudaMalloc(&d_result, sizeof(float));
    cudaMemset(d_result, 0, sizeof(float));

    int blockSize = 256;
    int numBlocks = (size + blockSize - 1) / blockSize;

    compute_info_density_kernel<<<numBlocks, blockSize>>>(d_params, d_grads, size, d_result);

    cudaMemcpy(h_result, d_result, sizeof(float), cudaMemcpyDeviceToHost);
    cudaFree(d_result);
}

}
