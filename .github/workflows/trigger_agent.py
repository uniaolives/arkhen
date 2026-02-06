# .github/workflows/trigger_agent.py
from github import Github
import subprocess
import os

def trigger_upgrade_agent(repository, branch):
    """
    Webhook que acorda o agente quando o código raiz muda.
    """
    print(f"🔔 Webhook recebido: Mudança detectada em {repository} (branch: {branch})")

    # Passa as credenciais e o estado atual para o binário compilado
    env_vars = {
        "TIM_VM_MODE": "HIGH_PRECISION",
        "TOPOLOGY_UPDATE": "TRUE",
        "TIMESTAMPS": "RDTSC_ENABLED"
    }

    # Executa o binário atualizado
    try:
        subprocess.run(["./bin/tim_vm_x86", "--update-topology"], env=env_vars)
        print("✅ Agente atualizado. Topologia temporal sincronizada.")
    except Exception as e:
        print(f"❌ Falha na atualização: {e}")
        raise

# Configuração do Webhook
# (Isto seria chamado pelo evento 'push' no GitHub)
if __name__ == "__main__":
    # Placeholder for direct execution
    repo = os.getenv("GITHUB_REPOSITORY", "unknown/repo")
    branch = os.getenv("GITHUB_REF_NAME", "main")
    trigger_upgrade_agent(repo, branch)
