
use std::collections::{BTreeMap, HashSet};
use std::cell::RefCell;

#[derive(Clone, Debug, PartialEq)]
pub enum EnergyState {
    Ground,
    Excited(u8),
    Metastable,
    Degenerate,
}

#[derive(Clone, Debug)]
pub struct FermionicIdentity {
    pub public_key: String,
    pub spin_signature: String,
    pub energy_state: EnergyState,
    pub occupation_number: u64,
}

pub struct FermionLedger {
    pub fermions: BTreeMap<String, FermionicIdentity>,
    pub contribution_hashes: HashSet<String>,
}

impl FermionLedger {
    pub fn new() -> Self {
        Self {
            fermions: BTreeMap::new(),
            contribution_hashes: HashSet::new(),
        }
    }

    /**
     * Pauli Exclusion Principle Implementation:
     * Two identical contributions cannot occupy the same state.
     */
    pub fn contribute(&mut self, id: String, hash: String, entropy_reduction: f64) -> Result<(), String> {
        if self.contribution_hashes.contains(&hash) {
            return Err("Pauli Violation: Identical contribution already exists.".to_string());
        }

        if let Some(fermion) = self.fermions.get_mut(&id) {
            fermion.occupation_number += 1;
            fermion.energy_state = self.calculate_transition(fermion.occupation_number);
            self.contribution_hashes.insert(hash);
            println!("⚛️ Pauli Contribution accepted for {}. New State: {:?}", id, fermion.energy_state);
            Ok(())
        } else {
            Err("Fermion not registered.".to_string())
        }
    }

    fn calculate_transition(&self, n: u64) -> EnergyState {
        if n > 21 { EnergyState::Degenerate }
        else if n > 10 { EnergyState::Metastable }
        else if n > 0 { EnergyState::Excited(n as u8) }
        else { EnergyState::Ground }
    }

    pub fn register(&mut self, id: String) {
        let f = FermionicIdentity {
            public_key: id.clone(),
            spin_signature: "up".to_string(),
            energy_state: EnergyState::Ground,
            occupation_number: 0,
        };
        self.fermions.insert(id, f);
        println!("⚛️ New Fermion registered in the cold dark matter layer.");
    }
}

thread_local! {
    static LEDGER: RefCell<FermionLedger> = RefCell::new(FermionLedger::new());
}

fn main() {
    println!("🌌 Fermionic Ledger (Structural Stability) Operational.");
}
