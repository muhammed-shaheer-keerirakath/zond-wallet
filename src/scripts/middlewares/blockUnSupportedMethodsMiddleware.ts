import { JsonRpcMiddleware } from "@/wallet-provider/json-rpc-engine";
import { rpcErrors } from "@/wallet-provider/rpc-errors";
import { errorValues } from "@/wallet-provider/rpc-errors/error-constants";
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
    const rpcError = rpcErrors.methodNotSupported();
    const rpcErrorCode = rpcError.code.toString() as keyof typeof errorValues;
    res.error = {
      ...rpcError,
      message: errorValues[rpcErrorCode]?.message,
      // @ts-ignore
      method: req.method,
    };
    end();
  }
};
