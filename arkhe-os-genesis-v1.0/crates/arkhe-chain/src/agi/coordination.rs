use crate::protocol::qhttp::{EmergencyType, broadcast_emergency};
use std::collections::HashMap;

/// Disaster Coordinator for Multi-Node SDR networks.
/// Logic for distributed signal fusion and autonomous node allocation.
pub struct AsiEmergencyCoordinator {
    pub active_nodes: HashMap<String, NodeStatus>,
    pub signal_priority_threshold: f64,
}

pub struct NodeStatus {
    pub id: String,
    pub frequency: f64,
    pub power: f64,
    pub coherence: f64,
}

impl AsiEmergencyCoordinator {
    pub fn new(threshold: f64) -> Self {
        Self {
            active_nodes: HashMap::new(),
            signal_priority_threshold: threshold,
        }
    }

    /// Recebe um sinal de emergência e coordena a resposta entre nós disponíveis.
    pub fn coordinate_disaster_response(&self, emergency: EmergencyType, payload: &[u8]) {
        let freq = emergency.frequency();
        println!(">>> ASI COORDINATOR: DISASTER EVENT DETECTED ON {:.3} MHz", freq / 1e6);

        // Simulação de fusão de dados e triangulação
        for (node_id, status) in &self.active_nodes {
            if status.coherence > self.signal_priority_threshold {
                println!(">>> NODE {}: COMMANDEERING FOR EMERGENCY BROADCAST", node_id);
                let _ = broadcast_emergency(EmergencyType::AviationCivil, payload);
            }
        }
    }

    pub fn register_node(&mut self, node: NodeStatus) {
        self.active_nodes.insert(node.id.clone(), node);
    }
}
