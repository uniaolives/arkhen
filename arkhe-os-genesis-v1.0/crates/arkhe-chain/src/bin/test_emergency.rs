use arkhe_chain::protocol::qhttp::{EmergencyType, broadcast_emergency};

fn main() {
    let payload = b"PI_PLUS_EMERGENCY_SIGNAL_121_5_MHZ";
    let result = broadcast_emergency(EmergencyType::AviationCivil, payload, None);

    if result.is_ok() {
        println!(">>> π⁺ Transmission Test at 121.5 MHz: SUCCESS");
    } else {
        println!(">>> π⁺ Transmission Test at 121.5 MHz: FAILED");
        std::process::exit(1);
    }
}
