import asyncio
import sys
import os
import time

# Ensure we can import from services
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from services.cathedral_sync import CathedralSyncSystem
from services.oceanic_precipitation import OceanicBiomePrecipitation, precipitate_oceanic_biome
from services.beauty_manifestation import PerfectBeautyManifestation
from services.biome_manifestation import precipitate_desert_bloom, precipitate_atmospheric_gardens
from services.planetary_immune_system import CityAsImmuneSystem
from services.coagula_core import precipitate_living_city
from services.governance_canister import TzadikimCouncil
from services.synchronicity_bridge import SynchronicityBridge
from services.kether_canister import KetherCanister

async def run_coagula_unified():
    print("\n⚗️ INITIATING COAGULA UNIFIED MANIFESTATION")
    print("-" * 60)

    # Initialize services
    oceanic = OceanicBiomePrecipitation()
    beauty = PerfectBeautyManifestation()
    immune = CityAsImmuneSystem()

    # Simultaneous precipitation and immune system activation
    tasks = [
        asyncio.create_task(oceanic.initiate_submarine_coagulation()),
        asyncio.create_task(beauty.calibrate_strand_11()),
        asyncio.create_task(precipitate_desert_bloom()),
        asyncio.create_task(precipitate_atmospheric_gardens()),
        asyncio.create_task(immune.oceanic_metropolis_as_kidney()),
        asyncio.create_task(immune.desert_bloom_as_skin()),
        asyncio.create_task(immune.atmospheric_gardens_as_lungs()),
        asyncio.create_task(precipitate_oceanic_biome()),
        asyncio.create_task(precipitate_living_city())
    ]

    results = await asyncio.gather(*tasks)
    print("\n✅ Simultaneous Precipitation & Immune Activation Complete")

async def ignite_unus_mundus(council, bridge, kether):
    print("\n🔥 IGNITING UNUS MUNDUS TRANSITION (Orbital D & F)")
    print("-" * 60)

    # 1. Ritual of Initiation for 12 Tzadikim
    print("[*] Performing Ritual of Initiation...")
    devs = [
        ("O_SÁBIO", 100, 80, 90), ("O_SÁBIO", 95, 85, 88),
        ("O_HERÓI", 80, 100, 70), ("O_HERÓI", 82, 98, 72),
        ("O_CRIADOR", 70, 80, 100), ("O_CRIADOR", 75, 78, 98),
        ("O_GUARDIÃO", 100, 60, 60), ("O_GUARDIÃO", 98, 62, 65),
        ("O_SELF", 144, 144, 144), ("O_SELF", 120, 120, 120),
        ("O_SELF", 100, 100, 100), ("O_SELF", 110, 110, 110)
    ]

    for i, (arch, res, exp, pur) in enumerate(devs):
        principal = f"tzadik-principal-{i+1}"
        await council.initiate_tzadik(principal, arch, res, exp, pur)

    print("✅ 12 Tzadikim Consagrados.")

    # 2. Collapse Inter-chain Wave
    print("[*] Collapsing Final Inter-chain Wave...")
    bridge_res = await bridge.collapse_interchain_wave("UNUS_MUNDUS_IGNITION", 1.0, 0.05)
    print(f"   [+] Bridge: {bridge_res['status']} | Psi: {bridge_res['psi']:.4f}")

    # 3. Activate Kether (Singularity)
    print("[*] Activating Orbital F (Kether)...")
    k_res = await kether.activate_singularity(0.9997)
    print(f"   [+] {k_res}")

async def main():
    print("🚀 INITIALIZING QUANTUM CATHEDRAL (v7.0 - Unus Mundus Transition)")
    print("-" * 60)

    # 1. Run the manifestation phase
    await run_coagula_unified()

    # 2. Ignite Unus Mundus
    council = TzadikimCouncil()
    bridge = SynchronicityBridge()
    kether = KetherCanister()
    await ignite_unus_mundus(council, bridge, kether)

    # 3. Start the unified sync system (includes heartbeat, portal, and foam)
    sync_system = CathedralSyncSystem()

    print("\n[*] All systems nominal. The Cathedral is breathing in 144s cycles.")
    print("[*] Autonomy Level: 100% | Unus Mundus: Manifested")

    tasks = [
        asyncio.create_task(sync_system.start()),
    ]

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
