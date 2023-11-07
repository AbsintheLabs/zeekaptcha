import { ethers } from "ethers"
import { ZEEKAPTCHA_CHAIN_CONSTANTS } from "./constants"

export const submitTransaction = async (_proof: string[], _pubSignals: string[]) => {
    const contractAddress = ZEEKAPTCHA_CHAIN_CONSTANTS.sepolia.address
    const abi = ZEEKAPTCHA_CHAIN_CONSTANTS.sepolia.abi
    if ((window as any).ethereum) {
        await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ZEEKAPTCHA_CHAIN_CONSTANTS.sepolia.chainId }],
        });
        (window as any).ethereum.request({ method: 'eth_requestAccounts' })
            .then(async () => {
                const provider = new ethers.BrowserProvider((window as any).ethereum)
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer)
                const tx = await contract.verifyProof(_proof, _pubSignals, {gasLimit: 350000})
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

export const getEvents = async (address: string) => {
    const contractAddress = ZEEKAPTCHA_CHAIN_CONSTANTS.sepolia.address
    const abi = ZEEKAPTCHA_CHAIN_CONSTANTS.sepolia.abi
    if ((window as any).ethereum) {
        (window as any).ethereum.request({ method: 'eth_requestAccounts' })
            .then(async () => {
                const provider = new ethers.BrowserProvider((window as any).ethereum)
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer)
                console.log(address)
                const filter = contract.filters.CaptchaCompleted(address);
                const events = await contract.queryFilter(filter);
                return events;
            })
            .catch((error: any) => {
                console.error(error);
            });
    } else {
        throw new Error('window.ethereum not found');
    }
}