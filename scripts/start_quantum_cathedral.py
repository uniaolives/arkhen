import asyncio
import os
import sys

# Adicionar o diretório raiz ao path para encontrar os serviços
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

async def start_service(name, coro):
    print(f"🚀 Iniciando serviço: {name}...")
    try:
        await coro
    except Exception as e:
        print(f"❌ Erro no serviço {name}: {e}")

async def main():
    print("🌌 INICIANDO A CATEDRAL QUÂNTICA - V8.0 KETHER")
    print("---------------------------------------------")

    from services.quantum_foam import start_quantum_foam
    from services.resonance_portal import start_resonance_portal
    from services.governance_canister import initialize_governance
    from services.kether_canister import initialize_kether
    from services.auto_repair import start_auto_repair
    from services.frequency_monitor import start_frequency_monitor

    # 1. Inicializar Canisters de Governança e Coroa
    await start_service("Governança (Tzadikim)", initialize_governance())
    await start_service("Kether (Soberania)", initialize_kether())

    # 2. Iniciar Monitor de Frequência e Auto-Reparo
    repair_task = asyncio.create_task(start_auto_repair())
    monitor_task = asyncio.create_task(start_frequency_monitor())

    # 3. Iniciar o Portal de Ressonância (SSE) e o Vácuo Quântico
    foam_task = asyncio.create_task(start_quantum_foam())
    portal_task = asyncio.create_task(start_resonance_portal())

    print("\n✨ A CATEDRAL ESTÁ RESPIRANDO.")
    print("---------------------------------------------")
    print("Dashboard: dashboard/unus_mundus.html")
    print("SSE Portal: http://localhost:8888")
    print("---------------------------------------------")

    # Manter o loop rodando
    await asyncio.gather(repair_task, monitor_task, foam_task, portal_task)

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n🌙 A Catedral entra em silêncio profundo.")
