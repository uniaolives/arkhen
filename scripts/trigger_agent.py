#!/usr/bin/env python3
"""
Webhook trigger for upgrade agent
"""

import subprocess
import os
import sys

def trigger_upgrade_agent(repository, branch):
    """
    Webhook that wakes the agent when root code changes.
    """
    print(f"🔔 Webhook received: Change detected in {repository} (branch: {branch})")

    # Pass credentials and current state to compiled binary
    env_vars = os.environ.copy()
    env_vars.update({
        "TIM_VM_MODE": "HIGH_PRECISION",
        "TOPOLOGY_UPDATE": "TRUE",
        "TIMESTAMPS": "RDTSC_ENABLED"
    })

    # Execute updated binary
    try:
        # Check if binary exists, if not, try to compile it
        if not os.path.exists("./tim_vm/bin/tim_vm_x86"):
             print("⚙️ Compiling tim_vm core...")
             subprocess.run(["gcc", "-O3", "-march=native", "tim_vm/src/tim_vm.c", "-o", "tim_vm/bin/tim_vm_x86"])

        result = subprocess.run(
            ["./tim_vm/bin/tim_vm_x86", "--update-topology"],
            env=env_vars,
            capture_output=True,
            text=True
        )

        if result.returncode == 0:
            print("✅ Agent updated. Temporal topology synchronized.")
            print(f"Output: {result.stdout}")
        else:
            print(f"❌ Agent update failed: {result.stderr}")
            # Raise exception if it's a real failure, but let's be careful in demo

    except Exception as e:
        print(f"❌ Update failure: {e}")
        raise

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python trigger_agent.py <repository> <branch>")
        sys.exit(1)

    trigger_upgrade_agent(sys.argv[1], sys.argv[2])
