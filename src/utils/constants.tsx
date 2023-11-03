export const DEFAULT_CAPTCHA_ENDPOINT =
  'https://us-east1-absinthe-69420.cloudfunctions.net/requestChallenge?dapp=AbsintheGoerliFaucet';

export const Q_FIELD_SIZE =
  '21888242871839275222246405745257275088548364400416034343698204186575808495617';

export const STORAGE_CONTRACT_ABI = [
  {
    inputs: [{ internalType: 'uint256', name: 'num', type: 'uint256' }],
    name: 'store',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'retrieve',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const MODULE_CONTRACT_ABI = [
    {
      "inputs": [],
      "name": "OnlyPortalOwner",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "version",
          "type": "uint8"
        }
      ],
      "name": "Initialized",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "_getAttester",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "schemaId",
              "type": "bytes32"
            },
            {
              "internalType": "uint64",
              "name": "expirationDate",
              "type": "uint64"
            },
            {
              "internalType": "bytes",
              "name": "subject",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "attestationData",
              "type": "bytes"
            }
          ],
          "internalType": "struct AttestationPayload",
          "name": "attestationPayload",
          "type": "tuple"
        },
        {
          "internalType": "bytes[]",
          "name": "validationPayloads",
          "type": "bytes[]"
        }
      ],
      "name": "attest",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "attestationRegistry",
      "outputs": [
        {
          "internalType": "contract AttestationRegistry",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "schemaId",
              "type": "bytes32"
            },
            {
              "internalType": "uint64",
              "name": "expirationDate",
              "type": "uint64"
            },
            {
              "internalType": "bytes",
              "name": "subject",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "attestationData",
              "type": "bytes"
            }
          ],
          "internalType": "struct AttestationPayload[]",
          "name": "attestationsPayloads",
          "type": "tuple[]"
        },
        {
          "internalType": "bytes[][]",
          "name": "validationPayloads",
          "type": "bytes[][]"
        }
      ],
      "name": "bulkAttest",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "attestationIds",
          "type": "bytes32[]"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "schemaId",
              "type": "bytes32"
            },
            {
              "internalType": "uint64",
              "name": "expirationDate",
              "type": "uint64"
            },
            {
              "internalType": "bytes",
              "name": "subject",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "attestationData",
              "type": "bytes"
            }
          ],
          "internalType": "struct AttestationPayload[]",
          "name": "attestationsPayloads",
          "type": "tuple[]"
        },
        {
          "internalType": "bytes[][]",
          "name": "validationPayloads",
          "type": "bytes[][]"
        }
      ],
      "name": "bulkReplace",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "attestationIds",
          "type": "bytes32[]"
        }
      ],
      "name": "bulkRevoke",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getModules",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "_modules",
          "type": "address[]"
        },
        {
          "internalType": "address",
          "name": "_router",
          "type": "address"
        }
      ],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "moduleRegistry",
      "outputs": [
        {
          "internalType": "contract ModuleRegistry",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "modules",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "portalRegistry",
      "outputs": [
        {
          "internalType": "contract PortalRegistry",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "attestationId",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "schemaId",
              "type": "bytes32"
            },
            {
              "internalType": "uint64",
              "name": "expirationDate",
              "type": "uint64"
            },
            {
              "internalType": "bytes",
              "name": "subject",
              "type": "bytes"
            },
            {
              "internalType": "bytes",
              "name": "attestationData",
              "type": "bytes"
            }
          ],
          "internalType": "struct AttestationPayload",
          "name": "attestationPayload",
          "type": "tuple"
        },
        {
          "internalType": "bytes[]",
          "name": "validationPayloads",
          "type": "bytes[]"
        }
      ],
      "name": "replace",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "attestationId",
          "type": "bytes32"
        }
      ],
      "name": "revoke",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "router",
      "outputs": [
        {
          "internalType": "contract IRouter",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceID",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

export const MODULE_CONTRACT_ADDRESS = '0xb5A519bBD90675f0505D3FC079b0ED03e7eB3936'