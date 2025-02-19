export const ZOND_BLOCKCHAIN = {
  LOCAL: {
    id: "LOCAL",
    isConfigurationRequired: true,
    url: "http://127.0.0.1:32774",
    name: "Local",
    description:
      "Connect to a locally running zond blockchain node. You should have a blockchain running in your machine.",
  },
  TEST_NET: {
    id: "TEST_NET",
    isConfigurationRequired: true,
    url: "http://209.250.255.226:8545",
    name: "Testnet",
    description:
      "Connect to the zond testnet. Specify the IP address and port number of the testnet.",
  },
  MAIN_NET: {
    id: "MAIN_NET",
    isConfigurationRequired: false,
    url: "https://mainnet.zond.com",
    name: "Mainnet",
    description:
      "Connect to the zond mainnet. The real zond blockchain network.",
  },
};

export type BlockchainType = keyof typeof ZOND_BLOCKCHAIN;
