/// <reference types="vite/client" />
/// <reference types="vite-plugin-monkey/client" />
/// <reference types="vite-plugin-monkey/global" />

import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $interceptor: {
      getInterceptors: () => Array<XMLHttpRequestInterceptorFunc> | undefined;
    };
  }
}
