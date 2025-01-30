import StorageUtil from "@/utilities/storageUtil";
import { JsonRpcMiddleware } from "@theqrl/zond-wallet-provider/json-rpc-engine";
import { providerErrors } from "@theqrl/zond-wallet-provider/rpc-errors";
import { Json, JsonRpcRequest } from "@theqrl/zond-wallet-provider/utils";
import browser from "webextension-polyfill";
import { RESTRICTED_METHODS } from "../constants/requestConstants";
import { EXTENSION_MESSAGES } from "../constants/streamConstants";
import { DAppRequestType, DAppResponseType } from "./middlewareTypes";

const requestAccountsFromZondWeb3Wallet = async (
  req: JsonRpcRequest<JsonRpcRequest>,
): Promise<DAppResponseType> => {
  return new Promise(async (resolve) => {
    const request: DAppRequestType = {
      method: req.method,
      requestData: { senderData: req.senderData },
    };
    await StorageUtil.setDAppRequestData(request);
    await browser.action.openPopup();

    const handleMessage = function messageHandler(message: DAppResponseType) {
      if (message.action === EXTENSION_MESSAGES.DAPP_RESPONSE) {
        // Remove the listener when the message is processed
        browser.runtime.onMessage.removeListener(handleMessage);
        resolve(message);
      }
    };
    // Listen for the approval/rejection from the UI
    browser.runtime.onMessage.addListener(handleMessage);
  });
};

let isRequestPending = false;

export const connectWalletMiddleware: JsonRpcMiddleware<
  JsonRpcRequest,
  Json
> = async (req, res, next, end) => {
  const requestedMethod = req.method;
  if (requestedMethod === RESTRICTED_METHODS.ZOND_REQUEST_ACCOUNTS) {
    if (isRequestPending) {
      try {
        await browser.action.openPopup();
      } finally {
        res.error = providerErrors.unsupportedMethod({
          message: "A request is already pending",
        });
      }
      end();
    } else {
      let message: DAppResponseType = { action: "", hasApproved: false };
      try {
        isRequestPending = true;
        message = await requestAccountsFromZondWeb3Wallet(req);
      } finally {
        isRequestPending = false;
        const hasApproved = message.hasApproved;
        if (hasApproved) {
          const accounts = message?.response?.accounts;
          res.result = accounts;
        } else {
          res.error = providerErrors.userRejectedRequest();
        }
      }
      end();
    }
  } else {
    next();
  }
};
