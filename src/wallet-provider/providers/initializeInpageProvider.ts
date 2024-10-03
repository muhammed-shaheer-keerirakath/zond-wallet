import type { Duplex } from "readable-stream";
import type { EIP6963ProviderInfo } from "./EIP6963";
import { announceProvider } from "./EIP6963";
import type { MetaMaskInpageProviderOptions } from "./MetaMaskInpageProvider";
import { MetaMaskInpageProvider } from "./MetaMaskInpageProvider";

type InitializeProviderOptions = {
  /**
   * The stream used to connect to the wallet.
   */
  connectionStream: Duplex;
  /**
   * The EIP-6963 provider info that should be announced if set.
   */
  providerInfo?: EIP6963ProviderInfo;
} & MetaMaskInpageProviderOptions;

/**
 * Initializes a MetaMaskInpageProvider and (optionally) assigns it as window.ethereum.
 *
 * @param options - An options bag.
 * @param options.connectionStream - A Node.js stream.
 * @param options.jsonRpcStreamName - The name of the internal JSON-RPC stream.
 * @param options.logger - The logging API to use. Default: `console`.
 * @param options.maxEventListeners - The maximum number of event listeners.
 * @param options.providerInfo - The EIP-6963 provider info that should be announced if set.
 * @param options.shouldSendMetadata - Whether the provider should send page metadata.
 * @returns The initialized provider (whether set or not).
 */
export function initializeProvider({
  connectionStream,
  jsonRpcStreamName,
  logger = console,
  maxEventListeners = 100,
  providerInfo,
  shouldSendMetadata = true,
}: InitializeProviderOptions): MetaMaskInpageProvider {
  const provider = new MetaMaskInpageProvider(connectionStream, {
    jsonRpcStreamName,
    logger,
    maxEventListeners,
    shouldSendMetadata,
  });

  const proxiedProvider = new Proxy(provider, {
    // some common libraries, e.g. web3@1.x, mess with our API
    deleteProperty: () => true,
    // fix issue with Proxy unable to access private variables from getters
    // https://stackoverflow.com/a/73051482
    get(target, propName: "chainId" | "networkVersion" | "selectedAddress") {
      return target[propName];
    },
  });

  if (providerInfo) {
    announceProvider({
      info: providerInfo,
      provider: proxiedProvider,
    });
  }

  return proxiedProvider;
}