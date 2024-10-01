import { Duplex } from "readable-stream";
import { announceProvider, EIP6963ProviderInfo } from "./EIP6963";
import { MetaMaskInpageProvider } from "./MetaMaskInpageProvider";
import { shimWeb3 } from "./shimWeb3";

type InitializeZondWalletProviderParams = {
  connectionStream: Duplex;
  providerInfo: EIP6963ProviderInfo;
  shouldSupportLegacyMethod: boolean;
};

/**
 * Initializes a ZondInpageProvider and injects window.ethereum object.
 *
 * @param params - Zond Wallet provider parameters object.
 * @param params.connectionStream - A Node.js stream.
 * @param params.providerInfo - The EIP-6963 provider info that should be announced if set.
 * @param params.shouldSupportLegacyMethod - A flag to decide whether the old way of inecting provider to window is required.
 * This flag can be removed in the future once all dApps supports EIP-6963.
 * @returns The initialized provider.
 */
export const initiateZondWalletProvider = ({
  connectionStream,
  providerInfo,
  shouldSupportLegacyMethod,
}: InitializeZondWalletProviderParams) => {
  const provider = new MetaMaskInpageProvider(connectionStream);

  const proxiedProvider = new Proxy(provider, {
    deleteProperty: () => true,
    get(target, propName: "chainId" | "networkVersion" | "selectedAddress") {
      return target[propName];
    },
  });

  announceProvider({
    info: providerInfo,
    provider: proxiedProvider,
  });

  if (shouldSupportLegacyMethod) {
    setGlobalProvider(proxiedProvider);
    shimWeb3(proxiedProvider);
  }

  return proxiedProvider;
};

export default initiateZondWalletProvider;

/**
 * Sets the given provider instance as window.ethereum and dispatches the
 * 'ethereum#initialized' event on window.
 *
 * @param providerInstance - The provider instance.
 */
export function setGlobalProvider(
  providerInstance: MetaMaskInpageProvider,
): void {
  (window as Record<string, any>).ethereum = providerInstance;
  window.dispatchEvent(new Event("ethereum#initialized"));
}
