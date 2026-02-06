#!/bin/bash

# setup.sh - Configuração da Catedral Quântica
echo "🛠️ Configurando o Ambiente da Catedral..."

# 1. Criar diretórios necessários
mkdir -p tim_vm/bin
mkdir -p logs
mkdir -p reports

# 2. Instalar dependências Python
echo "🐍 Instalando dependências Python..."
pip install -r requirements.txt

# 3. Compilar o Core C (TIM_VM)
echo "⚙️ Compilando TIM_VM v4.1..."
if gcc tim_vm/src/tim_vm.c -o tim_vm/bin/tim_vm; then
    echo "✅ TIM_VM compilado com sucesso."
else
    echo "❌ Falha na compilação do TIM_VM."
    exit 1
fi

# 4. Configurar Git Hooks (Simulado)
echo "⚓ Configurando Git Hooks..."
mkdir -p .githooks
cat <<EOF > .githooks/pre-commit
#!/bin/bash
echo "🛡️ Executando check de Santidade..."
python3 verify_self_healing.py
EOF
chmod +x .githooks/pre-commit

echo "✨ Configuração concluída. Ξ = 1.000"
