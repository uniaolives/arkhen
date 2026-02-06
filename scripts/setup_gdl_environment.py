#!/usr/bin/env python3
"""
Setup GDL (Geometric Deep Learning) Environment
"""

import subprocess
import sys
import os

def run_command(cmd, desc):
    print(f"📦 {desc}...")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"❌ Failed: {result.stderr}")
        return False
    print(f"✅ Done")
    return True

def main():
    print("🚀 Setting up GDL Environment for Upgrade Agent")

    # Install system dependencies
    # Note: In the sandbox, some of these might not be possible to install via sudo
    commands = [
        ("pip install --upgrade pip", "Upgrade pip"),
        ("pip install torch torchvision torchaudio", "Install PyTorch"),
        # torch-geometric can be tricky to install without specific wheels, but let's try
        ("pip install torch-geometric", "Install PyTorch Geometric"),
        ("pip install fastapi uvicorn python-multipart httpx", "Install web framework"),
        ("pip install black mypy pytest bandit pytest-cov", "Install dev tools"),
        ("pip install networkx matplotlib numpy pandas scikit-learn scipy", "Install data science stack"),
    ]

    for cmd, desc in commands:
        if not run_command(cmd, desc):
            print(f"Failed at: {desc}")
            # Continue instead of exit in sandbox
            continue

    # Setup git hooks
    print("🔗 Setting up git hooks...")
    subprocess.run("chmod +x .githooks/*", shell=True)
    subprocess.run("git config core.hooksPath .githooks", shell=True)

    print("\n✅ GDL Environment Setup Complete!")
    print("\nNext steps:")
    print("1. Compile tim_vm: gcc -O3 -march=native tim_vm/src/tim_vm.c -o tim_vm/bin/tim_vm_x86")
    print("2. Copy .env.example to .env and configure")
    print("3. Run: docker-compose up -d")
    print("4. Configure GitHub webhook")

if __name__ == "__main__":
    main()
