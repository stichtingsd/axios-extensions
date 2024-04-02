import { AxiosError } from "axios";

export default class NetworkError extends AxiosError {
  constructor(
      message: string = "A network error occurred.",
  ) {
    super(message);
    this.message = message;
    this.name = "NetworkError";

    Object.defineProperty(this, "isAxiosError", {
      value: true,
      writable: false,
      enumerable: false,
      configurable: false
    })

    if ("captureStackTrace" in Error && typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NetworkError);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}
