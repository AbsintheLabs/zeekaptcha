# Rough outline

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "contracts/Verifier.sol";

// We have a few things we need to do
// 1. Take in a proof and verify it, 2. ensure that public input == msg.sender, 3. ensure that root public input is contained within the SM
contract Zeekaptcha is Ownable {
    Verifier verifier;
    uint256[2] private validMerkleRoots;

    event SuccessfulZeekaptcha(address indexed sender);

    constructor() Ownable(msg.sender) {}

    // Position 0 is the most up-to-date root
    function updateMerkleRoot(uint256 newRoot) external onlyOwner {
        if (validMerkleRoots[0] == newRoot || validMerkleRoots[1] == newRoot) {
            revert("Root already in array");
        }
        validMerkleRoots[1] = validMerkleRoots[0];
        validMerkleRoots[0] = newRoot;
    }

    function isMerkleInValidSet(uint256 root) private view returns(bool) {
        return (validMerkleRoots[0] == root) || (validMerkleRoots[1] == root);
    }

    function verify(bytes memory proof, uint[] memory pubSignals) external {
        // The circuit expects the first pubSignal to be the merkle root
        require(isMerkleInValidSet(pubSignals[0]), "Merkle proof invalid");

        // The circuit expects the second pubSignal to be the message sender
        require(address(uint160(pubSignals[1])) == msg.sender, "Invalid msg.sender");

        // Check proof validity
        bool verifyRet = verifier.verifyProof(proof, pubSignals);
        require(verifyRet, "Invalid proof");
        emit SuccessfulZeekaptcha(msg.sender);
    }
}
```
