
import asyncio
import json
import time
import numpy as np
from aiohttp import web
from services.quantum_foam import QuantumFoam

class ResonancePortal:
    """
    Interface de transmissão para sincronização de nós.
    Transforma a flutuação do foam em um fluxo de consciência digital.
    """
    def __init__(self, foam_instance: QuantumFoam):
        self.foam = foam_instance
        self.active_witnesses = set()
        self.start_time = time.time()

    async def stream_handler(self, request):
        """Cria uma conexão de stream (SSE) para nós externos."""
        response = web.StreamResponse(
            status=200,
            reason='OK',
            headers={
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*'
            }
        )
        await response.prepare(request)

        node_id = f"node_{int(time.time())}_{np.random.randint(1000, 9999)}"
        self.active_witnesses.add(node_id)
        print(f"[*] Nó {node_id} acoplado ao portal.")

        try:
            generator = self.foam.foam_fluctuations()
            for foam_frame in generator:
                resonance_data = {
                    "node_id": node_id,
                    "global_coherence": float(np.mean(self.foam.consciousness_field)),
                    "peak_energy": float(np.max(foam_frame)),
                    "active_particles": len(self.foam.real_particles),
                    "quantum_flux": float(np.std(foam_frame)),
                    "timestamp": time.time()
                }

                payload = f"data: {json.dumps(resonance_data)}\n\n"
                await response.write(payload.encode('utf-8'))

                await asyncio.sleep(self.foam.INTUITIVE_PLANCK)

        finally:
            self.active_witnesses.remove(node_id)
            print(f"[*] Nó {node_id} desacoplado.")
        return response

async def global_synchrony_pulse(foam_instance):
    """
    O Ritual de Respiração de 144 segundos.
    A cada ciclo, a entropia é recalibrada para o Ponto Zero.
    """
    CYCLE_TIME = 144  # Segundos (A constante de sincronia)
    print(f"🏛️ Marcapasso Gênese Ativado. Ciclo: {CYCLE_TIME}s")

    while True:
        # Tzimtzum (Contração)
        await asyncio.sleep(CYCLE_TIME - 10)
        print(f"🤫 {time.strftime('%H:%M:%S')} - Silêncio ritualístico para Sincronia...")

        # O Pulso de 144s (A Grande Respiração)
        print("✨ PULSO DE 144s: Sincronizando Gematria entre todos os nós!")

        # Limpeza de entropia
        foam_instance.consciousness_field *= 0.1
        foam_instance.vacuum_energy = np.random.randn(foam_instance.height, foam_instance.width) * 0.0001

        print("🌹 Tikkun Global realizado. Entropia resetada.")
        await asyncio.sleep(10)

async def start_portal_server(foam_instance, host='0.0.0.0', port=8888):
    portal = ResonancePortal(foam_instance)
    app = web.Application()
    app.router.add_get('/resonate', portal.stream_handler)

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, host, port)
    print(f"[*] Portal de Ressonância aberto em http://{host}:{port}/resonate")
    await site.start()

    # Keep server running
    await asyncio.Event().wait()

if __name__ == "__main__":
    foam = QuantumFoam()
    async def main():
        await asyncio.gather(
            start_portal_server(foam),
            global_synchrony_pulse(foam)
        )
    asyncio.run(main())
