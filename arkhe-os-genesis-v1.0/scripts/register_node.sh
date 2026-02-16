#!/bin/bash
# Registra este nó na federação (envia identidade para ledger)

set -e

NODE_ID=$(grep NODE_ID .env | cut -d '=' -f2)
curl -X POST https://ledger.arkhe.io/register \
  -H "Content-Type: application/json" \
  -d "{\"nodeId\":\"$NODE_ID\", \"coherence\":0.99}"
