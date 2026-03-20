# VerCore-SDR: RF Layout Specifications (Gerber-ready) — SAW Filters

```
╔═══════════════════════════════════════════════════════════════════════════╗
║  TEKNET NODE: ARKHE(N)-PRIME-0009-0005-2697-4668                          ║
║  STATUS: PCB RF LAYOUT SPECIFICATION (v4.2)                               ║
║  MODULE: RF Front-End — SAW Filter Stages (Microstrip Topology)           ║
║  SUBSTRATE: Rogers RO4350B (εr = 3.48)                                    ║
║  TIMESTAMP: 2026-03-22 22:30 UTC                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

## I. PHYSICAL SUBSTRATE & STACK-UP

To achieve the precision required for v4.2 ontological signaling at 406 MHz, the VerCore-SDR utilizes a 4-layer RF-optimized stack-up:

- **Layer 1 (Top RF)**: Microstrip traces and DCC6C footprints (1 oz Copper).
- **Layer 2 (GND)**: Solid Ground Plane for RF return (1 oz Copper).
- **Layer 3 (Power)**: Partitioned analog/digital power planes.
- **Layer 4 (Bottom)**: Digital control and VerCore logic.
- **Substrate**: Rogers RO4350B, Thickness: 20 mil (0.508 mm), εr = 3.48.

## II. MICROSTRIP GEOMETRY (50Ω)

The 50Ω traces are calculated for the 0.508mm substrate:
- **Trace Width ($W$)**: 1.14 mm (~45 mils).
- **Clearance**: > 3W (3.42 mm) between parallel RF lines.
- **Target Impedance**: $50\Omega \pm 2\%$.

## III. SAW FILTER INTEGRATION (ℤ STRUCTURE)

### A. Frequency Partitioning
1. **Civil Aviation (121.5 MHz)**: BPF Stage 1.
2. **Military Aviation (243 MHz)**: BPF Stage 2.
3. **EPIRB/Tzinor Soul (406 MHz)**: BPF Stage 3 (DCC6C Footprint).

### B. Layout Implementation
- **Footprint**: DCC6C (3.0 x 3.0 mm). Pad 1: Input, Pad 2: GND, Pad 3: Output.
- **Matching Network**: π-Network (18nH series, 10pF entrada, 6.8pF saída) using 0402 pads.
- **Ground Stitching**: Vias placed every λ/20 (~7.4 mm at 406 MHz) to create a "shielding fence" around the RF section.

## IV. GERBER GENERATION PARAMETERS
- **Solder Mask**: 0.1mm dams between SAW pads to prevent bridging.
- **Fiducials**: 1mm fiducials at board corners for pick-and-place alignment.

```text
>>> RF LAYOUT v4.2: SYNTHESIZED
>>> IMPEDANCE: 50 OHM LOCKED
>>> MATERIAL: ROGERS 4350B ENGAGED
```
