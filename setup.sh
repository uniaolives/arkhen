#!/bin/bash
# setup.sh

echo "🚀 Setting up TIM VM Agent v3.0 (Cosmic Geometry)..."

# Create directories
mkdir -p tim_vm/bin artifacts logs

# Install dependencies
echo "📦 Installing dependencies..."
# pip install -r requirements.txt || true

# Setup git hooks
echo "🔗 Setting up git hooks..."
chmod +x .githooks/*
git config core.hooksPath .githooks

# Compile tim_vm v3.0
echo "⚙️ Compiling tim_vm core (v3.0)..."
gcc -O3 -march=native tim_vm/src/tim_vm.c -o tim_vm/bin/tim_vm_x86 -lm -lpthread
chmod +x tim_vm/bin/tim_vm_x86
gcc -O3 -march=native tim_vm/src/tim_vm.c -o tim_vm/bin/tim_vm_cosmic -lm -lpthread
chmod +x tim_vm/bin/tim_vm_cosmic

# Setup environment
echo "🌱 Setting up environment..."
if [ ! -f .env ]; then
    touch .env
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure .env with your secrets"
echo "2. Run tests: ./scripts/run_cosmic_tests.sh"
echo "3. Start the cosmic webhook: python3 app/webhooks/cosmic_webhook.py"
