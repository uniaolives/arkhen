
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use crate::PhaseState;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CState {
    pub flow_id: String,
    pub global_coherence: f64,
    pub variables: HashMap<String, serde_json::Value>,
}

impl CState {
    pub fn new(flow_id: String) -> Self {
        Self {
            flow_id,
            global_coherence: 1.0,
            variables: HashMap::new(),
        }
    }

    pub fn apply_transformation(&mut self, node_id: &str, output: serde_json::Value) {
        self.variables.insert(node_id.to_string(), output);
        // Coherence decay simulation
        self.global_coherence *= 0.999;
    }
}
