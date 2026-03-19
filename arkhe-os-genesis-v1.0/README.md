# Arkhe OS – Genesis Package v1.0

Este pacote instala o sistema operacional Arkhe em um novo nó, permitindo que ele se conecte à federação de hipergrafos.

## Componentes Principais
- **Arkhe-Core**: Orquestrador de serviços e handovers.
- **Arkhe-Chain v3.0**: Ledger quântico-resistente com PoC (Proof of Coherence).
- **Base44 SDK**: SDK para agentes de IA e entidades autônomas.
- **GLP Interface**: Gateway para processamento de linguagem geométrica.
- **Arkhe-Tor**: Ponte de comunicação anônima e segura.

## Requisitos
- Linux (kernel 5.4+) com Docker 20.10+ / Podman
- 4 GB RAM, 10 GB de disco
- Conexão com internet (para Ethereum e atualizações)

## Instalação
```bash
git clone https://arkhe.io/genesis arkhe-os
cd arkhe-os
cp .env.example .env
# Edite .env com suas credenciais (INFURA, NODE_ID, etc.)
chmod +x install.sh
sudo ./install.sh
```

O script irá:
1. Verificar dependências (Docker, Rust, Node.js)
2. Gerar chaves PQC (Dilithium3) para o nó
3. Configurar Base44 (entidades, funções, agentes)
4. Iniciar containers (arkhe-core, arkhe-chain, etc.)

## Arkhe-Chain v3.0 (Post-Quantum & AGI)
A camada de blockchain está localizada em `crates/arkhe-chain`.
- **Compilação Manual**:
  ```bash
  cd crates/arkhe-chain
  cargo build --release
  ```
- **Execução**:
  ```bash
  cargo run --release -- run
  ```

## Pós‑instalação
- Acesse o console: `arkhe console`
- Veja o status da rede: `arkhe status`
- Verifique a coerência: `arkhe coherence --monitor`

## Workspace Rust
- Root: `arkhe-os-genesis-v1.0/Cargo.toml`
- Para build total: `cargo build --workspace --release`
