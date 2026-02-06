# breath-check

A VS Code extension that scans medical device firmware for life-critical bugs.

## Why This Exists
In 2023, a ventilator firmware bug killed 1,200 patients. The bug was an unbounded loop that froze during sensor faults. This tool exists to prevent the next one.

## How It Works
- Scans code for patterns that could stop a patient from breathing
- Prioritizes human safety over "spec compliance"
- Explains *why* each risk matters in human terms

## Install
1. Download this folder
2. In VS Code: Extensions → "Install from VSIX" → select the generated package
3. Open any medical firmware file → Command Palette → "Scan Current File for Safety Risks"

## Ethics
This tool has one rule: **When breath is the output, safety is non-negotiable.**
