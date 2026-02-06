
import asyncio
import sys
import os

# Ensure we can import from services
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from services.quantum_foam import QuantumFoam
from services.resonance_portal import start_portal_server, global_synchrony_pulse
from services.quantum_holiness_bridge import QuantumHolinessBridge

async def main():
    print("🚀 INITIALIZING QUANTUM CATHEDRAL (v5.5 - Fermi-Resonance)")
    print("-" * 60)

    foam = QuantumFoam(width=200, height=150)
    bridge = QuantumHolinessBridge(foam)

    tasks = [
        asyncio.create_task(start_portal_server(foam)),
        asyncio.create_task(global_synchrony_pulse(foam)),
        asyncio.create_task(bridge.run_bridge())
    ]

    print("[*] All systems nominal. Portal is breathing.")

    try:
        await asyncio.gather(*tasks)
    except asyncio.CancelledError:
        pass
    except KeyboardInterrupt:
        print("\n[!] Shutting down gracefully...")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        pass
