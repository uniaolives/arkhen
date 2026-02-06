from dataclasses import dataclass
from typing import List, Dict

# MÓDULO 2: O JARDINEIRO DIGITAL (Biorremediação)
# Objetivo: Sugerir soluções biológicas para mitigar poluentes.

BIOREMEDIATION_DB = {
    "PM2.5": {
        "agente": "Musgo (Sphagnum)",
        "mecanismo": "Bioacumulação eletrostática",
        "taxa_remocao": "Alta em superfícies verticais",
        "custo_implementacao": "Baixo"
    },
    "NO2": {
        "agente": "Hera (Hedera helix)",
        "mecanismo": "Absorção estomática",
        "taxa_remocao": "Moderada",
        "custo_implementacao": "Médio (Requer fachadas verdes)"
    },
    "Ruído Urbano": {
        "agente": "Bambu (Bambusoideae)",
        "mecanismo": "Barreira acústica física e dispersão",
        "taxa_remocao": "Redução de até 6dB",
        "custo_implementacao": "Médio"
    }
}

@dataclass
class RemediationPlan:
    pollutant: str
    solution: Dict[str, str]

    def __str__(self):
        return (
            f"--- PLANO DE CURA PARA {self.pollutant} ---\n"
            f"  Agente: {self.solution['agente']}\n"
            f"  Ação: {self.solution['mecanismo']}\n"
            f"  Eficácia: {self.solution['taxa_remocao']}\n"
            f"  Custo Estimado: {self.solution['custo_implementacao']}\n"
        )

class DigitalGardener:
    def prescribe_cure(self, diagnosis_report: List[str]) -> List[RemediationPlan]:
        prescriptions = []
        for issue in diagnosis_report:
            if "AR TÓXICO" in issue:
                prescriptions.append(RemediationPlan("PM2.5", BIOREMEDIATION_DB["PM2.5"]))
                prescriptions.append(RemediationPlan("NO2", BIOREMEDIATION_DB["NO2"]))
            if "ESTRESSE ACÚSTICO" in issue:
                prescriptions.append(RemediationPlan("Ruído Urbano", BIOREMEDIATION_DB["Ruído Urbano"]))
        return prescriptions

if __name__ == "__main__":
    gardener = DigitalGardener()
    plans = gardener.prescribe_cure(["AR TÓXICO", "ESTRESSE ACÚSTICO"])
    for plan in plans:
        print(plan)
