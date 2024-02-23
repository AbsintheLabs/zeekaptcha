import absintheLogo from "/absinthelabs.png";
import "./App.css";
import Zeekaptcha from "zeekaptcha";
import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";

function App() {
  // 1. Get projectId
  const projectId = "5e6cde81be287a91b0cde1bf70e652a0";

  // 2. Set chains
  const sepolia = {
    chainId: 11155111,
    name: "Sepolia",
    currency: "ETH",
    explorerUrl: "https://sepolia.etherscan.io/",
    rpcUrl:
      "https://eth-sepolia.g.alchemy.com/v2/h1v_tiu0M3dX4gCTIYd1V8AV106CPQWW",
  };

  // 3. Create modal
  const metadata = {
    name: "My Website",
    description: "My Website description",
    url: "http://localhost:5173", // origin must match your domain & subdomain
    icons: ["http://localhost:5173/absinthelabs.png"],
  };

  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [sepolia],
    projectId,
    enableAnalytics: false,
  });

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return (
    <>
      <div>
        <w3m-button />
        <a href="https://absinthelabs.xyz" target="_blank">
          <img src={absintheLogo} className="logo" alt="Absinthe logo" />
        </a>
      </div>
      <h1>Zeekaptcha</h1>
      <h2>On-Chain Reputation and Sybil Resistance</h2>
      {isConnected ? (
        <p>
          <div className="card">
            <Zeekaptcha address={address} />
          </div>
          <p className="read-the-docs">
            Click on the Absinthe logo to learn more
          </p>
        </p>
      ) : (
        <h2> 🔗 Please connect wallet </h2>
      )}
    </>
  );
}

export default App;
