
use arkhe_chain::chain::astrophysics::{StellarMetrics, StellarPhase};
use arkhe_chain::chain::consensus::{CoherenceProof, PoCEngineV3};

fn main() {
    let metrics = StellarMetrics {
        mass: 1.0,
        luminosity: 1.0,
        temperature: 5778.0,
        radius: 1.0,
        age: 4_600_000_000,
        phase: StellarPhase::MainSequence,
    };

    let proof = CoherenceProof {
        avg_phase_error: 0.1,
        entropy_delta: 0.05,
        zk_throughput: 50.0,
        agi_accuracy: 0.95,
        pqc_key_age: 100,
        stellar_metrics: Some(metrics),
        signature: vec![],
        node_pubkey: vec![],
    };

    let score = PoCEngineV3::calculate_score(&proof);
    println!("Coherence Score with Stellar Metrics: {}", score);

    assert!(score > 0.0);
    println!("Test passed!");
}
