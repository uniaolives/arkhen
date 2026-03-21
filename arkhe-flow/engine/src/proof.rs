
//! Módulo de Geração de Provas π² (Arkhe-Chain Integration)
//! Gera um hash SHA-256 da execução completa do fluxo.

use sha2::{Sha256, Digest};
use crate::ExecutionContext;

/// Gera uma "Prova de Holonomia" da execução.
/// Esta é a assinatura imutável de que o fluxo foi executado.
pub fn generate_execution_proof(ctx: &ExecutionContext) -> String {
    let mut hasher = Sha256::new();

    // 1. Hash do ID do Workflow
    hasher.update(ctx.workflow_id.as_bytes());

    // 2. Hash de todos os estados dos nós (Ordem determinística)
    let mut sorted_keys: Vec<_> = ctx.node_states.keys().cloned().collect();
    sorted_keys.sort();

    for key in sorted_keys {
        let state = ctx.node_states.get(&key).unwrap();
        // Serializa o estado para string (simplificado)
        hasher.update(key.as_bytes());
        let state_str = format!("{:?}", state);
        hasher.update(state_str.as_bytes());
    }

    // 3. Hash dos dados transformados
    let mut data_keys: Vec<_> = ctx.data.keys().cloned().collect();
    data_keys.sort();

    for key in data_keys {
        let val = ctx.data.get(&key).unwrap();
        hasher.update(key.as_bytes());
        hasher.update(val.to_string().as_bytes());
    }

    let result = hasher.finalize();
    format!("{:x}", result)
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{Workflow, FlowNode, PhaseState};
    use serde_json::json;

    #[test]
    fn test_proof_generation() {
        let wf = Workflow {
            id: "wf_test".to_string(),
            name: "Test".to_string(),
            nodes: vec![
                FlowNode { id: "n1".to_string(), node_type: "Start".to_string(), config: json!({}), phase: PhaseState::Completed },
            ],
            edges: vec![],
            created_at: 0,
            last_run_hash: None,
        };

        let mut ctx = ExecutionContext::new(&wf);
        ctx.node_states.insert("n1".to_string(), PhaseState::Completed);
        ctx.data.insert("n1".to_string(), json!({"test": "data"}));

        let proof = generate_execution_proof(&ctx);
        assert!(!proof.is_empty());
    }
}
