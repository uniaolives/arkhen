import time
from dataclasses import dataclass
from typing import List, Literal

# MÓDULO 1: O ESPELHO DA CIDADE
# Objetivo: Traduzir dados 'invisíveis' (qualidade do ar, ruído, energia)
# em uma linguagem visual clara para que o cidadão possa decidir.

@dataclass
class UrbanPulse:
    timestamp: float
    air_quality_index: int      # O Invisível (Poluição)
    noise_level_db: float       # O Invisível (Estresse sonoro)
    energy_grid_load: float     # O Invisível (Consumo)

    def diagnose(self) -> str:
        """
        A Lógica 'Gevurah' (Restrição Ética):
        Se o ambiente está tóxico, o sistema avisa, não esconde.
        """
        issues = []
        if self.air_quality_index > 100:
            issues.append("AR TÓXICO")
        if self.noise_level_db > 85:
            issues.append("ESTRESSE ACÚSTICO")
        if self.energy_grid_load > 0.9:
            issues.append("REDE SOBRECARREGADA")

        if not issues:
            return "PULSO ESTÁVEL: A cidade respira bem."
        else:
            return f"ALERTA VITAL: {', '.join(issues)}. Reduza a carga."

class CitySensor:
    def read_pulse(self) -> UrbanPulse:
        # Aqui conectaríamos aos APIs reais de Shenzhen (OpenData)
        # Por enquanto, simulamos o 'feedback da matéria'
        return UrbanPulse(
            timestamp=time.time(),
            air_quality_index=112,  # Simulação: Ar ruim hoje
            noise_level_db=65.0,    # Ruído aceitável
            energy_grid_load=0.45   # Energia ok
        )

def main():
    sensor = CitySensor()
    print("--- INICIANDO MONITOR DE VITALIDADE URBANA ---")
    print("Conectando à realidade...")
    time.sleep(1)

    current_pulse = sensor.read_pulse()

    print(f"\n[HORA]: {time.ctime(current_pulse.timestamp)}")
    print(f"[AQI]: {current_pulse.air_quality_index} (Qualidade do Ar)")
    print(f"[DIAGNÓSTICO]: {current_pulse.diagnose()}")

    if "AR TÓXICO" in current_pulse.diagnose():
        print("\n>>> AÇÃO RECOMENDADA: Fechar janelas, ativar filtros biológicos, reduzir tráfego.")

if __name__ == "__main__":
    main()
