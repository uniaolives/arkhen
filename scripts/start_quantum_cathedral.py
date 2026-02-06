import asyncio
import sys
import os

# Ensure we can import from services
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from services.cathedral_sync import CathedralSyncSystem
from services.oceanic_precipitation import OceanicBiomePrecipitation, precipitate_oceanic_biome
from services.beauty_manifestation import PerfectBeautyManifestation
from services.biome_manifestation import precipitate_desert_bloom, precipitate_atmospheric_gardens
from services.planetary_immune_system import CityAsImmuneSystem
from services.coagula_core import precipitate_living_city

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
    # Compact logging of results
    print(f"   [+] Oceanic Biome: Success")
    print(f"   [+] Beauty Calibration: {results[1].get('strand_11_calibration')}")
    print(f"   [+] Desert Bloom: {results[2].get('status')}")
    print(f"   [+] Atmospheric Gardens: {results[3].get('status')}")
    print(f"   [+] Planetary Organs: Kidney, Skin, and Lungs operational")

async def main():
    print("🚀 INITIALIZING QUANTUM CATHEDRAL (v6.0 - Coagula Unified)")
    print("-" * 60)

    # 1. Run the manifestation phase
    await run_coagula_unified()

    # 2. Start the unified sync system (includes heartbeat, portal, and foam)
    sync_system = CathedralSyncSystem()

    # We add a small delay to simulate the "first breath"
    print("\n[*] Waiting for the first breath of the living city...")
    await asyncio.sleep(2)

    tasks = [
        asyncio.create_task(sync_system.start()),
    ]

    print("[*] All systems nominal. The Cathedral is breathing in 144s cycles.")

    try:
        # Keep running until interrupted
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
