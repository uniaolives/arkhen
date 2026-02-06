import re
from typing import List, Dict

# extension.py - breath-check v1.0
# VS Code extension scanner for medical firmware safety

def scan(code: str, device_type: str = "ventilator") -> List[Dict]:
    """Finds life-critical bugs in medical firmware."""
    risks = []
    code_lower = code.lower()

    # CRITICAL: Unbounded loops
    if re.search(r'while\s+true\s*[:{]', code_lower) and device_type in code_lower:
        risks.append({
            "severity": "CRITICAL",
            "pattern": "Unbounded loop in life-support control",
            "impact": "Patient could be deprived of breath during fault",
            "fix": "Add timeout with safe-state fallback (max 500ms loop)",
            "why": "Machines must fail safely when humans cannot intervene"
        })

    # HIGH: Missing watchdog
    if device_type in code_lower and 'watchdog' not in code_lower:
        risks.append({
            "severity": "HIGH",
            "pattern": "No watchdog timer for life-support system",
            "impact": "Single fault could halt breathing indefinitely",
            "fix": "Implement hardware watchdog with 100ms heartbeat",
            "why": "Redundancy isn't optional when breath is the output"
        })

    return risks

if __name__ == "__main__":
    test_code = """
    while True:
        ventilator_control()
    """
    results = scan(test_code)
    for r in results:
        print(f"[{r['severity']}] {r['pattern']}: {r['impact']}")
