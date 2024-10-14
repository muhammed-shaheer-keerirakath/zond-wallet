import { JsonRpcMiddleware } from "@/wallet-provider/json-rpc-engine";
import { Json, JsonRpcRequest } from "@/wallet-provider/utils";
import browser from "webextension-polyfill";

type appendRequestDataParams = {
  origin: string;
  subjectType: string;
  sender: browser.Runtime.MessageSender;
  tabId: number;
};

export const appendRequestDataMiddleware =
  (data: appendRequestDataParams): JsonRpcMiddleware<JsonRpcRequest, Json> =>
  (req, _, next) => {
    // @ts-ignore
    req.requestData = data;
    next();
  };
