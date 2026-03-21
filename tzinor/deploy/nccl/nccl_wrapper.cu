// tzinor/deploy/nccl/nccl_wrapper.cu
#include <cuda_runtime.h>
#include <nccl.h>
#include <math.h>
#include <stdio.h>

#define K1 0.015311f
#define K2 0.05200f
#define K3 0.233f
#define K4 0.09778f
#define LAMBDA 0.001013f
#define RHO_EQ 0.367879f
#define PI_HALF 1.57079632679f

// Structure for distributed resonance state
typedef struct {
    float phase;
    float omega_prime;
    float sigma;
    float damping;
    float rho_1_global;
    float rho_2_global;
    int is_resonant;
} DistributedResonanceState;

__global__ void local_sum_sq_kernel(const float* params, int count, float* out_sum) {
    extern __shared__ float sdata[];
    int tid = threadIdx.x;
    int i = blockIdx.x * blockDim.x + threadIdx.x;

    float local_sum = 0;
    while (i < count) {
        local_sum += params[i] * params[i];
        i += blockDim.x * gridDim.x;
    }
    sdata[tid] = local_sum;
    __syncthreads();

    for (unsigned int s=blockDim.x/2; s>0; s>>=1) {
        if (tid < s) {
            sdata[tid] += sdata[tid + s];
        }
        __syncthreads();
    }
    if (tid == 0) atomicAdd(out_sum, sdata[0]);
}

extern "C" {

// Wrapper to perform NCCL AllReduce on parameter norms and calculate resonance
void compute_global_resonance_nccl(
    ncclComm_t comm,
    cudaStream_t stream,
    const float* local_params,
    int local_count,
    unsigned long long global_tokens,
    float* d_local_sum, // temporary GPU buffer
    DistributedResonanceState* h_result,
    int rank,
    int world_size
) {
    // 1. Compute local squared norm
    cudaMemsetAsync(d_local_sum, 0, sizeof(float), stream);
    int threads = 256;
    int blocks = (local_count + threads - 1) / threads;
    if (blocks > 1024) blocks = 1024;
    local_sum_sq_kernel<<<blocks, threads, threads * sizeof(float), stream>>>(local_params, local_count, d_local_sum);

    // 2. Sync norms across all GPUs via NCCL
    float global_sum_sq = 0;
    float local_sum_sq_h = 0;
    cudaMemcpyAsync(&local_sum_sq_h, d_local_sum, sizeof(float), cudaMemcpyDeviceToHost, stream);
    cudaStreamSynchronize(stream);

    ncclAllReduce(&local_sum_sq_h, &global_sum_sq, 1, ncclFloat, ncclSum, comm, stream);
    cudaStreamSynchronize(stream);

    // 3. Final calculations (Host side for simplicity in this wrapper)
    float rho_1 = sqrtf(global_sum_sq) / 1e12f; // Scale to 1T params
    float rho_2 = (float)global_tokens / 1e13f; // Scale to 10T tokens
    float eps = 1e-9f;

    float sigma = (K1 * rho_1 * logf(rho_1 + eps) +
                   K2 * rho_2 * logf(rho_2 + eps) -
                   LAMBDA * (rho_1 * rho_1 + rho_2 * rho_2));

    float damping = fminf(1.0f, expf(-RHO_EQ * sigma));
    float raw_phase = atan2f(K2 * rho_2, K1 * rho_1 + eps);
    float theta = raw_phase * damping;

    // omega_prime simplified
    float omega_prime = (rho_1 * K1 + rho_2 * K2) / (damping + 0.1f);

    h_result->phase = theta;
    h_result->omega_prime = omega_prime;
    h_result->sigma = sigma;
    h_result->damping = damping;
    h_result->rho_1_global = rho_1;
    h_result->rho_2_global = rho_2;
    h_result->is_resonant = (fabsf(theta - PI_HALF) < 0.15f && omega_prime > 0.9f) ? 1 : 0;
}

}
