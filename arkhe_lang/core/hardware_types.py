from enum import Enum
from dataclasses import dataclass, field
from typing import List, Tuple, Dict, Any

class HardwarePrimitive(Enum):
    """Primitivas de controle do substrato (biológico, químico, físico, astrofísico)."""
    OPTO_STIMULATE = "opto_stim"      # Estímulo de luz (ChR2)
    OPTO_INHIBIT = "opto_inhibit"      # Inibição por luz (NpHR)
    ELEC_RECORD = "elec_record"        # Gravação de potencial de campo
    ELEC_STIMULATE = "elec_stim"       # Estímulo elétrico invasivo
    PERFUSE = "perfuse"                # Controle de meio/drogas/organelas
    TEMP_CONTROL = "temp_control"      # Controle térmico
    TRANSPLANT = "transplant"          # Mitochondrial/Organelle transplantation

    # Generic domain-specific primitives
    CHEMICAL_SYNTH = "chemical_synth"   # Síntese química in-situ
    PHYSICAL_TUNING = "physical_tuning" # Ajuste de parâmetros físicos (ex: magnético)
    ASTRO_MONITOR = "astro_monitor"     # Monitoramento astrofísico/astroquímico

@dataclass
class Electrode:
    """Representação de um eletrodo no MEA."""
    id: int
    position: Tuple[float, float, float]  # x, y, z em micrômetros
    impedance: float  # Ohms
    status: str = "active"

@dataclass
class LightSource:
    """Fonte de luz para optogenética."""
    wavelength: int      # nm (ex: 473 para azul/ChR2)
    power: float         # mW/mm²
    pulse_width: float   # ms
    target_region: str   # Identificador da região neural
    frequency: float = 0.0 # Hz

@dataclass
class Organelle:
    """Representação de uma organela ou componente de substrato."""
    domain: str # e.g., "biological", "chemical", "physical", "astrophysical"
    type: str  # e.g., "mitochondria", "quantum_dot", "catalyst"
    origin: str # e.g., "erythrocyte_derived", "synthetic"
    potential: float = 0.0 # e.g., membrane potential (ΔΨ)
    count: int = 1

@dataclass
class PerfusionPump:
    """Sistema de perfusão para entrega de substâncias/organelas."""
    id: str
    rate: float # ml/min
    substance: str
    concentration: float # uM
