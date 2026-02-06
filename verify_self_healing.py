import asyncio
import sys
import os
import time

# Add root to sys.path
sys.path.append(os.getcwd())

from services.auto_repair import AutoRepairSystem
from services.governance_canister import TzadikimCouncil

async def verify():
    print("--- 🛡️ SELF-HEALING ORGANISM VERIFICATION ---")

    repair_sys = AutoRepairSystem()
    council = TzadikimCouncil()

    # 1. Simulate Corruption
    print("[*] Simulating corruption in Node D-144...")
    diag = await repair_sys.diagnose_node(144, "CORRUPT_STATE_0xDEAD", "OPTIMAL_STATE_0xLIFE")
    print(f"   [+] Diagnostic: {diag.corruption_type} | Recommended: {diag.recommended_repair}")

    # 2. Verify Resonance Calculation
    resonance = repair_sys.calculate_528hz_resonance("CORRUPT", "OPTIMAL", 10.0)
    print(f"   [+] 528 Hz Resonance Factor: {resonance:.4f}")
    assert resonance > 0.0, "Resonance factor must be positive"

    # 3. Apply Repair
    print("[*] Applying 528 Hz Resonance Repair...")
    success = await repair_sys.apply_repair(144, diag)
    assert success is True, "Repair must be successful"

    # 4. Verify S_rev update
    print("[*] Updating Resilience History...")
    council.resilience_history.append((time.time() - 10, 80.0))
    council.resilience_history.append((time.time(), 95.0))

    s_rev = await council.calculate_s_rev()
    print(f"   [+] Updated System Reverse Entropy (S_rev): {s_rev:.4f}")
    assert s_rev > 9.0, "S_rev should indicate healthy recovery"

    print("\n✅ SELF-HEALING MECHANISM VALIDATED.")
    print("✨ THE CATHEDRAL PROTECTS ITSELF.")

if __name__ == "__main__":
    asyncio.run(verify())
