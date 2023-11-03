import React, { useEffect } from 'react';
import './index.css';
import Validator, { ValidatorState } from './components/Validator';
import { ProofResponse, CaptchaObject } from './components/CaptchaPopup';
import snarkjs from '../assets/snarkjs.min.js';

interface ZkaptchaContextProps {
  validatorState: ValidatorState;
  setValidatorState: React.Dispatch<React.SetStateAction<ValidatorState>>;
  proofResponse: ProofResponse | null;
  setProofResponse: React.Dispatch<React.SetStateAction<ProofResponse | null>>;
  captchaData: CaptchaObject | null;
  setCaptchaData: React.Dispatch<React.SetStateAction<CaptchaObject | null>>;
}

export const ZkaptchaContext = React.createContext<ZkaptchaContextProps>(
  {} as any
);

const Zeekaptcha = () => {

  useEffect(() => {
    const script = document.createElement('script');
    console.log(snarkjs)
    script.src = snarkjs;
    script.async = true;
    
    document.body.appendChild(script);
    
    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [validatorState, setValidatorState] = React.useState<ValidatorState>(
    ValidatorState.Idle
  );
  const [proofResponse, setProofResponse] =
    React.useState<ProofResponse | null>(null);

  const [captchaData, setCaptchaData] = React.useState<CaptchaObject | null>(null);
  return (
      <ZkaptchaContext.Provider
        value={{
          validatorState,
          setValidatorState,
          proofResponse,
          setProofResponse,
          captchaData,
          setCaptchaData,
        }}
      >
        <Validator />
      </ZkaptchaContext.Provider>
  )
}

export default Zeekaptcha;