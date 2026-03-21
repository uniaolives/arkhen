use crate::chain::types::*;
use crate::chain::consensus::CoherenceProof;

pub fn create_genesis_block() -> Block {
    Block {
        header: BlockHeader {
            version: 3,
            height: 0,
            prev_blockhash: [0; 32],
            merkle_root: [0; 32],
            timestamp: 1700000000,
            coherence_proof: CoherenceProof {
                avg_phase_error: 0.0,
                entropy_delta: 0.0,
                zk_throughput: 0.0,
                agi_accuracy: 1.0,
                pqc_key_age: 0,
                signature: vec![],
                node_pubkey: vec![],
            },
            difficulty_target: 0.0,
            nonce: 0,
        },
        transactions: vec![],
    }
}
