import {
  initiateZondWalletProvider,
  WindowPostMessageStream,
} from "@/wallet-provider";
import { v4 as uuid } from "uuid";
import {
  ZOND_POST_MESSAGE_STREAM,
  ZOND_WALLET_PROVIDER_INFO,
} from "./constants";

const initiateZondContentScript = () => {
  try {
    const zondStream = new WindowPostMessageStream({
      name: ZOND_POST_MESSAGE_STREAM.NAME,
      target: ZOND_POST_MESSAGE_STREAM.TARGET,
    });
    initiateZondWalletProvider({
      connectionStream: zondStream,
      providerInfo: {
        uuid: uuid(),
        name: ZOND_WALLET_PROVIDER_INFO.NAME,
        icon: ZOND_WALLET_PROVIDER_INFO.ICON,
        rdns: ZOND_WALLET_PROVIDER_INFO.RDNS,
      },
      shouldSupportLegacyMethod: true,
    });
  } catch (error) {
    console.warn("Zond Wallet: Failed to inject the zond provider", error);
  }
};

// This function injects the zond provider to be used by the dApps.
initiateZondContentScript();
