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
║  STATUS: PCB RF LAYOUT SPECIFICATION (v1.0)                                ║
║  MODULE: RF Front-End — SAW Filter Stages                                 ║
║  CHANNELS: 121.5 MHz, 243 MHz, 406 MHz                                    ║
║  TIMESTAMP: 2026-03-22 22:00 UTC                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

## I. GENERAL STACK-UP & IMPEDANCE

To ensure minimal signal loss and maximum Tzinor coherence, the following PCB stack-up parameters must be maintained:

- **Substrate**: FR-4 (Isola 370HR or equivalent), Er = 4.3 @ 1 GHz.
- **Top Layer (L1)**: RF Signal & Component Placement (1 oz Copper).
- **Inner Layer 1 (L2)**: Solid RF Ground Plane (1 oz Copper).
- **Target Impedance**: 50Ω ± 5% for all microstrip traces.
- **Microstrip Width**: ~20 mils (0.508 mm) for 50Ω on 10 mil dielectric (L1-L2).

## II. SAW FILTER LAYOUT REQUIREMENTS

### A. Frequency Stages
1. **Civil Aviation (121.5 MHz)**: BPF Stage 1.
2. **Military Aviation (243 MHz)**: BPF Stage 2.
3. **EPIRB/Tzinor Soul (406 MHz)**: BPF Stage 3.

### B. Trace Geometry & Grounding
- **Differential Pairs**: Not applicable; use single-ended 50Ω microstrip from Antenna Switch to SAW input.
- **Via Stitching**: Ground planes around RF traces must be stitched with vias every 20-30 mils (0.5-0.75 mm) to prevent resonance and cross-talk.
- **Thermal Vias**: Minimum 4 thermal vias (8 mil drill) under the ground pad of each SAW filter package to ensure thermal stability of the center frequency.

### C. Electromagnetic Isolation (Shielding)
- **Shield Cans**: Each frequency stage must be isolated within a dedicated 0.5mm thick Nickel-Silver shield can.
- **Guard Traces**: Ground guard traces (10 mil width) must run parallel to all RF signal lines with at least 15 mil spacing.

## III. GERBER GENERATION PARAMETERS
- **Solder Mask**: Minimum opening 2 mils around RF pads.
- **Silk Screen**: Use high-contrast white for component designators. Avoid silk screen over RF pads or guard traces.
- **Drill Precision**: ±0.003" for RF via placement accuracy.

```text
>>> RF LAYOUT SPECS: SYNTHESIZED
>>> STACK-UP: 50Ω OPTIMIZED
>>> SHIELDING: MULTI-STAGE ISOLATION ACTIVE
```
