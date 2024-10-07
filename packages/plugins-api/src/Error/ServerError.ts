import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { AxiosError } from "axios";

export default class ServerError extends AxiosError {
  constructor(
    config: InternalAxiosRequestConfig,
    request: any,
    response: AxiosResponse,
    message: string = "A server error occurred.",
    code: string = "0",
    previous?: AxiosError,
  ) {
    super(message, code, config, request, response);
    this.message = message;
    this.name = "ServerError";
    this.status = response.status;
    this.config = config;
    this.request = request;
    this.response = response;
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
        Error.captureStackTrace(this, ServerError);
      } else {
        this.stack = new Error(message).stack;
      }
    }
  }

  status: number;
  config: InternalAxiosRequestConfig;
  request: any;
  response: AxiosResponse;
}
