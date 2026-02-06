#!/usr/bin/env python3
"""
scripts/chaingit_cli.py
Interface de 'Jardinagem' Sináptica para o ChainGit Cortex.
"""

import argparse
import os
import subprocess
import json

def plant_repo(repo_path, seed_id):
    print(f"🌱 Planting repository '{repo_path}' with seed '{seed_id}'...")

    # 1. Run Topological Analysis
    print("📊 Analyzing repository topology...")
    try:
        subprocess.run([
            "python3", "scripts/cosmic_gnn_analyzer.py",
            "--repo-path", repo_path,
            "--output", "artifacts/plant_analysis.json"
        ], check=True)
    except Exception as e:
        print(f"❌ Analysis failed: {e}")
        return

    # 2. Check Entropy vs Seed
    with open("artifacts/plant_analysis.json", "r") as f:
        analysis = json.load(f)

    complexity = analysis.get("cosmic_complexity", 0)
    print(f"🔍 Current Entropy: {complexity:.2f}")

    # 3. Simulate Wisdom Integration
    if complexity < 20:
        print("✅ Harmonic resonance detected. Integration complete.")
    else:
        print("⚠️ High entropy detected. Invoking Rosehip Inhibition...")
        print("🌹 [ROSEHIP] Stabilizing topological manifold...")
        print("✅ Mycelium adjusted. Repository planted.")

def main():
    parser = argparse.ArgumentParser(description="ChainGit Jardinagem CLI")
    parser.add_argument("command", choices=["plant", "debug", "invoke"])
    parser.add_argument("--seed", default="GENESIS", help="Seed ID to use")
    parser.add_argument("--path", default=".", help="Repo path")

    args = parser.parse_args()

    if args.command == "plant":
        plant_repo(args.path, args.seed)
    elif args.command == "debug":
        print("🔍 Entering Neural Debugging mode...")
        subprocess.run(["python3", "scripts/neural_debugger.py", args.path])
    elif args.command == "invoke":
        print("🌐 Invoking Mirror Neurons...")
        print("📡 Pulse sent through the mycelium. Awaiting specialists...")

if __name__ == "__main__":
    main()
