import { JsonRpcMiddleware } from "@/wallet-provider/json-rpc-engine";
import { Json, JsonRpcRequest } from "@/wallet-provider/utils";
import browser from "webextension-polyfill";

type appendSenderDataParams = {
  sender: browser.Runtime.MessageSender;
};

export const appendSenderDataMiddleware =
  ({
    sender,
  }: appendSenderDataParams): JsonRpcMiddleware<JsonRpcRequest, Json> =>
  (req, _, next) => {
    const { tab } = sender;

    // @ts-ignore
    req.senderData = {
      tabId: tab?.id,
      title: tab?.title,
      url: tab?.url,
      favIconUrl: tab?.favIconUrl,
    };
    next();
  };
