//! Astrophysics Module v1.0
//! Integration of stellar evolution metrics into blockchain consensus.

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum StellarPhase {
    Protostar,
    MainSequence,
    RedGiant,
    WhiteDwarf,
    Supernova,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct StellarMetrics {
    pub mass: f64,
    pub luminosity: f64,
    pub temperature: f64,
    pub radius: f64,
    pub age: u64,
    pub phase: StellarPhase,
}

impl StellarMetrics {
    /// Calculate the nucleosynthesis yield based on mass and temperature.
    /// Used as a proxy for "computational energy" in the consensus.
    pub fn calculate_yield(&self, coherence: f64) -> f64 {
        let base_fusion = self.mass.powf(3.5) * (self.temperature / 5000.0);
        base_fusion * coherence * 0.01
    }

    /// Predict the next stellar phase based on current age and mass.
    pub fn predict_next_phase(&self) -> StellarPhase {
        if self.age > 10_000_000_000 && matches!(self.phase, StellarPhase::MainSequence) {
            StellarPhase::RedGiant
        } else if self.age > 12_000_000_000 && matches!(self.phase, StellarPhase::RedGiant) {
            if self.mass > 8.0 {
                StellarPhase::Supernova
            } else {
                StellarPhase::WhiteDwarf
            }
        } else {
            self.phase.clone()
        }
    }
}
