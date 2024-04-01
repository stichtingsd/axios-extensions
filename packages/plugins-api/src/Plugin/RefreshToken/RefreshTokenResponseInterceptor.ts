import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpStatusCode } from "../../HttpStatusCode";
import type { InterceptorConfig } from "../../api";
import { InterceptorType } from "../../api";
import type { NetworkError, ServerError } from "../../Error";
import { ClientError } from "../../Error";

export function RefreshTokenResponseInterceptor(
  axiosInstance: AxiosInstance,
  refreshToken: () => Promise<void>,
  excludedRoutes: string[] = [],
): InterceptorConfig<InterceptorType.RESPONSE> {
  async function rejected(failedRequest: ClientError | ServerError | NetworkError): Promise<AxiosResponse<any, any>> {
    // We can't refresh the token if it's not a client error.
    if (!(failedRequest instanceof ClientError)) {
      throw failedRequest;
    }

    const failedRequestConfig = (failedRequest.config as any as AxiosRequestConfig & { _retry?: boolean });

    if (!failedRequestConfig.url) {
      throw failedRequest;
    }

    if (failedRequest.response.status !== HttpStatusCode.UNAUTHORIZED) {
      throw failedRequest;
    }

    if (excludedRoutes.includes(failedRequestConfig.url)) {
      throw failedRequest;
    }

    if (failedRequestConfig._retry === false) {
      throw failedRequest;
    }

    await refreshToken();

    return axiosInstance.request(failedRequest.config);
  }

  return {
    name: "RefreshTokenResponseInterceptor",
    type: InterceptorType.RESPONSE,
    priority: 100,
    rejected,
  };
}
