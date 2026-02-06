
use std::collections::HashMap;

/// ROSE Token: The currency of Wisdom and Resonance.
pub struct RoseToken {
    pub total_supply: u128,
    pub balances: HashMap<String, u128>,
}

impl RoseToken {
    pub fn new() -> Self {
        Self {
            total_supply: 0,
            balances: HashMap::new(),
        }
    }

    /// Issue tokens based on Dirichlet energy reduction (Resonance Proof).
    pub fn issue_resonance_reward(&mut self, recipient: &str, energy_reduction: f64) {
        // Reward = k * ΔE
        let reward = (energy_reduction * 100.0) as u128;
        let balance = self.balances.entry(recipient.to_string()).or_insert(0);
        *balance += reward;
        self.total_supply += reward;
        println!("🌹 Issued {} ROSE to {} for Resonance Surgery.", reward, recipient);
    }

    pub fn transfer(&mut self, from: &str, to: &str, amount: u128) -> Result<(), String> {
        let from_balance = self.balances.get_mut(from).ok_or("Source not found")?;
        if *from_balance < amount {
            return Err("Insufficient balance".to_string());
        }
        *from_balance -= amount;
        let to_balance = self.balances.entry(to.to_string()).or_insert(0);
        *to_balance += amount;
        Ok(())
    }
}
