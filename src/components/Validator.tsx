import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { ImCheckmark, ImCross } from 'react-icons/im';
import CaptchaPopup from './CaptchaPopup';
import { ZkaptchaContext } from '../index';
import { DEFAULT_CAPTCHA_ENDPOINT } from '../utils/constants';
import { CaptchaObject } from './CaptchaPopup';
import absintheLogo from '../../assets/absintheLogo.png';
import { getEvents, submitTransaction } from '../utils/transaction';
import { proofToSolidityCalldata } from '../utils/prover';

export enum ValidatorState {
  Loading,
  Error,
  Success,
  Idle,
}

function Validator() {
  const [isPopupShowing, setShowPopup] = useState(false);
  const [captchaData, setCaptchaData] = useState<CaptchaObject | null>(null);

  // using the react context + providers
  const zc = React.useContext(ZkaptchaContext);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const fetchCaptcha = () => {
    if (captchaData !== null) return;
    fetch(DEFAULT_CAPTCHA_ENDPOINT)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCaptchaData(data);
        zc.setCaptchaData(data);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  return (
    <div className="grid grid-cols-2 bg-gray-100 border border-gray-300 text-black h-20 p-3 shadow-lg w-80 dark:bg-gray-700 dark:border-gray-800 dark:shadow-none dark:text-white">
      {/* lhs */}
      <div className="flex items-center justify-start space-x-2">
        <div className="relative flex items-center justify-center space-x-3">
          {/* captcha button */}
          {zc.validatorState === ValidatorState.Idle && (
            <>
              <button
                className="p-3.5 border border-gray-500 bg-gray-50 rounded-sm"
                onClick={() => {
                  fetchCaptcha();
                  setShowPopup(true);
                }}
              />
              <span>Verify</span>
              {/* disable the button when the button is not connected */}
              {/* {isDisconnected && (
                <>
                  <button
                    className="p-3.5 border border-gray-500 bg-gray-50 rounded-sm"
                    disabled={true}
                  />
                  <span>Verify</span>
                </>
              )} */}
              {/* enable the button when the wallet is connected */}
              {/* {isConnected && (
                <>
                  <button
                    className="p-3.5 border border-gray-500 bg-gray-50 rounded-sm"
                    onClick={() => {
                      fetchCaptcha();
                      setShowPopup(true);
                    }}
                  />
                  <span>Verify</span>
                </>
              )} */}
            </>
          )}
          {/* loading spinner */}
          {zc.validatorState === ValidatorState.Loading && (
            <>
              <Spinner />
              <span>Verifying</span>
            </>
          )}
          {/* success */}
          {zc.validatorState === ValidatorState.Success && (
            <>
              <ImCheckmark color="#22CA80" />
              {/* <span>Success!</span> */}
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-2 border border-transparent text-sm font-md rounded-md text-white bg-absinthe-green hover:bg-absinthe-green-dark" 
                onClick={
                  () => {
                    if (zc.proofResponse) {
                      const { _proof, _pubSignals } = JSON.parse(proofToSolidityCalldata(zc.proofResponse.proof, zc.proofResponse.publicSignals))
                      submitTransaction(_proof, _pubSignals)
                    } else {
                      throw new Error("No proof response")
                    }
                  }
                }
              >
              Submit Proof
              </button>
            </>
          )} 
          {/* error */}
          {zc.validatorState === ValidatorState.Error && (
            <>
              <ImCross color="#F87171" />
              <span>Error</span>
            </>
          )}

          {/* captcha popup */}
          {isPopupShowing && (
            <CaptchaPopup
              captchaData={captchaData}
              onClose={handlePopupClose}
              setProofResponse={zc.setProofResponse}
              setValidatorState={zc.setValidatorState}
            />
          )}
          {/* {!isLoading && !error && data && <ImCheckmark color="#22CA80" />}
          {!isLoading && error && !data && <ImCross color="#F87171" />} */}
        </div>
        <div className=""></div>
      </div>

      {/* rhs */}
      <div className="flex justify-center items-center">
        <div className="text-center">
          <a
            href="https://absinthelabs.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={absintheLogo} alt="logo" className="mx-auto" />
          </a>
          <div className="text-xs">
            {/* todo: put anchor links to the privacy and terms links */}
            <a className="hover:text-gray-500" href="">
              Privacy
            </a>{' '}
            -{' '}
            <a className="hover:text-gray-500" href="">
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Validator;
