import { AxiosError } from "axios";

export default class NetworkError extends AxiosError {
  constructor(
      message: string = "A network error occurred.",
  ) {
    super(message);
    this.message = message;
    this.name = "NetworkError";

    if ("captureStackTrace" in Error && typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, NetworkError);
    }
  }
}
