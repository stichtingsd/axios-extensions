export default class ExpiredRefreshTokenError extends Error {
  constructor() {
    const message = "request.expired_refresh_token";
    super(message);
    this.message = message;
    this.name = "ExpiredRefreshTokenError";

    if ("captureStackTrace" in Error && typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, ExpiredRefreshTokenError);
    }
  }
}
