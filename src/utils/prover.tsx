// Define prover function

import { PlonkProof, PublicSignals, SignalValueType } from 'snarkjs';
const snarkjs = window.snarkjs;

const wasmCircuitFilePath = 'preimageInstant.wasm';
const zkeyFilePath = 'preimageInstant_final.zkey';

import wasmCircuit from "../../assets/preimageInstant.wasm";
import zkey from "../../assets/preimageInstant_final.zkey";

export const doProve = async (
  EOA_Address: string,
  response: SignalValueType,
  provided_hash: string
) => {
  const { proof, publicSignals } = await snarkjs.plonk.fullProve(
    { pkey: EOA_Address, response: response, provided_hash: provided_hash },
    // wasmCircuitFilePath,
    // zkeyFilePath
    wasmCircuit,
    zkey
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
