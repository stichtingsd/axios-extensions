import {AxiosError} from "axios";

export default class ExpiredRefreshTokenError extends AxiosError {
  constructor() {
    const message = "request.expired_refresh_token";
    super(message);
    this.message = message;
    this.name = "ExpiredRefreshTokenError";
    this.isAxiosError = true;

    if ("captureStackTrace" in Error && typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, ExpiredRefreshTokenError);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}
