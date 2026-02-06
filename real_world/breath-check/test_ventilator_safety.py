from extension import scan
import traceback

def test_infinite_loop_detection():
    code = """
    # Ventilator control loop
    while True:
        pressure = read_sensor()
        if pressure > threshold:
            adjust_valve()
    """
    risks = scan(code, "ventilator")
    assert any(r['severity'] == 'CRITICAL' for r in risks)
    print("✓ Infinite loop detection: PASS")

def test_watchdog_requirement():
    code = """
    # Main ventilator logic
    def ventilator_control():
        while running:
            cycle_breath()
    """
    risks = scan(code, "ventilator")
    assert any('watchdog' in r['pattern'].lower() for r in risks)
    print("✓ Watchdog requirement: PASS")

if __name__ == "__main__":
    try:
        test_infinite_loop_detection()
        test_watchdog_requirement()
        print("\n✅ All safety checks passed. Ready for real firmware.")
    except Exception as e:
        print(f"❌ Test failed:")
        traceback.print_exc()
