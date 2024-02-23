// Define prover function

import {
  PlonkProof,
  PublicSignals,
  SignalValueType,
  ZKArtifact,
} from "snarkjs";

import wasmCircuit from "../../assets/verify.wasm";
import zkey from "../../assets/verify.zkey";

export const doProve = async (
  secret: SignalValueType,
  expectedMimc: SignalValueType,
  root: SignalValueType,
  sender: SignalValueType
) => {
  if (!window.snarkjs) {
    throw new Error("snarkjs is not loaded yet");
  }
  const fetchAndDecodeBinary = async (binary: string): Promise<ZKArtifact> => {
    try {
      const response = await fetch(`data:application/wasm;base64,${binary}`);
      const buffer = await response.arrayBuffer();
      return new Uint8Array(buffer);
    } catch (error) {
      console.error("Error converting Base64 to Uint8Array", error);
      return new Uint8Array();
    }
  };
  const decodedWasm = await fetchAndDecodeBinary(wasmCircuit);
  const decodedZkey = await fetchAndDecodeBinary(zkey);

  console.debug({
    secret,
    expectedMimc,
    root,
    sender,
  });

  const { proof, publicSignals } = await window.snarkjs.plonk.fullProve(
    {
      secret: secret,
      expectedMimc: expectedMimc,
      root: root,
      sender: sender,
    },
    decodedWasm,
    decodedZkey
  );
  return { proof, publicSignals };
};

export const proofToSolidityCalldata = (
  proof: PlonkProof,
  publicSignals: PublicSignals
) => {
  const ignoreKeys = ["protocol", "curve"];
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
