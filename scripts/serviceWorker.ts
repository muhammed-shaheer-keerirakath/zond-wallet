import browser from "webextension-polyfill";

type ContentScriptEntry = browser.Scripting.RegisteredContentScript;

const initializeServiceWorker = async () => {
  try {
    const previouslyRegisteredScriptIds = (
      await browser.scripting.getRegisteredContentScripts()
    ).map((script) => script.id);
    const contentScripts: ContentScriptEntry[] = [
      {
        id: "zondInPageScript",
        matches: ["<all_urls>"],
        js: ["scripts/inPageScript.js"],
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
  } catch (error) {
    console.warn(
      "Zond Wallet: Failed to initialize the service worker\n",
      error,
    );
  }
};

// This is the starting point of script execution of zond wallet.
// This file is set as an entry in the "background" section of the manifest file.
initializeServiceWorker();
