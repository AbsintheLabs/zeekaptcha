# The big idea

The kaptcha-api currently creates the challenges alongside the merkle tree and the merkle proofs.

Here is an outline of what happens:

- The kaptcha-api generates 2 challenges. This means there is a merkle tree with 2 leaves and 1 root.
- The circom prover will take in the providedHash, the preimage (called userResponse), the merkle root, the merkle
tree, and the address (for msg.sender)


# The problem

The issue is that the hashing functions are not the same in the backend as they are in the prover.

the mimc7.hashbytes (in go) only works when the endianness is reversed.

The mimc7.Hash is the same as MiMC7 but is NOT the same as MultiMiMC7 (which is necessary to hash multiple values
together. AFAIK, there is no MultiMiMC7 in the go implementation.
Otherwise, how will we hash the two leaves as we climb up the tree?

As of now, I have not been able to find a way to make the hashing functions compatible. Either:
- we find a way to make them compatible
- we find a way to hash the two elements together without MultiMiMC7
- we switch to another hashing function altogether (and hope the same issues don't apply. We can see the ways
tornado cash is doing this).


* As a side note *: Since we control the tree generation, we have the freedom to pick how leaf hashing works
and hashing pairs works. Here are the two most important functions in the merkle tree library:

```
func standardLeafHash(value []byte) ([]byte, error) {
    // THE ORIGINAL CODE
	//k1, err := Keccak256(value)
	//if err != nil {
	//	return nil, err
	//}
	//k2, err := Keccak256(k1)
	//return k2, nil

	// CONVERTING TO MIMC7
	bigInt := new(big.Int)
	bigInt.SetBytes(value)
	k1 := mimc7.MIMC7Hash(bigInt, big.NewInt(0)).FillBytes(filler)
	return k1, nil
}

// Modify to use the mimc hash function
func hashPair(a, b []byte) ([]byte, error) {
	pairs := [][]byte{a, b}
	sort.Slice(pairs, func(i, j int) bool {
		return compareBytes(pairs[i], pairs[j])
	})
	var data []byte
	for _, v := range pairs {
		data = append(data, v...)
	}

    // THIS APPROACH IS NOT CONSISTENT WITH MULTIMIMC7
	//filler := make([]byte, 32)
	//
	//bigInt := new(big.Int)
	//bigInt.SetBytes(pairs[0])
	//bigInt2 := new(big.Int)
	//bigInt.SetBytes(pairs[1])
	//
	//var bigInts []*big.Int
	//bigInts = append(bigInts, bigInt, bigInt2)
	//
	//k1, _ := mimc7.Hash(bigInts, big.NewInt(0))
	//k2 := k1.FillBytes(filler)
	//return k2, nil
    // ------END APPROACH HERE

	filler := make([]byte, 32)
	bigInt := new(big.Int)
	bigInt.SetBytes(data)
	k1 := mimc7.MIMC7Hash(bigInt, big.NewInt(0)).FillBytes(filler)
	return k1, nil
}

```


Here is the unfinished circom circuit so far:

```
pragma circom 2.1.6;

include "circomlib/mimc.circom";


template Zeekaptcha () {
    // This is log(n) of the captcha store size and represents the merkle tree depth
    var PROOF_INPUT_LEN = 1;

    signal input address; // not taking part in any computation
    signal input providedHash;
    signal input userResponse;
    signal input merkleRoot;
    signal input merkleProof[PROOF_INPUT_LEN];
    signal output root;

    component hashers[PROOF_INPUT_LEN];
    component hasher;
    signal intermediateHashes[PROOF_INPUT_LEN+1];

    // Pre-image of hash
    // hasher = MultiMiMC7(1, 91); // 91 is hardcoded rounds in the go implementation
    // hasher.k <== 0; // 0 is hardcoded in the go implementation
    // hasher.in[0] <== userResponse;
    // intermediateHashes[0] <== hasher.out;
    // // hasher.out === providedHash;
    // log("test", hasher.out); // expecting 0DBE250AA118CF9AC61D64AEBB9A4DF82E579CDAB669A8EF9E46D2FEA18EF3A6

    hasher = MiMC7(91); // 91 is hardcoded rounds in the go implementation
    hasher.k <== 0; // 0 is hardcoded in the go implementation
    hasher.x_in <== userResponse;
    log("test", hasher.out);

    // for (var i = 0; i < PROOF_INPUT_LEN; i++) {
    //     hashers[i] = MultiMiMC7(2, 91);
    //     hashers[i].in[0] <== intermediateHashes[i];
    //     hashers[i].in[1] <== merkleProof[i];
    //     hashers[i].k <== 0;  // Key is set to 0
    //     intermediateHashes[i+1] <== hashers[i].out;
    // }

    // log("final", intermediateHashes[PROOF_INPUT_LEN]);

    // Add hidden signals to make sure that tampering with address will invalidate the snark proof
    // Most likely it is not required, but it's better to stay on the safe side and it only takes 2 constraints
    // Squares are used to prevent optimizer from removing those constraints
    signal addressSquare;
    signal merkleSquare;

    addressSquare <== address * address;
    merkleSquare <== merkleRoot * merkleRoot;
}

component main { public [address] } = Zeekaptcha();

/* INPUT = {
    "address": "0x16",
    "providedHash": "0x0ce10ed77fc48c5d61456b5751dfefad2f6a7bfcd18e7888a3ac221a5faa4547",
    "userResponse": "11746338389116470088721519907168449340395514904410178497032299565288505721379",
    "merkleRoot": "0x0",
    "merkleProof": ["0x18FD138C3366D32AD6363189DB1734351C1F20F35E0B5BCBD76FA23FAEDACAAA"]
} */

// address: the EOA address. 
// providedHash: the mimc(keccak(preimage)) sent by the API
// userResponse: the keccak(preimage) generated by the user
// merkleRoot: the merkle root given by the API
// merkleProof: proof given by the API (excluding the leaf). Since num_captchas is a power of 2, proof size is fixed

// 
```

