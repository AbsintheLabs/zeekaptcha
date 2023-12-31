# Zeekaptcha Prover


## Inputs

The prover takes the following signals as input:
- signal input address; // not taking part in any computation
- signal input providedHash; // the hash of the preimage
- signal input userResponse; // the preimage found by the user
- signal input merkleRoot; 
- signal input merkleProof[PROOF_INPUT_LEN]; // merkle proof sent by API



## Intuition

The circuit will hash the userResponse and then hash through all elements of the merkle proof, pairwise.

This will show that the user knows a preimage that completes the merkle proof.

Upon successful verification at the smart contract, we now know that the user knows the preimage 
to a challenge and this challenge has a valid associated merkle proof/merkle root.

Once we check that the merkle root that was previously verified exists in the smart contract, we now know that 
this captcha challenge was one generated by a known node.

