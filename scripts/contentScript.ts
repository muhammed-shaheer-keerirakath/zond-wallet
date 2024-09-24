console.log("Zond Wallet: Content script running!");

const initiateZondContentScript = () => {
  try {
    // call this with required params
    // initiateZondWalletProvider();
  } catch (error) {
    console.warn("Zond Wallet: Failed to inject the zond provider");
  }
};

// This function injects the zond provider to be used by the dApps.
initiateZondContentScript();
