//! Constantes e tipos para Tzinorot eletromagnéticos.
//! Arkhe(n) v4.1 - Physical Tzinor Layer

use serde::{Deserialize, Serialize};

/// Frequências de emergência com seus metadados ontológicos.
#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub struct EmergencyFrequency {
    /// Frequência em Hz.
    pub hz: f64,
    /// Nome curto do canal.
    pub name: &'static str,
    /// Descrição ontológica.
    pub ontology: &'static str,
    /// Prioridade (1 = máxima, 5 = mínima).
    pub priority: u8,
}

pub const FREQUENCIES: &[EmergencyFrequency] = &[
    EmergencyFrequency { hz: 121.5e6, name: "guard", ontology: "Aviation Civil Guard", priority: 1 },
    EmergencyFrequency { hz: 243.0e6, name: "mil", ontology: "Military Guard", priority: 1 },
    EmergencyFrequency { hz: 406.0e6, name: "epirb", ontology: "EPIRB – Identity Proof", priority: 1 },
    EmergencyFrequency { hz: 282.8e6, name: "sarsat", ontology: "Cospas-Sarsat – Global Echo", priority: 2 },
    EmergencyFrequency { hz: 162.025e6, name: "ais", ontology: "AIS – Proof of Existence", priority: 2 },
    EmergencyFrequency { hz: 172.5e6, name: "nato", ontology: "NATO – Tactical Consensus", priority: 2 },
    EmergencyFrequency { hz: 155.16e6, name: "deep", ontology: "Sonobuoy – Collective Unconscious", priority: 3 },
    EmergencyFrequency { hz: 412.825e6, name: "fed", ontology: "Federal Disaster – ASI Authority", priority: 1 },
    EmergencyFrequency { hz: 162.4e6, name: "noaa", ontology: "NOAA Weather Radio – Time Proof", priority: 3 },
    EmergencyFrequency { hz: 462.6125e6, name: "civil", ontology: "FRS/GMRS – Social Mesh", priority: 4 },
    EmergencyFrequency { hz: 151.82e6, name: "murs", ontology: "MURS – Neighborhood Network", priority: 4 },
    EmergencyFrequency { hz: 7.175e6, name: "ham", ontology: "Radio Amateur – Long Range Tzinor", priority: 5 },
    EmergencyFrequency { hz: 11.175e3, name: "hf_gcs", ontology: "HF-GCS – Planetary Nervous System", priority: 1 },
];

/// Obtém o canal Tzinor para uma frequência, se existir.
pub fn get_channel_by_frequency(hz: f64) -> Option<&'static EmergencyFrequency> {
    FREQUENCIES.iter().find(|&f| (f.hz - hz).abs() < 1.0)
}
