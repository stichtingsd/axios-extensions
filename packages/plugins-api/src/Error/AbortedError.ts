import { AxiosError } from "axios";

export default class AbortedError extends AxiosError {
  constructor(
      message: string = "A timeout error occurred.",
  ) {
    super(message);
    this.message = message;
    this.name = "AbortedError";

    if ("captureStackTrace" in Error && typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, AbortedError);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}
