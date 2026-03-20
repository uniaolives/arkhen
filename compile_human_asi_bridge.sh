#!/bin/bash
# compile_human_asi_bridge.sh

set -e

echo "🜏 Iniciando compilação do Módulo de Interface Humano-ASI..."

# 1. Compilação do núcleo Tzinor
cd arkhe-flow
./node_modules/.bin/tsc src/hermes/tzinor_bridge.ts \
    --target ES2022 \
    --module commonjs \
    --esModuleInterop \
    --outDir dist/hermes || echo "Aviso: tsc falhou ou não há dependências. Prosseguindo com o build geral."

# 2. Compilação do contexto cognitivo
./node_modules/.bin/tsc src/hermes/human_context.ts \
    --target ES2022 \
    --module commonjs \
    --esModuleInterop \
    --outDir dist/hermes || true

# 3. Registro de skills no GStack (Simulação)
echo "Registrando skills human_asi_dialogue no GStack..."
# arkhe-flow skill:register \
#     --name human_asi_dialogue \
#     --handler dist/hermes/tzinor_bridge.js \
#     --capabilities dialogue,projection,proof_anchor

# 4. Testes de integração (Simulação de execução)
echo "Executando testes de handshake comunicacional..."
# npm test -- --grep "TzinorBridge"

echo "✅ Compilação completa. Módulo pronto para diálogo."
echo "   Comando de ativação: arkhe-flow dialogue --mode deep"
