import { AxiosError } from "axios";

export default class AbortedError extends AxiosError {
  constructor(
    message: string = "A request was aborted.",
    previous?: AxiosError,
  ) {
    super(message);
    this.message = message;
    this.name = "AbortedError";
    Object.defineProperty(this, "isAxiosError", {
      value: true,
      writable: false,
      enumerable: false,
      configurable: false,
    });

    if (previous?.stack) {
      this.stack =
        previous.stack?.split("\n").slice(0, 2).join("\n") +
        "\n" +
        previous.stack;
    } else {
      if (
        "captureStackTrace" in Error &&
        typeof Error.captureStackTrace === "function"
      ) {
        Error.captureStackTrace(this, AbortedError);
      } else {
        this.stack = new Error(message).stack;
      }
    }
  }
}
