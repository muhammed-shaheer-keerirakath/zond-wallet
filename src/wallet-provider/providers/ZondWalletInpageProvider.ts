import type { Duplex } from "readable-stream";
import type { Json, JsonRpcRequest, JsonRpcResponse } from "../utils";
import messages from "./messages";
import { sendSiteMetadata } from "./siteMetadata";
import type { StreamProviderOptions } from "./StreamProvider";
import { AbstractStreamProvider } from "./StreamProvider";
import { EMITTED_NOTIFICATIONS, getDefaultExternalMiddleware } from "./utils";

export type SendSyncJsonRpcRequest = {
  method:
    | "eth_accounts"
    | "eth_coinbase"
    | "eth_uninstallFilter"
    | "net_version";
} & JsonRpcRequest;

type WarningEventName = keyof SentWarningsState["events"];

export type ZondWalletInpageProviderOptions = {
  /**
   * Whether the provider should send page metadata.
   */
  shouldSendMetadata?: boolean;
  jsonRpcStreamName?: string | undefined;
} & Partial<Omit<StreamProviderOptions, "rpcMiddleware">>;

type SentWarningsState = {
  // methods
  enable: boolean;
  experimentalMethods: boolean;
  send: boolean;
  // events
  events: {
    close: boolean;
    data: boolean;
    networkChanged: boolean;
    notification: boolean;
  };
};

/**
 * The name of the stream consumed by {@link ZondWalletInpageProvider}.
 */
export const ZondWalletInpageProviderStreamName = "zond-wallet-provider";

export class ZondWalletInpageProvider extends AbstractStreamProvider {
  protected _sentWarnings: SentWarningsState = {
    // methods
    enable: false,
    experimentalMethods: false,
    send: false,
    // events
    events: {
      close: false,
      data: false,
      networkChanged: false,
      notification: false,
    },
  };

  #networkVersion: string | null;

  /**
   * Indicating that this provider is a ZondWallet provider.
   */
  public readonly isZondWallet: true;

  /**
   * Creates a new `ZondWalletInpageProvider`.
   *
   * @param connectionStream - A Node.js duplex stream.
   * @param options - An options bag.
   * @param options.jsonRpcStreamName - The name of the internal JSON-RPC stream.
   * Default: `zond-wallet-provider`.
   * @param options.logger - The logging API to use. Default: `console`.
   * @param options.maxEventListeners - The maximum number of event
   * listeners. Default: 100.
   * @param options.shouldSendMetadata - Whether the provider should
   * send page metadata. Default: `true`.
   */
  constructor(
    connectionStream: Duplex,
    {
      jsonRpcStreamName = ZondWalletInpageProviderStreamName,
      logger = console,
      maxEventListeners = 100,
      shouldSendMetadata,
    }: ZondWalletInpageProviderOptions = {},
  ) {
    super(connectionStream, {
      jsonRpcStreamName,
      logger,
      maxEventListeners,
      rpcMiddleware: getDefaultExternalMiddleware(logger),
    });

    // We shouldn't perform asynchronous work in the constructor, but at one
    // point we started doing so, and changing this class isn't worth it at
    // the time of writing.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this._initializeStateAsync();

    this.#networkVersion = null;
    this.isZondWallet = true;

    this.sendAsync = this.sendAsync.bind(this);
    this._warnOfDeprecation = this._warnOfDeprecation.bind(this);

    // handle JSON-RPC notifications
    this._jsonRpcConnection.events.on("notification", (payload) => {
      const { method } = payload;
      if (EMITTED_NOTIFICATIONS.includes(method)) {
        // deprecated
        // emitted here because that was the original order
        this.emit("data", payload);
        // deprecated
        this.emit("notification", payload.params.result);
      }
    });

    // send website metadata
    if (shouldSendMetadata) {
      if (document.readyState === "complete") {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        sendSiteMetadata(this._rpcEngine, this._log);
      } else {
        const domContentLoadedHandler = () => {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          sendSiteMetadata(this._rpcEngine, this._log);
          window.removeEventListener(
            "DOMContentLoaded",
            domContentLoadedHandler,
          );
        };
        window.addEventListener("DOMContentLoaded", domContentLoadedHandler);
      }
    }
  }

