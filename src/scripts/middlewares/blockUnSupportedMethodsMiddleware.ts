import { JsonRpcMiddleware } from "@/wallet-provider/json-rpc-engine";
import { rpcErrors } from "@/wallet-provider/rpc-errors";
import { Json, JsonRpcRequest } from "@/wallet-provider/utils";
import { allowedRequestMethods } from "../constants/requestConstants";

export const blockUnSupportedMethodsMiddleware: JsonRpcMiddleware<
  JsonRpcRequest,
  Json
> = (req, res, next, end) => {
  const requestedMethod = req.method ?? "";
  if (
    !!requestedMethod.length &&
    allowedRequestMethods.includes(
      requestedMethod as (typeof allowedRequestMethods)[number],
    )
  ) {
    next();
  } else {
    res.error = {
      ...rpcErrors.methodNotSupported(),
      // @ts-ignore
      method: req.method,
    };
    end();
  }
};
