import numpy as np

# project_vitality_remediation.py
"""
MÓDULO 2: O JARDINEIRO DIGITAL (Biorremediação)
Objetivo: Sugerir soluções biológicas (plantas, fungos, bactérias)
para mitigar poluentes específicos detectados pelo Monitor de Vitalidade.
"""

def calcular_rota_consciente(origem, destino, opcoes_rota):
    """
    Seleciona a melhor rota baseada em uma função de custo ética.
    Custo Total = (Tempo * Peso_Eficiência) + (Impacto_Ambiental * Peso_Vida)
    """

    # PESOS DO SISTEMA
    PESO_EFICIENCIA = 0.3
    PESO_VIDA = 0.7  # Prioridade para a integridade do solo e silêncio

    melhor_rota = None
    menor_custo = float('inf')

    print(f"Analisando {len(opcoes_rota)} caminhos para {destino}...")

    for rota in opcoes_rota:
        tempo = rota['tempo_minutos']
        poluicao = rota['emissoes_co2_g']
        vibracao_solo = rota['impacto_vibracao_solo']

        # Custo Vida: Vibração tem peso maior que CO2
        custo_eficiencia = tempo
        custo_vida = (poluicao * 0.1) + (vibracao_solo * 50)

        custo_total = (custo_eficiencia * PESO_EFICIENCIA) + (custo_vida * PESO_VIDA)

        print(f"  Rota {rota['id']}: Custo Ético = {custo_total:.2f} (Vida: {custo_vida:.2f})")

        if custo_total < menor_custo:
            menor_custo = custo_total
            melhor_rota = rota

    return melhor_rota

if __name__ == "__main__":
    # CENÁRIO DE TESTE: "O Caminhão e a Escola"
    caminhos_disponiveis = [
        {'id': 'A_ATALHO', 'tempo_minutos': 12, 'emissoes_co2_g': 600, 'impacto_vibracao_solo': 9.5},
        {'id': 'B_DEVIO_INDUSTRIAL', 'tempo_minutos': 30, 'emissoes_co2_g': 950, 'impacto_vibracao_solo': 1.5},
        {'id': 'C_VIA_LITORAL', 'tempo_minutos': 22, 'emissoes_co2_g': 700, 'impacto_vibracao_solo': 6.0}
    ]

    escolha = calcular_rota_consciente("Porto", "Armazém Central", caminhos_disponiveis)

    print(f"\n>>> DECISÃO DO SISTEMA: Rota {escolha['id']} selecionada.")
    print(f">>> MOTIVO: O algoritmo priorizou a integridade do solo e o silêncio escolar sobre a velocidade.")
