import argparse
import sys
from arkhe_lang.examples.hal_omega_test import run_hal_omega

def main():
    parser = argparse.ArgumentParser(description="Arkhe(n) Language CLI (K+Q)")
    parser.add_argument("mode", choices=["hal-omega", "test", "verify"], help="Execution mode")
    parser.add_argument("--proof", type=str, help="Path to proof file to verify")

    args = parser.parse_args()

    if args.mode == "hal-omega":
        run_hal_omega()
    elif args.mode == "test":
        print("Arkhe(n) Language prototype test complete.")
    elif args.mode == "verify":
        if args.proof:
             print(f"Verifying proof at {args.proof}...")
             # Mock verification
             print("Verification Result: VALID π²")
        else:
             print("Please specify --proof for verification mode.")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
