// tzinor/ml/cuda_resonance.cu
// LAYER 12: FUSED GRAVITATIONAL RESONANCE KERNELS

#include <cuda_runtime.h>
#include <device_launch_parameters.h>
#include <math.h>

extern "C" {

// Constantes MUT
__constant__ float k1 = 0.015311f;
__constant__ float k2 = 0.05200f;
__constant__ float rho_eq = 0.367879f;
__constant__ float lambda_ent = 0.001013f;

// Kernel fundido para cálculo de σ e damping
__global__ void fused_resonance_kernel(
    const float* params,
    int size,
    float rho_2,
    float* out_damping,
    float* out_phase
) {
    // Redução simples para ρ₁ (norma L2)
    extern __shared__ float sdata[];
    int tid = threadIdx.x;
    int i = blockIdx.x * blockDim.x + threadIdx.x;

    float val = (i < size) ? params[i] * params[i] : 0;
    sdata[tid] = val;
    __syncthreads();

    for (int s = blockDim.x / 2; s > 0; s >>= 1) {
        if (tid < s) sdata[tid] += sdata[tid + s];
        __syncthreads();
    }

    if (tid == 0) {
        float rho_1 = sqrtf(sdata[0]) / 100.0f; // Escala normalizada
        float eps = 1e-9f;

        float sigma = (k1 * rho_1 * logf(rho_1 + eps) +
                       k2 * rho_2 * logf(rho_2 + eps) -
                       lambda_ent * (rho_1 * rho_1 + rho_2 * rho_2));

        float damping = expf(-rho_eq * sigma);
        float phase = atan2f(k2 * rho_2, k1 * rho_1 + eps) * damping;

        atomicExch(out_damping, damping);
        atomicExch(out_phase, phase);
    }
}

void launch_fused_resonance(float* d_params, int size, float rho_2, float* h_damping, float* h_phase) {
    float *d_damping, *d_phase;
    cudaMalloc(&d_damping, sizeof(float));
    cudaMalloc(&d_phase, sizeof(float));

    fused_resonance_kernel<<<1, 256, 256 * sizeof(float)>>>(d_params, size, rho_2, d_damping, d_phase);

    cudaMemcpy(h_damping, d_damping, sizeof(float), cudaMemcpyDeviceToHost);
    cudaMemcpy(h_phase, d_phase, sizeof(float), cudaMemcpyDeviceToHost);

    cudaFree(d_damping);
    cudaFree(d_phase);
}

}
