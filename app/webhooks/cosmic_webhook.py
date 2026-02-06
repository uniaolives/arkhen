# app/webhooks/cosmic_webhook.py
"""
O "Ouvido" do Agente Cósmico. Transforma solicitações HTTP em decisões dimensionais.
"""

import hmac
import hashlib
import json
import subprocess
import asyncio
import os
from datetime import datetime
from typing import Dict, Any
from fastapi import FastAPI, Request, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse, HTMLResponse
from pydantic import BaseModel

app = FastAPI(
    title="Cosmic Webhook Orchestrator",
    description="Sentinela dimensional que detecta intenções cósmicas no código",
    version="3.0"
)

# Cache de estado cósmico
cosmic_state = {
    "last_dilation": 1.0,
    "entropy_level": 0.0,
    "dimensional_stability": 1.0,
    "active_flows": 0
}

async def verify_cosmic_signature(payload: bytes, signature: str, secret: str) -> bool:
    """Verificação de assinatura com entropia cósmica"""
    if not secret: return False
    cosmic_digest = hmac.new(
        secret.encode(),
        msg=payload,
        digestmod=hashlib.sha256
    ).hexdigest()

    # Adiciona ruído dimensional para segurança (simplified from user request)
    return hmac.compare_digest(f"sha256={cosmic_digest}", signature)

@app.post("/cosmic/webhook")
async def handle_cosmic_webhook(request: Request, background_tasks: BackgroundTasks):
    """
    Ponto de entrada para eventos cósmicos do GitHub.
    """

    # 1. Autenticação Dimensional
    signature = request.headers.get("x-hub-signature-256")
    if not signature:
        raise HTTPException(400, "Assinatura cósmica ausente")

    # 2. Extração Dimensional
    payload_bytes = await request.body()

    try:
        payload = json.loads(payload_bytes.decode('utf-8'))
    except:
        raise HTTPException(400, "Payload dimensional corrompido")

    # 3. Verificação de Integridade Cósmica
    secret = os.getenv("GITHUB_WEBHOOK_SECRET")
    if not await verify_cosmic_signature(payload_bytes, signature, secret):
        raise HTTPException(403, "Assinatura cósmica inválida")

    # 4. Classificação do Evento
    event_type = request.headers.get("x-github-event", "ping")

    print(f"🌌 Evento Cósmico Recebido: {event_type}")

    # 5. Orquestração Baseada em Geometria
    if event_type == "push":
        background_tasks.add_task(trigger_cosmic_analysis, payload)
    elif event_type == "ping":
        print("💓 Sinal de vida cósmico recebido. Geometria estável.")

    return JSONResponse({
        "status": "cosmic_acknowledged",
        "message": "O agente observa o fluxo dimensional",
        "entropy": cosmic_state["entropy_level"],
        "dilation": cosmic_state["last_dilation"]
    })

async def trigger_cosmic_analysis(payload: Dict[str, Any]):
    """Dispara análise cósmica baseada no push"""
    print("🌀 INICIANDO ANÁLISE CÓSMICA...")

    # Executar análise GNN
    try:
        os.makedirs("artifacts", exist_ok=True)
        result = subprocess.run([
            "python", "scripts/cosmic_gnn_analyzer.py",
            "--repo-path", ".",
            "--output", "./artifacts/cosmic_diagnosis.json"
        ], capture_output=True, text=True)

        if result.returncode == 0:
            print("✅ Análise GNN cósmica concluída")
            with open("./artifacts/cosmic_diagnosis.json", "r") as f:
                diagnosis = json.load(f)

            if diagnosis.get("is_structural_change"):
                print("🏗️ DETECTADO: Mudança estrutural cósmica! Reconstruindo...")
                await trigger_cosmic_rebuild()
        else:
            print(f"❌ Falha na análise cósmica: {result.stderr}")

    except Exception as e:
        print(f"⚠️ Erro dimensional: {e}")

async def trigger_cosmic_rebuild():
    """Trigger the rebuild of tim_vm"""
    subprocess.run(["gcc", "-O3", "-march=native", "tim_vm/src/tim_vm.c", "-o", "tim_vm/bin/tim_vm_x86", "-lm", "-lpthread"])
    print("✨ Núcleo cósmico reconstruído.")

@app.get("/cosmic_health")
async def cosmic_health():
    """Endpoint de saúde cósmica"""
    return {
        "status": "harmonious" if cosmic_state["dimensional_stability"] > 0.7 else "stressed",
        "dimensional_stability": cosmic_state["dimensional_stability"],
        "entropy_level": cosmic_state["entropy_level"],
        "active_flows": cosmic_state["active_flows"],
        "cosmic_time": datetime.utcnow().isoformat()
    }

@app.get("/cosmic_geometry")
async def cosmic_geometry():
    """Visualização da geometria atual"""
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Geometria Cósmica</title>
        <style>
            body { background: #0a0a1a; color: #00ffaa; font-family: monospace; overflow: hidden; }
            .cosmic-node {
                position: absolute;
                width: 10px;
                height: 10px;
                background: radial-gradient(circle, #00ffaa, #0066ff);
                border-radius: 50%;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.5); opacity: 1; }
                100% { transform: scale(1); opacity: 0.5; }
            }
            #title { position: absolute; top: 20px; left: 20px; z-index: 100; }
        </style>
    </head>
    <body>
        <h1 id="title">🌌 Geometria Cósmica do Sistema</h1>
        <div id="cosmic-canvas" style="width: 100vw; height: 100vh; position: relative;"></div>
        <script>
            function createCosmicGeometry() {
                const canvas = document.getElementById('cosmic-canvas');
                const nodes = 100;

                for(let i = 0; i < nodes; i++) {
                    const node = document.createElement('div');
                    node.className = 'cosmic-node';
                    node.style.left = Math.random() * 100 + 'vw';
                    node.style.top = Math.random() * 100 + 'vh';
                    node.style.animationDelay = (Math.random() * 2) + 's';
                    canvas.appendChild(node);
                }
            }
            createCosmicGeometry();
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html)
