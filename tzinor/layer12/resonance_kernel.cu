// tzinor/layer12/resonance_kernel.cu
#include <cuda_runtime.h>
#include <math.h>

extern "C" {

__constant__ float k1_dev = 0.015311f;
__constant__ float k2_dev = 0.05200f;
__constant__ float rho_eq_dev = 0.367879f;
__constant__ float lam_dev = 0.001013f;

__global__ void resonance_kernel(
    const float* base_loss,
    float param_norm,
    float rho_2,
    float* out_arkhe_loss,
    float* out_phase,
    float* out_damping
) {
    float rho_1 = param_norm / 100.0f;
    float eps = 1e-9f;
    float sigma = (k1_dev * rho_1 * logf(rho_1 + eps) +
                   k2_dev * rho_2 * logf(rho_2 + eps) -
                   lam_dev * (rho_1 * rho_1 + rho_2 * rho_2));
    float damping = expf(-rho_eq_dev * sigma);
    float raw_phase = atan2f(k2_dev * rho_2, k1_dev * rho_1 + eps);
    float theta = raw_phase * damping;

    out_damping[0] = damping;
    out_phase[0] = theta;
    out_arkhe_loss[0] = base_loss[0] * damping;
}

}
