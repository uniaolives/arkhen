#!/bin/bash
# scripts/run_tests.sh

echo "🧪 Running tests with precision timing..."

# Use tim_vm for precision timing
TIM_VM_BIN="./tim_vm/bin/tim_vm_x86"

if [ -f "$TIM_VM_BIN" ]; then
    echo "🔍 Using tim_vm for precision measurement"
    $TIM_VM_BIN --run-tests
else
    echo "⚠️ tim_vm not found, running tests normally"
    python -m pytest tests/ -v --cov=app --cov-report=html
fi

# Run security scan
echo "🔒 Running security scan..."
mkdir -p reports
bandit -r app/ -f json -o reports/bandit.json || true

echo "✅ Tests completed!"
