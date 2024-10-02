import { WindowPostMessageStream } from "./post-message-stream";
import { initializeProvider } from "./providers";
import { requestProvider } from "./providers/EIP6963";

export {
  initializeProvider,
  // This function is intended to be used by a dapp.
  requestProvider,
  WindowPostMessageStream,
};
