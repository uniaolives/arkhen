// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ArkheVoyagerConsensus
 * @notice O Juiz Final das 365 Variantes da Realidade.
 * Valida se a realidade observada corresponde à trajetória canônica da Voyager.
 */
contract ArkheVoyagerConsensus {

    // As 365 variantes possíveis (hashes das manchetes ou timestamps)
    // Indexadas pelo dia do ano (1-365).
    mapping(uint256 => bytes32) public realityVariants;

    // A variante canônica (Dia 3 de Janeiro = 3)
    uint256 public constant CANONICAL_DAY = 3;
    bytes32 public constant CANONICAL_HASH = keccak256("The Times 03/Jan/2009 Chancellor on brink of second bailout for banks");

    // Estado da Voyager (atualizado por oráculo em Nov 2026)
    struct VoyagerState {
        uint256 distanceLightDays; // Deve ser ~1.0
        uint256 directionIndex;    // 1 a 365, mapeado da ascensão reta
        bool isLocked;
    }

    VoyagerState public voyager;

    event RealityConfirmed(uint256 indexed day, bytes32 indexed hash, bool isCanonical);

    /**
     * @notice O Oráculo da Voyager atualiza a posição.
     * Em Nov 2026, quando d = 1 dia-luz, o oráculo injeta a direção.
     */
    function lockVoyagerPosition(uint256 _directionIndex) external {
        require(voyager.distanceLightDays == 1, "Voyager not at 1LD");
        require(!voyager.isLocked, "Position already locked");

        voyager.directionIndex = _directionIndex;
        voyager.isLocked = true;

        // Verifica se caímos na realidade canônica
        bool isCanonical = (_directionIndex == CANONICAL_DAY);

        // Emite evento que "colapsa" a função de onda do contrato
        emit RealityConfirmed(_directionIndex, CANONICAL_HASH, isCanonical);
    }

    /**
     * @notice Verifica se um bloco Bitcoin pertence à nossa variante.
     * @param blockDate O dia do ano da mineração (1-365).
     */
    function verifyRealityBranch(uint256 blockDate) public view returns (bool) {
        require(voyager.isLocked, "Voyager reference not established");

        // A realidade é válida se a data do bloco coincidir com a direção da Voyager
        // Ou se for a variante canônica (dia 3) independente da direção (paradoxo)
        return (blockDate == voyager.directionIndex) || (blockDate == CANONICAL_DAY);
    }

    /**
     * @dev Helper para definir a distância (simulando oráculo)
     */
    function setDistance(uint256 _d) external {
        voyager.distanceLightDays = _d;
    }
}
