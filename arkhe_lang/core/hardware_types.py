from enum import Enum
from dataclasses import dataclass, field
from typing import List, Tuple, Dict, Any

class HardwarePrimitive(Enum):
    """Primitivas de controle do substrato biológico."""
    OPTO_STIMULATE = "opto_stim"      # Estímulo de luz (ChR2)
    OPTO_INHIBIT = "opto_inhibit"      # Inibição por luz (NpHR)
    ELEC_RECORD = "elec_record"        # Gravação de potencial de campo
    ELEC_STIMULATE = "elec_stim"       # Estímulo elétrico invasivo
    PERFUSE = "perfuse"                # Controle de meio/drogas
    TEMP_CONTROL = "temp_control"      # Controle térmico
    TRANSPLANT = "transplant"          # Mitochondrial/Organelle transplantation

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
    """Representação de uma organela (ex: Mitocôndria)."""
    type: str  # e.g., "mitochondria"
    origin: str # e.g., "erythrocyte_derived"
    potential: float # e.g., membrane potential (ΔΨ)
    count: int

@dataclass
class PerfusionPump:
    """Sistema de perfusão para entrega de substâncias/organelas."""
    id: str
    rate: float # ml/min
    substance: str
    concentration: float # uM
