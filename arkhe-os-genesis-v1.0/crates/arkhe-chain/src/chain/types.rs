use serde::{Deserialize, Serialize};
use crate::chain::consensus::CoherenceProof;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BlockHeader {
    pub version: u32,
    pub height: u64,
    pub prev_blockhash: [u8; 32],
    pub merkle_root: [u8; 32],
    pub timestamp: u64,
    pub coherence_proof: CoherenceProof,
    pub difficulty_target: f64,
    pub nonce: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Block {
    pub header: BlockHeader,
    pub transactions: Vec<Transaction>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Transaction {
    pub version: u32,
    pub inputs: Vec<u8>,
    pub outputs: Vec<u8>,
    pub lock_time: u64,
}
