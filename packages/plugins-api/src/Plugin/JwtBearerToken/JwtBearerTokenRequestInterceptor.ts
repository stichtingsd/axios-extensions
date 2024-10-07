import type { InternalAxiosRequestConfig } from "axios";
import type { InterceptorConfig } from "../../api";
import { InterceptorType } from "../../api";

export function JwtBearerTokenRequestInterceptor(
  tokenGetter: () => string,
  excludedRoutes: string[] = [],
): InterceptorConfig<InterceptorType.REQUEST> {
  async function resolved(
    config: InternalAxiosRequestConfig<any>,
  ): Promise<InternalAxiosRequestConfig> {
    if (!config.url) {
      return config;
    }
    if (excludedRoutes.includes(config.url)) {
      return config;
    }

    config.headers.Authorization = `Bearer ${tokenGetter()}`;

    return config;
  }

  return {
    name: "JwtBearerTokenRequestInterceptor",
    type: InterceptorType.REQUEST,
    priority: 100,
    resolved,
  };
}
