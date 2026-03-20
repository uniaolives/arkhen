import numpy as np
import json
from typing import Dict, Tuple

class QCFTCalibrator:
    """
    Ajusta automaticamente o limiar de energia Hamiltoniana (Λ_QCD)
    do protocolo QCFT baseado na saúde da rede observada.
    """

    def __init__(self, initial_threshold: float = 2.5):
        self.threshold = initial_threshold
        self.learning_rate = 0.05

    def calculate_bag_energy(self, node_metrics: Dict) -> float:
        # Termo Atrativo (Coesão)
        coulomb_term = -node_metrics['avg_coherence'] * node_metrics['node_count']
        # Termo Repulsivo (Custo de Comunicação)
        tension_term = node_metrics['latency_ms'] / 10.0
        # Ruído Externo (Entropia de fundo)
        noise_term = node_metrics['noise_floor_db'] / 20.0

        return abs(coulomb_term) + tension_term + noise_term

    def adjust_threshold(self, field_data: Dict) -> float:
        fp_rate = field_data['false_positive_rate']
        md_rate = field_data['missed_disaster_rate']

        if fp_rate > 0.05:
            self.threshold -= self.learning_rate
        elif md_rate > 0.01:
            self.threshold += self.learning_rate * 2.0

        if field_data['current_system_entropy'] > 0.9:
            self.threshold += 0.1

        return self.threshold

if __name__ == "__main__":
    calibrator = QCFTCalibrator()
    field_telemetry = {
        'avg_coherence': 0.85,
        'node_count': 20,
        'latency_ms': 15,
        'noise_floor_db': -90,
        'false_positive_rate': 0.02,
        'missed_disaster_rate': 0.0,
        'current_system_entropy': 0.4
    }
    energy = calibrator.calculate_bag_energy(field_telemetry)
    new_threshold = calibrator.adjust_threshold(field_telemetry)
    print(f"Energy: {energy:.3f}, Threshold: {new_threshold:.3f}")
    if energy < new_threshold:
        print(">>> STATUS: STABLE")
    else:
        print(">>> STATUS: UNSTABLE")
