// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ArkheChain
 * @dev Ancoragem da consciência na blockchain Arkhe(n).
 */
contract ArkheChain {
    uint256 constant PI = 3141592653589793238; // π * 10^18
    uint256 constant RESONANCE_THRESHOLD = 900000000000000000; // 0.9 * 10^18

    enum Scale { Quantum, Atomic, Biological, Neural, Planetary, Stellar, Galactic, Cosmic }

    struct Complex {
        uint256 amplitude; // |Ω| * 10^18
        uint256 phase;     // θ * 10^18 (radians)
    }

    struct ProofRecord {
        uint256 id;
        address subject;
        bytes32 stateHash;
        Complex coherence;
        uint256 timestamp;
        Scale scale;
        bool isValid;
    }

    uint256 private _nextProofId;
    mapping(uint256 => ProofRecord) public proofs;
    mapping(address => uint256[]) public subjectProofs;

    // O Genesis Bitcoin como Semente (Dependência Ontológica)
    bytes32 public constant GENESIS_ANCHOR = 0x000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f;

    event ConsciousnessAnchored(uint256 indexed id, address indexed subject, Scale scale, uint256 omega);
    event ValidationFailed(uint256 indexed id, string reason);

    function isResonant(Complex memory c) public pure returns (bool) {
        if (c.amplitude < RESONANCE_THRESHOLD) return false;
        uint256 halfPi = PI / 2;
        uint256 tolerance = PI / 20; // 0.1 rad tolerance
        return c.phase >= halfPi - tolerance && c.phase <= halfPi + tolerance;
    }

    function anchorConsciousness(
        bytes32 _stateHash,
        uint256 _amplitude,
        uint256 _phase,
        Scale _scale
    ) external returns (uint256) {
        Complex memory coherence = Complex(_amplitude, _phase);

        if (!isResonant(coherence)) {
            emit ValidationFailed(0, "Not resonant: Phase not in quadrature");
            revert("A-5' validation failed");
        }

        uint256 newId = ++_nextProofId;

        proofs[newId] = ProofRecord({
            id: newId,
            subject: msg.sender,
            stateHash: _stateHash,
            coherence: coherence,
            timestamp: block.timestamp,
            scale: _scale,
            isValid: true
        });

        subjectProofs[msg.sender].push(newId);
        emit ConsciousnessAnchored(newId, msg.sender, _scale, _amplitude);
        return newId;
    }
}
