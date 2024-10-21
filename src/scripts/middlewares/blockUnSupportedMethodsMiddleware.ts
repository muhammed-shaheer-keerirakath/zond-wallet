import { JsonRpcMiddleware } from "@/wallet-provider/json-rpc-engine";
import { rpcErrors } from "@/wallet-provider/rpc-errors";
import { Json, JsonRpcRequest } from "@/wallet-provider/utils";
import { ALLOWED_REQUEST_METHODS } from "../constants/requestConstants";

export const blockUnSupportedMethodsMiddleware: JsonRpcMiddleware<
  JsonRpcRequest,
  Json
> = (req, res, next, end) => {
  const requestedMethod = req.method ?? "";
  if (
    !!requestedMethod.length &&
    ALLOWED_REQUEST_METHODS.includes(
      requestedMethod as (typeof ALLOWED_REQUEST_METHODS)[number],
    )
  ) {
    next();
  } else {
    res.error = rpcErrors.methodNotFound({
      message: `The method "${req.method}" does not exist / is not available.`,
    });
    end();
  }
};