  //====================
  // Read-only Properties
  //====================

  get chainId(): string | null {
    return super.chainId;
  }

  get networkVersion(): string | null {
    return this.#networkVersion;
  }

  get selectedAddress(): string | null {
    return super.selectedAddress;
  }

  //====================
  // Public Methods
  //====================

  /**
   * Submits an RPC request per the given JSON-RPC request object.
   *
   * @param payload - The RPC request object.
   * @param callback - The callback function.
   */
  sendAsync(
    payload: JsonRpcRequest,
    callback: (error: Error | null, result?: JsonRpcResponse<Json>) => void,
  ): void {
    this._rpcRequest(payload, callback);
  }

  /**
   * We override the following event methods so that we can warn consumers
   * about deprecated events:
   * `addListener`, `on`, `once`, `prependListener`, `prependOnceListener`.
   */

  addListener(eventName: string, listener: (...args: unknown[]) => void) {
    this._warnOfDeprecation(eventName);
    return super.addListener(eventName, listener);
  }

  on(eventName: string, listener: (...args: unknown[]) => void) {
    this._warnOfDeprecation(eventName);
    return super.on(eventName, listener);
  }

  once(eventName: string, listener: (...args: unknown[]) => void) {
    this._warnOfDeprecation(eventName);
    return super.once(eventName, listener);
  }

  prependListener(eventName: string, listener: (...args: unknown[]) => void) {
    this._warnOfDeprecation(eventName);
    return super.prependListener(eventName, listener);
  }

  prependOnceListener(
    eventName: string,
    listener: (...args: unknown[]) => void,
  ) {
    this._warnOfDeprecation(eventName);
    return super.prependOnceListener(eventName, listener);
  }

  //====================
  // Private Methods
  //====================

  /**
   * When the provider becomes disconnected, updates internal state and emits
   * required events. Idempotent with respect to the isRecoverable parameter.
   *
   * Error codes per the CloseEvent status codes as required by EIP-1193:
   * https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes.
   *
   * @param isRecoverable - Whether the disconnection is recoverable.
   * @param errorMessage - A custom error message.
   * @fires BaseProvider#disconnect - If the disconnection is not recoverable.
   */
  protected _handleDisconnect(isRecoverable: boolean, errorMessage?: string) {
    super._handleDisconnect(isRecoverable, errorMessage);
    if (this.#networkVersion && !isRecoverable) {
      this.#networkVersion = null;
    }
  }

  /**
   * Warns of deprecation for the given event, if applicable.
   *
   * @param eventName - The name of the event.
   */
  protected _warnOfDeprecation(eventName: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
    if (this._sentWarnings?.events[eventName as WarningEventName] === false) {
      this._log.warn(messages.warnings.events[eventName as WarningEventName]);
      this._sentWarnings.events[eventName as WarningEventName] = true;
    }
  }

  /**
   * Upon receipt of a new chainId and networkVersion, emits corresponding
   * events and sets relevant public state. Does nothing if neither the chainId
   * nor the networkVersion are different from existing values.
   *
   * @fires ZondWalletInpageProvider#networkChanged
   * @param networkInfo - An object with network info.
   * @param networkInfo.chainId - The latest chain ID.
   * @param networkInfo.networkVersion - The latest network ID.
   */
  protected _handleChainChanged({
    chainId,
    networkVersion,
  }: { chainId?: string; networkVersion?: string } = {}) {
    // This will validate the params and disconnect the provider if the
    // networkVersion is 'loading'.
    super._handleChainChanged({ chainId, networkVersion });

    if (this._state.isConnected && networkVersion !== this.#networkVersion) {
      this.#networkVersion = networkVersion as string;
      if (this._state.initialized) {
        this.emit("networkChanged", this.#networkVersion);
      }
    }
  }
}
