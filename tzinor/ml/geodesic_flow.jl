# tzinor/ml/geodesic_flow.jl
# GEODÉSICA DO GRADIENTE (ARKHE-ML)

using LinearAlgebra

struct GravitationalParameters
    k1::Float64
    k2::Float64
    k3::Float64
    k4::Float64
end

function compute_geodesic(v::Vector{Float64}, gp::GravitationalParameters)
    rho = norm(v)^2
    dtau = 1.0 - gp.k1 * rho
    return dtau
end

gp = GravitationalParameters(0.015311, 0.05200, 0.233, 0.09778)
println("Dilatação temporal (ρ=0.5): ", compute_geodesic([0.5, 0.5], gp))
