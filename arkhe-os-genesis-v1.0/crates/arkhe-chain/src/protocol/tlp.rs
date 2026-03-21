// src/protocol/tlp.rs
//! Tzinor Link Protocol - Interface Bio-Digital

use serde::{Deserialize, Serialize};

/// Cabeçalho do Pacote TLP
#[derive(Serialize, Deserialize, Debug)]
struct TLPHeader {
    sync_word: u16,      // 0xA5A5 (Sincronismo)
    payload_len: u16,    // Tamanho do payload
    checksum: u16,       // CRC-16
}

/// Tipos de Mensagem (Opcodes)
#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum TLPMessage {
    /// Sinais Neurais (Bio → VerCore)
    /// Contém arrays de timestamps de spikes ou valores de tensão LFP
    NeuralData {
        timestamp: u64,
        channel_mask: u32,     // Canais ativos
        spike_counts: [u8; 32], // Contagem de spikes por canal
        lfp_sample: [f32; 4],   // Amostras de Potencial de Campo Local
    },

    /// Sinais Vitais (Bio → VerCore)
    VitalSigns {
        temperature: f32,   // Temperatura do banho
        ph_level: f32,      // pH
        perfusion_rate: f32, // Taxa de perfusão (ml/min)
        oxygen_level: f32,   // pO2
    },

    /// Comando de Estímulo (VerCore → Bio)
    StimulusCommand {
        target_region: u8,    // Região do organoide
        amplitude_uv: f32,    // Amplitude em micro-volts
        frequency_hz: f32,    // Frequencia de estimulação
        duration_ms: u16,
    },

    /// Ajuste de Parâmetros (VerCore → Bio)
    ParamUpdate {
        flow_rate_adjust: f32,
        temp_adjust: f32,
    },
}

/// Pacote Completo
#[derive(Serialize, Deserialize, Debug)]
pub struct TLPPacket {
    header: TLPHeader,
    payload: TLPMessage,
}

impl TLPPacket {
    pub fn new(payload: TLPMessage) -> Self {
        Self {
            header: TLPHeader {
                sync_word: 0xA5A5,
                payload_len: 0, // Placeholder
                checksum: 0,    // Placeholder
            },
            payload,
        }
    }
}
