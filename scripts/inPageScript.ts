import { initializeProvider, WindowPostMessageStream } from "@/wallet-provider";
import log from "loglevel";
import { v4 as uuid } from "uuid";
import {
  ZOND_POST_MESSAGE_STREAM,
  ZOND_WALLET_PROVIDER_INFO,
} from "./constants";

const initializeInPageScript = () => {
  try {
    const zondStream = new WindowPostMessageStream({
      name: ZOND_POST_MESSAGE_STREAM.INPAGE,
      target: ZOND_POST_MESSAGE_STREAM.CONTENT_SCRIPT,
    });

    initializeProvider({
      connectionStream: zondStream,
      logger: log,
      providerInfo: {
        uuid: uuid(),
        name: ZOND_WALLET_PROVIDER_INFO.NAME,
        icon: ZOND_WALLET_PROVIDER_INFO.ICON,
        rdns: ZOND_WALLET_PROVIDER_INFO.RDNS,
      },
    });
  } catch (error) {
    console.warn("Zond Wallet: Failed to initialize the in-page script", error);
  }
};

// This function accounces the zond provider(based on EIP-6963) to be listened by the dApps.
initializeInPageScript();
