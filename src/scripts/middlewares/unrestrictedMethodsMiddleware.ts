import { JsonRpcMiddleware } from "@theqrl/zond-wallet-provider/json-rpc-engine";
import { providerErrors } from "@theqrl/zond-wallet-provider/rpc-errors";
import { Json, JsonRpcRequest } from "@theqrl/zond-wallet-provider/utils";
import browser from "webextension-polyfill";
import { UNRESTRICTED_METHODS } from "../constants/requestConstants";
import { EXTENSION_MESSAGES } from "../constants/streamConstants";

const getUnrestrictedMethodResult = async (
  req: JsonRpcRequest<JsonRpcRequest>,
) => {
  const tabId = req?.senderData?.tabId ?? 0;
  const response = await browser.tabs.sendMessage(tabId, {
    name: EXTENSION_MESSAGES.UNRESTRICTED_METHOD_CALLS,
    data: req,
  });

  const method = req.method;
  switch (method) {
    case UNRESTRICTED_METHODS.ZOND_GET_BLOCK_BY_NUMBER:
      return response?.blockNumber;
    case UNRESTRICTED_METHODS.ZOND_WEB3_WALLET_GET_PROVIDER_STATE:
    default:
      return response;
  }
};

type UnrestrictedMethodValue =
  (typeof UNRESTRICTED_METHODS)[keyof typeof UNRESTRICTED_METHODS];

export const unrestrictedMethodsMiddleware: JsonRpcMiddleware<
  JsonRpcRequest,
  Json
> = async (req, res, next, end) => {
  const requestedMethod = req.method;
  if (
    Object.values(UNRESTRICTED_METHODS).includes(
      requestedMethod as UnrestrictedMethodValue,
    )
  ) {
    try {
      res.result = await getUnrestrictedMethodResult(req);
    } catch (error: any) {
      res.error = providerErrors.unsupportedMethod({
        message: error?.message,
      });
    }
    end();
  } else {
    next();
  }
};
