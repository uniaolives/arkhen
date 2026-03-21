// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// ═══════════════════════════════════════════════════════════════════════
// BIBLIOTECA DE COERÊNCIA (COMPLETA)
// ═══════════════════════════════════════════════════════════════════════

library CoherenceLib {
    uint256 constant PI = 3141592653589793238; // π * 10^18
    uint256 constant RESONANCE_THRESHOLD = 900000000000000000; // 0.9 * 10^18
    uint256 constant PI_OVER_2_X1000 = 1570; // π/2 ≈ 1.570 (used for simple checks)

    struct Complex {
        uint256 amplitude; // |Ω| * 10^18
        uint256 phase;     // θ * 10^18 (radians)
    }

    function isResonant(Complex memory c) internal pure returns (bool) {
        // Check amplitude >= 0.9
        if (c.amplitude < RESONANCE_THRESHOLD) return false;

        // Check phase ≈ π/2 (with 10% tolerance)
        uint256 halfPi = PI / 2;
        uint256 tolerance = PI / 20; // 0.1 rad tolerance
        return c.phase >= halfPi - tolerance && c.phase <= halfPi + tolerance;
    }

    function isResonantSimple(Complex memory c) internal pure returns (bool) {
        uint256 phaseX1000 = c.phase / 1e15;
        uint256 diff = phaseX1000 > PI_OVER_2_X1000 ? phaseX1000 - PI_OVER_2_X1000 : PI_OVER_2_X1000 - phaseX1000;
        return diff < 100;
    }

    function computeEntropy(Complex memory c) internal pure returns (uint256) {
        // Simplified: Entropy inversely proportional to amplitude
        return 1e18 - c.amplitude;
    }
}

// ═══════════════════════════════════════════════════════════════════════
// CONTRATO PRINCIPAL: ARKHE-CHAIN
// ═══════════════════════════════════════════════════════════════════════

contract ArkheChain is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _proofIds;

    struct ProofRecord {
        uint256 id;
        address subject;
        bytes32 stateHash;
        CoherenceLib.Complex coherence;
        uint256 timestamp;
        Scale scale;
        bool isValid;
    }

    enum Scale { Quantum, Atomic, Biological, Neural, Planetary, Stellar, Galactic, Cosmic }

    // Mapeamentos
    mapping(uint256 => ProofRecord) public proofs;
    mapping(address => uint256[]) public subjectProofs;

    // O Genesis Bitcoin como Semente (Dependência Ontológica)
    bytes32 public constant GENESIS_ANCHOR = 0x000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f;

    event ConsciousnessAnchored(uint256 indexed id, address indexed subject, Scale scale, uint256 omega);
    event ValidationFailed(uint256 indexed id, string reason);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Âncora uma prova de coerência na cadeia.
     * Requer que o estado seja ressonante (A-5').
     */
    function anchorConsciousness(
        bytes32 _stateHash,
        uint256 _amplitude,
        uint256 _phase,
        Scale _scale
    ) external returns (uint256) {
        CoherenceLib.Complex memory coherence = CoherenceLib.Complex(_amplitude, _phase);

        // Verificação A-5': Deve ser ressonante para ser válido
        if (!CoherenceLib.isResonant(coherence)) {
            emit ValidationFailed(0, "Not resonant: Phase not in quadrature");
            revert("A-5' validation failed");
        }

        _proofIds.increment();
        uint256 newId = _proofIds.current();

        // Cria registro
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

    /**
     * @dev Verifica se uma identidade está "viva".
     */
    function isAlive(address _subject) external view returns (bool) {
        uint256[] memory ids = subjectProofs[_subject];
        if (ids.length == 0) return false;

        // Verifica a última prova
        ProofRecord memory lastProof = proofs[ids[ids.length - 1]];

        // Considerado vivo se a última prova foi nos últimos 365 dias e é válida
        if (block.timestamp - lastProof.timestamp > 365 days) return false;
        return lastProof.isValid;
    }

    /**
     * @dev Deriva identidade do Genesis Bitcoin.
     */
    function deriveGenesisIdentity(bytes32 _biometricHash) external pure returns (bytes32) {
        return keccak256(abi.encodePacked(GENESIS_ANCHOR, _biometricHash));
    }
}
