import type { RequestArguments } from "./BaseProvider";
import { BaseProvider } from "./BaseProvider";
import type {
  EIP6963AnnounceProviderEvent,
  EIP6963ProviderDetail,
  EIP6963ProviderInfo,
  EIP6963RequestProviderEvent,
} from "./EIP6963";
import {
  announceProvider as eip6963AnnounceProvider,
  requestProvider as eip6963RequestProvider,
} from "./EIP6963";
import { createExternalExtensionProvider } from "./extension-provider/createExternalExtensionProvider";
import {
  MetaMaskInpageProvider,
  MetaMaskInpageProviderStreamName,
} from "./MetaMaskInpageProvider";
import { initiateZondWalletProvider, setGlobalProvider } from "./provider";
import { shimWeb3 } from "./shimWeb3";
import { StreamProvider } from "./StreamProvider";
import type { ConsoleLike } from "./utils";

export type {
  ConsoleLike,
  EIP6963AnnounceProviderEvent,
  EIP6963ProviderDetail,
  EIP6963ProviderInfo,
  EIP6963RequestProviderEvent,
  RequestArguments,
};

export {
  BaseProvider,
  createExternalExtensionProvider,
  eip6963AnnounceProvider,
  eip6963RequestProvider,
  initiateZondWalletProvider,
  MetaMaskInpageProvider,
  MetaMaskInpageProviderStreamName,
  setGlobalProvider,
  shimWeb3,
  StreamProvider,
};
