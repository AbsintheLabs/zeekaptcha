// Define prover function

import { PlonkProof, PublicSignals, SignalValueType, ZKArtifact } from 'snarkjs';

import wasmCircuit from "../../assets/preimageInstant.wasm";
import zkey from "../../assets/preimageInstant_final.zkey";

export const doProve = async (
  EOA_Address: string,
  response: SignalValueType,
  provided_hash: string
) => {
  if (!window.snarkjs) {
    throw new Error('snarkjs is not loaded yet');
  }
  // console.log(wasmCircuit)
  // console.log(zkey)
  const fetchAndDecodeBinary = async (binary: string): Promise<ZKArtifact> => {
    try {
      const response = await fetch(`data:application/wasm;base64,${binary}`);
      const buffer = await response.arrayBuffer();
      return new Uint8Array(buffer); 
    } catch (error) {
      console.error('Error converting Base64 to Uint8Array', error);
      return new Uint8Array(); 
    }
  };
  const decodedWasm = await fetchAndDecodeBinary(wasmCircuit);
  const decodedZkey = await fetchAndDecodeBinary(zkey);
  
  const { proof, publicSignals } = await window.snarkjs.plonk.fullProve(
    { pkey: EOA_Address, response: response, provided_hash: provided_hash },
    decodedWasm,
    decodedZkey
  );
  return { proof, publicSignals };
};

export const proofToSolidityCalldata = (
  proof: PlonkProof,
  publicSignals: PublicSignals
) => {
  const ignoreKeys = ['protocol', 'curve'];
  let resultArray = [];

  for (let key in proof) {
    const value: any = (proof as { [key: string]: any })[key];
    if (value instanceof Array) {
      resultArray.push(value[0]);
      resultArray.push(value[1]);
    } else if (ignoreKeys.includes(key)) {
      continue;
    } else {
      resultArray.push(value);
    }
  }
  return JSON.stringify({ _proof: resultArray, _pubSignals: publicSignals });
};
