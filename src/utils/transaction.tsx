import { ethers } from "ethers"
import { ZEEKAPTCHA_CHAIN_CONSTANTS } from "./constants"

export const submitTransaction = async (_proof: string[], _pubSignals: string[]) => {
    const contractAddress = ZEEKAPTCHA_CHAIN_CONSTANTS.sepolia.address;
    const abi = ZEEKAPTCHA_CHAIN_CONSTANTS.sepolia.abi;

    try {
        if (!(window as any).ethereum) {
            throw new Error('window.ethereum not found');
        }
        // Attempt to switch the Ethereum chain
        await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: ZEEKAPTCHA_CHAIN_CONSTANTS.sepolia.chainId }],
        });

        // Request accounts from the Ethereum provider
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

        // Create a provider and signer
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signerFromProvider = await provider.getSigner();

        // Create a new contract instance with the signer
        const contract = new ethers.Contract(contractAddress, abi, signerFromProvider);

        // Send the transaction
        const tx = await contract.verifyProof(_proof, _pubSignals, { gasLimit: 350000 });
        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log(receipt.hash); // Log the transaction hash

        // Return the receipt once the transaction is confirmed
        return true;
    } catch (error) {
        throw error;
    }
}


    // //attempt2
    // try {
    //     console.log(signer)
    //     const contract = new ethers.Contract(contractAddress, abi, signer)
    //     const tx = await contract.verifyProof(_proof, _pubSignals, {gasLimit: 350000})
    //     console.log(tx)
    //     await tx.wait()
    //     console.log(tx.hash)
    // } catch (error) {
    //     console.error(error);
    //     throw error; 
    // }


export const getEvents = async (address: string) => {
    const contractAddress = ZEEKAPTCHA_CHAIN_CONSTANTS.sepolia.address;
    const abi = ZEEKAPTCHA_CHAIN_CONSTANTS.sepolia.abi;

    if (!(window as any).ethereum) {
        throw new Error('window.ethereum not found');
    }

    try {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const filter = contract.filters.CaptchaCompleted(address);
        const events = await contract.queryFilter(filter);
        return events;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};
