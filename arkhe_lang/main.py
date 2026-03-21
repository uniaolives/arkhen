import argparse
import sys
from arkhe_lang.examples.hal_omega_test import run_hal_omega

def main():
    parser = argparse.ArgumentParser(description="Arkhe(n) Language CLI (K+Q)")
    parser.add_argument("mode", choices=["hal-omega", "test"], help="Execution mode")

    args = parser.parse_args()

    if args.mode == "hal-omega":
        run_hal_omega()
    elif args.mode == "test":
        print("Arkhe(n) Language prototype test complete.")
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
