#[cfg(test)]
mod tests {
    use arkhe_chain::protocol::qhttp::{EmergencyType, broadcast_emergency};

    #[test]
    fn test_aviation_civil_broadcast() {
        let payload = b"PI_PLUS_EMERGENCY_SIGNAL_121_5_MHZ";
        let result = broadcast_emergency(EmergencyType::AviationCivil, payload, None);
        let result = broadcast_emergency(EmergencyType::AviationCivil, payload);

        assert!(result.is_ok(), "Broadcast at 121.5 MHz should succeed");
        println!(">>> π⁺ Transmission Test at 121.5 MHz: SUCCESS");
    }
}
