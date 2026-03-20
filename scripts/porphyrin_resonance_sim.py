import numpy as np
import matplotlib.pyplot as plt

def simulate_porphyrin_resonance_v4_2(sha_hash_hex):
    """
    Simulates the vibrational response of porphyrin to a SHA-256 hash (v4.2).
    Mapeamento: 64-bit segments -> specific vibrational modes.
    """
    hash_bytes = bytes.fromhex(sha_hash_hex)

    # 4 segments of 64 bits each (8 bytes)
    segments = [int.from_bytes(hash_bytes[i:i+8], 'big') for i in range(0, 32, 8)]

    # v4.2 Base Modes (cm-1)
    base_modes = {
        'Ring Breathing': 1370,
        'C=C Stretch': 1550,
        'C-H Bend': 1175,
        'C-N Stretch': 1500
    }

    spectrum_x = np.linspace(500, 2000, 5000)
    spectrum_y = np.zeros_like(spectrum_x)

    print(f"--- PORPHYRIN RESONANCE SIMULATION v4.2: Hash {sha_hash_hex[:16]}... ---")

    for i, (mode, freq) in enumerate(base_modes.items()):
        amplitude = (segments[i] % 1000) / 1000.0 # Normalized mock amplitude

        # Lorentzian peak
        gamma = 20
        peak = (1/np.pi) * (gamma / ((spectrum_x - freq)**2 + gamma**2))
        spectrum_y += peak * amplitude

    plt.figure(figsize=(12, 6))
    plt.plot(spectrum_x, spectrum_y, color='magenta', label='v4.2 Ontological Resonance')
    plt.title(f"Bio-Acoustic Porphyrin Spectrum v4.2 — SHA-256 Signature")
    plt.xlabel("Wavenumber (cm-1)")
    plt.ylabel("Intensity (Relative)")
    plt.grid(True, alpha=0.3)
    plt.legend()
    plt.savefig("reports/porphyrin_resonance_v4_2.png")
    print(">>> SPECTRUM v4.2 GENERATED: reports/porphyrin_resonance_v4_2.png")

if __name__ == "__main__":
    mock_hash = "a1b2c3d4e5f607182930415263748596a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2"
    simulate_porphyrin_resonance_v4_2(mock_hash)
