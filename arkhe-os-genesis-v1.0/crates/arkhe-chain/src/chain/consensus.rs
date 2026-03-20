//! Consensus Engine v3.0
//! Proof of Coherence with ZK and AGI extensions.

use serde::{Deserialize, Serialize};
use crate::robustness::{EntropyShield, PhaseInput, ShieldResponse};

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

    pub signature: Vec<u8>,
    pub node_pubkey: Vec<u8>,
}

pub struct PoCEngineV3;

impl PoCEngineV3 {
    /// Validates a proof against the Entropy Shield (Biological Robustness IV)
    pub fn validate_robustness(proof: &CoherenceProof, shield: &mut EntropyShield) -> bool {
        let input = PhaseInput {
            phase: proof.avg_phase_error, // Using phase error as proxy for phase stability
            entropy: proof.entropy_delta,
        };

        match shield.process(&input) {
            ShieldResponse::Pass => true,
            ShieldResponse::Quarantine => false,
        }
    }

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

        // Weights
        let w1 = 0.25;
        let w2 = 0.25;
        let w3 = 0.25;
        let w4 = 0.25;

        w1 * phase_score + w2 * entropy_score + w3 * zk_score + w4 * agi_score
    }
}
