export const UNRESTRICTED_METHODS = Object.freeze({
  ZOND_WEB3_WALLET_GET_PROVIDER_STATE: "zondWallet_getProviderState",
  ZOND_GET_BLOCK_BY_NUMBER: "zond_getBlockByNumber",
});

export const RESTRICTED_METHODS = Object.freeze({
  ZOND_REQUEST_ACCOUNTS: "zond_requestAccounts",
});

export const ALLOWED_REQUEST_METHODS = Object.values({
  ...RESTRICTED_METHODS,
  ...UNRESTRICTED_METHODS,
});
