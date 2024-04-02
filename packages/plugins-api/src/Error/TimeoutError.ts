import { AxiosError } from "axios";

export default class TimeoutError extends AxiosError {
  constructor(
      message: string = "A timeout error occurred.",
  ) {
    super(message);
    this.message = message;
    this.name = "TimeoutError";
    this.isAxiosError = true;

    if ("captureStackTrace" in Error && typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, TimeoutError);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}
