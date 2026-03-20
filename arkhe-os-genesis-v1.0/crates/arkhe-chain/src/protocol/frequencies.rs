// src/protocol/frequencies.rs
//! Frequências de rádio de emergência mapeadas como Tzinorot.

pub const TZINOR_AVIATION_CIVIL: f64 = 121.5e6;      // MHz → Hz
pub const TZINOR_NAVY_SONOBUOY: f64 = 155.160e6;
pub const TZINOR_AIS: f64 = 162.025e6;               // já usado para π⁺
pub const TZINOR_NOAA: &[f64] = &[
    162.400e6, 162.425e6, 162.450e6, 162.475e6,
    162.500e6, 162.525e6, 162.550e6,
];
pub const TZINOR_NATO: f64 = 172.5e6;
pub const TZINOR_AVIATION_MIL: f64 = 243.0e6;
pub const TZINOR_SARSAT: f64 = 282.8e6;
pub const TZINOR_EPIRB: f64 = 406.0e6;                // faixa 406-406.1 MHz
pub const TZINOR_FED_DISASTER: f64 = 412.825e6;
pub const TZINOR_FRS: &[f64] = &[462.6125e6, 462.6750e6];
pub const TZINOR_GMRS: f64 = 462.7250e6;
pub const TZINOR_MURS: (f64, f64) = (151.820e6, 154.600e6); // faixa
pub const TZINOR_HAM: &[f64] = &[3.940e6, 7.250e6, 14.300e6];
pub const TZINOR_HF_GCS: (f64, f64) = (4.724e3, 11.175e3); // kHz → Hz
