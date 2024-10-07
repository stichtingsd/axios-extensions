<div align="center">
<h1 align="center">
<img src="https://github.com/SherinBloemendaal/axios-extensions/blob/main/assets/logo.png" width="100" />
<br>Axios Extensions</h1>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat-square&logo=TypeScript&logoColor=white" alt="TypeScript" />

</p>
<a href="https://www.npmjs.com/package/@axios-extensions/plugin-api">
  <img src="https://img.shields.io/npm/v/%40axios-extensions%2Fplugins-api" alt="Current version">
</a>
<img src="https://img.shields.io/github/license/SherinBloemendaal/axios-extensions?style=flat-square&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/SherinBloemendaal/axios-extensions?style=flat-square&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/SherinBloemendaal/axios-extensions?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/SherinBloemendaal/axios-extensions?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

---

## 📖 Table of Contents

- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📦 Features](#-key-features)
  - [🛠️ Core Built-in Plugins](#️-core-built-in-plugins)
- [🚀 Getting Started](#-getting-started)
  - [🔧 Installation](#-installation)
  - [🤖 How to use](#-how-to-use)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---

## 📍 Overview

**Axios Extensions** elevates your experience with Axios, offering a meticulously curated suite of extensions that enhance the capabilities of the popular HTTP client. Designed with modularity at its core, these extensions can be seamlessly integrated individually or in combination, depending on your project's needs.

Built with TypeScript, this project not only enriches your applications with additional functionality but also ensures a type-safe development environment, offering comprehensive type definitions for all plugins. At their essence, each plugin operates as an interceptor, making them universally compatible with any Axios instance. This design choice guarantees a flexible and straightforward API, simplifying the integration process and elevating the overall user experience.

---

## 🌟 Key Features

Discover the core functionalities that enhance the flexibility and power of our solution:

- **Plugin Prioritization**: Control the order in which plugins execute to fine-tune the behavior of your application.
- **Seamless Plugin Chaining**: Effortlessly link plugins together to extend functionality without compromising performance.
- **Dynamic Plugin Management**: Add or remove plugins on-the-fly, enabling a customizable and adaptive technology stack.

### 🛠️ Core Built-in Plugins

Elevate your application with our versatile set of built-in plugins, designed for comprehensive adaptability and robustness:

- **Dynamic Base URL**: Easily modify the base URL for API calls, allowing for seamless transitions between different environments or endpoints.
- **Error Handling**: A sophisticated error handler plugin to gracefully manage and respond to errors, ensuring a smooth user experience.
- **Adaptive Headers**: Dynamically adjust headers for your requests, providing the flexibility to meet various server-side requirements.
- **Bearer Token Integration**: Secure your API calls with Bearer token authentication, enhancing the security posture of your application.
- **Token Refresh Mechanism**: Automate token refreshment to maintain uninterrupted service access, ensuring your application remains connected and secure.

---

## 🚀 Getting Started

**_Project Dependencies_**

Please ensure you have the following dependencies installed in your project before proceeding:

- ℹ️ Axios v1.6+

---

### 🔧 Installation

1. Add to your project using NPM or Yarn:

   **NPM**

   ```sh
   npm install @axios-extensions/plugin-api
   ```

   **Yarn**

   ```sh
   yarn add @axios-extensions/plugin-api
   ```

---

### 🤖 How to use?

**_Basic usage_**

1. Create your core `api.ts` file and import the plugins you want to use.

```typescript src/core/api.ts
// src/core/api.ts

// Import any plugin you want to use.
import {
  HeaderRequestInterceptor,
  JwtBearerTokenRequestInterceptor,
  createApi,
} from "@axios-extensions/plugin-api";

// Create an instance of Axios with the plugins you want to use.
export const { api, installInterceptor } = createApi({
  // Enable/disable the built-in error handler.
  enableErrorHandler: true,
  // Use undefined if you don't want to use a base URL.
  // Uses the built-in base url plugin.
  baseURL: () => "https://example.com/api",
  interceptors: [
    HeaderRequestInterceptor(() => ({ Accept: "application/ld+json" })), // Providing no method = any method.
    HeaderRequestInterceptor(
      () => ({ "Content-Type": "application/ld+json" }),
      "post",
    ),
    HeaderRequestInterceptor(
      () => ({ "Content-Type": "application/ld+json" }),
      "put",
    ),
    HeaderRequestInterceptor(
      () => ({ "Content-Type": "application/merge-patch+json" }),
      "patch",
    ),
    JwtBearerTokenRequestInterceptor(
      () => "your-token",
      ["/api/login", "/api/refresh", "/api/excluded-route"],
    ),
  ],
});

export default api;
```

2. Use the `api` instance in your application.

```typescript src/example.ts
// src/example.ts

import api from "./core/api";

// You can use axios as you normally would.
api.get("/images").then((r) => console.log(r.data));
```

---

### 🚀 Dynamically install interceptors

```typescript src/example.ts
// src/example.ts
import { HeaderRequestInterceptor } from "@axios-extensions/plugin-api";
import { api, installInterceptor } from "./core/api";

// No extra interceptor
api.get("/images").then((r) => console.log(r.data));

// Add an extra interceptor only for get calls
installInterceptor(
  HeaderRequestInterceptor(() => ({ "X-Extra-Header": "extra" }), "get"),
);
api.get("/images").then((r) => console.log(r.data));
```

---

### 🛡️ Utilizing the Built-in Error Handler

**Note**: By default Axios doesn't throw errors for status codes 4xx and 5xx. This plugin will so they can be handled correctly.

Enabling the error handler plugin will automatically return 3 error types:

- `ClientError` (status code 4xx)
- `ServerError` (status code 5xx)
- `NetworkError` (no response)
- `AxiosError` (default AxiosError) (any other error not caught by the plugin)

1. Add `enableErrorHandler` in your `api.ts` file.

```typescript src/core/api.ts
// src/core/api.ts
// ...

// Create an instance of Axios with the plugins you want to use.
export const { api, installInterceptor } = createApi({
  // Toggle the built-in error handler.
  enableErrorHandler: true,
  //...
});

// ...
```

2. Use the `api` instance in your application.

```typescript src/example.ts
// src/example.ts
import api from "./core/api";

// This will throw an ClientError
api
  .get("https://httpstat.us/400")
  .then((r) => console.log(r.data))
  .catch((e) => {
    if (e instanceof ClientError) {
      console.log("Client error:", e);
    } else if (e instanceof ServerError) {
      console.log("Server error:", e);
    } else if (e instanceof NetworkError) {
      console.log("Network error:", e);
    } else {
      console.log("Another unknown error:", e);
    }
  });
```

---

<details closed>
<summary>Usage of built-in plugin RefreshToken</summary>

The RefreshTokenPlugin is designed to automatically refresh your authentication token upon encountering a 401 status code. This plugin demands special handling and does not follow the standard installation procedure.

Once the token refresh operation concludes, it retries the original request, ensuring a uninterrupted continuation of your request.

```typescript src/core/refreshToken.ts
// src/core/refreshToken.ts
import {
  installInterceptor,
  RefreshTokenResponseInterceptor,
  api,
} from "./core/api";

const refreshTokenPlugin = RefreshTokenResponseInterceptor(
  api, // Include the api instance, leveraging the automatic retry functionality.
  () => api.post("/api/refresh", { refreshToken: "your-refresh" }),
  ["/api/login", "/api/refresh", "/api/excluded-route"],
);
installInterceptor(refreshTokenPlugin);
```

</details>

---

<details closed>
<summary>Creating a custom request plugin</summary>

_Note_: **Priority** is used to determine the order in which the plugins are executed. The lower the number, the earlier the plugin is executed.
Example: A plugin with priority `-100` will be executed before a plugin with priority `10`.

1. Create a new plugin file.

```typescript src/example-request-plugin.ts
// src/example-request-plugin.ts
import { installInterceptor } from "./core/api";
import type {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";

import { InterceptorType } from "@axios-extensions/plugin-api";
import type { InterceptorConfig } from "@axios-extensions/plugin-api";

export function MyCustomRequestPlugin(
  baseUrlGetter: () => string,
): InterceptorConfig<InterceptorType.REQUEST> {
  const myState = useSomeState();

  async function resolved(
    requestConfig: InternalAxiosRequestConfig,
  ): Promise<InternalAxiosRequestConfig> {
    requestConfig.baseURL = myState.baseUrl.value;

    return requestConfig;
  }

  return {
    name: "MyCustomRequestPlugin",
    type: InterceptorType.REQUEST,
    priority: 1,
    resolved,
  };
}
```

</details>

---

<details closed>
<summary>Creating a custom response plugin</summary>

_Note_: **Priority** is used to determine the order in which the plugins are executed. The lower the number, the earlier the plugin is executed.
Example: A plugin with priority `-100` will be executed before a plugin with priority `10`.

1. Create a new plugin file.

```typescript src/example-response-plugin.ts
// src/example-response-plugin.ts
import { installInterceptor } from "./core/api";
import type { AxiosError, AxiosResponse } from "axios";

import { InterceptorType } from "@axios-extensions/plugin-api";
import type { InterceptorConfig } from "@axios-extensions/plugin-api";

export function MyCustomRequestPlugin(
  baseUrlGetter: () => string,
): InterceptorConfig<InterceptorType.REQUEST> {
  const myState = useSomeState();

  async function resolved(
    response: AxiosResponse,
  ): Promise<InternalAxiosRequestConfig> {
    myState.error.value = "Success!";

    return requestConfig;
  }

  async function rejected(
    error: AxiosError,
  ): Promise<InternalAxiosRequestConfig> {
    myState.error.value = error.message;

    return requestConfig;
  }

  return {
    name: "MyCustomResponsePlugin",
    type: InterceptorType.RESPONSE,
    priority: 1,
    resolved,
    rejected,
  };
}
```

</details>

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Pull Requests](https://github.com/SherinBloemendaal/axios-extensions/blob/main/CONTRIBUTING.md)**: Want to make a contribution to the project? Check out the
  contibution guidelines.
- **[Discussions](https://github.com/SherinBloemendaal/axios-extensions/discussions)**: Share your insights,
  provide feedback, or ask questions.
- **[Bug reports](https://github.com/SherinBloemendaal/axios-extensions/issues)**: Submit bugs found.

#### _Contributing Guidelines_

<details closed>
<summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone <your-forked-repo-url>
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git switch -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.
   ```sh
   git commit -am 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and
   their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License

This project is protected under the [MIT](https://choosealicense.com/licenses/mit) License. For more details, refer to
the [LICENSE](./LICENSE.md) file.

---

## 👏 Acknowledgments

- [Axios](https://axios-http.com/) for providing a simple and flexible HTTP client.

[**Back to top**](#Top)

---
