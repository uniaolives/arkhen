//! Consensus Engine v3.0
//! Proof of Coherence with ZK and AGI extensions.

use serde::{Deserialize, Serialize};
use crate::chain::astrophysics::StellarMetrics;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CoherenceProof {
    // Phase & Entropy (v1.0)
    pub avg_phase_error: f64,
    pub entropy_delta: f64,

    // --- NEW v3.0 METRICS ---
    /// ZK Performance: Proofs generated per second
    pub zk_throughput: f64,
    /// AGI Accuracy: % of correct block validity predictions
    pub agi_accuracy: f64,
    /// PQC Key Freshness: Age of Kyber keys in blocks
    pub pqc_key_age: u64,

    /// --- NEW v4.0 METRICS ---
    /// Stellar Metrics: Integration of celestial thermodynamics into Proof of Coherence.
    pub stellar_metrics: Option<StellarMetrics>,

    pub signature: Vec<u8>,
    pub node_pubkey: Vec<u8>,
}

pub struct PoCEngineV3;

impl PoCEngineV3 {
    /// Calculate Coherence Score v3
    ///
    /// C = w1*(phase) + w2*(entropy) + w3*(zk) + w4*(agi)
    pub fn calculate_score(proof: &CoherenceProof) -> f64 {
        let phase_score = 1.0 / (1.0 + proof.avg_phase_error);
        let entropy_score = 1.0 / (1.0 + proof.entropy_delta);

        // Reward nodes that contribute to privacy (ZK)
        let zk_score = (proof.zk_throughput / 100.0).min(1.0);

        // Reward nodes with high AGI prediction accuracy
        let agi_score = proof.agi_accuracy;

        // NEW v4.0: Stellar nucleosynthesis yield as a weight multiplier
        let stellar_yield = if let Some(metrics) = &proof.stellar_metrics {
            metrics.calculate_yield(1.0 - proof.avg_phase_error.min(1.0))
        } else {
            0.0
        };

        // Weights
        let w1 = 0.20;
        let w2 = 0.20;
        let w3 = 0.20;
        let w4 = 0.20;
        let w5 = 0.20;

        let base_score = w1 * phase_score + w2 * entropy_score + w3 * zk_score + w4 * agi_score;
        let stellar_contribution = w5 * (stellar_yield / 100.0).min(1.0);

        base_score + stellar_contribution
    }
}
