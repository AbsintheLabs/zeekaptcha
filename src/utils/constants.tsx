export const DEFAULT_CAPTCHA_ENDPOINT = "http://localhost:6969/captcha";

export const Q_FIELD_SIZE =
  "21888242871839275222246405745257275088548364400416034343698204186575808495617";

export const ZEEKAPTCHA_CHAIN_CONSTANTS = {
  // fixme: replace this with the actual address
  sepolia: {
    address: "0x49527e13101DA9973fEd8170b719584b7429D191",
    abi: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "EOA",
            type: "address",
          },
        ],
        name: "CaptchaCompleted",
        type: "event",
      },
      {
        inputs: [
          { internalType: "uint256[24]", name: "_proof", type: "uint256[24]" },
          {
            internalType: "uint256[2]",
            name: "_pubSignals",
            type: "uint256[2]",
          },
        ],
        name: "verifyProof",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    chainId: "0xaa36a7",
  },
};
