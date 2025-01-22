import StorageUtil from "@/utilities/storageUtil";
import { JsonRpcMiddleware } from "@theqrl/zond-wallet-provider/json-rpc-engine";
import { BaseProvider } from "@theqrl/zond-wallet-provider/providers";
import { Json, JsonRpcRequest } from "@theqrl/zond-wallet-provider/utils";
import { UNRESTRICTED_METHODS } from "../constants/requestConstants";

const getUnrestrictedMethodResult = async (
  req: JsonRpcRequest<JsonRpcRequest>,
) => {
  switch (req.method) {
    case UNRESTRICTED_METHODS.ZOND_WEB3_WALLET_GET_PROVIDER_STATE:
      const response: Parameters<BaseProvider["_initializeState"]>[0] =
        await StorageUtil.getProviderState();
      return response;
    case UNRESTRICTED_METHODS.ZOND_GET_BLOCK_BY_NUMBER:
    default:
      return {};
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
    res.result = await getUnrestrictedMethodResult(req);
    end();
  } else {
    next();
  }
};
