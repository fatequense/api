import type { NitroErrorHandler } from "nitropack";
import { SigaError } from "./exceptions/siga.error";

export default <NitroErrorHandler>function (error, event) {
  let errorPayload = {
    status: error.statusCode,
    error: error.message
  };

  if (error.cause instanceof SigaError) {
    errorPayload.status = error.cause.statusCode;
  }

  event.node.res.statusCode = errorPayload.status;
  event.node.res.end(JSON.stringify(errorPayload));
};