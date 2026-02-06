#!/bin/bash

echo "🚀 Setting up TIM VM Agent..."

# Install dependencies
echo "📦 Installing dependencies..."
# pip install -r requirements.txt || true
# pip install pre-commit black mypy pytest bandit || true

# Setup git hooks
echo "🔗 Setting up git hooks..."
chmod +x .githooks/*
git config core.hooksPath .githooks

# Setup environment
echo "🌱 Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env 2>/dev/null || touch .env
fi
echo "Please edit .env file with your configuration"

# Build Docker images
# echo "🐳 Building Docker images..."
# docker-compose -f tim_vm/docker-compose.yml build

# Run tests
# echo "🧪 Running initial tests..."
# python -m pytest tests/ -v || true

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your secrets"
echo "2. Run: docker-compose -f tim_vm/docker-compose.yml up -d"
echo "3. Configure GitHub webhook to point to your server"
echo "4. Push to main branch to trigger auto-deploy"
