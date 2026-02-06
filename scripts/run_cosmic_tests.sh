#!/bin/bash
# scripts/run_cosmic_tests.sh

echo "🧪 EXECUTANDO TESTES CÓSMICOS..."

# Ensure binary is compiled
if [ ! -f "./tim_vm/bin/tim_vm_x86" ]; then
    echo "⚙️ Compilando núcleo cósmico para teste..."
    mkdir -p tim_vm/bin
    gcc -O3 -march=native tim_vm/src/tim_vm.c -o tim_vm/bin/tim_vm_x86 -lm -lpthread
fi

# Verificar integridade dimensional
echo "🔍 Verificando geometria do sistema..."
# Running a quick benchmark/check
timeout 5s ./tim_vm/bin/tim_vm_x86 &
TEST_PID=$!
sleep 2s
if ps -p $TEST_PID > /dev/null; then
    echo "✅ Núcleo cósmico ativo e processando."
    kill $TEST_PID
else
    echo "❌ Falha ao iniciar núcleo cósmico."
    exit 1
fi

# Teste de GNN Analyzer
echo "🌀 Testando analisador de topologia..."
python3 scripts/cosmic_gnn_analyzer.py --repo-path . --output artifacts/test_diagnosis.json
if [ $? -eq 0 ]; then
    echo "✅ Analisador GNN operacional."
else
    echo "❌ Falha no analisador GNN."
    exit 1
fi

echo "✨ Testes cósmicos concluídos com sucesso!"
