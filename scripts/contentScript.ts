import { initializeProvider, WindowPostMessageStream } from "@/wallet-provider";
import { v4 as uuid } from "uuid";
import {
  ZOND_POST_MESSAGE_STREAM,
  ZOND_WALLET_PROVIDER_INFO,
} from "./constants";

const initializeContentScript = () => {
  try {
    const zondStream = new WindowPostMessageStream({
      name: ZOND_POST_MESSAGE_STREAM.NAME,
      target: ZOND_POST_MESSAGE_STREAM.TARGET,
    });
    initializeProvider({
      connectionStream: zondStream,
      providerInfo: {
        uuid: uuid(),
        name: ZOND_WALLET_PROVIDER_INFO.NAME,
        icon: ZOND_WALLET_PROVIDER_INFO.ICON,
        rdns: ZOND_WALLET_PROVIDER_INFO.RDNS,
      },
    });
  } catch (error) {
    console.warn("Zond Wallet: Failed to setup the zond provider", error);
  }
};

// This function accounces the zond provider(based on EIP-6963) to be listened by the dApps.
initializeContentScript();
