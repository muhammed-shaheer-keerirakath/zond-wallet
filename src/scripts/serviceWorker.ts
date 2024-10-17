import { JsonRpcEngine } from "@/wallet-provider/json-rpc-engine";
import { createEngineStream } from "@/wallet-provider/json-rpc-middleware-stream";
import PortStream from "extension-port-stream";
import { pipeline } from "readable-stream";
import browser from "webextension-polyfill";
import {
  EXTENSION_MESSAGES,
  ZOND_POST_MESSAGE_STREAM,
  ZOND_WALLET_PROVIDER_NAME,
} from "./constants/streamConstants";
import { appendSenderDataMiddleware } from "./middlewares/appendSenderDataMiddleware";
import { checkForLastError } from "./utils/scriptUtils";
import { setupMultiplex } from "./utils/streamUtils";

type ContentScript = browser.Scripting.RegisteredContentScript;

const registerScripts = async () => {
  const previouslyRegisteredScriptIds = (
    await browser.scripting.getRegisteredContentScripts()
  ).map((script) => script.id);
  const contentScripts: ContentScript[] = [
    {
      id: "zondInPageScript",
      matches: ["<all_urls>"],
      js: ["src/scripts/inPageScript.js"],
      runAt: "document_start",
      allFrames: true,
      // @ts-expect-error.
      // This is important. The script must run in the "MAIN" world,
      // so that the zond provider will be available browser wide, not just isolated to the extension.
      world: "MAIN",
    },
  ];

  // This registers the in-page script to browser pages, if not already done.
  // "MAIN" world does not work if this script was invoked from manifest file instead.
  await browser.scripting.registerContentScripts(
    contentScripts.filter(
      (script) => !previouslyRegisteredScriptIds.includes(script.id),
    ),
  );
};

const prepareListeners = () => {
  // listens to messages coming from the content script(browser.runtime.sendMessage)
  browser.runtime.onMessage.addListener((message: any) => {
    console.log(">>>onMessageFromContentScript message", message);
  });
};

/**
 * Sends a message to the dapp(s) content script to signal it can connect to the background as
 * the backend is not active. It is required to re-connect dapps after service worker re-activates.
 * For non-dapp pages, the message will be sent and ignored.
 */
const announceServiceWorkerReady = async () => {
  const tabs = await browser.tabs.query({
    url: "<all_urls>",
    windowType: "normal",
  });

  for (const tab of tabs) {
    browser.tabs
      .sendMessage(tab.id ?? 0, {
        name: EXTENSION_MESSAGES.READY,
      })
      .then(() => {
        checkForLastError();
      })
      .catch((error) => {
        // An error may happen if the contentscript is blocked from loading.
        checkForLastError();
        console.warn(`ZondWallet: error from tab '${tab.title}'`, error);
      });
  }
};

/**
 * A method for creating an ethereum provider.
 * Middlewares are pushed to the engine here.
 */
const setupProviderEngineEip1193 = ({
  sender,
}: {
  sender: browser.Runtime.MessageSender;
}) => {
  const engine = new JsonRpcEngine();

  // Appends the sender details to the request.
  engine.push(appendSenderDataMiddleware({ sender }));

  // Open popup
  engine.push((req, res, next, end) => {
    if (req.method === "eth_popup") {
      // Open the popup for user approval
      browser.action.openPopup();
      res.result = { data: "approved" };
      end();
    } else {
      next();
    }
  });

  return engine;
};

/**
 * A method for serving our ethereum provider over a given stream.
 */
const setupProviderConnectionEip1193 = async (port: browser.Runtime.Port) => {
  const portStream = new PortStream(port);
  const mux = setupMultiplex(portStream);
  const outStream = mux.createStream(ZOND_WALLET_PROVIDER_NAME);
  const sender = port.sender;

  // messages between inpage and background
  const engine = setupProviderEngineEip1193({
    // @ts-ignore
    sender,
  });

  // setup connection
  const providerStream = createEngineStream({ engine });

  // const connectionId = this.addConnection(origin, { engine });

  pipeline(outStream, providerStream, outStream, (err) => {
    console.log(">>> pipeline err", err);

    // handle any middleware cleanup
    // @ts-ignore
    engine?._middleware?.forEach((mid: any) => {
      if (mid.destroy && typeof mid.destroy === "function") {
        mid.destroy();
      }
    });
    // connectionId && this.removeConnection(origin, connectionId);
  });

  providerStream.on("data", async (data) => {
    console.log(">>>providerStream data", data);
  });

  // Used to show wallet liveliness to the provider
  // if (subjectType !== SubjectType.Internal) {
  //   this._notifyChainChangeForConnection({ engine }, origin);
  // }
};

const establishContenScriptConnection = () => {
  browser.runtime.onConnect.addListener(async (port) => {
    // Ensuring the port connected to is the content script
    if (port.name === ZOND_POST_MESSAGE_STREAM.CONTENT_SCRIPT) {
      port.onMessage.addListener((message) => {
        console.log(">>>port onMessage", message);
      });

      await announceServiceWorkerReady();
      await setupProviderConnectionEip1193(port);
    }
  });
};

const initializeServiceWorker = async () => {
  try {
    await registerScripts();
    prepareListeners();
    establishContenScriptConnection();
  } catch (error) {
    console.warn(
      "Zond Wallet: Failed to initialize the service worker\n",
      error,
    );
  }
};

// This is the starting point of service worker of zond wallet.
// This file is set as an entry in the "background" section of the manifest file.
initializeServiceWorker();
