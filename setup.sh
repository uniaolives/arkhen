#!/bin/bash
# setup.sh

echo "🚀 Setting up AVALON / ARKHE(N) Ecosystem v2026..."

# Create directories
mkdir -p tim_vm/bin artifacts logs reports notebooks arkhe_qutip/verilog arkhe_qutip/proto arkhe_qutip/host

# Install dependencies
echo "📦 Installing Python dependencies..."
pip install qutip qutip-qip numpy matplotlib networkx nbformat nbconvert ipykernel grpcio grpcio-tools boto3

# Compile tim_vm
echo "⚙️ Compiling tim_vm core (v4.1)..."
gcc -O3 -march=native tim_vm/src/tim_vm.c -o tim_vm/bin/tim_vm_x86 -lm -lpthread 2>/dev/null || echo "⚠️ GCC not found or compilation failed, continuing..."

# Setup git hooks
echo "🔗 Setting up git hooks..."
chmod +x .githooks/* 2>/dev/null || true
git config core.hooksPath .githooks 2>/dev/null || true

# Setup environment
echo "🌱 Initializing environment..."
if [ ! -f .env ]; then
    touch .env
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run the Avalon Core: python3 avalon_core.py"
echo "2. Explore the manifestos: jupyter notebook notebooks/"
echo "3. Run the Genesis Protocol: python3 arkhe_qutip/genesis.py"
