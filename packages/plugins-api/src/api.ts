import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { BaseUrlRequestInterceptor, ErrorHandlerResponseInterceptor } from "./Plugin";

export interface ApiConfigInterface {
  interceptors: (InterceptorConfig<InterceptorType.REQUEST> | InterceptorConfig<InterceptorType.RESPONSE>)[]
  enableErrorHandler: boolean
  baseURL?: string | (() => string) | undefined
}

export enum InterceptorType {
  REQUEST = "request",
  RESPONSE = "response",
}

export interface InterceptorConfig<T extends InterceptorType> {
  name?: string
  type: T
  priority: number
  rejected?: (error: AxiosError) => any
  resolved?: T extends InterceptorType.REQUEST
    ? (config: InternalAxiosRequestConfig<any>) =>
      InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>
    : T extends InterceptorType.RESPONSE
      ? (config: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>
      : never
}

const defaultConfig: ApiConfigInterface = {
  enableErrorHandler: true,
  interceptors: [],
};

export function createApi(
  config: ApiConfigInterface = defaultConfig,
) {
  const api: AxiosInstance = axios.create();
  const interceptors = [...config.interceptors];

  if (config.enableErrorHandler) {
    interceptors.push(ErrorHandlerResponseInterceptor());
  }

  const baseUrl = config.baseURL;
  if (baseUrl !== undefined) {
    let baseUrlGetter: () => string;

    if (typeof baseUrl === "string") {
      baseUrlGetter = () => baseUrl;
    } else {
      baseUrlGetter = baseUrl;
    }
    interceptors.push(BaseUrlRequestInterceptor(baseUrlGetter));
  }

  function installInterceptor(
    p: InterceptorConfig<InterceptorType.REQUEST> | InterceptorConfig<InterceptorType.RESPONSE>,
  ) {
    interceptors.push(p);
    installInterceptors();
  }

  function installInterceptors() {
    api.interceptors.request.clear();
    api.interceptors.response.clear();

    interceptors
      .sort((a, b) => a.priority - b.priority)
      .forEach((config) => {
        switch (config.type) {
          case InterceptorType.REQUEST:
            api.interceptors.request.use(config.resolved, config.rejected);
            break;
          case InterceptorType.RESPONSE:
            api.interceptors.response.use(config.resolved, config.rejected);
            break;
        }
      });
  }

  // When passed via config directly install them.
  installInterceptors();

  return {
    api,
    installInterceptor,
  };
}
