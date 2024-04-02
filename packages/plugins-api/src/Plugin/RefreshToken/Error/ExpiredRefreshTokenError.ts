import {AxiosError} from "axios";

export default class ExpiredRefreshTokenError extends AxiosError {
  constructor() {
    const message = "request.expired_refresh_token";
    super(message);
    this.message = message;
    this.name = "ExpiredRefreshTokenError";

    Object.defineProperty(this, "isAxiosError", {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false
    })

    if ("captureStackTrace" in Error && typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, ExpiredRefreshTokenError);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}
