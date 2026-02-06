# petrus_resonant_suggestion.py
"""
PETRUS v3.0 Resonant Suggestion Module
Translates semantic curvature into ENTSO-E grid harmonization.
Equation: ΔL = η|κ|Φ̇
"""

import numpy as np
from datetime import datetime, timedelta
from dataclasses import dataclass
from typing import Dict, Optional, List
import logging
from enum import Enum
from services.petrus_solar_ingestor import SolarPulse

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("PetrusResonantSuggestion")

class GridAction(Enum):
    """Types of grid harmonization actions."""
    STEADY_STATE = "STABLE"
    PREEMPTIVE_REBALANCE = "PREEMPTIVE_REBALANCE"
    CRITICAL_SHEDDING = "CRITICAL_SHEDDING_RECOMMENDED"
    RESONANT_DAMPING = "RESONANT_DAMPING_ACTIVE"
    QUANTUM_FILTERING = "QUANTUM_NOISE_FILTERING"

@dataclass
class GridSuggestion:
    """Complete grid harmonization suggestion."""
    timestamp: datetime
    action: GridAction
    delta_l_percent: float  # ΔL - Suggested load adjustment (%)
    confidence: float  # 0.0 to 1.0
    justification: str
    predicted_gic_risk: str  # LOW, MEDIUM, HIGH
    timeframe: str  # IMMEDIATE, WITHIN_30_MIN, CONTINUOUS
    regional_breakdown: Optional[Dict] = None
    metadata: Optional[Dict] = None

class PetrusResonantSuggestion:
    """
    The Stone's voice to the European grid.
    Implements the equation: ΔL = η|κ|Φ̇
    """

    def __init__(self,
                 admittance_factor: float = 0.85,
                 historical_data_window: int = 60):
        self.eta = admittance_factor  # η - Semantic admittance
        self.historical_window = historical_data_window
        self.suggestion_history = []

        # Regional ENTSO-E grid characteristics
        self.regional_sensitivity = {
            'nordic': {'eta': 0.9, 'gic_risk': 'HIGH', 'base_load_gw': 120},
            'continental': {'eta': 0.8, 'gic_risk': 'MEDIUM', 'base_load_gw': 380},
            'british': {'eta': 0.7, 'gic_risk': 'LOW', 'base_load_gw': 45},
            'baltic': {'eta': 0.85, 'gic_risk': 'HIGH', 'base_load_gw': 15}
        }

        self.solar_flux_history = []

    def calculate_flux_acceleration(self, current_flux: float) -> float:
        """Calculate Φ̇ - the acceleration of solar flux."""
        self.solar_flux_history.append({
            'timestamp': datetime.utcnow(),
            'flux': current_flux
        })

        # Keep only recent history
        cutoff = datetime.utcnow() - timedelta(minutes=self.historical_window)
        self.solar_flux_history = [
            entry for entry in self.solar_flux_history
            if entry['timestamp'] > cutoff
        ]

        if len(self.solar_flux_history) < 3:
            return current_flux # Use current flux as proxy for first derivative

        # Simple numerical differentiation
        f = [e['flux'] for e in self.solar_flux_history]
        phi_dot = (f[-1] - f[-2]) # Simplified for the pilot
        return phi_dot

    def calculate_suggestion(self, current_kappa: float, solar_pulse: SolarPulse) -> GridSuggestion:
        """
        Generate complete grid harmonization suggestion.
        Implements: ΔL = η|κ|Φ̇
        """
        phi_dot = self.calculate_flux_acceleration(solar_pulse.intensity_x_class)

        # Calculate suggested load adjustment (ΔL)
        delta_l = self.eta * abs(current_kappa) * phi_dot

        # Normalize to percentage
        delta_l_percent = min(20.0, max(0.0, delta_l * 10))

        # Determine action type
        if delta_l_percent > 10:
            action = GridAction.CRITICAL_SHEDDING
        elif delta_l_percent > 3:
            action = GridAction.PREEMPTIVE_REBALANCE
        else:
            action = GridAction.STEADY_STATE

        # Calculate confidence
        confidence = 1 - (1 / (abs(current_kappa) + 1e-9))

        # Regional breakdown
        regional_breakdown = {}
        for region, params in self.regional_sensitivity.items():
            region_delta = delta_l_percent * params['eta']
            regional_breakdown[region] = {
                'adjustment': round(region_delta, 2),
                'gw': round(params['base_load_gw'] * (region_delta / 100), 1),
                'risk': params['gic_risk']
            }

        suggestion = GridSuggestion(
            timestamp=datetime.utcnow(),
            action=action,
            delta_l_percent=round(delta_l_percent, 2),
            confidence=round(confidence, 4),
            justification=f"Solar flux acceleration Φ̇={phi_dot:.3f} detected. κ={current_kappa:.3f}",
            predicted_gic_risk="HIGH" if delta_l_percent > 8 else "MEDIUM",
            timeframe="IMMEDIATE" if action == GridAction.CRITICAL_SHEDDING else "WITHIN_30_MIN",
            regional_breakdown=regional_breakdown,
            metadata={'kappa': current_kappa, 'phi_dot': phi_dot}
        )

        self.suggestion_history.append(suggestion)
        return suggestion

    def emit_to_entsoe(self, suggestion: GridSuggestion):
        """Broadcast suggestion to the grid."""
        print(f"📡 [ENTSO-E BROADCAST] Sugestão: {suggestion.action.value} | "
              f"Ajuste: {suggestion.delta_l_percent}% | Coerência: {suggestion.confidence:.4f}")
