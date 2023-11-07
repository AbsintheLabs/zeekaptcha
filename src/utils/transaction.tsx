import { ethers, Signer } from "ethers"
import { ZEEKAPTCHA_CHAIN_CONSTANTS } from "./constants"

interface Calldata {
    _proof: string[]; // Adjust the type if your proof array has a different type
    _pubSignals: string[]; // Adjust the type if your public signals array has different types
  }

export const submitTransaction = async (_proof: string[], _pubSignals: string[]) => {
    const contractAddress = ZEEKAPTCHA_CHAIN_CONSTANTS.sepolia.address
    const abi = ZEEKAPTCHA_CHAIN_CONSTANTS.sepolia.abi
    if ((window as any).ethereum) {
        (window as any).ethereum.request({ method: 'eth_requestAccounts' })
            .then(async () => {
                const provider = new ethers.BrowserProvider((window as any).ethereum)
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer)
                const tx = await contract.verifyAndLog(_proof, _pubSignals, {gasLimit: 350000})
                await tx.wait()
                console.log(tx.hash)
            })
            .catch((error: any) => {
                console.error(error);
            });
    } else {
        throw new Error('window.ethereum not found');
    }
}