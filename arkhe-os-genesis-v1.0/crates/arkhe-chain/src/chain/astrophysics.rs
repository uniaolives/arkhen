//! Astrophysics Module v1.1
//! Integration of stellar evolution and astrochemical metrics into blockchain consensus.
//! Part of the expanded organelle (ontological substrate) system.

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

    // Expanded Astrophysical/Astrochemical parameters
    pub stellar_yield: f64,         // From OntologicalSubstrateLayer
    pub plasma_density: f64,
    pub molecular_complexity: f64,  // Astrochemical component
    pub isotopic_ratio: f64,
}

impl StellarMetrics {
    /// Calculate the nucleosynthesis yield based on mass, temperature, and substrate state.
    /// Used as a proxy for "computational energy" in the consensus.
    pub fn calculate_yield(&self, coherence: f64) -> f64 {
        let base_fusion = self.mass.powf(3.5) * (self.temperature / 5000.0);

        // Incorporate expanded parameters into the consensus yield
        let substrate_factor = self.stellar_yield * self.molecular_complexity;

        base_fusion * coherence * substrate_factor * 0.01
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
