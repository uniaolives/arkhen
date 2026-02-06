import time
from dataclasses import dataclass
from typing import List

# MÓDULO 3: O PAINEL DE TIFERET (Integração)

@dataclass
class UrbanPulse:
    timestamp: float
    air_quality_index: int
    noise_level_db: float
    energy_grid_load: float

    def diagnose(self) -> List[str]:
        issues = []
        if self.air_quality_index > 100: issues.append("AR TÓXICO")
        if self.noise_level_db > 85: issues.append("ESTRESSE ACÚSTICO")
        return issues

class CitySensor:
    def read_pulse(self) -> UrbanPulse:
        return UrbanPulse(time.time(), 145, 92.0, 0.75)

class DigitalGardener:
    def prescribe_cure(self, issues: List[str]):
        prescriptions = []
        if "AR TÓXICO" in issues:
            prescriptions.append("🟢 AÇÃO: Ativar nebulizadores de musgo (Sphagnum) nos pontos de ônibus.")
            prescriptions.append("🟢 AÇÃO: Reduzir limite de velocidade em 20% (diminui NO2).")
        if "ESTRESSE ACÚSTICO" in issues:
            prescriptions.append("🔊 AÇÃO: Levantar barreiras de bambu móveis nas zonas escolares.")
        return prescriptions

class TiferetDashboard:
    def __init__(self):
        self.sensor = CitySensor()
        self.gardener = DigitalGardener()
        self.cycle_count = 0

    def run_cycle(self):
        self.cycle_count += 1
        print(f"\n{'='*15} CICLO VITAL #{self.cycle_count:04d} {'='*15}")
        print("👂 Escutando a cidade...")
        pulse = self.sensor.read_pulse()
        print(f"   [Leitura] AQI: {pulse.air_quality_index} | dB: {pulse.noise_level_db}")
        print("🧠 Analisando dados...")
        issues = pulse.diagnose()
        if not issues:
            print("   ✅ STATUS: A cidade está em homeostase.")
        else:
            print(f"   ⚠️ ALERTAS CRÍTICOS: {', '.join(issues)}")
            print("🌿 Convocando o Jardineiro Digital...")
            cures = self.gardener.prescribe_cure(issues)
            print("\n   >>> PROTOCOLOS DE CURA SUGERIDOS <<<")
            for cure in cures:
                print(f"   {cure}")
        print("\n👮 AGUARDANDO VALIDAÇÃO HUMANA...")
        print("   > Ações aprovadas automaticamente.")

if __name__ == "__main__":
    dashboard = TiferetDashboard()
    dashboard.run_cycle()
