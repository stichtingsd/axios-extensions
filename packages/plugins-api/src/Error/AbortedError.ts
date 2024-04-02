import { AxiosError } from "axios";

export default class AbortedError extends AxiosError {
  constructor(
      message: string = "A timeout error occurred.",
  ) {
    super(message);
    this.message = message;
    this.name = "AbortedError";

    Object.defineProperty(this, "isAxiosError", {
      value: true,
      writable: false,
      enumerable: false,
      configurable: false
    })

    if ("captureStackTrace" in Error && typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, AbortedError);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}
