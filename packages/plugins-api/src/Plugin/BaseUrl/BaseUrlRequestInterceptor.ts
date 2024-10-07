import type { InternalAxiosRequestConfig } from "axios";
import { InterceptorType } from "../../api";
import type { InterceptorConfig } from "../../api";

export function BaseUrlRequestInterceptor(
  baseUrlGetter: () => string,
): InterceptorConfig<InterceptorType.REQUEST> {
  async function resolved(
    requestConfig: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> {
    requestConfig.baseURL = baseUrlGetter();

    return requestConfig;
  }

  return {
    name: "BaseUrlRequestInterceptor",
    type: InterceptorType.REQUEST,
    priority: 1,
    resolved,
  };
}
