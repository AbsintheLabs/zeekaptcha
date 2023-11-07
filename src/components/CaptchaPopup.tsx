import React, { useState, useEffect, FormEvent } from 'react';
import { doProve, proofToSolidityCalldata } from '../utils/prover.js';
import { ethers } from 'ethers';
import { ValidatorState } from './Validator.js';
import { PlonkProof, PublicSignals } from 'snarkjs';
import { Q_FIELD_SIZE } from '../utils/constants.js';

interface CaptchaPopupProps {
  onClose: () => void;
  captchaData: CaptchaObject | null;
  setProofResponse: React.Dispatch<React.SetStateAction<ProofResponse | null>>;
  setValidatorState: React.Dispatch<React.SetStateAction<ValidatorState>>;
}

export interface CaptchaObject {
  image: string;
  mimcHash: string;
  merkleProof: string[];
}

export interface ProofResponse {
  proof: PlonkProof;
  publicSignals: PublicSignals;
}

const LoadingImage: React.FC = () => {
  return (
    <div role="status" className="flex space-y-8 w-full animate-pulse">
      <div className="flex items-center justify-center w-full h-20 bg-gray-300 rounded sm:w-96 dark:bg-gray-700"></div>
    </div>
  );
};

const CaptchaPopup: React.FC<CaptchaPopupProps> = ({
  captchaData,
  onClose,
  setValidatorState,
  setProofResponse,
}) => {

  // fixme: replace this with the actual address
  const address = "0x0"
  // close the popup when the user clicks outside of it
  const handleOutsideClick = (e: MouseEvent) => {
    const popupContainer = document.getElementById('popupContainer');
    if (popupContainer && !popupContainer.contains(e.target as Node)) {
      onClose();
    }
  };

  // todo: return the proof/public signals and or the error associated with it
  const handleSolutionInput = async (event: FormEvent) => {
    event.preventDefault();
    const inputValue = ((event.target as HTMLFormElement).elements[0] as HTMLInputElement).value;

    const hashedPre = ethers.keccak256(ethers.toUtf8Bytes(inputValue));

    // Mod the hashed value
    const hashedPreBigInt = BigInt(hashedPre);
    const modValue = BigInt(Q_FIELD_SIZE);
    const moddedPreBigInt = hashedPreBigInt % modValue;

    if (captchaData && address) {
      // todo: the proof should take in the EOA from the connected wallet (wagmi)
      setValidatorState(ValidatorState.Loading);
      try {
        const { proof, publicSignals }: any = await doProve(
          address,
          moddedPreBigInt,
          captchaData?.mimcHash
        );
        // console.log(proof)
        // console.log(publicSignals)
        // console.log(proofToSolidityCalldata(proof, publicSignals))
        // close the popup
        onClose();
        // set the validator state to success
        setValidatorState(ValidatorState.Success);
        // set the proof response
        setProofResponse({ proof, publicSignals });
        // console.log(proofResult)
        return;
      } catch (error) {
        setValidatorState(ValidatorState.Error);
        console.log(error)
      }
    }
    // close the popup
    onClose();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div id="popupContainer">
      <div className="absolute top-14 left-0 transform -translate-y-full translate-x-2 text-white">
        &#9650;
      </div>
      <div
        className="absolute flex flex-col justify-center items-center top-0 z-20 left-0 mt-12 p-4 border-b border-r border-l border-gray-200 bg-white rounded shadow-xl space-y-4"
        style={{ width: '300px' }}
      >
        {!captchaData && <LoadingImage />}
        {captchaData && <img src={captchaData.image} alt="Captcha Image" />}
        <form
          className="flex flex-col space-y-4 w-full"
          onSubmit={handleSolutionInput}
        >
          <input
            required
            autoFocus={true}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
            placeholder="Solution"
          />
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-absinthe-green hover:bg-absinthe-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-absinthe-green-light"
          >
            ZK-Prove
          </button>
        </form>
      </div>
    </div>
  );
};

export default CaptchaPopup;
