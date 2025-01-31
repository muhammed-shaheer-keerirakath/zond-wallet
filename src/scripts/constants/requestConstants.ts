export const UNRESTRICTED_METHODS = Object.freeze({
  ZOND_WEB3_WALLET_GET_PROVIDER_STATE: "zondWallet_getProviderState",
  ZOND_GET_BLOCK_BY_NUMBER: "zond_getBlockByNumber",
  NET_VERSION: "net_version",
  ZOND_ACCOUNTS: "zond_accounts",
});

export const RESTRICTED_METHODS = Object.freeze({
  ZOND_REQUEST_ACCOUNTS: "zond_requestAccounts",
});

export const ALL_REQUEST_METHODS = Object.values({
  ...RESTRICTED_METHODS,
  ...UNRESTRICTED_METHODS,
});
