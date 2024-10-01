import browser from "webextension-polyfill";

const initiateBackgroundScript = async () => {
  await browser.scripting.registerContentScripts([
    {
      id: "zondContentScript",
      matches: ["<all_urls>"],
      js: ["scripts/contentScript.js"],
      runAt: "document_start",
      allFrames: true,
      // @ts-expect-error.
      // This is important. The script must run in the "MAIN" world,
      // so that the zond provider will be available browser wide, not just isolated to the extension.
      world: "MAIN",
    },
  ]);
};

// This is the starting point of script execution of zond wallet.
// This file is set as an entry in the "background" section of the manifest file.
initiateBackgroundScript();
