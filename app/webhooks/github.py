import hmac
import hashlib
import json
import subprocess
import asyncio
import os
from fastapi import FastAPI, Request, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from app.configs.config import Config

config = Config.from_env()
app = FastAPI(title="Webhook Handler")

async def verify_signature(payload: bytes, signature: str, secret: str) -> bool:
    """Verify GitHub webhook signature"""
    if not secret:
        return False
    digest = hmac.new(
        secret.encode(),
        msg=payload,
        digestmod=hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={digest}", signature)

@app.post("/webhooks/github")
async def handle_github_webhook(
    request: Request,
    background_tasks: BackgroundTasks
):
    """Handle GitHub webhooks"""

    # Get signature
    signature = request.headers.get("x-hub-signature-256")
    if not signature:
        raise HTTPException(400, "Missing signature")

    # Get payload
    payload = await request.body()

    # Verify signature
    if not await verify_signature(payload, signature, config.GITHUB_WEBHOOK_SECRET):
        raise HTTPException(403, "Invalid signature")

    # Parse event
    event_type = request.headers.get("x-github-event")
    payload_json = json.loads(payload)

    # Process based on event type
    if event_type == "push":
        background_tasks.add_task(handle_push_event, payload_json)
    elif event_type == "pull_request":
        background_tasks.add_task(handle_pr_event, payload_json)
    elif event_type == "issues":
        background_tasks.add_task(handle_issue_event, payload_json)

    return JSONResponse({"status": "processing"})

async def handle_push_event(payload: dict):
    """Handle push events for auto-deploy"""
    branch = payload.get("ref", "").split("/")[-1]
    commits = payload.get("commits", [])

    if branch == "main":
        print(f"🚀 Main branch updated with {len(commits)} commits")
        # Trigger tim_vm upgrade
        await trigger_tim_vm_upgrade()

async def handle_pr_event(payload: dict):
    """Handle PR events for auto-review"""
    action = payload.get("action")
    pr = payload.get("pull_request", {})

    if action in ["opened", "synchronize"]:
        print(f"📝 PR #{pr.get('number')}: {pr.get('title')}")
        # Trigger topological analysis
        await trigger_topology_analysis(pr)

async def handle_issue_event(payload: dict):
    """Handle issue events"""
    action = payload.get("action")
    issue = payload.get("issue", {})
    print(f"🎫 Issue #{issue.get('number')} {action}: {issue.get('title')}")

async def trigger_tim_vm_upgrade():
    """Trigger tim_vm upgrade pipeline"""
    try:
        # Compile new tim_vm with optimizations
        # Ensure directories exist
        os.makedirs("tim_vm/bin", exist_ok=True)

        result = subprocess.run([
            "gcc", "-O3", "-march=native",
            "tim_vm/src/tim_vm.c",
            "-o", "tim_vm/bin/tim_vm_x86",
            "-lm"
        ], capture_output=True, text=True)

        if result.returncode == 0:
            print("✅ tim_vm upgraded successfully")

            # Run the new tim_vm (detached)
            subprocess.Popen([
                "./tim_vm/bin/tim_vm_x86",
                "--update-topology"
            ])
        else:
            print(f"❌ tim_vm upgrade failed: {result.stderr}")

    except Exception as e:
        print(f"❌ Error in tim_vm upgrade: {e}")

async def trigger_topology_analysis(pr: dict):
    """Trigger topology analysis for PR"""
    # Implement GNN-based topology analysis
    print(f"🔍 Starting topology analysis for PR #{pr.get('number')}")
    # In a real system, this would call scripts/gcn_analyzer.py or similar
