import type { InternalAxiosRequestConfig } from "axios";
import type { InterceptorConfig } from "../../api";
import { InterceptorType } from "../../api";

export function HeaderRequestInterceptor(
  headers: () => Record<string, string>,
  method?: string,
): InterceptorConfig<InterceptorType.REQUEST> {
  async function resolved(requestConfig: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    if (method && requestConfig.method !== method) {
      return requestConfig;
    }

    Object.assign(requestConfig.headers, headers());

    return requestConfig;
  }

  return {
    name: "HeaderRequestInterceptor",
    type: InterceptorType.REQUEST,
    priority: 1000,
    resolved,
  };
}
