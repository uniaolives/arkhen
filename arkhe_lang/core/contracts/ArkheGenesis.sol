
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ArkheGenesis
 * @notice Contrato que aceita provas de fase retrocausais (2140 -> 2009).
 */
contract ArkheGenesis {
    struct PhaseProof {
        bytes32 rootHash;
        uint256 targetTime;
        uint8 coherence;
        bool isRetrocausal;
        address verifier;
    }

    mapping(bytes32 => PhaseProof) public proofs;
    event PhaseAnchored(bytes32 indexed proofHash, uint256 targetTime, bool retrocausal);

    function anchorPhaseProof(
        bytes32 _proofHash,
        uint256 _targetTime,
        uint8 _coherence
    ) external {
        require(_coherence >= 95, "Coherence too low for temporal lock");
        require(proofs[_proofHash].rootHash == bytes32(0), "Proof already anchored");

        bool retro_effect = (_targetTime < block.timestamp);

        proofs[_proofHash] = PhaseProof({
            rootHash: _proofHash,
            targetTime: _targetTime,
            coherence: _coherence,
            isRetrocausal: retro_effect,
            verifier: msg.sender
        });

        emit PhaseAnchored(_proofHash, _targetTime, retro_effect);
    }
}
